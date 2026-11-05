import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { ShieldCheck, Cpu, Layers, Award, Factory, Target, Users, CheckCircle2, Quote } from 'lucide-react';

export const Section_AboutCompany: React.FC = () => {
  const { language } = useSimulationJourney();
  const t = translations[language].about;
  const tFounder = translations[language].founder;
  const isRTL = language === 'AR';

  return (
    <section id="about" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 relative bg-[#F8FAFC] border-t border-slate-200">
      {/* Precision Background Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-8 sm:space-y-12 lg:space-y-16 relative z-10">
        {/* Section Header with Clean Minimalist Kicker (No AI Pill Bubble) */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest font-sans">
            {t.eyebrow}
          </p>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.2] font-sans">
            {t.headingMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent inline-block">
              {t.headingItalic}
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 4 Prominent Company Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#4F46E5]/40 hover:-translate-y-1 transition-all duration-300 text-center space-y-1 sm:space-y-1.5 relative overflow-hidden group"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="text-2xl sm:text-4xl font-black font-sans bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#0B1120] font-sans">
                {m.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-sans">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Company Narrative & Executive Founder Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Card 1: The Problem & Our Mission */}
          <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-between space-y-5 sm:space-y-6 text-left relative overflow-hidden">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse text-[#4F46E5] font-semibold text-xs tracking-wider uppercase font-sans">
                <Factory className="w-4 h-4" />
                <span>{isRTL ? 'المهمة والرؤية الصناعية' : 'INDUSTRIAL MISSION & PURPOSE'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B1120] font-sans tracking-tight leading-snug">
                {t.storyTitle}
              </h3>
              <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-sans">
                {t.storyBody}
              </p>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isRTL ? 'مطابقة هندسية لمخططات P&ID' : 'P&ID-accurate digital twins'}</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isRTL ? 'أمان معزول 100% دون إنترنت' : '100% Air-gapped on-premise security'}</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isRTL ? 'أتمتة بناء المحاكي في أسبوع' : 'Rapid 1-week build target'}</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{isRTL ? 'اعتماد كفاءة المشغلين وفق ISA-106' : 'ISA-106 operator certification'}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Executive Founder & Plant Pedigree (Calm Light Theme) */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 lg:p-10 shadow-sm text-slate-800 flex flex-col justify-between space-y-5 sm:space-y-6 text-left relative overflow-hidden">
            <div className="space-y-5 relative z-10">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
                <span className="text-[11px] font-sans font-bold text-indigo-600 uppercase tracking-widest">
                  {tFounder.badge}
                </span>
                <span className="text-[11px] font-sans px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center space-x-1.5 space-x-reverse shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isRTL ? '+10 سنوات قيادة ميدانية' : '10+ Yrs Field Leadership'}</span>
                </span>
              </div>

              {/* Founder Monogram & Role */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg font-sans shadow-md">
                    MA
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold font-sans text-slate-900 leading-tight">
                    {isRTL ? 'م. مصطفى عادل' : 'Eng. Mostafa Adel'}
                  </h4>
                  <div className="text-xs font-semibold text-indigo-700 font-sans mt-0.5">
                    {tFounder.roleTitle}
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans">
                    {tFounder.roleSub}
                  </div>
                </div>
              </div>

              {/* Editorial Quote */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans relative border-l-2 rtl:border-l-0 rtl:border-r-2 border-l-indigo-600 rtl:border-r-indigo-600 shadow-xs">
                <p className="italic">{tFounder.quote}</p>
              </div>

              {/* 2x2 Structured Plant Operating Pedigree */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-sans font-bold text-slate-700 uppercase tracking-wider block">
                  {tFounder.pedigreeLabel}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tFounder.plants.map((plant, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors text-left shadow-xs"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-slate-900 font-sans">{plant.name}</span>
                        <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium">
                          {plant.tag}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 font-sans leading-tight">
                        {plant.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Commitments Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2 relative z-10 font-mono">
              <span>Refinery Operations Certified</span>
              <span>API 520 / 521 / 560 Standards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
