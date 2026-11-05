import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Monitor, ShieldAlert, Award, ArrowRight, Eye, CheckCircle2, Sliders, AlertTriangle, RefreshCw, QrCode } from 'lucide-react';

export const Section_InteractiveJourney: React.FC = () => {
  const {
    language,
    setActiveFaceplate,
    setSimulatorModalOpen,
    injectFault,
    resetSimulation,
    telemetry,
  } = useSimulationJourney();
  const t = translations[language].experience;
  const isRTL = language === 'AR';

  const [activeTab, setActiveTab] = useState<'PRACTICE' | 'INSTRUCT' | 'CERTIFY'>('PRACTICE');
  const [injectedFault, setInjectedFault] = useState<string | null>(null);
  const [traineeSimStatus, setTraineeSimStatus] = useState<'IDLE' | 'RESPONDING' | 'RECOVERED'>('IDLE');
  const [customCertName, setCustomCertName] = useState('Ahmed Mansour');
  const [customFacility, setCustomFacility] = useState(isRTL ? 'مصفاة الإسكندرية للبترول' : 'MIDOR Coastal Refinery');

  const handleTabChange = (tab: 'PRACTICE' | 'INSTRUCT' | 'CERTIFY') => {
    setActiveTab(tab);
    dcsAudio.playClick();
  };

  const handleInjectFault = (faultName: string) => {
    setInjectedFault(faultName);
    setTraineeSimStatus('RESPONDING');
    if (faultName === 'FURNACE FLAME-OUT') {
      injectFault('S2');
    } else if (faultName === 'COLUMN OVERPRESSURE') {
      injectFault('S3');
    } else {
      injectFault('S1');
    }
    dcsAudio.playRelaySwitch();
  };

  const handleClearFault = () => {
    setInjectedFault(null);
    setTraineeSimStatus('RECOVERED');
    resetSimulation();
    dcsAudio.playSuccess();
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
              <div className="lg:col-span-8 rounded-xl overflow-hidden border border-slate-200 shadow-xs relative group">
                <img
                  src="/assets/image2.png"
                  alt="NEXIIVA Trainee DCS Console Screen"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => {
                      dcsAudio.playClick();
                      setSimulatorModalOpen(true);
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center space-x-2 space-x-reverse"
                  >
                    <span>{isRTL ? 'تشغيل المحاكي التفاعلي بالكامل' : 'Launch Fullscreen Console'}</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
                  <div className="text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'واجهات تحكم حقيقية' : 'Realistic DCS Faceplates'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.pillars[0].desc}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        dcsAudio.playClick();
                        setActiveFaceplate('FV-102');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#4F46E5] font-semibold text-xs border border-purple-200 transition-colors cursor-pointer flex items-center space-x-1.5 space-x-reverse"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>{isRTL ? 'اختبر واجهة الصمام FV-102 الآن' : 'Test Reflux Valve FV-102 Faceplate'}</span>
                    </button>
                  </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <img
                  src="/assets/image1.png"
                  alt="NEXIIVA Instructor Console with Emergency Injection"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Interactive Fault Injection Trigger Sandbox */}
              <div className="lg:col-span-5 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-xl bg-gradient-to-b from-purple-500/5 to-blue-500/5 border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0B1120] flex items-center space-x-1.5 space-x-reverse">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      <span>{isRTL ? 'منصة حقن الأعطال التفاعلية' : 'Live Fault Injection Sandbox'}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${injectedFault ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-emerald-100 text-emerald-700'}`}>
                      {injectedFault ? (isRTL ? 'اضطراب نشط' : 'ACTIVE UPSET') : (isRTL ? 'حالة مستقرة' : 'STABLE')}
                    </span>
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    {isRTL
                      ? 'اضغط لحقن أي عطل طارئ ولاحظ استجابة مؤشرات المشغل في لوحة التحكم:'
                      : 'Simulate instant process upsets to test operator alarm response time and corrective procedure:'}
                  </p>

                  {/* Fault Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleInjectFault('REFLUX LOSS (P-101)')}
                      className={`w-full p-2.5 rounded-lg border text-left font-mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                        injectedFault === 'REFLUX LOSS (P-101)'
                          ? 'bg-rose-50 border-rose-400 text-rose-800 font-bold'
                          : 'bg-white border-slate-200 hover:border-rose-300 text-slate-700'
                      }`}
                    >
                      <span>⚡ {isRTL ? 'توقف مضخة الراجع P-101A' : 'Trip Reflux Pump P-101A'}</span>
                      <span className="text-[10px] text-rose-600 font-bold">REFLUX TRIP</span>
                    </button>

                    <button
                      onClick={() => handleInjectFault('FURNACE FLAME-OUT')}
                      className={`w-full p-2.5 rounded-lg border text-left font-mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                        injectedFault === 'FURNACE FLAME-OUT'
                          ? 'bg-amber-50 border-amber-400 text-amber-800 font-bold'
                          : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                      }`}
                    >
                      <span>🔥 {isRTL ? 'انطفاء شعلة الفرن F-101' : 'Furnace Flame-Out (F-101)'}</span>
                      <span className="text-[10px] text-amber-600 font-bold">FLAME-OUT</span>
                    </button>

                    <button
                      onClick={() => handleInjectFault('COLUMN OVERPRESSURE')}
                      className={`w-full p-2.5 rounded-lg border text-left font-mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                        injectedFault === 'COLUMN OVERPRESSURE'
                          ? 'bg-rose-50 border-rose-400 text-rose-800 font-bold'
                          : 'bg-white border-slate-200 hover:border-rose-300 text-slate-700'
                      }`}
                    >
                      <span>⚠️ {isRTL ? 'ارتفاع ضغط البرج (PIC-104)' : 'Overpressure Spike (PIC-104)'}</span>
                      <span className="text-[10px] text-rose-600 font-bold">PRESSURE SPIKE</span>
                    </button>
                  </div>

                  {injectedFault && (
                    <div className="pt-2 border-t border-rose-200 flex items-center justify-between">
                      <span className="text-[11px] text-rose-700 font-mono">
                        {isRTL ? 'زمن رد فعل المشغل المستهدف: <35 ثانية' : 'Target Operator Latency: <35s'}
                      </span>
                      <button
                        onClick={handleClearFault}
                        className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-xs flex items-center space-x-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{isRTL ? 'استعادة الوحدة' : 'Recover Unit'}</span>
                      </button>
                    </div>
                  )}
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
              <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-white p-2">
                <img
                  src="/assets/page_3__Image25_Image25.jpg"
                  alt="NEXIIVA Official Certificate of Achievement"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* Dynamic Credential Configurator & Preview */}
              <div className="lg:col-span-5 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-500/5 to-teal-500/5 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0B1120] flex items-center space-x-1.5 space-x-reverse">
                      <QrCode className="w-4 h-4 text-emerald-600" />
                      <span>{isRTL ? 'بيانات الاعتماد الرقمي للمشغل' : 'Digital Credential Verification'}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700">
                      ISA-106 ACCREDITED
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                        {isRTL ? 'اسم المشغل أو المتدرب:' : 'TRAINEE OPERATOR NAME:'}
                      </label>
                      <input
                        type="text"
                        value={customCertName}
                        onChange={(e) => setCustomCertName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-[#0B1120] font-sans outline-none focus:border-[#4F46E5]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                        {isRTL ? 'المنشأة الصناعية / المصفاة:' : 'OPERATIONAL FACILITY / REFINERY:'}
                      </label>
                      <input
                        type="text"
                        value={customFacility}
                        onChange={(e) => setCustomFacility(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-[#0B1120] font-sans outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">STATUS:</span>
                      <span className="text-emerald-600 font-bold">100% PASS (GRADE A)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">VERIFICATION HASH:</span>
                      <span className="text-slate-600">SHA-256 // NX-9842F</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">FLARING AUDIT:</span>
                      <span className="text-emerald-600 font-bold">ZERO FLARING RECORDED</span>
                    </div>
                  </div>
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
