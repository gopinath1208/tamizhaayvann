import React from 'react';
import { NewsArticle, NewsCategory } from '../types/news';
import { AdSlot } from '../components/ads/AdSlot';
import { NewsCard } from '../components/news/NewsCard';
import { NewsSidebar } from '../components/news/NewsSidebar';
import { Home, ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  category: NewsCategory;
  articles: NewsArticle[];
  allArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onNavigateHome: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  articles,
  allArticles,
  onSelectArticle,
  onNavigateHome
}) => {
  // If fewer articles in category, supplement with some related articles
  const displayArticles =
    articles.length >= 4 ? articles : [...articles, ...allArticles.filter((a) => a.categoryId !== category.id)].slice(0, 8);

  const topRow = displayArticles.slice(0, 3);
  const bottomRow = displayArticles.slice(3, 7);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="வழிசெலுத்தல்" className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
        <button
          onClick={onNavigateHome}
          className="hover:text-red-900 flex items-center gap-1 font-medium transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>முகப்பு</span>
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-red-900 font-semibold">{category.nameTa}</span>
        <span className="text-stone-400">({category.nameEn})</span>
      </nav>

      {/* Category Header */}
      <div className="pb-3 mb-4 border-b-2 border-red-800 flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-serif text-stone-900">
            {category.nameTa} செய்திகள்
          </h1>
          <p className="text-xs text-stone-600 mt-1">{category.description}</p>
        </div>
        <div className="text-xs text-stone-500 font-mono">
          மொத்தம் {displayArticles.length} செய்திகள்
        </div>
      </div>

      {/* 5. CATEGORY PAGE ADVERTISEMENT (CATEGORY_TOP_AD) */}
      {/* Position: Below the category title */}
      <div className="my-4">
        <AdSlot slotId="CATEGORY_TOP_AD" />
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Category News Feed (8 cols) */}
        <main className="lg:col-span-8 space-y-6">
          {/* Top Row of Category News Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {topRow.map((art) => (
              <NewsCard key={art.id} article={art} variant="standard" onSelect={onSelectArticle} />
            ))}
          </div>

          {/* 5. CATEGORY PAGE MIDDLE ADVERTISEMENT (CATEGORY_MIDDLE_AD) */}
          {/* Position: Between news card rows */}
          <div className="py-2 border-y border-stone-200/80 my-4 bg-stone-50/50 rounded">
            <AdSlot slotId="CATEGORY_MIDDLE_AD" />
          </div>

          {/* Bottom Row of Category News Cards - 16:9 Widescreen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {bottomRow.map((art) => (
              <NewsCard key={art.id} article={art} variant="standard" onSelect={onSelectArticle} />
            ))}
          </div>

          {/* Pagination / Load More Button */}
          <div className="pt-6 text-center">
            <button
              onClick={() => {}}
              className="px-6 py-2.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded shadow-xs hover:bg-stone-50 transition-colors"
            >
              மேலும் செய்திகளை ஏற்றுக (Load More)
            </button>
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="lg:col-span-4">
          <NewsSidebar articles={allArticles} onSelectArticle={onSelectArticle} />
        </div>
      </div>
    </div>
  );
};
