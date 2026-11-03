import React from 'react';
import { NewsArticle } from '../types/news';
import { AdSlot } from '../components/ads/AdSlot';
import { BreakingNewsTicker } from '../components/layout/BreakingNewsTicker';
import { NewsCard } from '../components/news/NewsCard';
import { NewsSidebar } from '../components/news/NewsSidebar';
import { Flame, Compass, ChevronRight } from 'lucide-react';

interface HomePageProps {
  articles: NewsArticle[];
  breakingNews?: string[];
  onSelectArticle: (article: NewsArticle) => void;
  onNavigateCategory: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  breakingNews,
  onSelectArticle,
  onNavigateCategory
}) => {
  const leadArticle = articles.find((a) => a.isLeadStory) || articles[0];
  const sideFeatures = articles.filter((a) => a.id !== leadArticle.id).slice(0, 2);
  const row1Articles = articles.filter((a) => a.id !== leadArticle.id && !sideFeatures.some((s) => s.id === a.id)).slice(0, 3);
  const row2Articles = articles.slice(5, 8);

  return (
    <div className="w-full">
      {/* 1. HOMEPAGE TOP LEADERBOARD AD */}
      {/* Position: Below the main navigation menu, above the Breaking News ticker */}
      <div className="max-w-7xl mx-auto px-4 pt-3">
        <AdSlot slotId="HOME_TOP_BANNER" />
      </div>

      {/* Breaking News Ticker with live headlines */}
      <BreakingNewsTicker
        headlines={breakingNews}
        onSelectHeadline={(idx) => {
          if (articles[idx]) onSelectArticle(articles[idx]);
          else onSelectArticle(leadArticle);
        }}
      />

      {/* 2. HOMEPAGE HERO SECTION AD */}
      {/* Position: Below the Breaking News ticker and before the main news content */}
      <div className="max-w-7xl mx-auto px-4 pb-2">
        <AdSlot slotId="HOME_HERO_BANNER" />
      </div>

      {/* Main Content Layout with 2-Column Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Editorial Column (8 cols on desktop) */}
          <main className="lg:col-span-8 space-y-8">
            {/* Hero Section: Lead Story & Top 2 Side Features */}
            <section aria-label="தலைப்புச் செய்திகள்">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Lead Headline Story (7 cols) */}
                <div className="md:col-span-7">
                  <NewsCard article={leadArticle} variant="lead" onSelect={onSelectArticle} />
                </div>

                {/* Top 2 Side Features (5 cols) - 16:9 Widescreen */}
                <div className="md:col-span-5 flex flex-col gap-5">
                  {sideFeatures.map((art) => (
                    <div key={art.id}>
                      <NewsCard article={art} variant="standard" onSelect={onSelectArticle} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* News Row 1: Tamil Nadu & State Politics */}
            <section aria-label="தமிழ்நாடு செய்திகள்" className="pt-2">
              <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-red-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-700 rounded-full" />
                  <h2 className="text-lg md:text-xl font-bold font-serif text-stone-900">
                    தமிழ்நாடு & அரசியல் செய்திகள்
                  </h2>
                </div>
                <button
                  onClick={() => onNavigateCategory('tamil-nadu')}
                  className="text-xs text-red-800 hover:text-red-950 font-semibold flex items-center gap-1 group"
                >
                  <span>அனைத்தும் காண்க</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {row1Articles.map((art) => (
                  <NewsCard key={art.id} article={art} variant="standard" onSelect={onSelectArticle} />
                ))}
              </div>
            </section>

            {/* 4. BETWEEN LATEST NEWS CARDS ADVERTISEMENT */}
            {/* Position: Inserted naturally between news card rows without interrupting headlines */}
            <div className="py-2 border-y border-stone-200/80 my-4 bg-stone-50/50 rounded">
              <AdSlot slotId="HOME_MIDDLE_AD" />
            </div>

            {/* News Row 2: Economy, Cinema, Sports & Tech */}
            <section aria-label="வணிகம் மற்றும் சர்வதேச செய்திகள்">
              <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-amber-600 rounded-full" />
                  <h2 className="text-lg md:text-xl font-bold font-serif text-stone-900">
                    வணிகம், சினிமா & தொழில்நுட்பம்
                  </h2>
                </div>
                <button
                  onClick={() => onNavigateCategory('business')}
                  className="text-xs text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1 group"
                >
                  <span>மேலும் செய்திகள்</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {(row2Articles.length > 0 ? row2Articles : row1Articles).map((art, idx) => (
                  <NewsCard key={`${art.id}-${idx}`} article={art} variant="standard" onSelect={onSelectArticle} />
                ))}
              </div>
            </section>
          </main>

          {/* 3. RIGHT SIDEBAR ADVERTISEMENT & SIDEBAR CONTENT (4 cols on desktop) */}
          <div className="lg:col-span-4">
            <NewsSidebar articles={articles} onSelectArticle={onSelectArticle} />
          </div>
        </div>
      </div>
    </div>
  );
};
