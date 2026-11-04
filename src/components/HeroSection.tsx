import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { InteractiveRefineryConsole } from './InteractiveRefineryConsole';
import { Play, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].hero;
  const isRTL = language === 'AR';

  return (
    <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden bg-white">
      <div className="max-w-[1240px] mx-auto space-y-10 relative z-10 text-center">
        {/* Main Headline with Purple-Blue Brand Gradient Italic Phrase */}
        <div className="max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-[#0B1120] tracking-tight leading-[1.14] font-sans">
            {t.headlineMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
              {t.headlineItalic}
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-[19px] text-slate-600 font-sans font-normal leading-relaxed max-w-3xl mx-auto">
            {t.subheadline}
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                dcsAudio.playClick();
                setPilotDrawerOpen(true);
              }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-semibold text-base shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2 group"
            >
              <span>{t.ctaPrimary}</span>
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => {
                dcsAudio.playClick();
                setVideoModalOpen(true);
              }}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-[#0B1120] font-semibold text-base shadow-sm transition-all cursor-pointer flex items-center space-x-2"
            >
              <Play className="w-4 h-4 fill-current text-[#4F46E5]" />
              <span>{t.ctaSecondary}</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Showcase: Full-Width CDU/VDU Simulator & Instructor Console */}
        <div id="simulator-stage" className="pt-2 max-w-6xl mx-auto">
          <div className="rounded-2xl bg-[#090D16] shadow-[0_24px_60px_-15px_rgba(37,99,235,0.18)] border border-slate-700/60 overflow-hidden text-left">
            <InteractiveRefineryConsole />
          </div>

          {/* 3 Status Pills Underneath */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {t.pills.map((pill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50/90 hover:bg-white border border-slate-200/90 shadow-xs flex items-start space-x-3 space-x-reverse transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] shrink-0 mt-1.5" />
                <div className="space-y-0.5">
                  <div className="font-bold text-sm text-[#0B1120] font-sans">
                    {pill.title}
                  </div>
                  <div className="text-xs text-slate-500 font-sans leading-relaxed">
                    {pill.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
