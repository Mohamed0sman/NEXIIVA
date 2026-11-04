import React, { useState } from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Play, Shield, Menu, X, ArrowRight, ExternalLink } from 'lucide-react';

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
    <nav className="sticky top-0 z-50 h-20 bg-[#04060E]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 lg:px-12 flex items-center justify-between">
      {/* Brand Wordmark & Tagline */}
      <div className="flex items-center space-x-5">
        <a href="#" className="flex items-center space-x-3 group">
          <NexiivaLogo height={28} />
          <div className="hidden sm:flex flex-col border-l border-slate-800 pl-3 text-left">
            <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase font-bold">
              {isRTL ? 'محاكي تدريب مشغلي مصافي النفط' : 'REFINERY OPERATOR SIMULATOR'}
            </span>
            <span className="text-[9px] font-mono text-purple-400">
              AIR-GAPPED // ISA-88/95 COMPLIANT
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links: Editorial & High-Craft */}
      <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-mono font-medium text-slate-300">
        <button
          onClick={() => scrollTo('simulator-stage')}
          className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
        >
          <span className="text-purple-400 font-bold">01.</span>
          <span>{t.simulator}</span>
        </button>

        <button
          onClick={() => scrollTo('economics')}
          className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
        >
          <span className="text-cyan-400 font-bold">02.</span>
          <span>{t.economics}</span>
        </button>

        <button
          onClick={() => scrollTo('pid-scanner')}
          className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
        >
          <span className="text-indigo-400 font-bold">03.</span>
          <span>{t.engineering}</span>
        </button>

        <button
          onClick={() => scrollTo('journey')}
          className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
        >
          <span className="text-purple-400 font-bold">04.</span>
          <span>{isRTL ? 'دورة التدريب والشهادات' : 'Training Lifecycle'}</span>
        </button>

        <button
          onClick={() => scrollTo('deployment')}
          className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
        >
          <span className="text-emerald-400 font-bold">05.</span>
          <span>{t.architecture}</span>
        </button>

        <button
          onClick={() => scrollTo('pricing')}
          className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
        >
          <span className="text-slate-400 font-bold">06.</span>
          <span>{t.leadership}</span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Language Switcher */}
        <div className="flex items-center bg-[#0B0F1C] border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('EN');
            }}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-purple-600 text-white font-bold'
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
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              language === 'AR'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            عربي
          </button>
        </div>

        {/* Video Walkthrough CTA */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setVideoModalOpen(true);
          }}
          className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-800 text-slate-200 text-xs font-mono transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
          <span>{isRTL ? 'فيديو 15 دقيقة' : 'Walkthrough'}</span>
        </button>

        {/* Primary Pilot CTA */}
        <button
          onClick={() => {
            dcsAudio.playClick();
            setPilotDrawerOpen(true);
          }}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer"
        >
          <span>{t.requestPilot}</span>
          <ArrowRight className="w-3.5 h-3.5 hidden md:inline-block" />
        </button>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#070A14] border-b border-slate-800 p-6 flex flex-col space-y-4 lg:hidden shadow-2xl z-50 text-left font-mono">
          <button
            onClick={() => scrollTo('simulator-stage')}
            className="text-left text-sm text-slate-200 hover:text-white py-1"
          >
            01. {t.simulator}
          </button>
          <button
            onClick={() => scrollTo('economics')}
            className="text-left text-sm text-slate-200 hover:text-white py-1"
          >
            02. {t.economics}
          </button>
          <button
            onClick={() => scrollTo('pid-scanner')}
            className="text-left text-sm text-slate-200 hover:text-white py-1"
          >
            03. {t.engineering}
          </button>
          <button
            onClick={() => scrollTo('journey')}
            className="text-left text-sm text-slate-200 hover:text-white py-1"
          >
            04. {isRTL ? 'دورة التدريب والشهادات' : 'Training Lifecycle'}
          </button>
          <button
            onClick={() => scrollTo('deployment')}
            className="text-left text-sm text-slate-200 hover:text-white py-1"
          >
            05. {t.architecture}
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="text-left text-sm text-slate-200 hover:text-white py-1"
          >
            06. {t.leadership}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setVideoModalOpen(true);
            }}
            className="flex items-center space-x-2 text-left text-sm text-purple-400 py-1"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRTL ? 'مشاهدة فيديو الشرح الكامل (15 دقيقة)' : 'Watch 15-Min Walkthrough'}</span>
          </button>
        </div>
      )}
    </nav>
  );
};
