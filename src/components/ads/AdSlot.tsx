import React, { useEffect, useRef } from 'react';
import { AdSlotId, AD_SLOT_DEFINITIONS } from '../../types/advertisement';
import { useAds } from '../../context/AdContext';
import { DirectCreative } from './DirectCreative';
import { AdSenseUnit } from './AdSenseUnit';
import { CustomHtmlUnit } from './CustomHtmlUnit';
import { Eye, ExternalLink, Settings } from 'lucide-react';

interface AdSlotProps {
  slotId: AdSlotId;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId, className = '' }) => {
  const { getAdForSlot, recordImpression, recordClick, highlightSlots } = useAds();
  const slotDef = AD_SLOT_DEFINITIONS[slotId];
  const activeAd = getAdForSlot(slotId);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const impressionRecorded = useRef<boolean>(false);

  // Lazy impression tracking using IntersectionObserver
  useEffect(() => {
    if (!activeAd || impressionRecorded.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !impressionRecorded.current) {
          impressionRecorded.current = true;
          recordImpression(slotId);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [activeAd, slotId, recordImpression]);

  // If no active ad and not in highlight mode: hide container without leaving unnecessary gaps
  if (!activeAd && !highlightSlots) {
    return null;
  }

  // Get responsive container dimension styles
  const getDimensionClass = () => {
    switch (slotId) {
      case 'HOME_TOP_BANNER':
      case 'HOME_HERO_BANNER':
      case 'FOOTER_BANNER':
        return 'w-full max-w-[970px] min-h-[90px] mx-auto';
      case 'HOME_MIDDLE_AD':
      case 'CATEGORY_TOP_AD':
      case 'ARTICLE_TOP_AD':
      case 'ARTICLE_BOTTOM_AD':
        return 'w-full max-w-[728px] min-h-[90px] mx-auto';
      case 'HOME_SIDEBAR_1':
      case 'ARTICLE_SIDEBAR_AD':
      case 'ARTICLE_MIDDLE_AD':
        return 'w-full max-w-[300px] min-h-[250px] mx-auto';
      case 'HOME_SIDEBAR_2':
        return 'w-full max-w-[300px] min-h-[300px] md:min-h-[450px] mx-auto';
      case 'CATEGORY_MIDDLE_AD':
        return 'w-full max-w-[728px] min-h-[90px] mx-auto';
      default:
        return 'w-full min-h-[90px] mx-auto';
    }
  };

  const handleAdClick = () => {
    if (activeAd) {
      recordClick(slotId);
    }
  };

  return (
    <aside
      ref={containerRef}
      aria-label="விளம்பரம்"
      className={`my-4 relative transition-all duration-200 ${getDimensionClass()} ${className}`}
    >
      {/* Admin Highlight Inspector Overlay */}
      {highlightSlots && (
        <div className="mb-1.5 flex items-center justify-between text-[11px] bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded shadow-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Settings className="w-3 h-3 text-stone-900" />
            <span>[{slotDef.id}]</span>
            <span className="font-normal font-sans text-stone-900 hidden sm:inline">
              ({slotDef.nameTa})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-600/30 px-1 rounded">{slotDef.desktopSize}</span>
            <span>{activeAd ? '● நேரலை' : '○ காலியாக உள்ளது'}</span>
          </div>
        </div>
      )}

      {/* When no ad is assigned and Highlight Inspector is on */}
      {!activeAd && highlightSlots && (
        <div className="w-full h-[90px] border-2 border-dashed border-amber-400 bg-amber-50/60 rounded flex flex-col items-center justify-center p-3 text-center">
          <span className="text-xs font-semibold text-amber-900 font-mono">
            SLOT: {slotDef.id}
          </span>
          <span className="text-[11px] text-amber-800">
            {slotDef.nameTa} · {slotDef.desktopSize} (டெஸ்க்டாப்) / {slotDef.mobileSize} (மொபைல்)
          </span>
          <span className="text-[10px] text-stone-500 mt-1">
            விளம்பரம் மேலாண்மையில் புதிய விளம்பரத்தை ஒதுக்கலாம்
          </span>
        </div>
      )}

      {/* Active Advertisement Content */}
      {activeAd && (
        <div className="relative w-full h-full">
          {/* Subtle disclosure banner - Google AdSense policy compliant */}
          <div className="flex items-center justify-between text-[10px] text-stone-400 mb-0.5 px-1 font-sans">
            <span className="tracking-wide uppercase font-medium">விளம்பரம் / Advertisement</span>
            {activeAd.type === 'adsense' && (
              <span className="text-[9px] text-stone-400 flex items-center gap-0.5">
                <span>Google Ad Unit</span>
              </span>
            )}
            {activeAd.type === 'direct' && activeAd.directBanner?.advertiserName && (
              <span className="text-[9px] text-stone-400 truncate max-w-[150px]">
                {activeAd.directBanner.advertiserName}
              </span>
            )}
          </div>

          {/* Ad Creative Unit */}
          <div className="w-full h-full overflow-hidden">
            {activeAd.type === 'direct' && (
              <DirectCreative ad={activeAd} slotDef={slotDef} onAdClick={handleAdClick} />
            )}
            {activeAd.type === 'adsense' && (
              <AdSenseUnit ad={activeAd} slotDef={slotDef} onAdClick={handleAdClick} />
            )}
            {activeAd.type === 'custom_html' && (
              <CustomHtmlUnit ad={activeAd} onAdClick={handleAdClick} />
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
