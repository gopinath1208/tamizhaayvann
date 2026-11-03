import { NewsArticle, WPPost, WPCategory, NEWS_CATEGORIES } from '../types/news';

// Configurable WordPress API Base URL
// In development or when proxying, can fallback to /api/wp
export const WP_DIRECT_BASE =
  import.meta.env.VITE_WORDPRESS_API_URL || 'https://tamizhaayvan.42web.io/wp-json/wp/v2';
export const WP_PROXY_BASE = '/api/wp';

// In-memory cache to prevent redundant network calls
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}
const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Decodes HTML entities and handles Tamil Unicode strings cleanly
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.body.textContent || text;
  } catch {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#8217;/g, "'")
      .replace(/&#8216;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8211;/g, '–')
      .replace(/&#8212;/g, '—');
  }
}

/**
 * Strips HTML tags to produce clean summary/excerpt text
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return decodeHtmlEntities(html.replace(/<[^>]*>?/gm, '').trim());
}

/**
 * Extracts first image URL from HTML content if no featured image was set in WordPress
 */
export function extractFirstImageFromHtml(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/**
 * Parses rendered HTML content into an array of readable paragraphs
 */
export function parseHtmlToParagraphs(html: string): string[] {
  if (!html) return [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const pElements = doc.querySelectorAll('p, blockquote, h2, h3, h4');
    const paragraphs: string[] = [];

    pElements.forEach((el) => {
      const text = el.textContent?.trim();
      if (text && text.length > 5) {
        paragraphs.push(decodeHtmlEntities(text));
      }
    });

    if (paragraphs.length > 0) return paragraphs;
  } catch {
    // fallback
  }

  // Fallback splitting by newline or tags
  const clean = stripHtml(html);
  const parts = clean.split('\n\n').map((p) => p.trim()).filter((p) => p.length > 0);
  return parts.length > 0 ? parts : [clean];
}

/**
 * Estimate reading time in Tamil
 */
export function calculateTamilReadTime(content: string): string {
  const words = content.replace(/\s+/g, ' ').trim().split(' ').length;
  const minutes = Math.max(1, Math.ceil(words / 140));
  return `${minutes} நிமிடம் வாசிப்பு`;
}

/**
 * Core resilient fetcher: Tries direct WordPress REST API first,
 * falls back to /api/wp proxy if CORS or network blocked.
 */
async function fetchWordPressJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cacheKey = endpoint;
  const cached = cache.get(cacheKey);
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data as T;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // 1. Try Direct Public Request First
  try {
    const directUrl = `${WP_DIRECT_BASE}${cleanEndpoint}`;
    const response = await fetch(directUrl, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options?.headers || {})
      }
    });

    if (response.ok) {
      const data = (await response.json()) as T;
      cache.set(cacheKey, { data, timestamp: now });
      return data;
    }
  } catch {
    // CORS or network error occurred, proceed to proxy fallback
  }

  // 2. Try Proxy Endpoint Fallback
  try {
    const proxyUrl = `${WP_PROXY_BASE}${cleanEndpoint}`;
    const proxyResponse = await fetch(proxyUrl, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options?.headers || {})
      }
    });

    if (proxyResponse.ok) {
      const data = (await proxyResponse.json()) as T;
      cache.set(cacheKey, { data, timestamp: now });
      return data;
    }
  } catch (proxyError) {
    throw new Error(`WordPress API unreachable: ${(proxyError as Error).message}`);
  }

  throw new Error(`Failed to fetch from WordPress API: ${cleanEndpoint}`);
}

/**
 * Fetch published posts with embedded media, author and terms
 */
export async function getWordPressPosts(params?: {
  page?: number;
  per_page?: number;
  categories?: number | string;
  slug?: string;
  search?: string;
}): Promise<WPPost[]> {
  const query = new URLSearchParams();
  query.set('_embed', '1');
  query.set('status', 'publish');
  query.set('per_page', String(params?.per_page || 20));

  if (params?.page) query.set('page', String(params.page));
  if (params?.categories) query.set('categories', String(params.categories));
  if (params?.slug) query.set('slug', params.slug);
  if (params?.search) query.set('search', params.search);

  return fetchWordPressJson<WPPost[]>(`/posts?${query.toString()}`);
}

/**
 * Fetch single post by slug
 */
export async function getWordPressPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await getWordPressPosts({ slug, per_page: 1 });
  return posts.length > 0 ? posts[0] : null;
}

/**
 * Fetch all categories from WordPress
 */
export async function getWordPressCategories(): Promise<WPCategory[]> {
  return fetchWordPressJson<WPCategory[]>('/categories?per_page=100');
}

/**
 * Maps WordPress Post to TamizhAayvan NewsArticle format
 */
export function mapWPPostToNewsArticle(
  post: WPPost,
  categories: WPCategory[] = []
): NewsArticle {
  const title = decodeHtmlEntities(post.title?.rendered || 'தலைப்பு இல்லை');
  const summary = stripHtml(post.excerpt?.rendered || post.content?.rendered || '').slice(0, 180);
  const contentParagraphs = parseHtmlToParagraphs(post.content?.rendered || '');

  // Extract author
  const authorName =
    post._embedded?.author?.[0]?.name ||
    (post.author === 1 ? 'தமிழ் ஆய்வன் செய்திகள்' : 'நிருபர் குழு');

  // Extract Featured Image (Check _embedded first, then content image, then fallback)
  let imageUrl =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.large?.source_url ||
    extractFirstImageFromHtml(post.content?.rendered || '') ||
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80';

  // Ensure image URL is absolute
  if (imageUrl && imageUrl.startsWith('//')) {
    imageUrl = `https:${imageUrl}`;
  }

  // Extract caption
  const caption = post._embedded?.['wp:featuredmedia']?.[0]?.caption?.rendered
    ? stripHtml(post._embedded['wp:featuredmedia'][0].caption.rendered)
    : undefined;

  // Resolve category
  let categoryId = 'tamil-nadu';
  let categoryName = 'தமிழ்நாடு';

  if (post.categories && post.categories.length > 0) {
    const wpCatId = post.categories[0];
    const matchedWpCat = categories.find((c) => c.id === wpCatId);

    if (matchedWpCat) {
      categoryName = decodeHtmlEntities(matchedWpCat.name);
      // Map to existing navigation slug if possible
      const matchedLocalCat = NEWS_CATEGORIES.find(
        (c) =>
          c.slug.toLowerCase() === matchedWpCat.slug.toLowerCase() ||
          c.nameTa === matchedWpCat.name ||
          c.nameEn.toLowerCase() === matchedWpCat.name.toLowerCase()
      );
      categoryId = matchedLocalCat ? matchedLocalCat.slug : matchedWpCat.slug;
    }
  }

  // Extract tags
  const tags: string[] = [];
  if (post._embedded?.['wp:term']) {
    post._embedded['wp:term'].forEach((termGroup) => {
      termGroup.forEach((term) => {
        if (term.taxonomy === 'post_tag' && term.name) {
          tags.push(decodeHtmlEntities(term.name));
        }
      });
    });
  }
  if (tags.length === 0) {
    tags.push(categoryName, 'செய்திகள்', 'TamizhAayvan');
  }

  const rawText = contentParagraphs.join(' ');
  const readTime = calculateTamilReadTime(rawText);

  // Derive stable views count from post ID
  const views = 1200 + ((post.id * 89) % 18000);

  return {
    id: `wp-${post.id}`,
    wpId: post.id,
    slug: post.slug,
    title,
    summary: summary ? `${summary}...` : title,
    content: contentParagraphs.length > 0 ? contentParagraphs : [summary],
    contentHtml: post.content?.rendered || '',
    categoryId,
    categoryName,
    author: authorName,
    publishedAt: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    readTime,
    imageUrl,
    caption,
    tags,
    views,
    isBreaking: post.sticky || false,
    isTrending: false,
    isLeadStory: false,
    isWordPress: true,
    wpLink: post.link
  };
}
