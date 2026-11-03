import React from 'react';
import { NEWS_CATEGORIES } from '../../types/news';
import { AdSlot } from '../ads/AdSlot';
import { ShieldCheck, Mail, Phone, MapPin, Award } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateCategory: (slug: string) => void;
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateCategory,
  onNavigateAdmin
}) => {
  return (
    <footer className="mt-12 bg-stone-900 text-stone-300 border-t-4 border-red-800">
      {/* 7. FOOTER ADVERTISEMENT - Immediately above the website footer */}
      <div className="bg-stone-950/80 py-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot slotId="FOOTER_BANNER" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info & Gold Emblem */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/TamizhAayvan_News_Gold_Emblem_bacc91a3.png"
                alt="TamizhAayvan News Gold Emblem"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-white font-serif">
                  தமிழ் ஆய்வன் செய்திகள்
                </h3>
                <p className="text-xs text-amber-400 font-sans tracking-wider uppercase font-semibold">
                  TamizhAayvan News
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              உண்மை, நேர்மை மற்றும் நடுநிலையான செய்திகளை உலகெங்கும் வாழும் தமிழ் மக்களுக்கு உடனுக்குடன் வழங்கும் முன்னணி தமிழ் டிஜிட்டல் செய்தி தளம்.
            </p>
            <div className="pt-2 text-[11px] text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>சென்னை, தமிழ்நாடு, இந்தியா</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919025180407" className="text-stone-300 hover:text-amber-300 transition-colors font-mono">
                  +91 9025180407
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:dbirddigital@gmail.com" className="text-stone-300 hover:text-amber-300 transition-colors">
                  dbirddigital@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-1.5 border-b border-stone-800">
              செய்திப் பிரிவுகள்
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={onNavigateHome}
                className="text-left text-stone-400 hover:text-amber-300 transition-colors"
              >
                முகப்பு
              </button>
              {NEWS_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onNavigateCategory(cat.slug)}
                  className="text-left text-stone-400 hover:text-amber-300 transition-colors truncate"
                >
                  {cat.nameTa}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Advertising & Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-1.5 border-b border-stone-800">
              விளம்பரத் தொடர்புகள்
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              TamizhAayvan தளத்தில் உங்கள் பிராண்ட் மற்றும் வணிக விளம்பரங்களை வெளியிட:
            </p>
            <div className="bg-stone-800/80 p-3 rounded border border-stone-700/60 text-xs space-y-1.5">
              <div className="text-amber-300 font-semibold">விளம்பரப் பிரிவு:</div>
              <div className="text-stone-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>மின்னஞ்சல்:</span>
                <a href="mailto:dbirddigital@gmail.com" className="text-amber-300 hover:underline">
                  dbirddigital@gmail.com
                </a>
              </div>
              <div className="text-stone-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>அலைபேசி:</span>
                <a href="tel:+919025180407" className="text-emerald-400 hover:underline font-mono">
                  +91 9025180407
                </a>
              </div>
            </div>
            <div className="mt-3">
              <button
                onClick={onNavigateAdmin}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
              >
                விளம்பர மேலாண்மை போர்டல் (Admin Portal)
              </button>
            </div>
          </div>

          {/* Col 4: Google AdSense & Standards */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-1.5 border-b border-stone-800">
              கொள்கைகள் & நம்பகத்தன்மை
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-stone-400 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                அனைத்து விளம்பரங்களும் Google AdSense கொள்கைகள் மற்றும் இந்திய விளம்பர தர நிர்ணய விதிகளுக்கு உட்பட்டவை.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-stone-400">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                செய்தித் தரத்தில் எவ்வித சமரசமுமின்றி பக்கச்சார்பற்ற பத்திரிகைத் தர்மத்தை உறுதி செய்கிறோம்.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Terms */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 TamizhAayvan News (தமிழ் ஆய்வன் செய்திகள்). அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">தனியுரிமைக் கொள்கை</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">விதிமுறைகள்</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">விளம்பரக் கொள்கை</span>
            <span>·</span>
            <button onClick={onNavigateAdmin} className="hover:text-amber-300 cursor-pointer">
              விளம்பர மேலாண்மை
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
