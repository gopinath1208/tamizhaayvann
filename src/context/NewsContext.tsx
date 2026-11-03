import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NewsArticle, WPCategory } from '../types/news';
import { MOCK_ARTICLES, BREAKING_NEWS_HEADLINES } from '../data/mockNews';
import {
  getWordPressPosts,
  getWordPressCategories,
  mapWPPostToNewsArticle
} from '../services/wordpress';

interface NewsContextType {
  articles: NewsArticle[];
  wpCategories: WPCategory[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  isLiveConnected: boolean;
  wpPostsCount: number;
  breakingNews: string[];
  refreshNews: () => Promise<void>;
  getArticleByIdOrSlug: (idOrSlug: string) => NewsArticle | undefined;
  getArticlesByCategory: (categorySlug: string) => NewsArticle[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(MOCK_ARTICLES);
  const [wpCategories, setWpCategories] = useState<WPCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [wpPostsCount, setWpPostsCount] = useState<number>(0);
  const [breakingNews, setBreakingNews] = useState<string[]>(BREAKING_NEWS_HEADLINES);

  const fetchWordPressContent = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      // 1. Fetch categories and posts in parallel
      const [wpCats, rawPosts] = await Promise.all([
        getWordPressCategories().catch(() => [] as WPCategory[]),
        getWordPressPosts({ per_page: 20 })
      ]);

      setWpCategories(wpCats);

      if (Array.isArray(rawPosts) && rawPosts.length > 0) {
        setIsLiveConnected(true);
        setWpPostsCount(rawPosts.length);

        // Map WordPress posts to NewsArticle format
        const mappedArticles = rawPosts.map((post) =>
          mapWPPostToNewsArticle(post, wpCats)
        );

        // Build combined articles:
        // WordPress posts are the primary source of truth.
        // We supplement with non-conflicting existing articles so the site remains
        // vibrant and full across all categories and sections.
        const combined = [
          ...mappedArticles,
          ...MOCK_ARTICLES.filter(
            (mock) => !mappedArticles.some((wp) => wp.title === mock.title || wp.id === mock.id)
          )
        ];

        setArticles(combined);

        // Update breaking news ticker with WordPress titles
        const wpTitles = mappedArticles.slice(0, 3).map((a) => a.title);
        setBreakingNews([...wpTitles, ...BREAKING_NEWS_HEADLINES]);
      } else {
        // WordPress returned empty array or 0 posts
        setIsLiveConnected(true);
        setArticles(MOCK_ARTICLES);
      }
    } catch (err) {
      console.warn('WordPress fetch notice:', err);
      setError((err as Error).message || 'WordPress connection issue');
      // Fallback gracefully to MOCK_ARTICLES so the website remains 100% operational
      setArticles(MOCK_ARTICLES);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchWordPressContent();
  }, [fetchWordPressContent]);

  const refreshNews = useCallback(async () => {
    await fetchWordPressContent(true);
  }, [fetchWordPressContent]);

  const getArticleByIdOrSlug = useCallback(
    (idOrSlug: string): NewsArticle | undefined => {
      return (
        articles.find((a) => a.id === idOrSlug || a.slug === idOrSlug) ||
        articles.find((a) => a.id.replace('wp-', '') === idOrSlug)
      );
    },
    [articles]
  );

  const getArticlesByCategory = useCallback(
    (categorySlug: string): NewsArticle[] => {
      return articles.filter(
        (a) =>
          a.categoryId === categorySlug ||
          (a.categoryName && a.categoryName.toLowerCase() === categorySlug.toLowerCase())
      );
    },
    [articles]
  );

  return (
    <NewsContext.Provider
      value={{
        articles,
        wpCategories,
        isLoading,
        isRefreshing,
        error,
        isLiveConnected,
        wpPostsCount,
        breakingNews,
        refreshNews,
        getArticleByIdOrSlug,
        getArticlesByCategory
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
