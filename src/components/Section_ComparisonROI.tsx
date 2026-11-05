import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import {
  AlertTriangle,
  XCircle,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';

export const Section_ComparisonROI: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  return (
    <section
      id="industry-dilemma"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative bg-[#040714] border-t border-white/10"
    >
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(142,66,254,0.08),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(51,97,252,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="inline-flex items-center space-x-2 space-x-reverse text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
            <span>[STAGE 02 // EXECUTIVE BRIEFING]</span>
            <span className="text-slate-600">|</span>
            <span>{isRTL ? 'معضلة الـ $110K وحل NEXIIVA' : 'THE $110K DILEMMA'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]">
            <span className="heading-metallic block">
              {isRTL
                ? 'لماذا تدرب 80% من المصافي مشغليها'
                : 'Why 80%+ of Refineries Still Train'}
            </span>
            <span className="bg-gradient-to-r from-[#A855F7] via-[#8E42FE] to-[#38BDF8] bg-clip-text text-transparent block mt-1">
              {isRTL
                ? 'على عروض باوربوينت نظرية؟'
                : 'on Passive PowerPoint Slides.'}
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
            {isRTL
              ? 'الأنظمة التقليدية القديمة تطلب مئات الآلاف وتأخذ 6 أشهر لبناء نموذج عام لا يطابق واقع منشأتك. إليك كيف يُنهي NEXIIVA هذا العجز.'
              : 'Legacy simulation conglomerates charge $110K+ and take 6+ months for textbook generic units. NEXIIVA delivers plant-specific accuracy in ~1 week at a fraction of the cost.'}
          </p>
        </div>

        {/* 2-Column Executive Briefing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The $110K Industry Dilemma (6 Cols) */}
          <div
            className="lg:col-span-6 space-y-6 text-left"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-[#080D1F]/90 border border-rose-500/30 backdrop-blur-xl space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-2.5 space-x-reverse text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>{isRTL ? 'معضلة الصناعة التقليدية' : 'THE $110K INDUSTRY BOTTLENECKS'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                  LEGACY BARRIERS
                </span>
              </div>

              {/* 3 Bottlenecks */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5 space-x-reverse p-4 rounded-xl bg-white/5 border border-white/5">
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm sm:text-base">
                      {isRTL ? '1. انعدام هامش الخطأ الميداني' : '1. Zero Room for Live Plant Error'}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {isRTL
                        ? 'إجراءات بدء التشغيل (Startup)، الإغلاق الطارئ (ESD)، أو انقطاع طاقة التبريد لا يمكن أبداً التدرّب عليها حياً على مصفاة قيد الإنتاج.'
                        : 'Critical procedures like unit startup, trip recovery, or cooling water loss cannot be safely practiced on an active production unit.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 space-x-reverse p-4 rounded-xl bg-white/5 border border-white/5">
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm sm:text-base">
                      {isRTL ? '2. التكاليف الاحتكارية الباهظة' : '2. Prohibitive Legacy Capital Cost'}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {isRTL
                        ? 'الشركات العالمية الكبرى تفرض قرابة $110,000 لكل وحدة تشغيل، وتطلب رسوم استشارات باهظة تُخرج المحاكاة من ميزانيات أغلب المصافي.'
                        : 'Global automation conglomerates charge ~$110,000 per unit, putting dynamic high-fidelity simulation out of reach for most plant budgets.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 space-x-reverse p-4 rounded-xl bg-white/5 border border-white/5">
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm sm:text-base">
                      {isRTL ? '3. تأخر التسليم لـ 6 أشهر ونماذج عامة' : '3. 6+ Months Delivery of Generic Models'}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {isRTL
                        ? 'النماذج الجاهزة تتجاهل صمامات ومضخات ومخططات P&ID الفعلية لمنشأتك، مما يفقد المتدرب الثقة في المحاكي عند العودة لغرفة التحكم.'
                        : 'Generic models ignore your specific P&IDs, instruments, and interlocks, breeding dangerous negative training habits in operators.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Anatomy of 1 Preventable Outage */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>{isRTL ? 'متوسط خسائر اضطراب تشغيلي واحد:' : 'Cost of 1 Unpracticed Upset:'}</span>
                <span className="font-bold text-rose-400 text-sm">$150,000+ (Flaring & Outage)</span>
              </div>
            </div>
          </div>

          {/* Right Column: The NEXIIVA Breakthrough Metrics (6 Cols) */}
          <div
            className="lg:col-span-6 space-y-5 text-left"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Stat Block 1: 90% Lower Cost */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0A0F24]/85 border-t-2 border-t-[#8E42FE] border-x border-b border-white/10 backdrop-blur-2xl shadow-xl space-y-3 relative overflow-hidden group hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                  METRIC 01 // CAPITAL ACCESSIBILITY
                </span>
                <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-300">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline space-x-3 space-x-reverse">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  90% Lower Cost
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  (~$5,180 Year 1 vs $110K)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {isRTL
                  ? 'نموذج اشتراك سنوي مرن يلغي نفقات الـ CapEx الضخمة، ويتيح لكل مصفاة تدريب فريقها التشغيلي بالكامل بنفس ميزانية دورة تدريبية واحدة.'
                  : 'Flexible annual subscription eradicates massive upfront capital expense, democratizing world-class OTS for independent and state refineries.'}
              </p>
            </div>

            {/* Stat Block 2: ~1 Week per Unit */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0A0F24]/85 border-t-2 border-t-[#38BDF8] border-x border-b border-white/10 backdrop-blur-2xl shadow-xl space-y-3 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  METRIC 02 // RAPID COMMISSIONING
                </span>
                <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline space-x-3 space-x-reverse">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  ~1 Week per Unit
                </span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  (387-Equipment Library)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {isRTL
                  ? 'بناء وحدات مخصصة تطابق مخططات P&ID الحقيقية للمصفاة عبر محرك OTS Builder وقاعدة مكونات معتمدة تضم 387 عنصراً جاهزاً.'
                  : 'Synthesize custom units matching your plant P&IDs in days using our pre-certified 387-equipment dynamic blocks.'}
              </p>
            </div>

            {/* Stat Block 3: 100% Safe Rehearsal */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0A0F24]/85 border-t-2 border-t-[#10B981] border-x border-b border-white/10 backdrop-blur-2xl shadow-xl space-y-3 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  METRIC 03 // ZERO PLANT RISK
                </span>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline space-x-3 space-x-reverse">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  100% Safe Rehearsal
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  (Zero Flare & Production Loss)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {isRTL
                  ? 'تكرار سيناريوهات الطوارئ الخطرة عشرات المرات حتى تتحول استجابة المشغل إلى رد فعل غريزي آمن وموثق دون أي مخاطرة بالمعدات.'
                  : 'Drill complex high-consequence emergency trips repeatedly until operator muscle memory is 100% verified.'}
              </p>
            </div>

            {/* CTA Link to Stage 3 */}
            <div className="pt-2 flex justify-start">
              <button
                onClick={() => setPilotDrawerOpen(true)}
                className="inline-flex items-center space-x-2 space-x-reverse text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
              >
                <span>{isRTL ? 'استكشف استوديو بناء الوحدات OTS Builder' : 'Explore the OTS Builder Workspace'}</span>
                <span>{isRTL ? '←' : '→'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
