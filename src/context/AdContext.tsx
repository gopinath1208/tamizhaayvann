import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdvertisementItem, AdSlotId, AdStatus } from '../types/advertisement';
import { INITIAL_ADVERTISEMENTS } from '../data/defaultAds';

interface AdContextType {
  ads: AdvertisementItem[];
  getAdForSlot: (slotId: AdSlotId) => AdvertisementItem | null;
  getAdStatus: (ad: AdvertisementItem) => AdStatus;
  createAd: (adData: Omit<AdvertisementItem, 'id' | 'impressions' | 'clicks' | 'createdAt' | 'updatedAt'>) => void;
  updateAd: (id: string, updates: Partial<AdvertisementItem>) => void;
  deleteAd: (id: string) => void;
  toggleAdEnabled: (id: string) => void;
  recordImpression: (slotId: AdSlotId) => void;
  recordClick: (slotId: AdSlotId) => void;
  resetToDefaults: () => void;
  highlightSlots: boolean;
  setHighlightSlots: (value: boolean | ((prev: boolean) => boolean)) => void;
  totalImpressions: number;
  totalClicks: number;
  activeCount: number;
}

const STORAGE_KEY = 'tamizhaayvan_ads_v1';

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<AdvertisementItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_ADVERTISEMENTS;
  });

  const [highlightSlots, setHighlightSlots] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ads));
    } catch {
      // ignore
    }
  }, [ads]);

  const getAdStatus = (ad: AdvertisementItem): AdStatus => {
    if (!ad.enabled) return 'inactive';
    const today = new Date().toISOString().split('T')[0];
    if (ad.startDate && today < ad.startDate) return 'scheduled';
    if (ad.endDate && today > ad.endDate) return 'expired';
    return 'active';
  };

  const getAdForSlot = (slotId: AdSlotId): AdvertisementItem | null => {
    const candidate = ads.find(a => a.slotId === slotId && getAdStatus(a) === 'active');
    return candidate || null;
  };

  const createAd = (adData: Omit<AdvertisementItem, 'id' | 'impressions' | 'clicks' | 'createdAt' | 'updatedAt'>) => {
    const newAd: AdvertisementItem = {
      ...adData,
      id: `ad-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      impressions: 0,
      clicks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    // If another ad already targets the same slot and is enabled, optionally keep or disable
    setAds(prev => [newAd, ...prev]);
  };

  const updateAd = (id: string, updates: Partial<AdvertisementItem>) => {
    setAds(prev =>
      prev.map(ad => (ad.id === id ? { ...ad, ...updates, updatedAt: new Date().toISOString() } : ad))
    );
  };

  const deleteAd = (id: string) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
  };

  const toggleAdEnabled = (id: string) => {
    setAds(prev =>
      prev.map(ad => (ad.id === id ? { ...ad, enabled: !ad.enabled, updatedAt: new Date().toISOString() } : ad))
    );
  };

  const recordImpression = (slotId: AdSlotId) => {
    setAds(prev =>
      prev.map(ad => {
        if (ad.slotId === slotId && getAdStatus(ad) === 'active') {
          return { ...ad, impressions: ad.impressions + 1 };
        }
        return ad;
      })
    );
  };

  const recordClick = (slotId: AdSlotId) => {
    setAds(prev =>
      prev.map(ad => {
        if (ad.slotId === slotId && getAdStatus(ad) === 'active') {
          return { ...ad, clicks: ad.clicks + 1 };
        }
        return ad;
      })
    );
  };

  const resetToDefaults = () => {
    setAds(INITIAL_ADVERTISEMENTS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ADVERTISEMENTS));
    } catch {
      // ignore
    }
  };

  const totalImpressions = ads.reduce((sum, a) => sum + (a.impressions || 0), 0);
  const totalClicks = ads.reduce((sum, a) => sum + (a.clicks || 0), 0);
  const activeCount = ads.filter(a => getAdStatus(a) === 'active').length;

  return (
    <AdContext.Provider
      value={{
        ads,
        getAdForSlot,
        getAdStatus,
        createAd,
        updateAd,
        deleteAd,
        toggleAdEnabled,
        recordImpression,
        recordClick,
        resetToDefaults,
        highlightSlots,
        setHighlightSlots,
        totalImpressions,
        totalClicks,
        activeCount
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};
