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
    <section className="relative pt-12 pb-24 px-6 lg:px-12 overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto space-y-10 relative z-10 text-center">
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

          {/* Upgraded CTA Buttons: Royal Indigo/Blue Gradient + White Pill + Video Link */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={scrollToSimulator}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-semibold text-base shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>{isRTL ? 'بدء تحدي طوارئ المصفاة' : 'Launch Crisis Drill Challenge'}</span>
              <span className="ml-2">→</span>
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

        {/* The Centerpiece: Master DCS Crisis Console in Sleek Anodized Frame */}
        <div id="simulator-stage" className="pt-2 relative z-10">
          <div className="bg-[#090D16] rounded-2xl shadow-[0_24px_60px_-15px_rgba(37,99,235,0.18)] border border-slate-700/60 overflow-hidden text-left">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#070B14] text-xs font-sans text-slate-400">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-mono text-xs font-bold text-slate-200">
                  {isRTL ? 'محطة التحكم الصناعي المباشر — محاكاة وحدة CDU-100' : 'Live Industrial Control Console — CDU-100 Simulation Model'}
                </span>
              </div>
              <span className="font-mono text-[11px] text-cyan-400 tracking-wider">
                LEVEL 3 AIR-GAPPED APPLIANCE
              </span>
            </div>

            <div>
              <InteractiveRefineryConsole />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
