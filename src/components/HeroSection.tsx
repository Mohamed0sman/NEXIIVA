import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import {
  Play,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].hero;
  const isRTL = language === 'AR';

  const scrollToSubscribe = () => {
    const el = document.getElementById('subscribe');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPilotDrawerOpen(true);
    }
  };

  return (
    <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden bg-white">
      {/* Precision Structural Background Grid (Subtle Light Blueprint) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-60 pointer-events-none" />

      {/* Subtle Ambient Radial Wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-slate-100 to-transparent pointer-events-none blur-2xl" />

      <div className="max-w-[1240px] mx-auto space-y-10 sm:space-y-12 relative z-10 text-center">
        {/* Main Headline & Calm Subheading */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
          {/* Subtle Pill Tag */}
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-sans font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              {isRTL
                ? 'محاكاة تدريب مشغلي مصافي التكرير (OTS) · اختيار رسمي EIP 2026'
                : 'Industrial Operator Training Simulation (OTS) · EIP 2026 Selection'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.2] sm:leading-[1.15] font-sans">
            {t.headlineMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent inline-block">
              {t.headlineItalic}
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-[18px] text-slate-600 font-sans font-normal leading-relaxed max-w-3xl mx-auto px-2">
            {t.subheadline}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-3 w-full max-w-sm mx-auto sm:max-w-none">
            <button
              onClick={scrollToSubscribe}
              className="min-h-[48px] px-7 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse group"
            >
              <span>{t.ctaPrimary}</span>
              <span className={`group-hover:translate-x-1 transition-transform inline-block ${isRTL ? 'rotate-180' : ''}`}>→</span>
            </button>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-800 font-medium text-sm sm:text-base shadow-xs active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Play className="w-4 h-4 fill-current text-indigo-600" />
              <span>{t.ctaSecondary}</span>
            </button>
          </div>
        </div>

        {/* Authentic Industrial DCS Digital Twin Workstation Showcase (Calm, High-Definition, Real) */}
        <div className="pt-2 max-w-5xl mx-auto">
          <div
            className="rounded-2xl bg-slate-950 border border-slate-800 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.18)] p-2 sm:p-4 text-left relative overflow-hidden"
            dir="ltr"
          >
            {/* Console Header Bar */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white tracking-wider text-[11px] sm:text-xs">
                  NEXIIVA OTS // INDUSTRIAL DCS OPERATING WORKSTATION
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-3 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  CDU-VDU REFINERY COMPLEX
                </span>
                <span className="text-emerald-400 font-semibold">100% AIR-GAPPED OT</span>
              </div>
            </div>

            {/* Real Running Software Screenshot with Clean Interactive Trigger */}
            <div className="relative rounded-xl overflow-hidden mt-2 bg-black aspect-video flex items-center justify-center group">
              <img
                src="/assets/youtube_demo_thumb.jpg"
                alt="NEXIIVA DCS Operator Faceplates and Live Trends"
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
              />

              {/* Frosted Play Walkthrough Overlay */}
              <button
                onClick={() => setVideoModalOpen(true)}
                aria-label="Watch Walkthrough Video"
                className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900/85 hover:bg-indigo-600 text-white border border-white/20 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              >
                <Play className="w-6 h-6 fill-current text-white ml-0.5" />
              </button>

              {/* Bottom Specs Ribbon */}
              <div className="hidden sm:flex absolute bottom-3 left-3 right-3 items-center justify-between pointer-events-none text-[11px] font-mono">
                <div className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-slate-300">
                  Multi-Loop Control Valve Faceplates & Oscilloscope Trends
                </div>
                <div className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-cyan-300">
                  Peng-Robinson Thermodynamics · Real-Time (Δt=100ms)
                </div>
              </div>
            </div>

            {/* Quick 3 Value Highlights Below Console */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 px-1 text-left font-sans text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Plant-Specific P&IDs</span>
                  <span className="text-slate-400 text-[11px]">Calibrated to your exact columns, pumps, and control loops.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">~1 Week Rapid Delivery</span>
                  <span className="text-slate-400 text-[11px]">Synthesized rapidly via our 387-equipment modular OTS Builder.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Air-Gapped or Cloud</span>
                  <span className="text-slate-400 text-[11px]">Runs 100% offline inside plant LAN or secure private cloud.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
