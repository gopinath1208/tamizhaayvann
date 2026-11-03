export interface NewsArticle {
  id: string;
  slug?: string;
  wpId?: number;
  title: string;
  subtitle?: string;
  summary: string;
  content: string[];
  contentHtml?: string;
  categoryId: string;
  categoryName?: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  caption?: string;
  tags: string[];
  views: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  isLeadStory?: boolean;
  isWordPress?: boolean;
  wpLink?: string;
}

export interface NewsCategory {
  id: string;
  slug: string;
  nameTa: string;
  nameEn: string;
  description: string;
  wpId?: number;
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  sticky?: boolean;
  title: { rendered: string };
  content: { rendered: string; protected?: boolean };
  excerpt: { rendered: string; protected?: boolean };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      url: string;
      description?: string;
      slug?: string;
      avatar_urls?: Record<string, string>;
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      caption?: { rendered: string };
      alt_text?: string;
      media_details?: {
        width?: number;
        height?: number;
        sizes?: Record<string, { source_url: string; width?: number; height?: number }>;
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: 'tamil-nadu', slug: 'tamil-nadu', nameTa: 'தமிழ்நாடு', nameEn: 'Tamil Nadu', description: 'தமிழகத்தின் முக்கிய நிகழ்வுகள் மற்றும் செய்திகள்' },
  { id: 'india', slug: 'india', nameTa: 'இந்தியா', nameEn: 'India', description: 'இந்திய அளவிலான தேசிய செய்திகள் மற்றும் நிகழ்வுகள்' },
  { id: 'world', slug: 'world', nameTa: 'உலகம்', nameEn: 'World', description: 'சர்வதேச முக்கிய செய்திகள் மற்றும் உலக அரசியல்' },
  { id: 'politics', slug: 'politics', nameTa: 'அரசியல்', nameEn: 'Politics', description: 'அரசியல் களம், தேர்தல் விவாதங்கள் மற்றும் பகுப்பாய்வு' },
  { id: 'cinema', slug: 'cinema', nameTa: 'சினிமா', nameEn: 'Cinema', description: 'கோலிவுட் மற்றும் உலக சினிமா செய்திகள், விமர்சனங்கள்' },
  { id: 'business', slug: 'business', nameTa: 'வணிகம்', nameEn: 'Business', description: 'பொருளாதாரம், பங்குச்சந்தை, தங்கம் மற்றும் முதலீடு' },
  { id: 'spiritual', slug: 'spiritual', nameTa: 'ஆன்மீகம்', nameEn: 'Spiritual', description: 'கோவில் விசேஷங்கள், ராசிபலன் மற்றும் ஆன்மீக தகவல்கள்' },
  { id: 'sports', slug: 'sports', nameTa: 'விளையாட்டு', nameEn: 'Sports', description: 'கிரிக்கெட், கால்பந்து மற்றும் சர்வதேச விளையாட்டு' },
  { id: 'technology', slug: 'technology', nameTa: 'தொழில்நுட்பம்', nameEn: 'Technology', description: 'புதிய தொழில்நுட்பம், ஏஐ மற்றும் மொபைல் செய்திகள்' }
];
