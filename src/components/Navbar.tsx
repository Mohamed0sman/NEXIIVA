import React, { useState } from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Play, Menu, X, ArrowRight, MessageSquare, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language, setLanguage } = useSimulationJourney();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language].nav;
  const isRTL = language === 'AR';

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 h-20 bg-[#04060E]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-colors">
      {/* Brand Wordmark & Subtle OT Tag */}
      <div className="flex items-center space-x-3.5 space-x-reverse">
        <a href="#" className="flex items-center space-x-3 space-x-reverse group">
          <NexiivaLogo height={28} />
          <div className={`hidden sm:flex flex-col ${isRTL ? 'border-r pr-3 text-right' : 'border-l pl-3 text-left'} border-white/15`}>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 font-medium uppercase">
              {isRTL ? 'محاكاة تشغيل المصافي المتقدمة' : 'REFINERY OPERATOR SIMULATION'}
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links: Obsidian Styled */}
      <div className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-slate-300">
        <button
          onClick={() => scrollTo('hero')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {isRTL ? 'المحاكي المباشر' : 'Live DCS Console'}
        </button>

        <button
          onClick={() => scrollTo('industry-dilemma')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {isRTL ? 'معضلة الـ $110K والعائد' : 'The $110K Dilemma'}
        </button>

        <button
          onClick={() => scrollTo('ots-builder')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {isRTL ? 'استوديو بناء الوحدات' : 'OTS Builder'}
        </button>

        <button
          onClick={() => scrollTo('deployment')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {isRTL ? 'النشر المعزول والأمان' : 'Air-Gapped Deployment'}
        </button>

        <button
          onClick={() => scrollTo('pricing-leadership')}
          className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors cursor-pointer flex items-center space-x-1 space-x-reverse"
        >
          <span>{isRTL ? 'مسارات الاشتراك والقيادة' : 'Commercial Tracks'}</span>
          <span className="text-xs">↓</span>
        </button>
      </div>

      {/* Right Actions: Language + Primary CTA Button + Mobile Menu Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Switcher Pill */}
        <div className="flex items-center bg-[#0B1124] rounded-xl p-0.5 text-xs font-mono border border-white/10">
          <button
            onClick={() => setLanguage('EN')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('AR')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-sans ${
              language === 'AR'
                ? 'bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="التغيير إلى العربية"
          >
            عربي
          </button>
        </div>

        {/* Primary CTA Button: Start 90-Day Pilot */}
        <button
          onClick={() => setPilotDrawerOpen(true)}
          className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8E42FE] via-[#7B3CFC] to-[#3361FC] hover:shadow-[0_0_25px_rgba(123,60,252,0.6)] text-white font-semibold text-xs transition-all cursor-pointer shadow-md"
        >
          <span>{isRTL ? 'بدء تجربة الـ 90 يوم' : 'Start 90-Day Pilot'}</span>
        </button>

        {/* Mobile Menu Trigger (44x44px touch target) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-white border border-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
        </button>
      </div>

      {/* Elite Mobile Overlay & Sliding Sheet in Obsidian */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 lg:hidden">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative bg-[#070B1A]/95 border-b border-white/10 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto px-6 py-6 flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-200"
          >
            {/* Navigation Links */}
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => scrollTo('hero')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-200 transition-colors`}
              >
                <span>{isRTL ? 'المحاكي المباشر' : 'Live DCS Console'}</span>
                <span className="text-slate-500 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('industry-dilemma')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-200 transition-colors`}
              >
                <span>{isRTL ? 'معضلة الـ $110K والعائد' : 'The $110K Dilemma'}</span>
                <span className="text-slate-500 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('ots-builder')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-200 transition-colors`}
              >
                <span>{isRTL ? 'استوديو بناء الوحدات' : 'OTS Builder'}</span>
                <span className="text-slate-500 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('deployment')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-200 transition-colors`}
              >
                <span>{isRTL ? 'النشر المعزول والأمان' : 'Air-Gapped Deployment'}</span>
                <span className="text-slate-500 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('pricing-leadership')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-white/5 active:bg-white/10 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-cyan-300 transition-colors`}
              >
                <span>{isRTL ? 'مسارات الاشتراك والقيادة' : 'Commercial Tracks & Leadership'}</span>
                <span className="text-slate-500 text-xs">{isRTL ? '←' : '→'}</span>
              </button>
            </div>

            {/* Direct Contact Actions in Mobile Menu */}
            <div className="pt-3 border-t border-white/10 flex flex-col space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPilotDrawerOpen(true);
                }}
                className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#8E42FE] via-[#7B3CFC] to-[#3361FC] text-white font-semibold text-sm flex items-center justify-center space-x-2 space-x-reverse shadow-lg cursor-pointer"
              >
                <span>{isRTL ? 'بدء تجربة الـ 90 يوم ($800)' : 'Start 90-Day Pilot ($800)'}</span>
                <span>{isRTL ? '←' : '→'}</span>
              </button>

              <a
                href="https://wa.me/201004131154?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%B8%D9%88%D9%85%D8%A9%20NEXIIVA%20OTS%20%D9%84%D9%85%D8%AD%D8%A7%D9%83%D8%A7%D8%A9%20%D9%85%D8%B5%D8%A7%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%83%D8%B1%D9%8A%D8%B1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-sm flex items-center justify-center space-x-2 space-x-reverse cursor-pointer transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{isRTL ? 'تواصل واتساب: 01004131154' : 'WhatsApp Direct: +201004131154'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
