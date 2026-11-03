import React, { useState } from 'react';
import { NewsArticle } from '../../types/news';
import { Newspaper, Clock, Eye } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'lead' | 'standard' | 'horizontal' | 'compact';
  onSelect: (article: NewsArticle) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, variant = 'standard', onSelect }) => {
  const [imageFailed, setImageFailed] = useState(false);

  // Fallback visual if image fails to load - strictly 16:9 (aspect-video)
  const renderImageFallback = () => (
    <div className="w-full aspect-video bg-gradient-to-br from-red-950 via-stone-900 to-stone-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="p-2.5 bg-red-900/40 rounded-full mb-1.5 border border-red-500/20">
        <Newspaper className="w-5 h-5 text-amber-300" />
      </div>
      <span className="text-xs text-stone-300 font-serif font-medium line-clamp-1">
        {article.title}
      </span>
    </div>
  );

  // 1. Lead Headline Card (16:9 ratio)
  if (variant === 'lead') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer bg-white rounded border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col h-full"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
          {!imageFailed && article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />
          ) : (
            renderImageFallback()
          )}
          {article.isBreaking && (
            <div className="absolute top-3 left-3 bg-red-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow">
              முக்கியச் செய்தி
            </div>
          )}
        </div>

        <div className="p-5 md:p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <span className="text-red-800 font-semibold uppercase">{article.categoryId}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{article.author}</span>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif text-stone-900 group-hover:text-red-900 transition-colors leading-snug">
              {article.title}
            </h2>

            <p className="mt-3 text-sm md:text-base text-stone-600 line-clamp-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>இன்று காலை 8:30</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span className="tabular-nums font-mono">{article.views.toLocaleString()} வாசிப்புகள்</span>
            </span>
          </div>
        </div>
      </article>
    );
  }

  // 2. Horizontal Card (Guaranteed 16:9 Image Container)
  if (variant === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer bg-white rounded border border-stone-200 overflow-hidden shadow-xs hover:border-stone-400 transition-all flex flex-col sm:flex-row h-full items-stretch"
      >
        {/* Strictly 16:9 ratio image container */}
        <div className="w-full sm:w-48 md:w-56 aspect-video shrink-0 relative overflow-hidden bg-stone-100">
          {!imageFailed && article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            renderImageFallback()
          )}
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1">
              <span className="text-red-800 font-semibold">{article.categoryId}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold font-serif text-stone-900 group-hover:text-red-900 transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>

            <p className="mt-1.5 text-xs text-stone-600 line-clamp-2">
              {article.summary}
            </p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
            <span className="truncate">{article.author.split(',')[0]}</span>
            <span className="tabular-nums font-mono shrink-0">{article.views.toLocaleString()} வாசிப்புகள்</span>
          </div>
        </div>
      </article>
    );
  }

  // 3. Compact Card (e.g. sidebar or lists with 16:9 thumbnail)
  if (variant === 'compact') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer py-3 border-b border-stone-200 last:border-b-0 flex gap-3 items-center"
      >
        <div className="w-28 aspect-video relative shrink-0 rounded overflow-hidden bg-stone-100">
          {!imageFailed && article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            renderImageFallback()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-red-800 font-medium mb-0.5">{article.categoryId}</div>
          <h4 className="text-xs font-bold font-serif text-stone-900 group-hover:text-red-900 transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h4>
          <div className="text-[10px] text-stone-400 mt-1 flex items-center gap-2">
            <span>{article.readTime}</span>
            <span>·</span>
            <span className="tabular-nums font-mono">{article.views.toLocaleString()} பார்வைகள்</span>
          </div>
        </div>
      </article>
    );
  }

  // 4. Standard Vertical Card (Strictly 16:9 aspect-video on top)
  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer bg-white rounded border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
        {!imageFailed && article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          renderImageFallback()
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
            <span className="text-red-800 font-semibold">{article.categoryId}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-sm md:text-base font-bold font-serif text-stone-900 group-hover:text-red-900 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
          <span className="truncate">{article.author.split(',')[0]}</span>
          <span className="tabular-nums font-mono shrink-0">{article.views.toLocaleString()} வாசிப்புகள்</span>
        </div>
      </div>
    </article>
  );
};
