import React, { useEffect, useRef, useState } from 'react';
import { AdvertisementItem, AdSlotDefinition } from '../../types/advertisement';
import { Info, ExternalLink } from 'lucide-react';

interface AdSenseUnitProps {
  ad: AdvertisementItem;
  slotDef: AdSlotDefinition;
  onAdClick: () => void;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({ ad, slotDef, onAdClick }) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [adSenseLoaded, setAdSenseLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const adSense = ad.adSense;

  useEffect(() => {
    if (!adSense?.publisherId) return;

    // Check if adsbygoogle script already exists
    const scriptId = 'google-adsense-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSense.publisherId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        try {
          // @ts-expect-error window.adsbygoogle is injected
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdSenseLoaded(true);
        } catch {
          // ignore
        }
      };
      document.head.appendChild(script);
    } else {
      try {
        // @ts-expect-error window.adsbygoogle is injected
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdSenseLoaded(true);
      } catch {
        // ignore
      }
    }
  }, [adSense?.publisherId, adSense?.adSlotId]);

  if (!adSense) return null;

  return (
    <div className="relative w-full h-full min-h-[90px] bg-stone-50 border border-stone-200/80 rounded overflow-hidden flex flex-col justify-between">
      {/* Real Google AdSense Tag (rendered in DOM for crawlers & ad delivery) */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={adSense.publisherId}
        data-ad-slot={adSense.adSlotId}
        data-ad-format={adSense.adFormat || 'auto'}
        data-full-width-responsive={adSense.fullWidthResponsive ? 'true' : 'false'}
      />

      {/* Fallback & Preview Visual Simulation when AdSense script is in sandbox/review mode */}
      {!adSenseLoaded && (
        <div
          onClick={onAdClick}
          className="absolute inset-0 flex flex-col justify-between p-3.5 bg-gradient-to-r from-stone-50 via-white to-stone-100 hover:bg-stone-50 transition-colors cursor-pointer select-none"
        >
          {/* Top header row */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium text-stone-500 uppercase tracking-wider">
                Google Ads
              </span>
              <span className="text-[10px] text-stone-300">·</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-mono">
                {adSense.adSlotId}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-stone-400">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className="hover:text-stone-700 p-0.5 rounded"
                title="AdSense தகவல்"
              >
                <Info className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Ad Creative Body Content */}
          <div className="my-auto py-1">
            <div className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
              {slotDef.id.includes('SIDEBAR') ? (
                <span>டிஜிட்டல் மார்க்கெட்டிங் & கிளவுட் ஹோஸ்டிங் தீர்வுகள்</span>
              ) : (
                <span>அதிவேக ஃபைபர் பிராட்பேண்ட் இணைப்பு - முதல் 3 மாதங்கள் சிறப்பு தள்ளுபடி</span>
              )}
            </div>
            <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
              வணிக நிறுவனங்களுக்கான பாதுகாப்பான இணைய நெட்வொர்க் சேவை. 99.9% அப்டைம் உத்தரவாதம்.
            </div>
          </div>

          {/* Bottom Call to action row */}
          <div className="flex items-center justify-between pt-1 border-t border-stone-100">
            <span className="text-[10px] text-blue-700 font-medium hover:underline flex items-center gap-1">
              <span>ads.google.com/partner</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
            <span className="text-[10px] font-semibold text-stone-700 bg-stone-200/70 hover:bg-stone-300 px-2 py-0.5 rounded transition-colors">
              இணைப்பை பெறுக
            </span>
          </div>

          {showInfo && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 bg-white/95 p-3 flex flex-col justify-center text-xs text-stone-700 backdrop-blur-xs z-10"
            >
              <div className="font-semibold text-stone-900 mb-1">Google AdSense Integration Active</div>
              <div className="text-[11px] text-stone-600 mb-2 font-mono">
                Publisher: {adSense.publisherId} <br />
                Slot ID: {adSense.adSlotId} <br />
                Format: {adSense.adFormat}
              </div>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="self-end text-[11px] text-stone-900 font-bold underline"
              >
                மூடுக (Close)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
