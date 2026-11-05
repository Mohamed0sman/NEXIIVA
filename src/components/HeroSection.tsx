import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import {
  Play,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  Sparkles,
  Box,
  Sliders,
  ExternalLink,
  Flame,
  CheckCircle2,
  Video,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language } = useSimulationJourney();
  const [activeTab, setActiveTab] = useState<'3D_TWIN' | 'DCS_CONSOLE'>('3D_TWIN');
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

  const icons = [Cpu, Layers, ShieldCheck];

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden bg-white">
      {/* Precision Background Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-70 pointer-events-none" />

      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-12 relative z-10 text-center">
        {/* Main Headline with Purple-Blue Brand Gradient Italic Phrase */}
        <div className="max-w-4xl mx-auto space-y-6">
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

        {/* High-Resolution Enterprise Digital Twin Showcase */}
        <div className="pt-4 max-w-5xl mx-auto">
          <div
            className="rounded-3xl bg-[#070B14] border border-purple-500/25 shadow-[0_30px_90px_-20px_rgba(79,70,229,0.32)] p-3.5 sm:p-5 text-left relative overflow-hidden transition-all"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Ambient Purple-Blue Radial Top-Glow */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(124,58,237,0.25),transparent_70%)] pointer-events-none" />

            {/* Industrial Workstation Console Header with Interactive View Switcher */}
            <div className="flex flex-wrap items-center justify-between pb-3.5 px-2 border-b border-slate-800/90 gap-3 text-xs font-mono relative z-10">
              <div className="flex items-center space-x-3 space-x-reverse">
                {/* 3 Console Status Indicators */}
                <div className="flex items-center space-x-1.5 space-x-reverse">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]/60" />
                </div>
                <span className="font-bold text-white tracking-wider text-[11px] sm:text-xs">
                  NEXIIVA OTS // INDUSTRIAL DIGITAL TWIN CONSOLE
                </span>
                <span className="hidden lg:inline-block px-2.5 py-0.5 rounded text-[10px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/70 font-medium">
                  AIR-GAPPED OT ARCHITECTURE
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('3D_TWIN')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans flex items-center space-x-1.5 space-x-reverse transition-all cursor-pointer ${
                    activeTab === '3D_TWIN'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>{isRTL ? 'التوأم الرقمي 3D' : '3D Digital Twin'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('DCS_CONSOLE')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans flex items-center space-x-1.5 space-x-reverse transition-all cursor-pointer ${
                    activeTab === 'DCS_CONSOLE'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{isRTL ? 'واجهات DCS الميدانية' : 'DCS Multi-Loop Faceplates'}</span>
                </button>
              </div>
            </div>

            {/* Showcase Main Content Area */}
            <div className="relative rounded-2xl overflow-hidden mt-3 border border-slate-800/90 shadow-2xl bg-black group">
              {activeTab === '3D_TWIN' ? (
                /* 3D Digital Twin Model View */
                <div className="relative w-full aspect-video overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src="/assets/digital_twin_hero.jpg"
                    alt="NEXIIVA Refinery Digital Twin 3D Model"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.015]"
                  />

                  {/* Top Subtle Engineering Specs Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono flex items-center space-x-2 space-x-reverse shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-ping" />
                      <span>CDU-VDU ATMOSPHERIC & VACUUM COMPLEX</span>
                    </div>

                    <div className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-indigo-300 text-[11px] font-mono items-center space-x-1.5 space-x-reverse shadow-lg">
                      <span>PENG-ROBINSON EOS // REAL-TIME Δt=100ms</span>
                    </div>
                  </div>

                  {/* Interactive Center Play Pill */}
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="absolute inset-0 m-auto w-fit h-fit px-5.5 py-3 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/25 hover:border-white/50 text-white font-sans text-xs sm:text-sm font-semibold flex items-center space-x-2.5 space-x-reverse shadow-2xl hover:scale-105 transition-all cursor-pointer group/play"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-white shadow-md group-hover/play:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span>
                      {isRTL
                        ? 'مشاهدة فيديو التشغيل الميداني (15 دقيقة)'
                        : 'Watch 15-Minute Live Operator Walkthrough'}
                    </span>
                  </button>

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
              ) : (
                /* High-Definition DCS Multi-Loop Faceplates View */
                <div className="relative w-full aspect-video overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src="/assets/youtube_demo_thumb.jpg"
                    alt="NEXIIVA Control Valve Faceplates and Trends"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.01]"
                  />

                  {/* Overlay Play Prompt */}
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="absolute inset-0 m-auto w-fit h-fit px-5.5 py-3 rounded-full bg-black/80 hover:bg-black/95 backdrop-blur-md border border-white/25 hover:border-white/50 text-white font-sans text-xs sm:text-sm font-semibold flex items-center space-x-2.5 space-x-reverse shadow-2xl hover:scale-105 transition-all cursor-pointer group/play"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-white shadow-md group-hover/play:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span>
                      {isRTL
                        ? 'تشغيل فيديو تجربة واجهات التحكم المباشرة'
                        : 'Watch DCS Multi-Loop Console Video'}
                    </span>
                  </button>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono flex items-center space-x-2 space-x-reverse shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span>12 CONTROL VALVES & MULTI-CHANNEL TRENDS</span>
                    </div>

                    <div className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-indigo-300 text-[11px] font-mono items-center space-x-1.5 space-x-reverse shadow-lg">
                      <span>EMERSON DELTAV & HONEYWELL EXPERION EMULATION</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3 Status Cards Underneath with Refined Modern Styling */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 text-left"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {t.pills.map((pill, idx) => {
              const IconComp = icons[idx] || Cpu;
              return (
                <div
                  key={idx}
                  className="p-5.5 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-[#4F46E5]/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 flex items-start space-x-4 space-x-reverse transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5] shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <IconComp className="w-5 h-5 text-[#4F46E5]" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#0B1120] font-sans">
                      {pill.title}
                    </div>
                    <div className="text-xs text-slate-600 font-sans leading-relaxed">
                      {pill.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
