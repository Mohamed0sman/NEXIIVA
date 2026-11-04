import React, { useState } from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language, setLanguage } = useSimulationJourney();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language].nav;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    dcsAudio.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 h-20 bg-[#04060E]/80 backdrop-blur-xl border-b border-purple-500/10 px-6 lg:px-12 flex items-center justify-between">
      {/* Brand Wordmark */}
      <div className="flex items-center space-x-5">
        <a href="#" className="flex items-center space-x-3.5 group">
          <NexiivaLogo height={26} />
          <span className="hidden md:inline-block text-[11px] font-mono tracking-wider text-slate-400 uppercase border-l border-slate-700/60 pl-3.5">
            Operator Training Simulator
          </span>
        </a>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs xl:text-sm font-medium text-slate-300">
        <button
          onClick={() => scrollTo('simulator-stage')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {t.simulator}
        </button>
        <button
          onClick={() => scrollTo('pid-scanner')}
          className="hover:text-purple-300 transition-colors cursor-pointer font-mono text-purple-300/90"
        >
          ⚡ {t.pidEngine}
        </button>
        <button
          onClick={() => scrollTo('equipment-codex')}
          className="hover:text-cyan-300 transition-colors cursor-pointer font-mono"
        >
          {t.codex}
        </button>
        <button
          onClick={() => scrollTo('metrics')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {t.performance}
        </button>
        <button
          onClick={() => scrollTo('journey')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {t.journey}
        </button>
        <button
          onClick={() => scrollTo('comparison')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {t.comparison}
        </button>
        <button
          onClick={() => scrollTo('pricing')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          {t.pricing}
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        {/* Language Pill */}
        <div className="flex items-center bg-[#0B0F22] border border-purple-500/20 rounded-full p-0.5 text-xs font-mono">
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('EN');
            }}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-purple-600/30 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('AR');
            }}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              language === 'AR'
                ? 'bg-purple-600/30 text-white font-semibold font-sans'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            العربية
          </button>
        </div>

        {/* Demo Video CTA */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setVideoModalOpen(true);
          }}
          className="hidden md:inline-flex items-center space-x-2 text-xs font-medium px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          <span className="text-purple-400">▶</span>
          <span>{t.walkthrough}</span>
        </button>

        {/* Primary Pilot CTA */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setPilotDrawerOpen(true);
          }}
          className="inline-flex items-center space-x-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-brand-gradient text-white shadow-brand-glow hover:opacity-95 transition-all cursor-pointer"
        >
          <span>{t.requestPilot}</span>
          <span>→</span>
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-[#04060E] border-b border-purple-500/20 p-6 flex flex-col space-y-4 lg:hidden">
          <button
            onClick={() => scrollTo('simulator-stage')}
            className="text-left text-sm text-slate-200 py-1"
          >
            {t.simulator}
          </button>
          <button
            onClick={() => scrollTo('metrics')}
            className="text-left text-sm text-slate-200 py-1"
          >
            {t.performance}
          </button>
          <button
            onClick={() => scrollTo('journey')}
            className="text-left text-sm text-slate-200 py-1"
          >
            {t.journey}
          </button>
          <button
            onClick={() => scrollTo('deployment')}
            className="text-left text-sm text-slate-200 py-1"
          >
            {t.deployment}
          </button>
          <button
            onClick={() => scrollTo('comparison')}
            className="text-left text-sm text-slate-200 py-1"
          >
            {t.comparison}
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="text-left text-sm text-slate-200 py-1"
          >
            {t.pricing}
          </button>
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setVideoModalOpen(true);
              }}
              className="w-full text-left text-xs text-purple-400 py-2 flex items-center space-x-2"
            >
              <span>▶ {t.walkthrough}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
