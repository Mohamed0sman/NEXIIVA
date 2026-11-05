import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Play, ArrowRight, ShieldCheck, Cpu, Layers, Activity, Sparkles } from 'lucide-react';

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
    <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden bg-white">
      {/* Precision Background Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-70 pointer-events-none" />
      
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-12 relative z-10 text-center">
        {/* Main Headline with Purple-Blue Brand Gradient Italic Phrase */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-xs mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wide">
              {isRTL ? 'المنظومة الصناعية المعتمدة لمحاكاة مشغلي العمليات' : 'ENTERPRISE OPERATOR TRAINING SIMULATOR (OTS)'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-[#0B1120] tracking-tight leading-[1.16] font-sans">
            {t.headlineMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent inline-block">
              {t.headlineItalic}
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-[19px] text-slate-600 font-sans font-normal leading-relaxed max-w-3xl mx-auto">
            {t.subheadline}
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={scrollToSubscribe}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-semibold text-base shadow-[0_10px_30px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(79,70,229,0.65)] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse group"
            >
              <span>{t.ctaPrimary}</span>
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-[#0B1120] font-semibold text-base shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer flex items-center space-x-2 space-x-reverse"
            >
              <Play className="w-4 h-4 fill-current text-[#4F46E5]" />
              <span>{t.ctaSecondary}</span>
            </button>
          </div>
        </div>

        {/* High-Resolution Enterprise Software Showcase */}
        <div className="pt-4 max-w-5xl mx-auto">
          <div
            className="rounded-3xl bg-[#070B14] border border-slate-800 shadow-[0_28px_80px_-15px_rgba(79,70,229,0.28)] p-3.5 sm:p-5 text-left relative overflow-hidden transition-all"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Ambient Purple-Blue Radial Top-Glow */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_70%)] pointer-events-none" />

            {/* Industrial Workstation Console Header */}
            <div className="flex flex-wrap items-center justify-between pb-3 px-2 border-b border-slate-800/90 gap-3 text-xs font-mono relative z-10">
              <div className="flex items-center space-x-3 space-x-reverse">
                {/* 3 Console Status Indicators */}
                <div className="flex items-center space-x-1.5 space-x-reverse">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]/60" />
                </div>
                <span className="font-bold text-white tracking-wider text-[11px] sm:text-xs">
                  NEXIIVA OTS // CDU-VDU DIGITAL TWIN CONSOLE
                </span>
                <span className="hidden md:inline-block px-2.5 py-0.5 rounded text-[10px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/70 font-medium">
                  AIR-GAPPED OT ARCHITECTURE
                </span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse text-slate-400 text-[11px]">
                <span className="flex items-center space-x-1.5 space-x-reverse text-emerald-400 font-mono">
                  <Activity className="w-3.5 h-3.5" />
                  <span>EMERSON DELTAV / HONEYWELL EXPERION EMULATION</span>
                </span>
              </div>
            </div>

            {/* Industrial Software Workstation Window */}
            <div className="relative rounded-2xl overflow-hidden mt-3 border border-slate-800/90 shadow-2xl bg-black group">
              <img
                src="/assets/image2.png"
                alt="NEXIIVA Refinery DCS Simulator Workstation"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Engineering Capability Badges Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-sans font-medium flex items-center space-x-1.5 space-x-reverse shadow-lg">
                  <Cpu className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>{t.badges.tag1}</span>
                </div>

                <div className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-sans font-medium items-center space-x-1.5 space-x-reverse shadow-lg">
                  <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>{t.badges.tag2}</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-sans font-medium flex items-center space-x-1.5 space-x-reverse shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.badges.tag3}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Status Cards Underneath with Refined Hover Styling */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 text-left"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {t.pills.map((pill, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/90 hover:bg-white border border-slate-200/90 hover:border-[#4F46E5]/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 flex items-start space-x-3.5 space-x-reverse transition-all duration-200"
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] shrink-0 mt-1 shadow-xs" />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-[#0B1120] font-sans">
                    {pill.title}
                  </div>
                  <div className="text-xs text-slate-600 font-sans leading-relaxed">
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
