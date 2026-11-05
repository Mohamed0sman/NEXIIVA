import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Monitor, ShieldAlert, Award, CheckCircle2, Sliders, QrCode, FileCheck, Activity, Users, AlertTriangle, Flame, Zap, Gauge, Play } from 'lucide-react';

export const Section_InteractiveJourney: React.FC = () => {
  const { language, setVideoModalOpen } = useSimulationJourney();
  const t = translations[language].experience;
  const isRTL = language === 'AR';

  const [activeTab, setActiveTab] = useState<'PRACTICE' | 'INSTRUCT' | 'CERTIFY'>('PRACTICE');

  const emergencyScenarios = [
    { name: isRTL ? 'فقدان سريان الراجع الكامل' : 'Total Reflux Pump Loss', code: 'S1', icon: Gauge, sev: 'CRITICAL' },
    { name: isRTL ? 'انطفاء شعلة الفرن الحراري' : 'Fired Heater Flame-Out', code: 'S2', icon: Flame, sev: 'EMERGENCY' },
    { name: isRTL ? 'انهيار تفريغ برج VDU' : 'Vacuum System Loss', code: 'S3', icon: AlertTriangle, sev: 'HIGH' },
    { name: isRTL ? 'انقطاع التغذية الكهربائية 03:00' : '03:00 AM Station Blackout', code: 'S4', icon: Zap, sev: 'CATASTROPHIC' },
  ];

  return (
    <section id="capabilities" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 relative bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-[1240px] mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-slate-200 pb-6 sm:pb-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="space-y-2 sm:space-y-3 max-w-3xl">
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

          {/* Pill Tab Switcher (Grid on mobile, flex on desktop) */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 bg-[#F1F5F9] p-1 sm:p-1.5 rounded-2xl sm:rounded-full w-full sm:w-auto border border-slate-200">
            <button
              onClick={() => setActiveTab('PRACTICE')}
              className={`px-2 sm:px-5 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-sans transition-all cursor-pointer text-center truncate ${
                activeTab === 'PRACTICE'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1120]'
              }`}
            >
              01. <span className="hidden sm:inline">{isRTL ? 'التدرب (Trainee DCS)' : 'Practice (DCS Console)'}</span>
              <span className="sm:hidden">{isRTL ? 'التدرب' : 'Practice'}</span>
            </button>
            <button
              onClick={() => setActiveTab('INSTRUCT')}
              className={`px-2 sm:px-5 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-sans transition-all cursor-pointer text-center truncate ${
                activeTab === 'INSTRUCT'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1120]'
              }`}
            >
              02. <span className="hidden sm:inline">{isRTL ? 'التدريب (Instructor)' : 'Instruct (Command Suite)'}</span>
              <span className="sm:hidden">{isRTL ? 'التدريب' : 'Instruct'}</span>
            </button>
            <button
              onClick={() => setActiveTab('CERTIFY')}
              className={`px-2 sm:px-5 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-sans transition-all cursor-pointer text-center truncate ${
                activeTab === 'CERTIFY'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1120]'
              }`}
            >
              03. <span className="hidden sm:inline">{isRTL ? 'الاعتماد (Certify)' : 'Certify (Evaluation)'}</span>
              <span className="sm:hidden">{isRTL ? 'الاعتماد' : 'Certify'}</span>
            </button>
          </div>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.pillars.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(idx === 0 ? 'PRACTICE' : idx === 1 ? 'INSTRUCT' : 'CERTIFY')}
              className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer space-y-2 sm:space-y-3.5 shadow-xs ${
                (idx === 0 && activeTab === 'PRACTICE') ||
                (idx === 1 && activeTab === 'INSTRUCT') ||
                (idx === 2 && activeTab === 'CERTIFY')
                  ? 'bg-white border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-md -translate-y-0.5'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#4F46E5]">
                {idx === 0 && <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />}
                {idx === 1 && <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />}
                {idx === 2 && <Award className="w-5 h-5 sm:w-6 sm:h-6" />}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B1120] font-sans">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Tab 1: Practice (Trainee DCS Console Screen) */}
        {activeTab === 'PRACTICE' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-8 lg:p-10 space-y-5 sm:space-y-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-slate-100 pb-3 sm:pb-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#4F46E5] font-bold uppercase tracking-widest block">
                  CAPABILITY 01 // TRAINEE DCS OPERATOR WORKSTATION
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-[#0B1120] font-sans mt-0.5">
                  {isRTL ? 'بيئة تشغيل DCS مطابقة للأنظمة العالمية (DeltaV / Experion / Centum VP)' : 'Realistic DCS Process Flow Diagrams, Faceplates & Live Trends'}
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
                PRODUCTION RUNTIME // LIVE CDU/VDU
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-8 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-md sm:shadow-lg bg-black relative group">
                <img
                  src="/assets/youtube_demo_thumb.jpg"
                  alt="NEXIIVA Trainee DCS Console Screen"
                  className="w-full h-auto object-cover"
                />
                {/* Clean Centered Play Button (No giant overlay text on mobile) */}
                <button
                  onClick={() => setVideoModalOpen(true)}
                  aria-label="Play Walkthrough"
                  className="absolute inset-0 m-auto w-12 h-12 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold flex items-center justify-center sm:space-x-2 sm:space-x-reverse shadow-xl cursor-pointer group-hover:scale-105 transition-all"
                >
                  <Play className="w-5 h-5 sm:w-3.5 sm:h-3.5 fill-current text-[#4F46E5] ml-0.5 sm:ml-0" />
                  <span className="hidden sm:inline">{isRTL ? 'مشاهدة واجهات التحكم أثناء التشغيل الحي' : 'Watch Live Control Valves & Trends in Action'}</span>
                </button>
              </div>

              <div className="lg:col-span-4 space-y-3 sm:space-y-4 font-sans text-xs">
                <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'واجهات تحكم تفاعلية للصمامات والمضخات' : 'Realistic Industrial Faceplates'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {isRTL
                      ? 'واجهات تحكم مطابقة لأنظمة غرف التحكم الكبرى تتيح التبديل بين الأوتوماتيك واليدوي (Auto/Manual/Cascade) وضبط قيم الإخراج ونقاط التحديد (SP & Output).'
                      : 'Interactive faceplates featuring Auto/Manual/Cascade modes, setpoint adjustment, output ramping, and tracking alarms.'}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'راسم إشارات متعدد القنوات (12-Channel Trends)' : '12-Channel High-Speed Trend Recorders'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {isRTL
                      ? 'مراقبة فورية لديناميكا درجات الحرارة والضغوط ومعدلات السريان واستجابة مستويات أوعية الفصل لحظة بلحظة لكشف أي خلل مبكراً.'
                      : 'Continuous high-frequency tracking of column top temperatures, overhead pressure surges, and reflux flow dynamics.'}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'إدارة الإنذارات وفق معيار ISA-18.2' : 'ISA-18.2 Alarm Management'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {isRTL
                      ? 'تأهيل المشغلين للتعامل مع فيضان الإنذارات وحالات الطوارئ دون ارتباك أو تأخر في اتخاذ القرار.'
                      : 'Equips operators to handle alarm floods calmly, acknowledge priority alarms, and suppress non-critical warnings.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Instruct (Instructor Command Suite) */}
        {activeTab === 'INSTRUCT' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-8 lg:p-10 space-y-5 sm:space-y-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-slate-100 pb-3 sm:pb-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#D97706] font-bold uppercase tracking-widest block">
                  CAPABILITY 02 // INSTRUCTOR COMMAND SUITE
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-[#0B1120] font-sans mt-0.5">
                  {isRTL ? 'لوحة تحكم المدرب: إدارة السيناريوهات وحقن أعطال العمليات' : 'Instructor Scenario Orchestration & Real-Time Fault Injection'}
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
                50+ INDUSTRIAL FAULT SCENARIOS
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-md sm:shadow-lg bg-black">
                  <img
                    src="/assets/image1.png"
                    alt="NEXIIVA Instructor Console with Emergency Injection"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Preconfigured Fault Scenarios Carousel Grid */}
                <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2.5 sm:space-y-3">
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#0B1120] uppercase tracking-wider block">
                    {isRTL ? 'كتالوج حالات الطوارئ المعدة مسبقاً:' : 'Preconfigured Casualty Scenarios Ready to Inject:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {emergencyScenarios.map((sc, si) => (
                      <div key={si} className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 space-x-reverse min-w-0">
                          <sc.icon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="font-sans font-medium text-slate-800 text-[11px] sm:text-xs truncate">{sc.name}</span>
                        </div>
                        <span className="font-mono text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 font-bold border border-rose-100 shrink-0">
                          {sc.sev}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3 sm:space-y-4 font-sans text-xs">
                <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'حقن الأعطال واضطرابات العمليات لحظياً' : '50+ Industrial Fault Scenarios'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {isRTL
                      ? 'يمكن للمدرب إطلاق سيناريوهات معقدة مثل: فقدان سريان الراجع بالكامل، هبوط التفريغ في وحدة VDU، توقف مضخة التغذية الرئيسية، انطفاء شعلة الفرن F-101، أو تسريب صمام الأمان.'
                      : 'Inject realistic operational crises: total reflux pump trip, vacuum system collapse, crude feed pump failure, furnace flame-out, or control valve sticking.'}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'مراقبة وتجميد الجلسات (Freeze & Step-Forward)' : 'Session Mirroring & Freeze Controls'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {isRTL
                      ? 'مراقبة شاشات المتدربين في الوقت الفعلي مع القدرة على تجميد الوقت لمناقشة الإجراءات الخاطئة والرجوع لنقطة البداية.'
                      : 'Live mirroring of all trainee workstations, with instant pause/freeze capability to debrief on critical missteps before resuming.'}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'تدريب مخصص لفرق المناوبة والورديات' : 'Shift Crew Team Coordination'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {isRTL
                      ? 'إجراء تدريبات جماعية تحاكي التنسيق بين مشغل غرفة التحكم (Console Operator) ومشغلي الموقع الخارجي (Field Operators).'
                      : 'Multi-seat training scenarios simulating communication and handoffs between console operators and field technicians.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Certify (Automated Evaluation & Competency Certification) */}
        {activeTab === 'CERTIFY' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-8 lg:p-10 space-y-5 sm:space-y-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-slate-100 pb-3 sm:pb-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#059669] font-bold uppercase tracking-widest block">
                  CAPABILITY 03 // AUTOMATED COMPETENCY CERTIFICATION
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-[#0B1120] font-sans mt-0.5">
                  {isRTL ? 'التقييم الخوارزمي الموضوعي والشهادات الرقمية المعتمدة' : 'Automated ISA-106 Competency Scoring & Tamper-Proof Certification'}
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
                AUDIT-READY COMPLIANCE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Certificate Preview Card */}
              <div className="lg:col-span-7 p-4 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-[#0B1120] to-[#070B14] border border-slate-800 text-white shadow-xl sm:shadow-2xl space-y-4 sm:space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] pointer-events-none" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 relative z-10">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#7C3AED]" />
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-white tracking-widest">
                      NEXIIVA // CERTIFICATE
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono bg-emerald-950/90 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    VERIFIED // GRADE: 94.6%
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3 relative z-10">
                  <div className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {isRTL ? 'المشغل المعتمد والمنشأة الصناعية:' : 'Certified Console Operator & Plant:'}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold font-sans text-white">
                    Eng. Ahmed Mansour
                  </div>
                  <div className="text-[11px] sm:text-xs text-indigo-300 font-sans">
                    MIDOR Coastal Refinery — Atmospheric & Vacuum Distillation Complex
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs font-mono pt-3 sm:pt-4 border-t border-slate-800 relative z-10">
                  <div>
                    <span className="text-slate-500 text-[9px] sm:text-[10px] block">STANDARD</span>
                    <span className="text-white font-bold text-[11px] sm:text-xs">ISA-106</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] sm:text-[10px] block">RESPONSE TIME</span>
                    <span className="text-emerald-400 font-bold text-[11px] sm:text-xs">14.2s</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] sm:text-[10px] block">SAFETY TRIPS</span>
                    <span className="text-white font-bold text-[11px] sm:text-xs">0 TRIPS</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] sm:text-[10px] block">VERIFICATION</span>
                    <span className="text-[#06B6D4] font-bold text-[11px] sm:text-xs">VALID QR</span>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-slate-800 flex items-center justify-between text-xs text-slate-400 relative z-10">
                  <span className="font-sans text-[10px] sm:text-[11px] leading-relaxed max-w-sm">
                    {isRTL ? 'شهادة رقمية رسمية بختم التحقق الصالح لتدقيقات السلامة وشركات التأمين الدولية.' : 'Accepted for insurance underwriting & plant audit compliance.'}
                  </span>
                  <div className="p-1.5 sm:p-2 bg-white rounded-lg sm:rounded-xl text-[#0B1120] shrink-0">
                    <QrCode className="w-5 h-5 sm:w-7 sm:h-7 text-[#0B1120]" />
                  </div>
                </div>
              </div>

              {/* Explanatory Cards */}
              <div className="lg:col-span-5 space-y-3 sm:space-y-4 font-sans text-xs">
                <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'تقييم موضوعي دون تحيز بشري' : 'Algorithmic Competency Scoring'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {isRTL
                      ? 'يتم رصد وتسجيل كل حركة يقوم بها المتدرب بدقة جزء من الثانية ومقارنتها بكتيب إجراءات التشغيل القياسية (SOP) ومعايير السلامة.'
                      : 'Every valve stroke, setpoint adjustment, and reaction timestamp is logged and graded against safe operating envelope limits.'}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1.5 sm:space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-[#0B1120]">
                    {isRTL ? 'سجلات تدقيق جاهزة للتفتيش والتأمين' : 'Audit-Ready Regulatory Compliance'}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {isRTL
                      ? 'توفر نكسيفا تقارير مفصلة للمديرين تفيد بأن مشغلي غرف التحكم أتموا بنجاح محاكاة حالات الطوارئ القصوى مما يساعد في خفض أقساط التأمين.'
                      : 'Provides documented evidence that operators have successfully managed severe casualty scenarios, satisfying insurer and safety regulator requirements.'}
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
