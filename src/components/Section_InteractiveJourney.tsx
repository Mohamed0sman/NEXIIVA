import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';
import { Monitor, ShieldAlert, Award, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

export const Section_InteractiveJourney: React.FC = () => {
  const { language } = useSimulationJourney();
  const [activeTab, setActiveTab] = useState<'BUILDER' | 'INSTRUCTOR' | 'TRAINEE'>('BUILDER');

  const isRTL = language === 'AR';

  const handleTabChange = (tab: 'BUILDER' | 'INSTRUCTOR' | 'TRAINEE') => {
    setActiveTab(tab);
    dcsAudio.playClick();
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-12 relative bg-[#090C16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-slate-800 pb-8" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#141A29] border border-slate-700/60 text-slate-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>{isRTL ? 'دورة حياة تدريب المشغلين' : 'THE 3 OPERATIONAL WORKSPACES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
              {isRTL ? 'ابنِ. درّب. واعتمد الكفاءة.' : 'Build. Instruct. Certify.'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isRTL
                ? 'ثلاث محطات تشغيلية متكاملة تربط بين مهندسي العمليات والمدربين ومشغلي غرف التحكم، دون الحاجة لكتابة سطر برمجي واحد.'
                : 'Three dedicated operational workspaces connecting process engineers, plant instructors, and frontline DCS trainees.'}
            </p>
          </div>

          {/* Workspace Switcher */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121726] p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => handleTabChange('BUILDER')}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'BUILDER'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>01. {isRTL ? 'استوديو بناء الوحدات' : 'OTS Builder'}</span>
            </button>

            <button
              onClick={() => handleTabChange('INSTRUCTOR')}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'INSTRUCTOR'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>02. {isRTL ? 'لوحة تحكم المدرب' : 'Instructor Console'}</span>
            </button>

            <button
              onClick={() => handleTabChange('TRAINEE')}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'TRAINEE'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>03. {isRTL ? 'محطة المشغل والشهادة' : 'Trainee DCS & Audit'}</span>
            </button>
          </div>
        </div>

        {/* Real Software Environment Showcase */}
        <div className="rounded-2xl bg-[#0D1222] border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* TAB 1: OTS BUILDER WORKSPACE */}
          {activeTab === 'BUILDER' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-5 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  WORKSPACE 01 // NO-CODE ENGINEERING FLOWSHEET
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  {isRTL
                    ? 'بناء وحدات التكرير المعقدة بالسحب والإفلات خلال أسبوع'
                    : 'Assemble Custom Refining Flowsheets in ~1 Week.'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {isRTL
                    ? 'يقوم مهندسو العمليات بتجميع برج التقطير والمبادلات الحرارية والمضخات ومطابقتها التامة مع مخططات P&ID الخاصة بمحطتك باللغتين العربية والإنجليزية. يدعم النظام أكثر من 387 نوع معدة كيميائية جاهزة للربط.'
                    : 'Process engineers drag-and-drop fractionation towers, fired heaters, and centrifugal pumps to replicate exact plant P&IDs. Choose 100% offline air-gapped configuration or natural-language assisted assembly.'}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Exact ISA-5.1 tag names matched to your control room</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Dynamic Peng-Robinson thermodynamics auto-linked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Available in Arabic and English interface modes</span>
                  </div>
                </div>
              </div>

              {/* Real Software Screenshot: image2.png */}
              <div className="lg:col-span-7 rounded-xl border border-slate-700/80 overflow-hidden bg-black shadow-2xl relative group">
                <img
                  src="/assets/image2.png"
                  alt="NEXIIVA OTS Builder Software Flowsheet"
                  className="w-full h-auto object-contain max-h-[460px]"
                />
                <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-800">
                  REAL RUNNING OTS BUILDER (SLIDE 4)
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTRUCTOR CONSOLE */}
          {activeTab === 'INSTRUCTOR' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-5 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider block">
                  WORKSPACE 02 // REAL-TIME UPSET INJECTION
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  {isRTL
                    ? 'حقن الأعطال والظروف الطارئة دون علم المشغلين'
                    : 'Inject Unannounced Emergency Process Upsets.'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {isRTL
                    ? 'تتيح لوحة تحكم المدرب إرسال سيناريوهات الأعطال الحرجة (مثل توقف مضخات الارتجاع، هبوط ضغط غاز الوقود، انفجار أنابيب الأفران، وفقدان التفريغ) لاختبار سرعة بديهة المشغلين تحت الضغط العصبي الواقعي.'
                    : 'The instructor console injects realistic equipment failures—such as pump motor trips, furnace draft loss, and vacuum ejector failure—without touching live plant hardware. Trainees must diagnose the alarm and respond within safety thresholds.'}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400" />
                    <span>Over 50 unannounced failure modes across 19 process units</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400" />
                    <span>Real-time trainee reaction clock (measured in seconds)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-400" />
                    <span>Independent instructor iPad or desktop station access</span>
                  </div>
                </div>
              </div>

              {/* Real Software Screenshot: Trend Charts */}
              <div className="lg:col-span-7 rounded-xl border border-slate-700/80 overflow-hidden bg-black shadow-2xl relative group">
                <img
                  src="/assets/page_3__Image24_Image24.jpg"
                  alt="12 Live Process Trend Charts"
                  className="w-full h-auto object-contain max-h-[460px]"
                />
                <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-800">
                  12 LIVE TREND DIAGNOSTIC CHARTS
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRAINEE DCS & CERTIFICATE */}
          {activeTab === 'TRAINEE' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="lg:col-span-5 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  WORKSPACE 03 // DCS RECOVERY & AUTOMATED AUDIT
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  {isRTL
                    ? 'تشغيل حقيقي على شاشات DCS واعتِماد فوري للكفاءة'
                    : 'Hands-on DCS Console & Automated Qualification.'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {isRTL
                    ? 'يتعامل المتدرب مع واجهة DCS حقيقية، يتحكم في الصمامات، يبدل المضخات، ويعيد استقرار الوحدة. يقوم النظام آلياً بتسجيل درجات الكفاءة وإصدار شهادة معتمدة مشفرة برقم ترخيص رسمي.'
                    : 'Operators diagnose real alarms, toggle AUTO/MAN faceplates, start standby pumps, and prevent column flaring. The platform automatically grades every action against plant safety envelopes and issues an accredited qualification certificate.'}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Automated Grade-A competency scorecard & audit trail</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Tamper-evident verification hash and printable certificate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Compliant with API 520, ASME Sec. VIII, and IEC 61511</span>
                  </div>
                </div>
              </div>

              {/* Real Software Screenshot: Certificate */}
              <div className="lg:col-span-7 rounded-xl border border-slate-700/80 overflow-hidden bg-black shadow-2xl relative group">
                <img
                  src="/assets/page_3__Image25_Image25.jpg"
                  alt="Official Accredited Certificate Generated Automatically"
                  className="w-full h-auto object-contain max-h-[460px]"
                />
                <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-800">
                  REAL GENERATED OPERATOR CERTIFICATE
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
