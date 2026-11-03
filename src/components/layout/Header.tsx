import React, { useState } from 'react';
import { NEWS_CATEGORIES } from '../../types/news';
import { useAds } from '../../context/AdContext';
import { useNews } from '../../context/NewsContext';
import {
  Calendar,
  CloudSun,
  Tv,
  BookOpen,
  Sliders,
  Search,
  Menu,
  X,
  Eye,
  EyeOff,
  Sparkles,
  Phone,
  Mail,
  RefreshCw
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigateHome: () => void;
  onNavigateCategory: (slug: string) => void;
  onNavigateAdmin: () => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onNavigateCategory,
  onNavigateAdmin,
  onSearch
}) => {
  const { activeCount, highlightSlots, setHighlightSlots } = useAds();
  const { wpPostsCount, isRefreshing, refreshNews } = useNews();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchOpen(false);
    }
  };

  return (
    <header className="w-full bg-white border-b border-stone-200">
      {/* 1. Topmost Utility Ribbon */}
      <div className="bg-stone-900 text-stone-300 text-[11px] px-4 py-1.5 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Date & Weather */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>திங்கட்கிழமை, 2 நவம்பர் 2026</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-stone-400">
              <CloudSun className="w-3.5 h-3.5 text-amber-300" />
              <span>சென்னை 29°C · மேகமூட்டம்</span>
            </div>
          </div>

          {/* Right: Quick actions & Ad Management quick link */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHighlightSlots(!highlightSlots)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors ${
                highlightSlots
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="விளம்பர இடங்களை சிறப்பித்துக் காட்டு"
            >
              {highlightSlots ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{highlightSlots ? 'இடங்கள் தெரிகிறது' : 'விளம்பர இடங்கள்'}</span>
            </button>

            <button
              onClick={onNavigateAdmin}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded font-medium transition-colors ${
                currentView === 'admin'
                  ? 'bg-red-700 text-white'
                  : 'bg-stone-800 hover:bg-stone-700 text-amber-300'
              }`}
            >
              <Sliders className="w-3 h-3" />
              <span>விளம்பர மேலாண்மை</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1 rounded font-mono">
                {activeCount}
              </span>
            </button>

            {/* WordPress CMS live sync trigger */}
            <button
              onClick={() => refreshNews()}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              title="WordPress புதிய செய்திகளை உடனடியாகப் புதுப்பிக்க (Sync WordPress)"
            >
              <RefreshCw className={`w-3 h-3 text-sky-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">WP நேரலை</span>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1 rounded font-mono">
                {wpPostsCount > 0 ? `${wpPostsCount} செய்திகள்` : 'இணைக்கப்பட்டது'}
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-3 text-stone-400 border-l border-stone-700 pl-3">
              <a
                href="tel:+919025180407"
                className="flex items-center gap-1 hover:text-amber-300 transition-colors font-mono"
                title="அழைக்க"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>+91 9025180407</span>
              </a>
              <a
                href="mailto:dbirddigital@gmail.com"
                className="flex items-center gap-1 hover:text-amber-300 transition-colors"
                title="மின்னஞ்சல்"
              >
                <Mail className="w-3 h-3 text-amber-400" />
                <span>dbirddigital@gmail.com</span>
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3 text-stone-400 border-l border-stone-700 pl-3">
              <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                <Tv className="w-3 h-3 text-red-500" />
                <span>நேரலை டிவி</span>
              </span>
              <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                <BookOpen className="w-3 h-3 text-amber-400" />
                <span>இ-பேப்பர்</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Newspaper Masthead Branding */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-4">
        {/* Brand identity: Gold lion emblem + bilingual typography */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
        >
          <img
            src="/assets/aistudio/TamizhAayvan_News_Gold_Emblem_bacc91a3.png"
            alt="TamizhAayvan News Official Gold Lion Emblem"
            className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-red-900 font-serif leading-none">
                தமிழ் ஆய்வன் செய்திகள்
              </h1>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs md:text-sm font-bold tracking-widest text-amber-700 uppercase font-sans">
                TamizhAayvan News
              </span>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <span className="text-[11px] md:text-xs text-stone-500 font-medium hidden sm:inline">
                உண்மை · நடுநிலை · வேகம்
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
              <input
                type="text"
                placeholder="செய்திகளைத் தேடுக..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="text-xs px-3 py-1.5 border border-red-800 rounded focus:outline-none focus:ring-1 focus:ring-red-800 w-40 sm:w-60"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-stone-600 hover:text-red-900 rounded hover:bg-stone-100 transition-colors"
              title="தேடல்"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-red-900 rounded"
            aria-label="பட்டி மெனு"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Primary Horizontal Navigation Bar */}
      <nav className="bg-red-900 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1 md:gap-2 text-sm font-semibold whitespace-nowrap shrink-0">
            <button
              onClick={onNavigateHome}
              className={`px-3 py-2 rounded transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'home'
                  ? 'bg-red-950 text-amber-300 shadow-inner'
                  : 'hover:bg-red-800 text-white'
              }`}
            >
              முகப்பு
            </button>

            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigateCategory(cat.slug)}
                className={`px-3 py-2 rounded transition-colors whitespace-nowrap shrink-0 ${
                  currentView === `category-${cat.slug}`
                    ? 'bg-red-950 text-amber-300 shadow-inner'
                    : 'hover:bg-red-800 text-stone-100'
                }`}
              >
                {cat.nameTa}
              </button>
            ))}
          </div>

          {/* Admin shortcut in nav */}
          <div className="shrink-0 pl-2 border-l border-red-800 hidden lg:block">
            <button
              onClick={onNavigateAdmin}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                currentView === 'admin'
                  ? 'bg-amber-400 text-stone-900'
                  : 'bg-red-950 text-amber-300 hover:bg-amber-400 hover:text-stone-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>விளம்பர மேலாண்மை</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900 text-white px-4 py-4 border-t border-stone-800 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium hover:bg-stone-800 rounded"
            >
              முகப்பு (Home)
            </button>
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onNavigateCategory(cat.slug);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-sm text-stone-200 hover:bg-stone-800 rounded flex items-center justify-between"
              >
                <span>{cat.nameTa}</span>
                <span className="text-xs text-stone-400 font-mono">{cat.nameEn}</span>
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-stone-800">
              <button
                onClick={() => {
                  onNavigateAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-bold bg-amber-400 text-stone-950 rounded flex items-center gap-2"
              >
                <Sliders className="w-4 h-4" />
                <span>விளம்பர மேலாண்மை (Ad Management)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
