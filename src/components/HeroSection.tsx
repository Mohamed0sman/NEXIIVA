import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Play, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';

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
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden bg-white">
      <div className="max-w-[1240px] mx-auto space-y-12 relative z-10 text-center">
        {/* Main Headline with Purple-Blue Brand Gradient Italic Phrase */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-[#0B1120] tracking-tight leading-[1.14] font-sans">
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
              onClick={scrollToSubscribe}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-semibold text-base shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse group"
            >
              <span>{t.ctaPrimary}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-[#0B1120] font-semibold text-base shadow-sm transition-all cursor-pointer flex items-center space-x-2 space-x-reverse"
            >
              <Play className="w-4 h-4 fill-current text-[#4F46E5]" />
              <span>{t.ctaSecondary}</span>
            </button>
          </div>
        </div>

        {/* High-Resolution Enterprise Software Showcase (Clean Product Display, No Toy Simulation) */}
        <div className="pt-2 max-w-5xl mx-auto">
          <div
            className="rounded-3xl bg-[#070B14] border border-slate-800 shadow-[0_24px_60px_-15px_rgba(79,70,229,0.22)] p-3 sm:p-5 text-left relative overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Soft Ambient Radial Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] pointer-events-none" />

            {/* Industrial Workstation Frame Header */}
            <div className="flex flex-wrap items-center justify-between pb-3 px-2 border-b border-slate-800/80 gap-3 text-xs font-mono relative z-10">
              <div className="flex items-center space-x-2.5 space-x-reverse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-bold text-white tracking-wider text-[11px] sm:text-xs">
                  NEXIIVA OTS // CDU-VDU DIGITAL TWIN WORKSTATION
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-medium">
                  AIR-GAPPED OT ARCHITECTURE
                </span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse text-slate-400 text-[11px]">
                <span className="flex items-center space-x-1.5 space-x-reverse text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>EMERSON DELTAV / HONEYWELL EXPERION EMULATION</span>
                </span>
              </div>
            </div>

            {/* Real Industrial Software Screenshot */}
            <div className="relative rounded-2xl overflow-hidden mt-3 border border-slate-800/90 shadow-2xl">
              <img
                src="/assets/image2.png"
                alt="NEXIIVA Refinery DCS Simulator Workstation"
                className="w-full h-auto object-cover"
              />

              {/* Floating Engineering Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] font-sans font-medium flex items-center space-x-1.5 space-x-reverse">
                  <Cpu className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>{t.badges.tag1}</span>
                </div>

                <div className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] font-sans font-medium items-center space-x-1.5 space-x-reverse">
                  <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>{t.badges.tag2}</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] font-sans font-medium flex items-center space-x-1.5 space-x-reverse">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.badges.tag3}</span>
                </div>
              </div>
            </div>
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
                  <div className="text-sm font-bold text-[#0B1120] font-sans">
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
