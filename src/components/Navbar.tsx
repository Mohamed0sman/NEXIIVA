import React, { useState } from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Play, Menu, X, ArrowRight } from 'lucide-react';

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

      {/* Navigation Links: Modern Engineering Spec Style */}
      <div className="hidden lg:flex items-center space-x-8 text-[15px] font-sans font-medium text-slate-700">
        <button
          onClick={() => {
            dcsAudio.playClick();
            setSimulatorModalOpen(true);
          }}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <span>{t.simulator}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-[#4F46E5] font-mono font-bold">
            LIVE
          </span>
        </button>

        <button
          onClick={() => scrollTo('economics')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.economics}
        </button>

        <button
          onClick={() => scrollTo('pid-scanner')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.engineering}
        </button>

        <button
          onClick={() => scrollTo('journey')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {isRTL ? 'دورة التدريب' : 'Lifecycle'}
        </button>

        <button
          onClick={() => scrollTo('deployment')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.architecture}
        </button>

        <button
          onClick={() => scrollTo('pricing')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.leadership}
        </button>
      </div>

      {/* Right Actions: Language + Video Link + Royal Indigo Gradient CTA */}
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

        {/* Video Walkthrough: Text Link with Arrow */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setVideoModalOpen(true);
          }}
          className="hidden sm:inline-flex items-center text-[#4F46E5] hover:text-[#2563EB] text-[15px] font-medium transition-colors cursor-pointer"
        >
          <span>{isRTL ? 'فيديو الشرح' : 'Walkthrough'}</span>
          <span className="ml-1">→</span>
        </button>

        {/* Primary CTA: Royal Indigo/Blue Gradient Pill Button */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setPilotDrawerOpen(true);
          }}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-medium text-xs shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer"
        >
          <span>{t.requestPilot}</span>
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
            onClick={() => {
              setMobileMenuOpen(false);
              dcsAudio.playClick();
              setSimulatorModalOpen(true);
            }}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1 flex items-center justify-between"
          >
            <span>{t.simulator}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-[#4F46E5] font-mono font-bold">
              LIVE
            </span>
          </button>
          <button
            onClick={() => scrollTo('economics')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.economics}
          </button>
          <button
            onClick={() => scrollTo('pid-scanner')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.engineering}
          </button>
          <button
            onClick={() => scrollTo('journey')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {isRTL ? 'دورة التدريب والشهادات' : 'Training Lifecycle'}
          </button>
          <button
            onClick={() => scrollTo('deployment')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.architecture}
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="text-left text-base text-[#0B1120] hover:text-[#4F46E5] py-1"
          >
            {t.leadership}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setVideoModalOpen(true);
            }}
            className="flex items-center space-x-2 text-left text-base text-[#4F46E5] py-1"
          >
            <Play className="w-4 h-4" />
            <span>{isRTL ? 'مشاهدة فيديو الشرح الكامل (15 دقيقة)' : 'Watch 15-Min Walkthrough'}</span>
          </button>
        </div>
      )}
    </nav>
  );
};
