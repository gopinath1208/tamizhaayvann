import { AdvertisementItem } from '../types/advertisement';

export const INITIAL_ADVERTISEMENTS: AdvertisementItem[] = [
  {
    id: 'ad-slot-01',
    name: 'ஸ்ரீ குமரன் தங்கமாளிகை - அக்ஷய திருதியை சிறப்பு தள்ளுபடி விழா',
    slotId: 'HOME_TOP_BANNER',
    type: 'direct',
    enabled: true,
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    directBanner: {
      advertiserName: 'Sri Kumaran Thangamaligai',
      targetUrl: 'https://example.com/sri-kumaran-jewellers',
      imageUrlDesktop: '', // fallback to internal creative
      imageUrlMobile: '',
      altText: 'ஸ்ரீ குமரன் தங்கமாளிகை தங்க நகை சிறப்பு சலுகை',
      headlineTa: 'ஸ்ரீ குமரன் தங்கமாளிகை',
      sublineTa: 'சேதாரம் இல்லை · பவுனுக்கு சிறப்பு தள்ளுபடி · 100% BIS 916 ஹால்மார்க்',
      ctaTextTa: 'சலுகையை பெறுக',
      themeColor: '#B45309'
    },
    impressions: 48920,
    clicks: 1420,
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-11-01T10:00:00Z'
  },
  {
    id: 'ad-slot-02',
    name: 'டாடா மோட்டார்ஸ் நெக்ஸான் ஈ.வி - புதிய தலைமுறை எலக்ட்ரிக் கார்',
    slotId: 'HOME_HERO_BANNER',
    type: 'direct',
    enabled: true,
    startDate: '2026-10-15',
    endDate: '2026-12-15',
    directBanner: {
      advertiserName: 'Tata Motors Electric Mobility',
      targetUrl: 'https://example.com/tata-nexon-ev',
      imageUrlDesktop: '',
      imageUrlMobile: '',
      altText: 'டாடா நெக்ஸான் ஈ.வி அதிநவீன எலக்ட்ரிக் கார் டெஸ்ட் டிரைவ்',
      headlineTa: 'புதிய நெக்ஸான் EV - 465 கி.மீ ரேஞ்ச்',
      sublineTa: 'பூஜ்ஜியம் முன்பணம் · சிறப்பு வட்டி விகிதம் · இன்றே முன்பதிவு செய்யுங்கள்',
      ctaTextTa: 'டெஸ்ட் டிரைவ் முன்பதிவு',
      themeColor: '#0369A1'
    },
    impressions: 39400,
    clicks: 980,
    createdAt: '2026-10-15T11:00:00Z',
    updatedAt: '2026-11-01T12:00:00Z'
  },
  {
    id: 'ad-slot-03',
    name: 'எஸ்.ஆர்.எம் பல்கலைக்கழகம் - பொறியியல் & மருத்துவ சேர்க்கை 2027',
    slotId: 'HOME_SIDEBAR_1',
    type: 'direct',
    enabled: true,
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    directBanner: {
      advertiserName: 'SRM Institute of Science & Technology',
      targetUrl: 'https://example.com/admissions-srm',
      imageUrlDesktop: '',
      altText: 'எஸ்.ஆர்.எம் இன்ஸ்டிடியூட் ஆப் சயின்ஸ் சேர்க்கை அறிவிப்பு',
      headlineTa: 'SRM இன்ஸ்டிடியூட் சேர்க்கை',
      sublineTa: '100% வேலைவாய்ப்பு உறுதி · NAAC A++ அங்கீகாரம் · ரூ.100 கோடி கல்வி உதவித்தொகை',
      ctaTextTa: 'இப்போதே விண்ணப்பிக்கவும்',
      themeColor: '#1E3A8A'
    },
    impressions: 28400,
    clicks: 810,
    createdAt: '2026-09-01T09:00:00Z',
    updatedAt: '2026-10-25T14:00:00Z'
  },
  {
    id: 'ad-slot-04',
    name: 'போத்தீஸ் பாரம்பரிய காஞ்சிபுரம் பட்டுப்புடவைகள் பிரம்மாண்ட கண்காட்சி',
    slotId: 'HOME_SIDEBAR_2',
    type: 'direct',
    enabled: true,
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    directBanner: {
      advertiserName: 'Pothys Silk & Sarees',
      targetUrl: 'https://example.com/pothys-silks',
      imageUrlDesktop: '',
      altText: 'போத்தீஸ் திருமண பட்டுப்புடவை சிறப்பு கலெக்ஷன்',
      headlineTa: 'போத்தீஸ் பட்டு மையம்',
      sublineTa: 'தூய ஜரிகை காஞ்சிபுரம் பட்டு · திருமண முகூர்த்த சிறப்பு கலெக்ஷன் · அசல் நெசவாளர் விலை',
      ctaTextTa: 'கலெக்ஷன் காண்க',
      themeColor: '#9D174D'
    },
    impressions: 21500,
    clicks: 640,
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-28T09:00:00Z'
  },
  {
    id: 'ad-slot-05',
    name: 'கூகிள் ஆட்சென்ஸ் - செய்தி அட்டைகளுக்கு இடையே ரெஸ்பான்சிவ் விளம்பரம்',
    slotId: 'HOME_MIDDLE_AD',
    type: 'adsense',
    enabled: true,
    startDate: '2026-01-01',
    endDate: '2027-01-01',
    adSense: {
      publisherId: 'ca-pub-7198202611029876',
      adSlotId: '4829104821',
      adFormat: 'horizontal',
      fullWidthResponsive: true
    },
    impressions: 42100,
    clicks: 1150,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-11-01T15:00:00Z'
  },
  {
    id: 'ad-slot-06',
    name: 'ஸ்டார் ஹெல்த் குடும்ப மருத்துவக் காப்பீடு திட்டம்',
    slotId: 'CATEGORY_TOP_AD',
    type: 'direct',
    enabled: true,
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    directBanner: {
      advertiserName: 'Star Health Allied Insurance',
      targetUrl: 'https://example.com/star-health',
      imageUrlDesktop: '',
      altText: 'ஸ்டார் ஹெல்த் குடும்ப மருத்துவக் காப்பீடு சலுகை',
      headlineTa: 'முழு குடும்பத்திற்கும் மருத்துவ காப்பீடு',
      sublineTa: 'ரூ.10 லட்சம் வரை கவரேஜ் · ரொக்கமில்லா சிகிச்சை 14,000+ மருத்துவமனைகளில்',
      ctaTextTa: 'விவரம் அறிய',
      themeColor: '#047857'
    },
    impressions: 19800,
    clicks: 530,
    createdAt: '2026-10-01T12:00:00Z',
    updatedAt: '2026-10-30T10:00:00Z'
  },
  {
    id: 'ad-slot-07',
    name: 'கூகிள் ஆட்சென்ஸ் - பிரிவு பக்க இடைவெளி அலகுகள்',
    slotId: 'CATEGORY_MIDDLE_AD',
    type: 'adsense',
    enabled: true,
    startDate: '2026-01-01',
    endDate: '2027-01-01',
    adSense: {
      publisherId: 'ca-pub-7198202611029876',
      adSlotId: '9832104912',
      adFormat: 'responsive',
      fullWidthResponsive: true
    },
    impressions: 16400,
    clicks: 410,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-11-01T16:00:00Z'
  },
  {
    id: 'ad-slot-08',
    name: 'ஹெச்.டி.எஃப்.சி வங்கி வீட்டுக் கடன் - குறைந்த வட்டி சலுகை',
    slotId: 'ARTICLE_TOP_AD',
    type: 'direct',
    enabled: true,
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    directBanner: {
      advertiserName: 'HDFC Bank Home Loans',
      targetUrl: 'https://example.com/hdfc-home-loan',
      imageUrlDesktop: '',
      altText: 'ஹெச்டிஎப்சி வீட்டுக் கடன் குறைந்த வட்டி',
      headlineTa: 'உங்கள் சொந்த வீடு கனவை நனவாக்குங்கள்',
      sublineTa: 'ஆண்டுக்கு வெறும் 8.35% வட்டி விகிதத்தில் வீட்டுக் கடன் · உடனடி அனுமதி',
      ctaTextTa: 'தகுதி சரிபார்க்க',
      themeColor: '#1E40AF'
    },
    impressions: 34200,
    clicks: 1040,
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-11-01T11:00:00Z'
  },
  {
    id: 'ad-slot-09',
    name: 'கூகிள் ஆட்சென்ஸ் - கட்டுரையின் நடுப்பகுதி செவ்வக விளம்பரம் (In-Article)',
    slotId: 'ARTICLE_MIDDLE_AD',
    type: 'adsense',
    enabled: true,
    startDate: '2026-01-01',
    endDate: '2027-01-01',
    adSense: {
      publisherId: 'ca-pub-7198202611029876',
      adSlotId: '3829105432',
      adFormat: 'rectangle',
      fullWidthResponsive: true
    },
    impressions: 31000,
    clicks: 890,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-11-01T12:00:00Z'
  },
  {
    id: 'ad-slot-10',
    name: 'காவிரி டெக்னாலஜிஸ் - முழுமையான இணைய வர்த்தக மென்பொருள் தீர்வுகள்',
    slotId: 'ARTICLE_BOTTOM_AD',
    type: 'direct',
    enabled: true,
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    directBanner: {
      advertiserName: 'Cauvery Cloud & Software Solutions',
      targetUrl: 'https://example.com/cauvery-tech',
      imageUrlDesktop: '',
      altText: 'காவிரி சாப்ட்வேர் சொல்யூஷன்ஸ் பிரத்யேக சலுகை',
      headlineTa: 'உங்கள் வணிகத்தை ஆன்லைனில் கொண்டு செல்லுங்கள்',
      sublineTa: 'ஈகாமர்ஸ் வலைத்தளம், மொபைல் ஆப் மற்றும் கிளவுட் மென்பொருள் தீர்வுகள்',
      ctaTextTa: 'இலவச ஆலோசனை',
      themeColor: '#0F766E'
    },
    impressions: 24600,
    clicks: 610,
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-31T14:00:00Z'
  },
  {
    id: 'ad-slot-11',
    name: 'அப்பல்லோ மருத்துவமனை முழு உடல் பரிசோதனை பேக்கேஜ்',
    slotId: 'ARTICLE_SIDEBAR_AD',
    type: 'direct',
    enabled: true,
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    directBanner: {
      advertiserName: 'Apollo Hospitals Preventive Healthcare',
      targetUrl: 'https://example.com/apollo-checkup',
      imageUrlDesktop: '',
      altText: 'அப்பல்லோ முழு உடல் ஆரோக்கிய பரிசோதனை சலுகை',
      headlineTa: 'முழு உடல் ஆரோக்கிய பரிசோதனை',
      sublineTa: '65+ முக்கிய உடல் பரிசோதனைகள் · 50% சிறப்பு தள்ளுபடி · வீட்டிலிருந்தே ரத்தப் பரிசோதனை',
      ctaTextTa: 'முன்பதிவு செய்ய',
      themeColor: '#B91C1C'
    },
    impressions: 20100,
    clicks: 580,
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-29T16:00:00Z'
  },
  {
    id: 'ad-slot-12',
    name: 'தமிழ்நாடு சுற்றுலா வளர்ச்சி கழகம் - ஆன்மீக & இயற்கை சுற்றுலா பயணங்கள்',
    slotId: 'FOOTER_BANNER',
    type: 'direct',
    enabled: true,
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    directBanner: {
      advertiserName: 'Tamil Nadu Tourism Development Corp (TTDC)',
      targetUrl: 'https://example.com/tamilnadu-tourism',
      imageUrlDesktop: '',
      altText: 'தமிழ்நாடு சுற்றுலா வழிகாட்டி மற்றும் சொகுசு பேருந்து முன்பதிவு',
      headlineTa: 'தமிழ்நாட்டை கண்டு ரசியுங்கள் - TTDC சுற்றுலா',
      sublineTa: 'ஊட்டி, கொடைக்கானல், ராமேஸ்வரம் சிறப்பு சுற்றுலா தொகுப்புகள் · சொகுசு ஹோட்டல் தங்குமிடம்',
      ctaTextTa: 'சுற்றுலா திட்டங்கள் காண்க',
      themeColor: '#C2410C'
    },
    impressions: 46200,
    clicks: 1310,
    createdAt: '2026-10-01T09:00:00Z',
    updatedAt: '2026-11-01T18:00:00Z'
  }
];
