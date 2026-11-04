import React from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { InteractiveRefineryConsole } from './InteractiveRefineryConsole';
import { Play, ArrowRight, ShieldCheck, Zap, HardHat, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].hero;
  const isRTL = language === 'AR';

  const scrollToSimulator = () => {
    dcsAudio.playClick();
    const el = document.getElementById('simulator-stage');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#080A10] border-b border-slate-800/80">
      {/* Subtle Technical Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Top Editorial & Narrative Block */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 pt-4">
          {/* Left Column: Headline & Human Engineering Story */}
          <div className="max-w-3xl space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Technical Identifier Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#121722] border border-slate-700/60 text-slate-300 text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.tag}</span>
            </div>

            {/* Authoritative Human Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-display">
              {t.title1}
              <span className="block text-slate-400 font-extrabold mt-1">
                {t.title2}
              </span>
            </h1>

            {/* Human Engineering Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
              {t.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToSimulator}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>⚡</span>
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className="px-6 py-3.5 rounded-xl bg-[#141926] hover:bg-[#1B2232] border border-slate-700/80 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {t.ctaPilot}
              </button>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setVideoModalOpen(true);
                }}
                className="px-5 py-3.5 rounded-xl text-slate-300 hover:text-white font-mono text-xs font-medium transition-all cursor-pointer flex items-center space-x-2"
              >
                <Play className="w-3.5 h-3.5 text-purple-400 fill-current" />
                <span>{t.ctaVideo}</span>
              </button>
            </div>

            {/* Founder Authority Footnote */}
            <div className="flex items-center space-x-2 pt-2 text-xs font-mono text-slate-400">
              <HardHat className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{t.badgePedigree}</span>
            </div>
          </div>

          {/* Right Column: High-Density Trust Telemetry Box */}
          <div className="w-full lg:w-80 shrink-0 p-6 rounded-2xl bg-[#0D111A] border border-slate-800 space-y-4 font-mono text-xs">
            <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800 flex justify-between">
              <span>SPECIFICATION SUMMARY</span>
              <span className="text-emerald-400 font-bold">VERIFIED</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">CAPEX REDUCTION</span>
                <span className="text-white font-bold text-sm text-emerald-400">
                  {t.statCost}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block uppercase">CUSTOM P&ID DEPLOYMENT</span>
                <span className="text-white font-bold text-sm text-cyan-400">
                  {t.statSpeed}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block uppercase">PROCESS EQUIPMENT LIBRARY</span>
                <span className="text-white font-bold text-sm text-purple-300">
                  {t.statCatalog}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block uppercase">CYBERSECURITY ISOLATION</span>
                <span className="text-white font-bold text-sm text-slate-200">
                  {t.statSecurity}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500">
              Purdue Model Level 2/3 · ISA-88 Batch / ISA-106 Continuous Standard
            </div>
          </div>
        </div>

        {/* The Master DCS Workstation & Crisis Simulator Centerpiece */}
        <div id="simulator-stage" className="w-full pt-4 relative z-10">
          <InteractiveRefineryConsole />
        </div>
      </div>
    </section>
  );
};
