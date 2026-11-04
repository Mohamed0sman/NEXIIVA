import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { InteractiveRefineryConsole } from './InteractiveRefineryConsole';
import { ArrowRight, Play, CheckCircle2, TrendingDown, Shield } from 'lucide-react';

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
    <section className="relative pt-16 pb-28 px-6 lg:px-12 overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto space-y-16 relative z-10 text-center">
        {/* Top Tag: Quiet Category Marker */}
        <div className="inline-flex items-center space-x-2 text-[#979799] text-sm font-sans tracking-tight">
          <span className="w-1.5 h-1.5 rounded-full bg-[#17191c]" />
          <span>{isRTL ? 'منظومة محاكاة وتشغيل المصافي البترولية' : 'PROCESS OPERATOR TRAINING SIMULATOR (OTS)'}</span>
        </div>

        {/* The Signature Steep Serif Headline: Weight 400 whispering authority with italic phrase */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1
            className={`text-5xl sm:text-6xl lg:text-[76px] font-normal text-[#17191c] tracking-[-0.025em] leading-[1.12] ${
              isRTL ? 'font-serif-ar' : 'font-serif'
            }`}
          >
            {isRTL ? (
              <>
                درّب مشغلي العمليات على طوارئ الفجر..{' '}
                <span className="italic font-normal text-[#5d2a1a]">قبل لمس المحطة الحقيقية.</span>
              </>
            ) : (
              <>
                Train for the 03:00 AM blackouts,{' '}
                <span className="italic font-normal text-[#5d2a1a]">before you touch the live plant.</span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-[20px] text-[#777b86] font-sans font-normal leading-[1.45] max-w-2xl mx-auto">
            {isRTL
              ? 'أكثر من 80% من مصافي النفط تعمل بدون محاكيات بسبب تكلفة الشركات القديمة الفلكية (110 ألف دولار و9 أشهر). نكسيفا تبني لك محاكياً مطابقاً لمخططات مصفاتك في 7 أيام وبتكلفة أقل 90%، يعمل معزولاً 100% داخل منشأتك.'
              : 'Over 80% of refinery units operate without simulators because legacy software costs $110,000+ and takes 9 months. NEXIIVA synthesizes plant-specific dynamic simulators from your exact P&IDs in ~7 days—at 90% lower cost, running 100% air-gapped.'}
          </p>

          {/* Steep Paired Pill Buttons: Filled Ink Black + Ghost Pill */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={scrollToSimulator}
              className="btn-pill-filled px-8 py-3.5 text-base cursor-pointer shadow-sm hover:opacity-90"
            >
              <span>{isRTL ? 'بدء تحدي طوارئ المصفاة' : 'Launch Crisis Drill Challenge'}</span>
              <span className="ml-2">→</span>
            </button>

            <button
              onClick={() => {
                dcsAudio.playClick();
                setPilotDrawerOpen(true);
              }}
              className="btn-pill-ghost px-7 py-3.5 text-base cursor-pointer"
            >
              {isRTL ? 'طلب تجربة 90 يوماً ($800)' : 'Request 90-Day Pilot ($800)'}
            </button>

            <button
              onClick={() => {
                dcsAudio.playClick();
                setVideoModalOpen(true);
              }}
              className="link-editorial text-[15px] px-3 py-2 cursor-pointer ml-2 text-[#777b86] hover:text-[#17191c]"
            >
              <Play className="w-4 h-4 fill-current text-[#17191c]" />
              <span>{isRTL ? 'فيديو الشرح (15 دقيقة)' : 'Watch 15-Min Walkthrough'}</span>
            </button>
          </div>
        </div>

        {/* 3 Floating Product Stat Artifacts Overlapping the Canvas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {/* Artifact 1: CapEx Reduction */}
          <div className="bg-white rounded-[20px] p-6 shadow-artifact border border-[#ececec]/60 transition-all hover:translate-y-[-2px]">
            <div className="flex items-center justify-between text-xs text-[#979799] font-sans">
              <span>CAPEX REDUCTION</span>
              <span className="text-[#059669] font-medium font-mono">~$5K vs $110K</span>
            </div>
            <div className="text-3xl font-normal font-sans text-[#17191c] mt-2 tracking-tight">
              90% Lower
            </div>
            <p className="text-xs text-[#777b86] mt-1 leading-relaxed">
              {isRTL ? 'توفير فوري لرأس المال مقابل احتكار الشركات القديمة' : 'Direct capital saved compared to AspenTech / Honeywell quotes.'}
            </p>
          </div>

          {/* Artifact 2: Build Velocity (Accent Blush Peach Wash) */}
          <div className="bg-[#fbe1d1] rounded-[20px] p-6 border border-[#f5cbb3] transition-all hover:translate-y-[-2px]">
            <div className="flex items-center justify-between text-xs text-[#5d2a1a]/70 font-sans">
              <span>DEPLOYMENT SPEED</span>
              <span className="text-[#5d2a1a] font-medium font-mono">7 DAYS</span>
            </div>
            <div className="text-3xl font-normal font-sans text-[#5d2a1a] mt-2 tracking-tight">
              ~1 Week Delivery
            </div>
            <p className="text-xs text-[#5d2a1a]/80 mt-1 leading-relaxed">
              {isRTL ? 'توليف آلي من مخططات P&ID بدون شهور من البرمجة اليدوية' : 'Auto-synthesized from your engineering P&IDs vs 9 months legacy consulting.'}
            </p>
          </div>

          {/* Artifact 3: Model Library */}
          <div className="bg-white rounded-[20px] p-6 shadow-artifact border border-[#ececec]/60 transition-all hover:translate-y-[-2px]">
            <div className="flex items-center justify-between text-xs text-[#979799] font-sans">
              <span>EQUIPMENT MODELS</span>
              <span className="text-[#17191c] font-medium font-mono">19 DOMAINS</span>
            </div>
            <div className="text-3xl font-normal font-sans text-[#17191c] mt-2 tracking-tight">
              387 Types
            </div>
            <p className="text-xs text-[#777b86] mt-1 leading-relaxed">
              {isRTL ? 'معادلات Peng-Robinson متكاملة مع حقن الأعطال الديناميكي' : 'Validated mass & energy balances with dynamic fault injection.'}
            </p>
          </div>
        </div>

        {/* The Centerpiece: Master DCS Crisis Console as a Floating Product Artifact */}
        <div id="simulator-stage" className="pt-6 relative z-10">
          <div className="bg-white rounded-[24px] p-3 sm:p-5 shadow-artifact border border-[#ececec] text-left">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#f2f2f3] text-xs font-sans text-[#777b86]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="font-medium text-[#17191c]">
                  {isRTL ? 'شاشة التحكم الصناعي المباشر — محاكاة وحدة CDU-100' : 'Live Industrial Control Console — CDU-100 Simulation Model'}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#979799]">
                LEVEL 3 AIR-GAPPED APPLIANCE
              </span>
            </div>

            <div className="mt-2">
              <InteractiveRefineryConsole />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
