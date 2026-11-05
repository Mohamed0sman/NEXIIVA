import React, { useState } from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Play, Menu, X, ArrowRight } from 'lucide-react';

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
    <nav className="sticky top-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-[#ececec]/80 px-6 lg:px-12 flex items-center justify-between">
      {/* Brand Wordmark & Subtle Subtitle */}
      <div className="flex items-center space-x-4 space-x-reverse">
        <a href="#" className="flex items-center space-x-3 space-x-reverse group">
          <NexiivaLogo height={24} />
          <div className={`hidden sm:flex flex-col ${isRTL ? 'border-r pr-3 text-right' : 'border-l pl-3 text-left'} border-[#ececec]`}>
            <span className="text-[11px] font-sans tracking-wide text-slate-500 font-medium">
              {t.brandTag}
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links: Company & Product Focused */}
      <div className="hidden lg:flex items-center gap-7 text-[14px] font-sans font-medium text-slate-700">
        <button
          onClick={() => scrollTo('about')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.about}
        </button>

        <button
          onClick={() => scrollTo('capabilities')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.capabilities}
        </button>

        <button
          onClick={() => scrollTo('ots-builder')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.otsBuilder}
        </button>

        <button
          onClick={() => scrollTo('operational-reality')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.whyNexiiva}
        </button>

        <button
          onClick={() => scrollTo('deployment')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.deployment}
        </button>

        <button
          onClick={() => scrollTo('subscribe')}
          className="text-[#4F46E5] font-semibold hover:text-[#7C3AED] transition-colors cursor-pointer flex items-center space-x-1"
        >
          <span>{t.howToSubscribe}</span>
          <span className="text-xs">↓</span>
        </button>
      </div>

      {/* Right Actions: Language + Primary CTA Button */}
      <div className="flex items-center gap-3">
        {/* Language Switcher Pill */}
        <div className="flex items-center bg-[#F1F5F9] rounded-full p-0.5 text-xs font-sans border border-slate-200">
          <button
            onClick={() => setLanguage('EN')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-[#0B1120]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('AR')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-sans ${
              language === 'AR'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-[#0B1120]'
            }`}
          >
            عربي
          </button>
        </div>

        {/* Primary CTA Button: Subscribe & Start */}
        <button
          onClick={() => setPilotDrawerOpen(true)}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-medium text-xs shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer"
        >
          <span>{t.startPilot}</span>
        </button>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-[#0B1120]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col space-y-4 lg:hidden shadow-lg z-50 text-left font-sans">
          <button
            onClick={() => scrollTo('about')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.about}
          </button>
          <button
            onClick={() => scrollTo('capabilities')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.capabilities}
          </button>
          <button
            onClick={() => scrollTo('ots-builder')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.otsBuilder}
          </button>
          <button
            onClick={() => scrollTo('operational-reality')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.whyNexiiva}
          </button>
          <button
            onClick={() => scrollTo('deployment')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.deployment}
          </button>
          <button
            onClick={() => scrollTo('subscribe')}
            className="text-left text-base text-[#4F46E5] font-semibold py-1"
          >
            {t.howToSubscribe}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setVideoModalOpen(true);
            }}
            className="flex items-center space-x-2 text-left text-base text-[#4F46E5] py-1"
          >
            <Play className="w-4 h-4" />
            <span>{t.walkthrough}</span>
          </button>
        </div>
      )}
    </nav>
  );
};
