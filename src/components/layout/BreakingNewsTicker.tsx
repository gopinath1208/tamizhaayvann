import React from 'react';
import { BREAKING_NEWS_HEADLINES } from '../../data/mockNews';
import { Flame } from 'lucide-react';

interface BreakingNewsTickerProps {
  headlines?: string[];
  onSelectHeadline?: (index: number) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  headlines = BREAKING_NEWS_HEADLINES,
  onSelectHeadline
}) => {
  const displayHeadlines = headlines.length > 0 ? headlines : BREAKING_NEWS_HEADLINES;

  return (
    <div className="w-full bg-stone-900 border-y border-stone-800 text-white overflow-hidden py-1.5 flex items-center my-2 shadow-xs">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center gap-3">
        {/* Flashing Breaking News Badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-sm select-none">
          <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-bounce" />
          <span>முக்கிய செய்திகள்</span>
        </div>

        {/* Continuous Marquee Ticker */}
        <div className="overflow-hidden relative w-full mask-linear-fade">
          <div className="animate-ticker flex items-center gap-8 text-xs font-medium text-stone-200">
            {displayHeadlines.map((headline, idx) => (
              <span
                key={idx}
                onClick={() => onSelectHeadline && onSelectHeadline(idx)}
                className="cursor-pointer hover:text-amber-300 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{headline}</span>
              </span>
            ))}
            {/* Duplicated for seamless infinite ticker loop */}
            {displayHeadlines.map((headline, idx) => (
              <span
                key={`dup-${idx}`}
                onClick={() => onSelectHeadline && onSelectHeadline(idx)}
                className="cursor-pointer hover:text-amber-300 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{headline}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
