import React from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { InteractiveRefineryConsole } from './InteractiveRefineryConsole';

export const HeroSection: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].hero;

  return (
    <section className="relative pt-16 pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden flex flex-col items-center text-center">
      {/* 1. Glowing Sinusoidal Energy Wave Ribbons in Hero Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
        {/* Soft Radial Ambient Aura */}
        <div className="absolute w-[800px] h-[500px] bg-gradient-to-r from-purple-600/20 via-indigo-600/15 to-blue-600/20 rounded-full blur-[140px] animate-ambient-glow" />

        {/* Dynamic Sinusoidal Wave Ribbons SVG */}
        <svg
          className="w-[1400px] h-[600px] opacity-40 mix-blend-screen select-none"
          viewBox="0 0 1400 600"
          fill="none"
        >
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8E42FE" stopOpacity="0" />
              <stop offset="30%" stopColor="#8E42FE" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#3361FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3361FC" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3361FC" stopOpacity="0" />
              <stop offset="40%" stopColor="#6838F8" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#8E42FE" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8E42FE" stopOpacity="0" />
            </linearGradient>

            <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sinusoidal Wave 1 */}
          <path
            d="M 0 320 C 350 200, 450 440, 700 300 C 950 160, 1050 420, 1400 280"
            stroke="url(#waveGrad1)"
            strokeWidth="3.5"
            fill="none"
            filter="url(#waveGlow)"
          />

          {/* Sinusoidal Wave 2 */}
          <path
            d="M 0 280 C 300 400, 500 180, 750 340 C 1000 480, 1150 200, 1400 320"
            stroke="url(#waveGrad2)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="8 6"
            className="animate-flow-dash"
          />
        </svg>
      </div>

      {/* 2. Top Center Brand & Headline */}
      <div className="max-w-4xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
        {/* Glowing Ribbon Behind Logo */}
        <div className="relative inline-flex items-center justify-center p-3">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/35 via-indigo-500/25 to-blue-500/35 rounded-full blur-2xl pointer-events-none" />
          <NexiivaLogo height={44} className="relative z-10 drop-shadow-[0_0_25px_rgba(142,66,254,0.4)]" />
        </div>

        {/* Announcement Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B0F22]/90 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(123,60,252,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.badge}</span>
        </div>

        {/* Metallic Silver-White Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-metallic max-w-4xl">
          {t.title1}
          <span className="block text-brand-gradient mt-1">{t.title2}</span>
        </h1>

        {/* 2-Line Clear Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
          {t.subtitle}
        </p>

        {/* Centered CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <button
            onClick={() => {
              dcsAudio.playClick();
              setPilotDrawerOpen(true);
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-gradient text-white text-sm font-semibold tracking-wide shadow-brand-glow hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{t.ctaPrimary}</span>
            <span className="text-base">→</span>
          </button>

          <button
            onClick={() => {
              dcsAudio.playClick();
              setVideoModalOpen(true);
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/30 text-slate-200 hover:text-white text-sm font-medium transition-all cursor-pointer flex items-center justify-center space-x-2 backdrop-blur-md"
          >
            <span className="text-purple-400">▶</span>
            <span>{t.ctaVideo}</span>
          </button>
        </div>
      </div>

      {/* 3. The Bespoke Interactive Refinery Console & Real Screen Workstation */}
      <div id="simulator-stage" className="w-full mt-16 relative z-10">
        <InteractiveRefineryConsole />
      </div>
    </section>
  );
};
