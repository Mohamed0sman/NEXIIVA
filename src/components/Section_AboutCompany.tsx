import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { ShieldCheck, Cpu, Layers, Award, Factory, Target, Users, CheckCircle2 } from 'lucide-react';

export const Section_AboutCompany: React.FC = () => {
  const { language } = useSimulationJourney();
  const t = translations[language].about;
  const tFounder = translations[language].founder;
  const isRTL = language === 'AR';

  return (
    <section id="about" className="py-24 px-6 lg:px-12 relative bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-[1240px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-sans font-bold text-[#4F46E5] uppercase tracking-wider">
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.18] font-sans">
            {t.headingMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
              {t.headingItalic}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 4 Prominent Company Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs text-center space-y-1 hover:border-[#4F46E5]/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold font-sans bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
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
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse text-[#4F46E5] font-semibold text-xs tracking-wider uppercase font-mono">
                <Factory className="w-4 h-4" />
                <span>{isRTL ? 'المهمة والرؤية الصناعية' : 'INDUSTRIAL MISSION & PURPOSE'}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0B1120] font-sans tracking-tight">
                {t.storyTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                {t.storyBody}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
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
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1120] to-[#070B14] rounded-2xl border border-slate-800 p-8 sm:p-10 shadow-lg text-white flex flex-col justify-between space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center space-x-2 space-x-reverse text-emerald-400 font-semibold text-xs tracking-wider uppercase font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>{tFounder.badge}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold font-sans text-white">
                  Eng. Mostafa Adel
                </h3>
                <div className="text-xs text-indigo-300 font-sans">
                  {isRTL ? 'المؤسس والمدير التنفيذي — مهندس عمليات وتكرير أول' : 'Founder & CEO — Senior Process Operations Engineer'}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {tFounder.body}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 relative z-10">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                {isRTL ? 'المنشآت والمصافي التي تم العمل بها ميدانياً:' : 'Frontline Plant Operating Pedigree:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tFounder.verified.map((plant, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-white/10 text-slate-200 text-[11px] font-sans font-medium border border-white/5"
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
