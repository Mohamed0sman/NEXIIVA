import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { ShieldCheck, Cpu, Layers, Award, Factory, Target, Users, CheckCircle2, Quote, Sparkles } from 'lucide-react';

export const Section_AboutCompany: React.FC = () => {
  const { language } = useSimulationJourney();
  const t = translations[language].about;
  const tFounder = translations[language].founder;
  const isRTL = language === 'AR';

  return (
    <section id="about" className="py-24 px-6 lg:px-12 relative bg-[#F8FAFC] border-t border-slate-200">
      {/* Precision Background Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 space-x-reverse text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.2] font-sans">
            {t.headingMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent inline-block">
              {t.headingItalic}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 4 Prominent Company Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#4F46E5]/40 hover:-translate-y-1 transition-all duration-300 text-center space-y-1.5 relative overflow-hidden group"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="text-3xl sm:text-4xl font-black font-sans bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                {m.value}
              </div>
              <div className="text-sm font-bold text-[#0B1120] font-sans">
                {m.label}
              </div>
              <div className="text-xs text-slate-500 font-sans">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Company Narrative & The Industry Gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Card 1: The Problem & Our Mission */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col justify-between space-y-6 text-left relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse text-[#4F46E5] font-semibold text-xs tracking-wider uppercase font-mono">
                <Factory className="w-4 h-4" />
                <span>{isRTL ? 'المهمة والرؤية الصناعية' : 'INDUSTRIAL MISSION & PURPOSE'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1120] font-sans tracking-tight leading-snug">
                {t.storyTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                {t.storyBody}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700 font-medium">
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

          {/* Card 2: Founder & Field Credentials */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1120] to-[#070B14] rounded-3xl border border-slate-800 p-8 sm:p-10 shadow-xl text-white flex flex-col justify-between space-y-6 text-left relative overflow-hidden">
            {/* Ambient Violet Radial Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_70%)] pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <div className="flex items-center space-x-2 space-x-reverse text-emerald-400 font-semibold text-xs tracking-wider uppercase font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>{tFounder.badge}</span>
              </div>

              {/* Founder Header with Monogram Seal */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white flex items-center justify-center font-bold text-lg font-mono shadow-md shrink-0">
                  MA
                </div>
                <div>
                  <h3 className="text-xl font-bold font-sans text-white">
                    Eng. Mostafa Adel
                  </h3>
                  <div className="text-xs text-indigo-300 font-sans mt-0.5">
                    {isRTL ? 'المؤسس والمدير التنفيذي — مهندس عمليات وتكرير أول' : 'Founder & CEO — Lead Process Operations Engineer'}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans relative">
                <Quote className="w-5 h-5 text-indigo-400/40 mb-1" />
                <p>{tFounder.body}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2.5 relative z-10">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                {isRTL ? 'المنشآت والمصافي التي تم العمل بها ميدانياً:' : 'Frontline Plant Operating Pedigree:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {tFounder.verified.map((plant, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-sans font-medium border border-white/5"
                  >
                    {plant}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
