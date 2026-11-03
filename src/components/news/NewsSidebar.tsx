import React, { useState } from 'react';
import { NewsArticle } from '../../types/news';
import { AdSlot } from '../ads/AdSlot';
import { TrendingUp, Vote, CheckCircle2 } from 'lucide-react';

interface NewsSidebarProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  isArticlePage?: boolean;
}

export const NewsSidebar: React.FC<NewsSidebarProps> = ({
  articles,
  onSelectArticle,
  isArticlePage = false
}) => {
  // Sort articles by views to display Most Read News (அதிகம் வாசிக்கப்பட்டவை)
  const mostRead = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  // Simple Tamil Opinion Poll state
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollVoted, setPollVoted] = useState(false);
  const [pollVotes, setPollVotes] = useState([64, 28, 8]);

  const handleVote = (idx: number) => {
    if (pollVoted) return;
    setSelectedPollOption(idx);
    const updated = [...pollVotes];
    updated[idx] += 1;
    setPollVotes(updated);
    setPollVoted(true);
  };

  return (
    <aside className="w-full space-y-6">
      {/* 1. Most Read News Section (அதிகம் வாசிக்கப்பட்டவை) */}
      <div className="bg-white rounded border border-stone-200 p-4 shadow-xs">
        <div className="flex items-center gap-2 pb-2.5 mb-3 border-b-2 border-red-800">
          <TrendingUp className="w-4 h-4 text-red-800" />
          <h3 className="text-base font-bold text-stone-900 font-serif">
            அதிகம் வாசிக்கப்பட்டவை
          </h3>
        </div>

        <div className="space-y-3">
          {mostRead.map((article, index) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer flex gap-3 items-start pb-3 border-b border-stone-100 last:border-b-0 last:pb-0"
            >
              <span className="text-lg font-bold font-serif text-stone-300 group-hover:text-red-800 transition-colors shrink-0 tabular-nums w-5 text-center">
                0{index + 1}
              </span>
              <div className="min-w-0">
                <span className="text-[10px] text-red-800 font-semibold uppercase">
                  {article.categoryId}
                </span>
                <h4 className="text-xs font-bold font-serif text-stone-900 group-hover:text-red-900 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <div className="text-[10px] text-stone-400 mt-1 flex items-center gap-2">
                  <span>{article.readTime}</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">{article.views.toLocaleString()} வாசிப்புகள்</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. RIGHT SIDEBAR AD 1 (HOME_SIDEBAR_1 or ARTICLE_SIDEBAR_AD) */}
      {/* Position: Below the Most Read News section */}
      <div className="w-full flex justify-center">
        {isArticlePage ? (
          <AdSlot slotId="ARTICLE_SIDEBAR_AD" />
        ) : (
          <AdSlot slotId="HOME_SIDEBAR_1" />
        )}
      </div>

      {/* 3. Interactive Tamil Opinion Poll (மக்கள் கருத்துக்கணிப்பு) */}
      <div className="bg-white rounded border border-stone-200 p-4 shadow-xs">
        <div className="flex items-center gap-2 pb-2.5 mb-3 border-b-2 border-stone-800">
          <Vote className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold text-stone-900 font-serif">
            இன்றைய மக்கள் கருத்துக் கணிப்பு
          </h3>
        </div>

        <p className="text-xs text-stone-700 font-medium mb-3 leading-relaxed">
          சென்னை மெட்ரோ 2-ம் கட்ட விரிவாக்கம் நகரின் போக்குவரத்து நெரிசலை முழுமையாக குறைக்குமா?
        </p>

        <div className="space-y-2">
          {['ஆம், நிச்சயமாக குறையும்', 'ஓரளவு குறையும்', 'கருத்து இல்லை'].map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleVote(idx)}
              className={`w-full text-left p-2 rounded text-xs transition-all border ${
                selectedPollOption === idx
                  ? 'bg-red-50 border-red-500 font-semibold text-red-950'
                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {pollVoted && (
                  <span className="font-mono font-bold text-[11px] text-stone-600">
                    {pollVotes[idx]}%
                  </span>
                )}
              </div>
              {pollVoted && (
                <div className="w-full bg-stone-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className="bg-red-700 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${pollVotes[idx]}%` }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>

        {pollVoted && (
          <div className="mt-2.5 text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>உங்கள் வாக்கு பதிவு செய்யப்பட்டது. நன்றி!</span>
          </div>
        )}
      </div>

      {/* 4. RIGHT SIDEBAR AD 2 (Between sidebar content sections) */}
      {!isArticlePage && (
        <div className="w-full flex justify-center">
          <AdSlot slotId="HOME_SIDEBAR_2" />
        </div>
      )}
    </aside>
  );
};
