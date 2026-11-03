import React, { useState, useEffect, useCallback } from 'react';
import { AdProvider, useAds } from './context/AdContext';
import { NewsProvider, useNews } from './context/NewsContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { AdminAdManagement } from './pages/AdminAdManagement';
import { NEWS_CATEGORIES, NewsArticle } from './types/news';
import { Sliders, ArrowUp, Search, X, RefreshCw, AlertCircle } from 'lucide-react';

function AppContent() {
  const { activeCount } = useAds();
  const {
    articles,
    breakingNews,
    wpCategories,
    isLoading,
    isRefreshing,
    refreshNews,
    error,
    getArticleByIdOrSlug
  } = useNews();

  const [currentView, setCurrentView] = useState<'home' | 'admin' | string>('home');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state with URL hash
  const syncHashToView = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === '') {
      setCurrentView('home');
      setSelectedArticle(null);
      setSelectedCategorySlug(null);
      return;
    }

    if (hash === 'admin') {
      setCurrentView('admin');
      setSelectedArticle(null);
      setSelectedCategorySlug(null);
      return;
    }

    if (hash.startsWith('article/')) {
      const slugOrId = decodeURIComponent(hash.slice('article/'.length));
      const found = getArticleByIdOrSlug(slugOrId);
      if (found) {
        setSelectedArticle(found);
        setCurrentView(`article-${found.id}`);
      } else {
        // If articles still loading, retry shortly
        setCurrentView(`article-${slugOrId}`);
      }
      return;
    }

    if (hash.startsWith('category/')) {
      const catSlug = decodeURIComponent(hash.slice('category/'.length));
      setSelectedCategorySlug(catSlug);
      setCurrentView(`category-${catSlug}`);
      setSelectedArticle(null);
      return;
    }

    if (hash.startsWith('search')) {
      setCurrentView('search');
    }
  }, [getArticleByIdOrSlug]);

  // Initial and hash change listener
  useEffect(() => {
    syncHashToView();
    window.addEventListener('hashchange', syncHashToView);
    return () => window.removeEventListener('hashchange', syncHashToView);
  }, [syncHashToView]);

  // If article was opened via direct URL and articles loaded later
  useEffect(() => {
    if (currentView.startsWith('article-') && !selectedArticle) {
      const idOrSlug = currentView.slice('article-'.length);
      const found = getArticleByIdOrSlug(idOrSlug);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [articles, currentView, selectedArticle, getArticleByIdOrSlug]);

  // Handle scroll listener for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateHome = () => {
    setSelectedArticle(null);
    setSelectedCategorySlug(null);
    setSearchQuery('');
    setCurrentView('home');
    window.location.hash = '#/';
    scrollToTop();
  };

  const handleNavigateCategory = (slug: string) => {
    setSelectedArticle(null);
    setSelectedCategorySlug(slug);
    setSearchQuery('');
    setCurrentView(`category-${slug}`);
    window.location.hash = `#/category/${slug}`;
    scrollToTop();
  };

  const handleNavigateArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setCurrentView(`article-${article.id}`);
    window.location.hash = `#/article/${article.slug || article.id}`;
    scrollToTop();
  };

  const handleNavigateAdmin = () => {
    setCurrentView('admin');
    window.location.hash = '#/admin';
    scrollToTop();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedArticle(null);
    setSelectedCategorySlug(null);
    setCurrentView('search');
    window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
    scrollToTop();
  };

  // Filtered articles when search is active
  const searchResults = searchQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.content.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // Active category definition
  const matchedWpCat = wpCategories.find((c) => c.slug === selectedCategorySlug);
  const currentCategoryDef =
    NEWS_CATEGORIES.find((c) => c.slug === selectedCategorySlug) || {
      id: selectedCategorySlug || 'general',
      nameTa: matchedWpCat ? matchedWpCat.name : selectedCategorySlug || 'பொது',
      nameEn: matchedWpCat ? matchedWpCat.slug : selectedCategorySlug || 'General',
      slug: selectedCategorySlug || 'general',
      description: matchedWpCat?.description || 'சமீபத்திய முக்கிய செய்திகள் மற்றும் தகவல்கள்.'
    };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 selection:bg-red-800 selection:text-white">
      {/* Universal Header with Brand Masthead, Nav, Date & Ad Manager link */}
      <Header
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateCategory={handleNavigateCategory}
        onNavigateAdmin={handleNavigateAdmin}
        onSearch={handleSearch}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'admin' && (
          <AdminAdManagement onBackToSite={handleNavigateHome} />
        )}

        {currentView === 'home' && (
          <HomePage
            articles={articles}
            breakingNews={breakingNews}
            onSelectArticle={handleNavigateArticle}
            onNavigateCategory={handleNavigateCategory}
          />
        )}

        {currentView.startsWith('category-') && selectedCategorySlug && (
          <CategoryPage
            category={currentCategoryDef}
            articles={articles.filter(
              (a) =>
                a.categoryId.toLowerCase() === selectedCategorySlug.toLowerCase() ||
                (a.slug && a.slug.toLowerCase().includes(selectedCategorySlug.toLowerCase()))
            )}
            allArticles={articles}
            onSelectArticle={handleNavigateArticle}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {currentView.startsWith('article-') && selectedArticle && (
          <ArticlePage
            article={selectedArticle}
            allArticles={articles}
            onSelectArticle={handleNavigateArticle}
            onNavigateHome={handleNavigateHome}
            onNavigateCategory={handleNavigateCategory}
          />
        )}

        {/* Fallback if article slug was typed directly and not found */}
        {currentView.startsWith('article-') && !selectedArticle && !isLoading && (
          <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <h2 className="text-xl font-bold font-serif text-stone-900 mb-2">செய்தி கிடைக்கவில்லை</h2>
            <p className="text-sm text-stone-600 mb-6">
              நீங்கள் தேடும் செய்தி நீக்கப்பட்டிருக்கலாம் அல்லது முகவரி தவறாக இருக்கலாம்.
            </p>
            <button
              onClick={handleNavigateHome}
              className="px-5 py-2.5 bg-red-900 text-white text-xs font-semibold rounded hover:bg-red-800 transition-colors"
            >
              முகப்புக்குச் செல்க
            </button>
          </div>
        )}

        {currentView === 'search' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-red-800" />
                <h1 className="text-xl font-bold font-serif text-stone-900">
                  தேடல் முடிவுகள்: &quot;{searchQuery}&quot;
                </h1>
              </div>
              <button
                onClick={handleNavigateHome}
                className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>தேடலை ரத்து செய்க</span>
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => handleNavigateArticle(art)}
                    className="cursor-pointer bg-white p-4 rounded border border-stone-200 hover:border-red-800 shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-semibold text-red-800 uppercase">
                        {art.categoryId}
                      </span>
                      <h3 className="text-base font-bold font-serif text-stone-900 mt-1 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-2">{art.summary}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between font-mono">
                      <span>{art.readTime}</span>
                      <span>{art.views.toLocaleString()} வாசிப்புகள்</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-stone-500">
                <p className="text-sm">மன்னிக்கவும், &quot;{searchQuery}&quot; என்ற சொல்லுக்குரிய செய்திகள் ஏதும் கிடைக்கவில்லை.</p>
                <button
                  onClick={handleNavigateHome}
                  className="mt-4 px-4 py-2 text-xs font-semibold bg-red-900 text-white rounded hover:bg-red-800 transition-colors"
                >
                  முகப்புக்குச் செல்க
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-stone-900 text-white hover:bg-red-900 shadow-md transition-all duration-200 cursor-pointer"
            title="மேலே செல்க (Scroll to top)"
            aria-label="மேலே செல்க"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleNavigateAdmin}
          className="group flex items-center gap-2 bg-red-900 hover:bg-red-800 text-white text-xs font-semibold px-3.5 py-2.5 rounded-full shadow-lg border border-amber-400/40 transition-all duration-200 hover:scale-105 cursor-pointer"
          title="விளம்பர மேலாண்மை நிர்வாக பலகை"
        >
          <Sliders className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline">விளம்பர மேலாண்மை</span>
          <span className="bg-amber-400 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
            {activeCount}
          </span>
        </button>
      </div>

      {/* Universal Footer with FOOTER_BANNER Advertisement Placement */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateCategory={handleNavigateCategory}
        onNavigateAdmin={handleNavigateAdmin}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdProvider>
      <NewsProvider>
        <AppContent />
      </NewsProvider>
    </AdProvider>
  );
}
