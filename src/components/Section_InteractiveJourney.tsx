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
    <section id="journey" className="py-24 px-6 lg:px-12 relative bg-[#fafafb] border-t border-[#ececec]">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-[#ececec] pb-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-sans text-[#979799] uppercase tracking-wider">
              {isRTL ? 'دورة حياة تدريب المشغلين' : 'THE 3 OPERATIONAL WORKSPACES'}
            </div>
            <h2
              className={`text-4xl sm:text-5xl font-normal text-[#17191c] tracking-[-0.02em] leading-[1.2] ${
                isRTL ? 'font-serif-ar' : 'font-serif'
              }`}
            >
              {isRTL ? (
                <>
                  ابنِ. درّب.{' '}
                  <span className="italic text-[#5d2a1a]">واعتمد الكفاءة.</span>
                </>
              ) : (
                <>
                  Build. Instruct.{' '}
                  <span className="italic text-[#5d2a1a]">Certify.</span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg text-[#777b86] font-sans font-normal leading-[1.45]">
              {isRTL
                ? 'شاشات حقيقية من المنظومة المعتمدة: بناء التدفق الهندسي، حقن الأعطال والسيناريوهات الحية، وإصدار شهادات الكفاءة المعتمدة.'
                : 'Production screens from the running platform: visually wire units, inject live furnace and pump trips, and mint tamper-evident competency credentials.'}
            </p>
          </div>

          {/* Steep Pill Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-[#f2f2f3] p-1 rounded-full shrink-0">
            <button
              onClick={() => handleTabChange('BUILDER')}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeTab === 'BUILDER'
                  ? 'bg-[#17191c] text-white font-medium shadow-sm'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
            >
              01. {isRTL ? 'بناء التدفق (OTS Builder)' : 'OTS Builder'}
            </button>
            <button
              onClick={() => handleTabChange('INSTRUCTOR')}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeTab === 'INSTRUCTOR'
                  ? 'bg-[#17191c] text-white font-medium shadow-sm'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
            >
              02. {isRTL ? 'لوحة المدرب وحقن الأعطال' : 'Instructor & Faults'}
            </button>
            <button
              onClick={() => handleTabChange('TRAINEE')}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeTab === 'TRAINEE'
                  ? 'bg-[#17191c] text-white font-medium shadow-sm'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
            >
              03. {isRTL ? 'شهادة التقييم الرقمية' : 'Digital Certificate'}
            </button>
          </div>
        </div>

        {/* Tab 1: OTS Builder Floating Product Artifact */}
        {activeTab === 'BUILDER' && (
          <div className="bg-white rounded-[24px] border border-[#ececec] shadow-artifact p-6 sm:p-8 space-y-6 animate-fadeIn text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f2f2f3] pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#059669] font-bold uppercase tracking-widest block">
                  STAGE 01 // OTS BUILDER WORKSPACE
                </span>
                <h3 className="text-xl sm:text-2xl font-normal text-[#17191c] font-sans mt-0.5">
                  {isRTL ? 'بناء وتخصيص وحدات التكرير بالسحب والإفلات' : 'Visual Refinery Flowsheet Assembly & Calibration'}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#777b86] bg-[#f2f2f3] px-3 py-1 rounded-full">
                PRODUCTION SCREEN // DECK SLIDE 04
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 rounded-[16px] overflow-hidden border border-[#e2e8f0] shadow-sm">
                <img
                  src="/assets/image2.png"
                  alt="NEXIIVA CDU/VDU OTS Builder Screen"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="lg:col-span-4 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-[16px] bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                  <div className="text-sm font-medium text-[#17191c]">387 Drag-and-Drop Primitives</div>
                  <p className="text-[#777b86] leading-relaxed">
                    {isRTL
                      ? 'مكتبة شاملة تغطي أعقد معدات المعالجة: أبراج التقطير المجزأ، أفران التسخين، المبادلات الحرارية، وضواغط الغاز مع معادلات التوازن الكيميائي اللحظية.'
                      : 'Comprehensive library covering crude fractionators, fired heaters, centrifugal pumps, and control valves with real-time Peng-Robinson thermodynamics.'}
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                  <div className="text-sm font-medium text-[#17191c]">Fast Calibration Mode</div>
                  <p className="text-[#777b86] leading-relaxed">
                    {isRTL
                      ? 'تعديل متغيرات التشغيل ونقاط الغليان ومعدل سريان التغذية مباشرة لمطابقة بيانات مصفاتك الحقيقية بنسبة 100%.'
                      : 'Match operating temperatures, tray cuts, and reflux ratios directly to your plant laboratory assays.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Instructor Console Floating Product Artifact */}
        {activeTab === 'INSTRUCTOR' && (
          <div className="bg-white rounded-[24px] border border-[#ececec] shadow-artifact p-6 sm:p-8 space-y-6 animate-fadeIn text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f2f2f3] pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#d97706] font-bold uppercase tracking-widest block">
                  STAGE 02 // INSTRUCTOR EMERGENCY FAULT INJECTION
                </span>
                <h3 className="text-xl sm:text-2xl font-normal text-[#17191c] font-sans mt-0.5">
                  {isRTL ? 'غرفة عمليات المدرب: حقن الأعطال وحالات الطوارئ الفورية' : 'Instructor Control Room: Real-Time Scenario Orchestration'}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#777b86] bg-[#f2f2f3] px-3 py-1 rounded-full">
                PRODUCTION SCREEN // DECK SLIDE 03
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 rounded-[16px] overflow-hidden border border-[#e2e8f0] shadow-sm">
                <img
                  src="/assets/image1.png"
                  alt="NEXIIVA Instructor Console with Emergency Injection"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="lg:col-span-4 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-[16px] bg-[#fef2f2] border border-[#fecaca] space-y-2">
                  <div className="text-sm font-medium text-[#dc2626]">Emergency Fault Injection Matrix</div>
                  <p className="text-[#777b86] leading-relaxed">
                    {isRTL
                      ? 'أزرار طوارئ فورية تتيح للمدرب اختبار استجابة المشغل: توقف مضخة الراجع (Reflux Loss)، انقطاع البخار، انطفاء شعلة الفرن، أو انسداد صمامات التغذية.'
                      : 'Push-button upsets allow instructors to simulate midnight casualties: Reflux Pump Trips, Furnace Flameouts, Instrument Air Loss, and Vacuum Leaks.'}
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                  <div className="text-sm font-medium text-[#17191c]">Live Multi-Trainee Monitoring</div>
                  <p className="text-[#777b86] leading-relaxed">
                    {isRTL
                      ? 'مراقبة حركة كل متدرب على حدة ورصد زمن الاستجابة قبل تفاقم الأزمة ووصول الضغط لصمام الأمان.'
                      : 'Track each shift trainee in real-time, monitoring alarm acknowledgement latency and valve response curves.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Official Certified Achievement Artifact */}
        {activeTab === 'TRAINEE' && (
          <div className="bg-white rounded-[24px] border border-[#ececec] shadow-artifact p-6 sm:p-8 space-y-6 animate-fadeIn text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f2f2f3] pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#059669] font-bold uppercase tracking-widest block">
                  STAGE 03 // AUDIT-READY COMPETENCY CERTIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-normal text-[#17191c] font-sans mt-0.5">
                  {isRTL ? 'شهادة كفاءة معتمدة رقمياً ومقاومة للتزوير' : 'Tamper-Evident Operator Credential & Audit Rubric'}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#777b86] bg-[#f2f2f3] px-3 py-1 rounded-full">
                OFFICIAL SYSTEM CERTIFICATE // PAGE 3 DECK
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 rounded-[16px] overflow-hidden border border-[#e2e8f0] shadow-sm bg-white p-2">
                <img
                  src="/assets/page_3__Image25_Image25.jpg"
                  alt="NEXIIVA Official Certificate of Achievement"
                  className="w-full h-auto object-contain rounded-[12px]"
                />
              </div>

              <div className="lg:col-span-4 space-y-4 font-sans text-xs">
                <div className="p-4 rounded-[16px] bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                  <div className="text-sm font-medium text-[#17191c]">Objective Rubric Scoring</div>
                  <p className="text-[#777b86] leading-relaxed">
                    {isRTL
                      ? 'تقييم آلي دقيق لخطوات استعادة الوحدة: زمن كتم الإنذار، التحكم في منسوب القاع، وإعادة تشغيل المضخة الاحتياطية بنجاح.'
                      : 'Automatic rubric grading evaluates every milestone: alarm acknowledge speed, column level safety bounds, and pump changeover sequence.'}
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                  <div className="text-sm font-medium text-[#17191c]">Insurance & Audit Compliance</div>
                  <p className="text-[#777b86] leading-relaxed">
                    {isRTL
                      ? 'سجل تدريب معتمد يقدم لشركات التأمين وجهات التفتيش والسلامة المهنية لإثبات كفاءة مشغلي غرف التحكم.'
                      : 'Verifiable credentials provide proof of frontline competency for plant insurers, OSHA compliance, and internal operations audits.'}
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
