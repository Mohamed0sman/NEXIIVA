import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Play, ArrowRight, MonitorPlay } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, setSimulatorModalOpen, language, telemetry } = useSimulationJourney();
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
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-semibold text-base shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse group"
            >
              <span>{t.ctaPrimary}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => {
                dcsAudio.playClick();
                setVideoModalOpen(true);
              }}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-[#0B1120] font-semibold text-base shadow-sm transition-all cursor-pointer flex items-center space-x-2 space-x-reverse"
            >
              <Play className="w-4 h-4 fill-current text-[#4F46E5]" />
              <span>{t.ctaSecondary}</span>
            </button>
          </div>
        </div>

        {/* Sleek Interactive Simulator Launch Showcase (Opens Modal on Click) */}
        <div id="simulator-stage" className="pt-2 max-w-5xl mx-auto">
          <div
            onClick={() => {
              dcsAudio.playClick();
              setSimulatorModalOpen(true);
            }}
            className="group rounded-3xl bg-gradient-to-b from-[#0B1120] to-[#070B14] border border-slate-800 shadow-[0_24px_60px_-15px_rgba(79,70,229,0.22)] p-6 sm:p-8 text-left transition-all hover:border-[#4F46E5]/70 hover:shadow-[0_30px_70px_-10px_rgba(124,58,237,0.3)] cursor-pointer relative overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Soft Ambient Radial Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(124,58,237,0.15),transparent_70%)] pointer-events-none" />

            {/* Top Bar of Showcase */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800/80 gap-3 text-xs font-mono relative z-10">
              <div className="flex items-center space-x-2.5 space-x-reverse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-bold text-white tracking-wide">
                  UNIT: CDU - ATM T23 / VDU - T60 PROCESS FLOW
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-medium">
                  LEVEL 3 AIR-GAPPED DMZ
                </span>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse text-[#7C3AED] group-hover:text-white transition-colors text-xs font-sans font-semibold">
                <span className="px-3.5 py-1 rounded-full bg-[#4F46E5]/20 group-hover:bg-[#4F46E5] text-indigo-200 group-hover:text-white transition-all flex items-center space-x-1.5 space-x-reverse">
                  <span>{isRTL ? 'فتح المحاكي بنافذة منبثقة كاملة' : 'Launch Fullscreen Console'}</span>
                  <span>↗</span>
                </span>
              </div>
            </div>

            {/* Middle: 3 Live Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 relative z-10">
              <div className="p-4 rounded-xl bg-white/5 border border-slate-800/90 group-hover:border-slate-700 transition-colors">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {isRTL ? 'حرارة أعلى البرج (TI-101)' : 'OVERHEAD TEMP (TI-101)'}
                </div>
                <div className="text-2xl font-black font-mono text-white mt-1 flex items-baseline justify-between">
                  <span>{telemetry.overheadTemp} °C</span>
                  <span className="text-[10px] font-sans font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                    {isRTL ? 'مستقر' : 'NOMINAL'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-slate-800/90 group-hover:border-slate-700 transition-colors">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {isRTL ? 'تدفق الراجع (FIC-102)' : 'REFLUX FLOW (FIC-102)'}
                </div>
                <div className="text-2xl font-black font-mono text-white mt-1 flex items-baseline justify-between">
                  <span>{telemetry.refluxFlow} m³/h</span>
                  <span className="text-[10px] font-sans font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                    {isRTL ? 'متوازن' : 'STEADY'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-slate-800/90 group-hover:border-slate-700 transition-colors">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {isRTL ? 'ضغط البرج (PIC-104)' : 'COLUMN PRESSURE (PIC-104)'}
                </div>
                <div className="text-2xl font-black font-mono text-white mt-1 flex items-baseline justify-between">
                  <span>{telemetry.columnPressure} bar</span>
                  <span className="text-[10px] font-sans font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                    {isRTL ? 'آمن' : 'SAFE'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Interactive Launch Banner */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white font-sans flex items-center space-x-2 space-x-reverse">
                  <MonitorPlay className="w-4 h-4 text-[#4F46E5]" />
                  <span>{isRTL ? 'محطة محاكي DCS تفاعلية جاهزة للتشغيل الفوري' : 'Interactive DCS Master Workstation Ready'}</span>
                </div>
                <div className="text-xs text-slate-400 font-sans">
                  {isRTL
                    ? 'انقر هنا لتشغيل غرفة التحكم الكاملة بشاشات التقطير، راسم الإشارات، وتحدي الطوارئ (35 ثانية)'
                    : 'Click to launch full-screen DCS control room with distillation PFD, multi-pen strip charts, and crisis drill'}
                </div>
              </div>

              <div className="shrink-0">
                <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-semibold text-xs shadow-md group-hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] transition-all flex items-center space-x-1.5 space-x-reverse">
                  <span>{isRTL ? 'فتح كونسول المحاكي' : 'Open Fullscreen Console'}</span>
                  <span>↗</span>
                </span>
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
