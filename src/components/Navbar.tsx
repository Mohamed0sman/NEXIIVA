import React, { useState } from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Play, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language, setLanguage } = useSimulationJourney();
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
    <nav className="sticky top-0 z-50 h-20 bg-white/90 backdrop-blur-md border-b border-[#ececec]/80 px-6 lg:px-12 flex items-center justify-between">
      {/* Brand Wordmark & Subtle Subtitle */}
      <div className="flex items-center space-x-4">
        <a href="#" className="flex items-center space-x-3 group">
          <NexiivaLogo height={24} />
          <div className="hidden sm:flex flex-col border-l border-[#ececec] pl-3 text-left">
            <span className="text-[10px] font-sans tracking-widest text-[#777b86] uppercase font-medium">
              {isRTL ? 'محاكي مصافي النفط والغاز' : 'OPERATOR TRAINING SIMULATOR'}
            </span>
            <span className="text-[9px] font-mono text-[#979799]">
              LEVEL 3 AIR-GAPPED OT
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links: Steep Editorial Quiet Style */}
      <div className="hidden lg:flex items-center space-x-8 text-[15px] font-sans font-normal text-[#17191c]">
        <button
          onClick={() => scrollTo('simulator-stage')}
          className="text-[#17191c] hover:text-[#5d2a1a] transition-colors cursor-pointer"
        >
          {t.simulator}
        </button>

        <button
          onClick={() => scrollTo('economics')}
          className="text-[#17191c] hover:text-[#5d2a1a] transition-colors cursor-pointer"
        >
          {t.economics}
        </button>

        <button
          onClick={() => scrollTo('pid-scanner')}
          className="text-[#17191c] hover:text-[#5d2a1a] transition-colors cursor-pointer"
        >
          {t.engineering}
        </button>

        <button
          onClick={() => scrollTo('journey')}
          className="text-[#17191c] hover:text-[#5d2a1a] transition-colors cursor-pointer"
        >
          {isRTL ? 'دورة التدريب' : 'Lifecycle'}
        </button>

        <button
          onClick={() => scrollTo('deployment')}
          className="text-[#17191c] hover:text-[#5d2a1a] transition-colors cursor-pointer"
        >
          {t.architecture}
        </button>

        <button
          onClick={() => scrollTo('pricing')}
          className="text-[#17191c] hover:text-[#5d2a1a] transition-colors cursor-pointer"
        >
          {t.leadership}
        </button>
      </div>

      {/* Right Actions: Text Link + Filled Pill Button */}
      <div className="flex items-center space-x-4">
        {/* Language Switcher Pill */}
        <div className="flex items-center bg-[#f2f2f3] rounded-full p-0.5 text-xs font-sans">
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('EN');
            }}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-[#17191c] text-white font-medium shadow-sm'
                : 'text-[#777b86] hover:text-[#17191c]'
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
                ? 'bg-[#17191c] text-white font-medium shadow-sm'
                : 'text-[#777b86] hover:text-[#17191c]'
            }`}
          >
            عربي
          </button>
        </div>

        {/* Video Walkthrough: Text Link with Arrow */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setVideoModalOpen(true);
          }}
          className="hidden sm:inline-flex items-center text-[#17191c] text-[15px] hover:underline cursor-pointer"
        >
          <span>{isRTL ? 'فيديو الشرح' : 'Walkthrough'}</span>
          <span className="ml-1">→</span>
        </button>

        {/* Primary CTA: Filled Ink Black Pill Button */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setPilotDrawerOpen(true);
          }}
          className="btn-pill-filled cursor-pointer"
        >
          <span>{t.requestPilot}</span>
        </button>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full hover:bg-[#f2f2f3] text-[#17191c]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-[#ececec] p-6 flex flex-col space-y-4 lg:hidden shadow-lg z-50 text-left font-sans">
          <button
            onClick={() => scrollTo('simulator-stage')}
            className="text-left text-base text-[#17191c] hover:text-[#5d2a1a] py-1"
          >
            {t.simulator}
          </button>
          <button
            onClick={() => scrollTo('economics')}
            className="text-left text-base text-[#17191c] hover:text-[#5d2a1a] py-1"
          >
            {t.economics}
          </button>
          <button
            onClick={() => scrollTo('pid-scanner')}
            className="text-left text-base text-[#17191c] hover:text-[#5d2a1a] py-1"
          >
            {t.engineering}
          </button>
          <button
            onClick={() => scrollTo('journey')}
            className="text-left text-base text-[#17191c] hover:text-[#5d2a1a] py-1"
          >
            {isRTL ? 'دورة التدريب والشهادات' : 'Training Lifecycle'}
          </button>
          <button
            onClick={() => scrollTo('deployment')}
            className="text-left text-base text-[#17191c] hover:text-[#5d2a1a] py-1"
          >
            {t.architecture}
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="text-left text-base text-[#17191c] hover:text-[#5d2a1a] py-1"
          >
            {t.leadership}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setVideoModalOpen(true);
            }}
            className="flex items-center space-x-2 text-left text-base text-[#5d2a1a] py-1"
          >
            <Play className="w-4 h-4" />
            <span>{isRTL ? 'مشاهدة فيديو الشرح الكامل (15 دقيقة)' : 'Watch 15-Min Walkthrough'}</span>
          </button>
        </div>
      )}
    </nav>
  );
};
