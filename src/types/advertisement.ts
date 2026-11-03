export type AdSlotId =
  | 'HOME_TOP_BANNER'
  | 'HOME_HERO_BANNER'
  | 'HOME_SIDEBAR_1'
  | 'HOME_SIDEBAR_2'
  | 'HOME_MIDDLE_AD'
  | 'CATEGORY_TOP_AD'
  | 'CATEGORY_MIDDLE_AD'
  | 'ARTICLE_TOP_AD'
  | 'ARTICLE_MIDDLE_AD'
  | 'ARTICLE_BOTTOM_AD'
  | 'ARTICLE_SIDEBAR_AD'
  | 'FOOTER_BANNER';

export type AdType = 'direct' | 'adsense' | 'custom_html';

export type AdStatus = 'active' | 'inactive' | 'scheduled' | 'expired';

export interface AdSlotDefinition {
  id: AdSlotId;
  nameTa: string;
  nameEn: string;
  descriptionTa: string;
  desktopSize: string; // e.g. "970 × 90 px"
  mobileSize: string;  // e.g. "320 × 100 px"
  aspectDesktop: string; // e.g. "970 / 90"
  minHeightDesktop: number; // in px
  minHeightMobile: number;  // in px
  placementSection: 'homepage' | 'category' | 'article' | 'global';
  suggestedFormats: ('leaderboard' | 'rectangle' | 'halfpage' | 'mobile_banner')[];
}

export const AD_SLOT_DEFINITIONS: Record<AdSlotId, AdSlotDefinition> = {
  HOME_TOP_BANNER: {
    id: 'HOME_TOP_BANNER',
    nameTa: 'முகப்பு மேல் லீடர்போர்டு',
    nameEn: 'Homepage Top Leaderboard',
    descriptionTa: 'முதன்மை மெனுவுக்கு கீழ், முக்கிய செய்திகள் டிக்கருக்கு மேலே உள்ள முதன்மையான இடம்.',
    desktopSize: '970 × 90 px',
    mobileSize: '320 × 100 px',
    aspectDesktop: '970/90',
    minHeightDesktop: 90,
    minHeightMobile: 100,
    placementSection: 'homepage',
    suggestedFormats: ['leaderboard', 'mobile_banner']
  },
  HOME_HERO_BANNER: {
    id: 'HOME_HERO_BANNER',
    nameTa: 'முகப்பு ஹீரோ பிரிவு விளம்பரம்',
    nameEn: 'Homepage Hero Section Ad',
    descriptionTa: 'முக்கிய செய்திகள் டிக்கருக்கு கீழ் மற்றும் முதன்மை செய்தி தொடங்கும் முன் இடம்.',
    desktopSize: '970 × 90 px',
    mobileSize: '320 × 100 px',
    aspectDesktop: '970/90',
    minHeightDesktop: 90,
    minHeightMobile: 100,
    placementSection: 'homepage',
    suggestedFormats: ['leaderboard', 'mobile_banner']
  },
  HOME_SIDEBAR_1: {
    id: 'HOME_SIDEBAR_1',
    nameTa: 'வலது பக்கப்பார்வை விளம்பரம் 1',
    nameEn: 'Right Sidebar Ad 1',
    descriptionTa: 'அதிகம் வாசிக்கப்பட்டவை பகுதிக்கு கீழே உள்ள செவ்வக விளம்பரம்.',
    desktopSize: '300 × 250 px',
    mobileSize: '300 × 250 px / Responsive',
    aspectDesktop: '300/250',
    minHeightDesktop: 250,
    minHeightMobile: 250,
    placementSection: 'homepage',
    suggestedFormats: ['rectangle']
  },
  HOME_SIDEBAR_2: {
    id: 'HOME_SIDEBAR_2',
    nameTa: 'வலது பக்கப்பார்வை விளம்பரம் 2',
    nameEn: 'Right Sidebar Ad 2',
    descriptionTa: 'பக்கப்பார்வை உள்ளடக்கப் பிரிவுகளுக்கு இடையில் உள்ள செங்குத்து அல்லது செவ்வக விளம்பரம்.',
    desktopSize: '300 × 600 px / 300 × 250 px',
    mobileSize: '300 × 250 px / Responsive',
    aspectDesktop: '300/600',
    minHeightDesktop: 450,
    minHeightMobile: 250,
    placementSection: 'homepage',
    suggestedFormats: ['halfpage', 'rectangle']
  },
  HOME_MIDDLE_AD: {
    id: 'HOME_MIDDLE_AD',
    nameTa: 'செய்தி அட்டைகளுக்கு இடையே விளம்பரம்',
    nameEn: 'Between Latest News Cards Ad',
    descriptionTa: 'செய்தி அட்டை வரிசைகளுக்கு இடையே இயற்கையாக அமைக்கப்பட்ட விளம்பர இடைவெளி.',
    desktopSize: '728 × 90 px',
    mobileSize: '320 × 100 px',
    aspectDesktop: '728/90',
    minHeightDesktop: 90,
    minHeightMobile: 100,
    placementSection: 'homepage',
    suggestedFormats: ['leaderboard', 'mobile_banner']
  },
  CATEGORY_TOP_AD: {
    id: 'CATEGORY_TOP_AD',
    nameTa: 'பிரிவு பக்க மேல் விளம்பரம்',
    nameEn: 'Category Page Top Ad',
    descriptionTa: 'பிரிவு தலைப்புக்கு கீழே மற்றும் செய்திகள் தொடங்குவதற்கு முன் இடம்.',
    desktopSize: '970 × 90 px / 728 × 90 px',
    mobileSize: '320 × 100 px',
    aspectDesktop: '970/90',
    minHeightDesktop: 90,
    minHeightMobile: 100,
    placementSection: 'category',
    suggestedFormats: ['leaderboard', 'mobile_banner']
  },
  CATEGORY_MIDDLE_AD: {
    id: 'CATEGORY_MIDDLE_AD',
    nameTa: 'பிரிவு பக்க இடை விளம்பரம்',
    nameEn: 'Category Page Middle Ad',
    descriptionTa: 'பிரிவு செய்தி அட்டைகளின் வரிசைகளுக்கு இடையே அல்லது பட்டியலின் அடிப்பகுதியில் இடம்.',
    desktopSize: '728 × 90 px / 300 × 250 px',
    mobileSize: '300 × 250 px / Responsive',
    aspectDesktop: '728/90',
    minHeightDesktop: 90,
    minHeightMobile: 250,
    placementSection: 'category',
    suggestedFormats: ['leaderboard', 'rectangle']
  },
  ARTICLE_TOP_AD: {
    id: 'ARTICLE_TOP_AD',
    nameTa: 'கட்டுரை மேல் விளம்பரம்',
    nameEn: 'Article Top Ad',
    descriptionTa: 'கட்டுரை தலைப்பு மற்றும் விவரங்களுக்கு கீழே, முதன்மை உள்ளடக்கத்திற்கு முன் இடம்.',
    desktopSize: '728 × 90 px / Responsive',
    mobileSize: '320 × 100 px',
    aspectDesktop: '728/90',
    minHeightDesktop: 90,
    minHeightMobile: 100,
    placementSection: 'article',
    suggestedFormats: ['leaderboard', 'mobile_banner']
  },
  ARTICLE_MIDDLE_AD: {
    id: 'ARTICLE_MIDDLE_AD',
    nameTa: 'கட்டுரை இடை விளம்பரம்',
    nameEn: 'Article In-Content Ad',
    descriptionTa: '3 அல்லது 4-வது பத்திக்கு பின், கட்டுரையின் நடுப்பகுதியில் வாசிப்புக்கு இடையூறின்றி இடம்.',
    desktopSize: '300 × 250 px / Responsive',
    mobileSize: '300 × 250 px / Responsive',
    aspectDesktop: '300/250',
    minHeightDesktop: 250,
    minHeightMobile: 250,
    placementSection: 'article',
    suggestedFormats: ['rectangle']
  },
  ARTICLE_BOTTOM_AD: {
    id: 'ARTICLE_BOTTOM_AD',
    nameTa: 'கட்டுரை அடி விளம்பரம்',
    nameEn: 'Article Bottom Ad',
    descriptionTa: 'கட்டுரை உள்ளடக்கத்திற்குப் பின், தொடர்புடைய செய்திகளுக்கு முன் இடம்.',
    desktopSize: '728 × 90 px / Responsive',
    mobileSize: '320 × 100 px',
    aspectDesktop: '728/90',
    minHeightDesktop: 90,
    minHeightMobile: 100,
    placementSection: 'article',
    suggestedFormats: ['leaderboard', 'mobile_banner']
  },
  ARTICLE_SIDEBAR_AD: {
    id: 'ARTICLE_SIDEBAR_AD',
    nameTa: 'கட்டுரை பக்கப்பார்வை விளம்பரம்',
    nameEn: 'Article Sidebar Ad',
    descriptionTa: 'கட்டுரை பக்கத்தில் டெஸ்க்டாப் வலது பக்கப்பார்வையில் பொருத்தப்பட்ட விளம்பரம்.',
    desktopSize: '300 × 250 px / 300 × 600 px',
    mobileSize: '300 × 250 px / Hidden on narrow',
    aspectDesktop: '300/250',
    minHeightDesktop: 250,
    minHeightMobile: 250,
    placementSection: 'article',
    suggestedFormats: ['rectangle', 'halfpage']
  },
  FOOTER_BANNER: {
    id: 'FOOTER_BANNER',
    nameTa: 'அடிக்குறிப்பு பேனர் விளம்பரம்',
    nameEn: 'Footer Banner Ad',
    descriptionTa: 'வலைத்தள அடிக்குறிப்பிற்கு (Footer) உடனடியாக மேலே உள்ள முழு அகல விளம்பரம்.',
    desktopSize: '970 × 90 px',
    mobileSize: '320 × 100 px',
    aspectDesktop: '970/90',
    minHeightDesktop: 90,
    minHeightMobile: 100,
    placementSection: 'global',
    suggestedFormats: ['leaderboard', 'mobile_banner']
  }
};

export interface AdvertisementItem {
  id: string;
  name: string;
  slotId: AdSlotId;
  type: AdType;
  enabled: boolean;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  
  // Direct Banner Details
  directBanner?: {
    advertiserName: string;
    targetUrl: string;
    imageUrlDesktop: string;
    imageUrlMobile?: string;
    altText: string;
    headlineTa?: string;
    sublineTa?: string;
    ctaTextTa?: string;
    themeColor?: string; // for custom creative rendering
  };

  // Google AdSense Details
  adSense?: {
    publisherId: string;    // e.g. "ca-pub-9876543210123456"
    adSlotId: string;       // e.g. "5432109876"
    adFormat: 'auto' | 'horizontal' | 'rectangle' | 'vertical' | 'responsive';
    fullWidthResponsive: boolean;
    customCodeSnippet?: string;
  };

  // Custom HTML / Script Creative
  customHtml?: {
    rawHtml: string;
    sandboxLevel?: string;
  };

  // Performance metrics
  impressions: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}
