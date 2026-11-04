import React, { useState } from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Play, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, setSimulatorModalOpen, language, setLanguage } = useSimulationJourney();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language].nav;
  const isRTL = language === 'AR';

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    dcsAudio.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-[#ececec]/80 px-6 lg:px-12 flex items-center justify-between">
      {/* Brand Wordmark & Subtle Subtitle */}
      <div className="flex items-center space-x-4">
        <a href="#" className="flex items-center space-x-3 group">
          <NexiivaLogo height={24} />
          <div className="hidden sm:flex flex-col border-l border-[#ececec] pl-3 text-left">
            <span className="text-[11px] font-sans tracking-wide text-slate-500 font-medium">
              {t.brandTag}
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links: Exact Spec */}
      <div className="hidden lg:flex items-center space-x-8 text-[15px] font-sans font-medium text-slate-700">
        <button
          onClick={() => scrollTo('simulator-stage')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span>{t.simulator}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-50 text-indigo-600 font-mono font-semibold">LIVE</span>
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
          onClick={() => scrollTo('pricing')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.pricing}
        </button>
      </div>

      {/* Right Actions: Language + Primary CTA Button */}
      <div className="flex items-center space-x-4">
        {/* Language Switcher Pill */}
        <div className="flex items-center bg-[#F1F5F9] rounded-full p-0.5 text-xs font-sans border border-slate-200">
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('EN');
            }}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-[#0B1120]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('AR');
            }}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-sans ${
              language === 'AR'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-[#0B1120]'
            }`}
          >
            عربي
          </button>
        </div>

        {/* Primary CTA Button: Start a Paid Pilot */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setPilotDrawerOpen(true);
          }}
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
            onClick={() => scrollTo('simulator-stage')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1 flex items-center justify-between"
          >
            <span>{t.simulator}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-[#4F46E5] font-mono font-bold">
              LIVE
            </span>
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
            onClick={() => scrollTo('pricing')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.pricing}
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
