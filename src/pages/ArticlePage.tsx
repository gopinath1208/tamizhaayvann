import React, { useState } from 'react';
import { NewsArticle } from '../types/news';
import { AdSlot } from '../components/ads/AdSlot';
import { NewsSidebar } from '../components/news/NewsSidebar';
import {
  Home,
  ChevronRight,
  Clock,
  Eye,
  Share2,
  Bookmark,
  Check,
  Facebook,
  MessageCircle,
  Twitter,
  Printer,
  Newspaper
} from 'lucide-react';

interface ArticlePageProps {
  article: NewsArticle;
  allArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (slug: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  allArticles,
  onSelectArticle,
  onNavigateHome,
  onNavigateCategory
}) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.categoryId === article.categoryId || true))
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Splitting paragraphs for strategic ad insertion after paragraph 3
  const hasHtmlContent = Boolean(article.contentHtml && article.contentHtml.trim());
  
  // Split HTML into top and remaining chunks around the 3rd paragraph
  let topHtml = '';
  let bottomHtml = '';
  if (hasHtmlContent && article.contentHtml) {
    const parts = article.contentHtml.split('</p>');
    if (parts.length > 3) {
      topHtml = parts.slice(0, 3).join('</p>') + '</p>';
      bottomHtml = parts.slice(3).join('</p>');
    } else {
      topHtml = article.contentHtml;
      bottomHtml = '';
    }
  }

  const topParagraphs = article.content ? article.content.slice(0, 3) : [];
  const remainingParagraphs = article.content ? article.content.slice(3) : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="வழிசெலுத்தல்" className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
        <button
          onClick={onNavigateHome}
          className="hover:text-red-900 flex items-center gap-1 font-medium transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>முகப்பு</span>
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <button
          onClick={() => onNavigateCategory(article.categoryId)}
          className="hover:text-red-900 font-medium transition-colors"
        >
          {article.categoryId}
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-stone-700 truncate max-w-xs">{article.title}</span>
      </nav>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Article Reading Canvas (8 cols on desktop) */}
        <main className="lg:col-span-8 bg-white rounded border border-stone-200 p-5 md:p-8 shadow-xs">
          {/* Article Category & Title */}
          <div className="mb-4">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider">
              {article.categoryId}
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-serif text-stone-900 mt-2 leading-snug">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-sm md:text-base text-stone-600 mt-3 font-medium leading-relaxed">
                {article.subtitle}
              </p>
            )}
          </div>

          {/* Article Byline & Social Actions */}
          <div className="py-3 border-y border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-stone-900">{article.author}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span className="tabular-nums font-mono">{article.views.toLocaleString()} வாசிப்புகள்</span>
              </span>
            </div>

            {/* Social Share & Save Tools */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-1.5 hover:bg-stone-100 rounded text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1"
                title="இணைப்பை நகலெடு"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span className="text-[11px]">{copied ? 'நகலெடுக்கப்பட்டது' : 'பகிர்'}</span>
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-1.5 hover:bg-stone-100 rounded transition-colors ${
                  bookmarked ? 'text-amber-600' : 'text-stone-600'
                }`}
                title="புக்மார்க்"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 6.1 ARTICLE TOP AD */}
          {/* Position: Below the article headline and metadata, before the article content */}
          <div className="my-5">
            <AdSlot slotId="ARTICLE_TOP_AD" />
          </div>

          {/* Featured Article Image & Caption */}
          <figure className="mb-6">
            <div className="aspect-16/9 w-full rounded overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {article.caption && (
              <figcaption className="text-xs text-stone-500 mt-2 italic text-center font-serif">
                {article.caption}
              </figcaption>
            )}
          </figure>

          {/* Article Narrative Body - First Paragraphs with Ad in the Middle */}
          {hasHtmlContent ? (
            <div
              className="prose prose-stone max-w-none text-stone-800 text-base md:text-lg leading-relaxed font-sans space-y-4 [&>p]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:font-serif [&>h2]:text-stone-900 [&>h3]:text-lg [&>h3]:font-bold [&>blockquote]:border-l-4 [&>blockquote]:border-red-800 [&>blockquote]:pl-4 [&>blockquote]:italic [&>img]:rounded [&>img]:aspect-video [&>img]:object-cover"
              dangerouslySetInnerHTML={{ __html: topHtml }}
            />
          ) : (
            <div className="space-y-4 text-stone-800 text-base md:text-lg leading-relaxed font-sans max-w-none">
              {topParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-red-900 first-letter:leading-none'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* 6.2 & 6.3 ARTICLE MIDDLE AD (In-Content Advertisement) */}
          {/* Position: After the third or fourth article paragraph / around the middle */}
          <div className="my-6 py-3 border-y border-stone-200 bg-stone-50/70 rounded flex justify-center">
            <AdSlot slotId="ARTICLE_MIDDLE_AD" />
          </div>

          {/* Remaining Paragraphs & Content */}
          {hasHtmlContent ? (
            bottomHtml && (
              <div
                className="prose prose-stone max-w-none text-stone-800 text-base md:text-lg leading-relaxed font-sans space-y-4 mt-4 [&>p]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:font-serif [&>h2]:text-stone-900 [&>h3]:text-lg [&>h3]:font-bold [&>blockquote]:border-l-4 [&>blockquote]:border-red-800 [&>blockquote]:pl-4 [&>blockquote]:italic [&>img]:rounded [&>img]:aspect-video [&>img]:object-cover"
                dangerouslySetInnerHTML={{ __html: bottomHtml }}
              />
            )
          ) : (
            <div className="space-y-4 text-stone-800 text-base md:text-lg leading-relaxed font-sans max-w-none mt-4">
              {remainingParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">குறிச்சொற்கள் (Tags):</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-stone-600 hover:text-red-900 bg-stone-100 px-2 py-0.5 rounded cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 6.4 ARTICLE BOTTOM AD */}
          {/* Position: After the article content, before related news */}
          <div className="my-8 pt-4 border-t border-stone-200">
            <AdSlot slotId="ARTICLE_BOTTOM_AD" />
          </div>

          {/* Related News Section (தொடர்புடைய செய்திகள்) */}
          <section aria-label="தொடர்புடைய செய்திகள்" className="mt-8 pt-6 border-t-2 border-stone-800">
            <h3 className="text-lg font-bold font-serif text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-700 rounded-full" />
              <span>தொடர்புடைய செய்திகள்</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="group cursor-pointer p-3 border border-stone-200 rounded hover:border-red-800 hover:shadow-xs transition-all flex items-start gap-3 bg-white"
                >
                  {/* Dedicated 16:9 aspect-video thumbnail container */}
                  <div className="w-28 sm:w-32 aspect-video shrink-0 rounded overflow-hidden bg-stone-100 relative self-start">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                      loading="lazy"
                    />
                    <div className="hidden absolute inset-0 bg-stone-900 text-amber-300 items-center justify-center p-2 text-center">
                      <Newspaper className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-red-800 font-semibold">{rel.categoryId}</span>
                    <h4 className="text-xs font-bold font-serif text-stone-900 group-hover:text-red-900 line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-stone-400 mt-1 block font-mono">{rel.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* 6.5 ARTICLE RIGHT SIDEBAR ON DESKTOP */}
        <div className="lg:col-span-4">
          <NewsSidebar articles={allArticles} onSelectArticle={onSelectArticle} isArticlePage={true} />
        </div>
      </div>
    </div>
  );
};
