import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Play, ArrowRight, ShieldCheck, Zap, Layers, MonitorPlay, Activity } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, setSimulatorModalOpen, language, telemetry } = useSimulationJourney();
  const t = translations[language].hero;
  const isRTL = language === 'AR';

  const handleOpenSimulator = () => {
    dcsAudio.playClick();
    setSimulatorModalOpen(true);
  };

  return (
    <section className="relative pt-12 pb-20 px-6 lg:px-12 overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto space-y-12 relative z-10 text-center">
        {/* The Signature Sans-Serif Bold Headline with Purple-Blue Brand Gradient Italic Phrase */}
        <div className="max-w-4xl mx-auto space-y-5">
          <h1
            className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-[#0B1120] tracking-tight leading-[1.12] font-sans"
          >
            {isRTL ? (
              <>
                درّب مشغلي العمليات على طوارئ الفجر..{' '}
                <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                  قبل لمس المحطة الحقيقية.
                </span>
              </>
            ) : (
              <>
                Train for the 03:00 AM blackouts,{' '}
                <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                  before you touch the live plant.
                </span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-[20px] text-slate-600 font-sans font-normal leading-relaxed max-w-2xl mx-auto">
            {isRTL
              ? 'أكثر من 80% من مصافي النفط تعمل بدون محاكيات بسبب تكلفة الشركات القديمة الفلكية (110 ألف دولار و9 أشهر). نكسيفا تبني لك محاكياً مطابقاً لمخططات مصفاتك في 7 أيام وبتكلفة أقل 90%، يعمل معزولاً 100% داخل منشأتك.'
              : 'Over 80% of refinery units operate without simulators because legacy software costs $110,000+ and takes 9 months. NEXIIVA synthesizes plant-specific dynamic simulators from your exact P&IDs in ~7 days—at 90% lower cost, running 100% air-gapped.'}
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={handleOpenSimulator}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-semibold text-base shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2 group"
            >
              <span>{isRTL ? 'بدء تحدي طوارئ المصفاة' : 'Launch Crisis Drill Challenge'}</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => {
                dcsAudio.playClick();
                setPilotDrawerOpen(true);
              }}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-[#0B1120] font-semibold text-base shadow-sm transition-all cursor-pointer"
            >
              {isRTL ? 'طلب تجربة 90 يوماً ($800)' : 'Request 90-Day Pilot ($800)'}
            </button>

            <button
              onClick={() => {
                dcsAudio.playClick();
                setVideoModalOpen(true);
              }}
              className="px-4 py-3 text-[#4F46E5] hover:text-[#2563EB] font-medium text-[15px] transition-colors cursor-pointer flex items-center space-x-2"
            >
              <Play className="w-4 h-4 fill-current text-[#4F46E5]" />
              <span>{isRTL ? 'فيديو الشرح (15 دقيقة)' : 'Watch 15-Min Walkthrough'}</span>
            </button>
          </div>
        </div>

        {/* Clean, Light-Themed Interactive Product Showcase Card */}
        <div className="max-w-4xl mx-auto pt-4 text-left">
          <div className="rounded-3xl bg-gradient-to-b from-[#F8FAFC] to-white border border-slate-200/90 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.08)] p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Top Showcase Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3 text-xs font-sans">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#0B1120]">
                  {isRTL ? 'محاكي نكسيفا الديناميكي — بيئة التشغيل المعزولة (Level 3 DMZ)' : 'NEXIIVA OS // LEVEL 3 AIR-GAPPED SIMULATION DMZ'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-indigo-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 font-semibold">
                <Activity className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span>CDU-100 DIGITAL TWIN ACTIVE</span>
              </div>
            </div>

            {/* Live Telemetry Snapshot Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  {isRTL ? 'حرارة أعلى البرج (TI-101)' : 'OVERHEAD TEMP (TI-101)'}
                </div>
                <div className="text-2xl font-bold font-mono text-[#0B1120] flex items-baseline justify-between">
                  <span>{telemetry.overheadTemp} °C</span>
                  <span className="text-[10px] font-sans font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {isRTL ? 'مستقر' : 'Normal'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  {isRTL ? 'تدفق الراجع (FIC-102)' : 'REFLUX FLOW (FIC-102)'}
                </div>
                <div className="text-2xl font-bold font-mono text-[#0B1120] flex items-baseline justify-between">
                  <span>{telemetry.refluxFlow} m³/h</span>
                  <span className="text-[10px] font-sans font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {isRTL ? 'متوازن' : 'Balanced'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  {isRTL ? 'ضغط البرج (PIC-104)' : 'COLUMN PRESSURE (PIC-104)'}
                </div>
                <div className="text-2xl font-bold font-mono text-[#0B1120] flex items-baseline justify-between">
                  <span>{telemetry.columnPressure} bar</span>
                  <span className="text-[10px] font-sans font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {isRTL ? 'آمن' : 'Safe'}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Simulator Launch Banner (Clickable) */}
            <div
              onClick={handleOpenSimulator}
              className="group p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-blue-500/10 border-2 border-[#4F46E5]/30 hover:border-[#4F46E5] transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md"
            >
              <div className="space-y-1 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#4F46E5]">
                  <MonitorPlay className="w-4 h-4 text-[#4F46E5]" />
                  <span>{isRTL ? 'المحاكي التفاعلي جاهز للتجربة الآن' : 'Interactive DCS Training Console Ready'}</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-[#0B1120] font-sans">
                  {isRTL
                    ? 'تحدي طوارئ حقيقي لمدة 35 ثانية: انقطاع مضخة الراجع وخطر طوفان البرج'
                    : 'Real 35-Second Crisis Drill: Overhead Reflux Loss & Overpressure Prevention'}
                </div>
                <div className="text-xs text-slate-500 font-sans">
                  {isRTL
                    ? 'انقر لتشغيل لوحة التحكم الكاملة بشاشات الـ DCS وشريط الرسام البياني الفوري'
                    : 'Click to launch full-screen DCS control console with multi-pen strip charts & SIL-3 alarms'}
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-semibold text-xs shadow-md group-hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>{isRTL ? 'فتح كونسول التحكم الكامل' : 'Open Fullscreen Console'}</span>
                  <span>↗</span>
                </button>
              </div>
            </div>

            {/* 3 Grounding Trust Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-200/80 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="flex items-start space-x-3 text-xs font-sans text-slate-600">
                <Zap className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0B1120]">{isRTL ? 'توليف النموذج في 7 أيام' : '~7 Days P&ID Synthesis'}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{isRTL ? 'تحويل مخططات PDF إلى محاكي ديناميكي بدقة التوازن الحراري' : 'Direct from plant PDF drawings into calibrated dynamic digital twin'}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs font-sans text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0B1120]">{isRTL ? 'معزول 100% (أون-بريميس)' : '100% Air-Gapped ISA/IEC'}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{isRTL ? 'يعمل بدون إنترنت نهائياً لحماية أسرار وسلامة المصفاة' : 'Operates in Level 3 DMZ with zero connection to live controllers'}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs font-sans text-slate-600">
                <Layers className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#0B1120]">{isRTL ? 'تجربة 90 يوماً بـ 800$' : '$800 Fixed Pilot Investment'}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{isRTL ? 'تحقق كامل من دقة المحاكي مع مهندسي العمليات بدون مخاطرة' : 'Risk-free validation on your real crude parameters & P&ID tags'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
