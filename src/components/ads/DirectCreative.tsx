import React, { useState } from 'react';
import { AdvertisementItem, AdSlotDefinition } from '../../types/advertisement';
import { ExternalLink, Sparkles, Award, Compass, HeartPulse, GraduationCap, Car } from 'lucide-react';

interface DirectCreativeProps {
  ad: AdvertisementItem;
  slotDef: AdSlotDefinition;
  onAdClick: () => void;
}

export const DirectCreative: React.FC<DirectCreativeProps> = ({ ad, slotDef, onAdClick }) => {
  const [imageError, setImageError] = useState(false);
  const banner = ad.directBanner;

  if (!banner) return null;

  const handleClick = (e: React.MouseEvent) => {
    onAdClick();
    if (banner.targetUrl) {
      // In web applet, open safe link
      window.open(banner.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const isWideLeaderboard = slotDef.id === 'HOME_TOP_BANNER' || slotDef.id === 'HOME_HERO_BANNER' || slotDef.id === 'FOOTER_BANNER';
  const isMediumLeaderboard = slotDef.id === 'HOME_MIDDLE_AD' || slotDef.id === 'CATEGORY_TOP_AD' || slotDef.id === 'ARTICLE_TOP_AD' || slotDef.id === 'ARTICLE_BOTTOM_AD';
  const isSidebar2 = slotDef.id === 'HOME_SIDEBAR_2';
  const isSidebar = slotDef.id === 'HOME_SIDEBAR_1' || slotDef.id === 'ARTICLE_SIDEBAR_AD' || slotDef.id === 'ARTICLE_MIDDLE_AD' || slotDef.id === 'CATEGORY_MIDDLE_AD';

  // If a valid image URL is provided and has not errored, render the custom image
  if (banner.imageUrlDesktop && !imageError) {
    return (
      <a
        href={banner.targetUrl || '#'}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-full overflow-hidden rounded group shadow-xs border border-stone-200"
      >
        <img
          src={banner.imageUrlDesktop}
          alt={banner.altText || banner.advertiserName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute bottom-1 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <span>விளம்பரம்</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </div>
      </a>
    );
  }

  // Pre-designed, ultra-clean commercial vector banner matching domain aesthetics
  const theme = banner.themeColor || '#881337';

  // Choose an icon based on theme
  const getBrandIcon = () => {
    if (banner.themeColor?.includes('B45309') || banner.advertiserName.includes('Kumaran')) return <Award className="w-5 h-5 text-amber-300" />;
    if (banner.themeColor?.includes('0369A1') || banner.advertiserName.includes('Tata')) return <Car className="w-5 h-5 text-sky-300" />;
    if (banner.themeColor?.includes('1E3A8A') || banner.advertiserName.includes('SRM')) return <GraduationCap className="w-5 h-5 text-blue-300" />;
    if (banner.themeColor?.includes('B91C1C') || banner.advertiserName.includes('Health') || banner.advertiserName.includes('Apollo')) return <HeartPulse className="w-5 h-5 text-rose-300" />;
    if (banner.themeColor?.includes('C2410C') || banner.advertiserName.includes('Tourism')) return <Compass className="w-5 h-5 text-orange-300" />;
    return <Sparkles className="w-5 h-5 text-amber-200" />;
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(e as any); }}
      className="cursor-pointer block relative w-full h-full overflow-hidden rounded border border-stone-200 hover:border-stone-400 transition-all group select-none shadow-xs"
      style={{
        background: `linear-gradient(135deg, ${theme} 0%, #1c1917 100%)`,
        color: '#ffffff'
      }}
    >
      {/* Decorative luxury mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Render layout suited to slot dimensions */}
      {isWideLeaderboard && (
        <div className="relative h-full flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full shrink-0 border border-white/20">
              {getBrandIcon()}
            </div>
            <div className="text-left">
              <div className="text-[11px] text-amber-300 font-medium tracking-wide uppercase">
                {banner.advertiserName}
              </div>
              <div className="text-sm md:text-base font-bold text-white leading-tight font-serif">
                {banner.headlineTa || banner.advertiserName}
              </div>
              <div className="text-xs text-stone-200 hidden md:block">
                {banner.sublineTa}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden lg:inline text-xs bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded border border-amber-400/30 font-medium">
              சிறப்பு சலுகை
            </span>
            <button className="px-4 py-1.5 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-stone-900 rounded shadow transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <span>{banner.ctaTextTa || 'மேலும் அறிய'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {isMediumLeaderboard && (
        <div className="relative h-full flex items-center justify-between px-4 py-2 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-white/10 rounded-full shrink-0 border border-white/20 hidden sm:block">
              {getBrandIcon()}
            </div>
            <div className="text-left min-w-0">
              <div className="text-[11px] text-amber-300 font-medium truncate">
                {banner.advertiserName}
              </div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight truncate">
                {banner.headlineTa || banner.advertiserName}
              </div>
              <div className="text-xs text-stone-300 truncate hidden md:block">
                {banner.sublineTa}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-stone-100 text-stone-900 rounded shadow transition-colors flex items-center gap-1 whitespace-nowrap">
              <span>{banner.ctaTextTa || 'தகவல்'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {isSidebar2 && (
        <div className="relative h-full flex flex-col justify-between p-5 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
              {getBrandIcon()}
            </div>
          </div>
          <div>
            <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              {banner.advertiserName}
            </div>
            <div className="text-lg font-bold text-white mb-2 leading-snug">
              {banner.headlineTa || banner.advertiserName}
            </div>
            <div className="text-xs text-stone-200 mb-4 leading-relaxed line-clamp-4">
              {banner.sublineTa}
            </div>
          </div>
          <div className="mt-auto pt-3">
            <div className="mb-3 inline-block bg-white/10 text-white text-[11px] px-2.5 py-1 rounded-full border border-white/20 font-mono">
              தொடர்புக்கு: +91 9025180407
            </div>
            <button className="w-full py-2.5 px-4 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-stone-900 rounded shadow-md transition-colors flex items-center justify-center gap-1.5">
              <span>{banner.ctaTextTa || 'இப்போதே வாங்குங்கள்'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {isSidebar && (
        <div className="relative h-full flex flex-col justify-between p-4 text-left">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-1.5 bg-white/10 rounded-lg shrink-0 border border-white/20">
              {getBrandIcon()}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-amber-300 font-medium truncate uppercase">
                {banner.advertiserName}
              </div>
              <div className="text-xs text-stone-300">நம்பகமான விளம்பரம்</div>
            </div>
          </div>
          <div className="my-auto">
            <div className="text-sm font-bold text-white leading-snug mb-1">
              {banner.headlineTa || banner.advertiserName}
            </div>
            <div className="text-xs text-stone-200 leading-normal line-clamp-2">
              {banner.sublineTa}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-stone-300 font-sans">
              அங்கீகரிக்கப்பட்டது
            </span>
            <button className="px-3 py-1 text-xs font-semibold bg-white hover:bg-stone-100 text-stone-900 rounded shadow transition-colors flex items-center gap-1">
              <span>{banner.ctaTextTa || 'பார்க்க'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
