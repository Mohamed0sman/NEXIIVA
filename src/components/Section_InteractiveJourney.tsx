import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Monitor, ShieldAlert, Award, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

export const Section_InteractiveJourney: React.FC = () => {
  const { language } = useSimulationJourney();
  const t = translations[language].experience;
  const isRTL = language === 'AR';

  const [activeTab, setActiveTab] = useState<'PRACTICE' | 'INSTRUCT' | 'CERTIFY'>('PRACTICE');

  const handleTabChange = (tab: 'PRACTICE' | 'INSTRUCT' | 'CERTIFY') => {
    setActiveTab(tab);
    dcsAudio.playClick();
  };

  return (
    <section id="journey" className="py-24 px-6 lg:px-12 relative bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-slate-200 pb-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider">
              {t.eyebrow}
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.2] font-sans">
              {t.headingMain}{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                {t.headingItalic}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-sans font-normal leading-relaxed">
              {t.subheading}
            </p>
          </div>

          {/* Pill Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-[#F1F5F9] p-1 rounded-full shrink-0 border border-slate-200">
            <button
              onClick={() => handleTabChange('PRACTICE')}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeTab === 'PRACTICE'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1120]'
              }`}
            >
              01. {isRTL ? 'التدرب (Trainee DCS)' : 'Practice (DCS Console)'}
            </button>
            <button
              onClick={() => handleTabChange('INSTRUCT')}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeTab === 'INSTRUCT'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1120]'
              }`}
            >
              02. {isRTL ? 'التدريب (Instructor)' : 'Instruct (Console)'}
            </button>
            <button
              onClick={() => handleTabChange('CERTIFY')}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeTab === 'CERTIFY'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1120]'
              }`}
            >
              03. {isRTL ? 'الاعتماد (Certify)' : 'Certify (Evaluation)'}
            </button>
          </div>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.pillars.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => handleTabChange(idx === 0 ? 'PRACTICE' : idx === 1 ? 'INSTRUCT' : 'CERTIFY')}
              className={`p-7 rounded-2xl border transition-all cursor-pointer space-y-3 shadow-xs ${
                (idx === 0 && activeTab === 'PRACTICE') ||
                (idx === 1 && activeTab === 'INSTRUCT') ||
                (idx === 2 && activeTab === 'CERTIFY')
                  ? 'bg-white border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#4F46E5]">
                {idx === 0 && <Monitor className="w-5 h-5" />}
                {idx === 1 && <ShieldAlert className="w-5 h-5" />}
                {idx === 2 && <Award className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-bold text-[#0B1120] font-sans">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Tab 1: Practice (Trainee DCS Console Screen) */}
        {activeTab === 'PRACTICE' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#4F46E5] font-bold uppercase tracking-widest block">
                  PILLAR 01 // TRAINEE DCS CONSOLE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B1120] font-sans mt-0.5">
                  {isRTL ? 'شاشات تحكم المشغل DCS ومخططات التدفق PFD' : 'Realistic DCS Process Flow Diagrams & Faceplates'}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                PRODUCTION RUNTIME // LIVE CDU/VDU
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <img
                  src="/assets/image2.png"
                  alt="NEXIIVA Trainee DCS Console Screen"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="lg:col-span-4 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'واجهات تحكم حقيقية' : 'Realistic DCS Faceplates'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.pillars[0].desc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'رسام بياني متعدد القنوات' : '12-Channel Live Trends'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {isRTL
                      ? 'مراقبة درجات الحرارة والضغوط ومعدلات السريان واستجابة مستويات أوعية الفصل لحظة بلحظة.'
                      : 'Track column top temperatures, overhead pressure spikes, and reflux flow dynamics in real time.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Instruct (Instructor Console with Fault Injection) */}
        {activeTab === 'INSTRUCT' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#D97706] font-bold uppercase tracking-widest block">
                  PILLAR 02 // INSTRUCTOR FAULT INJECTION CONSOLE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B1120] font-sans mt-0.5">
                  {isRTL ? 'لوحة تحكم المدرب: حقن الأعطال ومحاكاة الطوارئ الميدانية' : 'Instructor Control Room: Real-Time Scenario Orchestration'}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                INSTRUCTOR CONSOLE // FAULT MATRIX
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <img
                  src="/assets/image1.png"
                  alt="NEXIIVA Instructor Console with Emergency Injection"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="lg:col-span-4 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-2">
                  <div className="text-sm font-bold text-red-700">
                    {isRTL ? 'حقن الأعطال الفورية' : 'Push-Button Emergency Upsets'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.pillars[1].desc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'مراقبة الجلسات الحية' : 'Live Trainee Mirroring'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {isRTL
                      ? 'مراقبة زمن استجابة كل مشغل لكتم الإنذار وبدء مضخة الاحتياط قبل تفاقم الأزمة وتوقف الوحدة.'
                      : 'Mirror trainee screens live, inspect alarm acknowledgement latency, and evaluate corrective actions instantly.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Certify (Automated Evaluation & Credential) */}
        {activeTab === 'CERTIFY' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#059669] font-bold uppercase tracking-widest block">
                  PILLAR 03 // AUDIT-READY AUTOMATED EVALUATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B1120] font-sans mt-0.5">
                  {isRTL ? 'تقييم كفاءة آلي وشهادة إنجاز معتمدة' : 'Tamper-Evident Operator Credential & Audit Rubric'}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                ACCREDITED CERTIFICATE // QR STAMP
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-white p-2">
                <img
                  src="/assets/page_3__Image25_Image25.jpg"
                  alt="NEXIIVA Official Certificate of Achievement"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              <div className="lg:col-span-4 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'معايير تقييم موضوعية' : 'Objective Milestone Rubric'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.pillars[2].desc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'اعتماد ضد التلاعب' : 'Audit & Compliance Ready'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {isRTL
                      ? 'سجل تدريب معتمد بختم رقمي يقدم لشركات التأمين وجهات التفتيش والسلامة المهنية لإثبات كفاءة مشغلي غرف التحكم.'
                      : 'Verifiable credentials provide proof of frontline competency for plant insurers, safety regulators, and internal operations audits.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
