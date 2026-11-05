import React from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

export const Footer: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#fafafb] border-t border-[#ececec] py-16 px-4 sm:px-6 lg:px-10 text-[#777b86] font-sans text-xs">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <NexiivaLogo height={26} />
            <p className="text-[#777b86] text-xs leading-relaxed max-w-sm">
              {isRTL
                ? 'المنظومة الصناعية المتخصصة لمحاكاة مشغلي مصافي النفط والغاز والبتروكيماويات. تحول نكسيفا مخططات P&ID وفلسفة التحكم إلى توائم رقمية واقعية لتأهيل الكفاءات وحماية المنشآت من كوارث الإغلاق غير المخطط له.'
                : 'Industrial Process Operator Training Simulator (OTS). Built to make plant-specific high-fidelity dynamic simulation accessible to every refinery, petrochemical complex, and gas facility in Egypt, the Middle East, and worldwide.'}
            </p>
            <div className="text-[#979799] font-mono text-[11px] font-medium">
              Entrepreneurs Investment Program (EIP) · Official Showcase 2026
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3 text-left">
            <div className="text-xs font-sans font-semibold text-[#0B1120] uppercase tracking-wider">
              {isRTL ? 'أقسام المنصة' : 'Platform Navigation'}
            </div>
            <div className="flex flex-col space-y-2 text-[#64748B] font-sans text-xs">
              <button
                onClick={() => scrollTo('about')}
                className="text-left hover:text-[#4F46E5] transition-colors cursor-pointer"
              >
                01. {isRTL ? 'عن نكسيفا ورؤيتنا' : 'About Nexiiva & Mission'}
              </button>
              <button onClick={() => scrollTo('operational-reality')} className="text-left hover:text-[#4F46E5] transition-colors cursor-pointer">
                02. {isRTL ? 'الواقع التشغيلي والبدائل' : 'The Operational Reality & ROI'}
              </button>
              <button onClick={() => scrollTo('ots-builder')} className="text-left hover:text-[#4F46E5] transition-colors cursor-pointer">
                03. {isRTL ? 'منشئ OTS ومكتبة 387 معدة' : 'OTS Builder & 387 Equipment'}
              </button>
              <button onClick={() => scrollTo('capabilities')} className="text-left hover:text-[#4F46E5] transition-colors cursor-pointer">
                04. {isRTL ? 'قدرات المنظومة (المشغل، المدرب، الاعتماد)' : 'Platform Capabilities'}
              </button>
              <button onClick={() => scrollTo('deployment')} className="text-left hover:text-[#4F46E5] transition-colors cursor-pointer">
                05. {isRTL ? 'الأمان والنشر المعزول' : 'Security Architecture & Deployment'}
              </button>
              <button onClick={() => scrollTo('subscribe')} className="text-left hover:text-[#4F46E5] transition-colors cursor-pointer text-[#4F46E5] font-semibold">
                06. {isRTL ? 'طريقة الاشتراك ومسار البدء' : 'How to Subscribe & Onboarding'}
              </button>
            </div>
          </div>

          {/* Leadership & Contact (4 Cols) */}
          <div className="md:col-span-4 space-y-3 text-left">
            <div className="text-xs font-sans font-semibold text-[#0B1120] uppercase tracking-wider">
              {isRTL ? 'المكتب الفني والاشتراكات' : 'Technical & Subscription Desk'}
            </div>
            <div className="space-y-1.5 text-[#0B1120]">
              <div className="font-bold text-[#0B1120] text-sm">Eng. Mostafa Adel</div>
              <div className="text-[#64748B] text-xs">Founder & CEO — Lead Process Simulation Architect</div>
              <div className="text-[#94A3B8] text-[11px]">
                Ex-MIDOR Refinery, Sanmar Chemicals, Agiba Petroleum, Port Harcourt
              </div>
              <div className="pt-3">
                <button
                  onClick={() => setPilotDrawerOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white text-xs font-semibold transition-all shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] cursor-pointer"
                >
                  {isRTL ? 'الاشتراك وبدء التجربة ←' : 'Subscribe & Start Pilot →'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Security Notice */}
        <div className="border-t border-[#ececec] pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#979799] gap-3">
          <div>
            © 2026 NEXIIVA SIMULATION TECHNOLOGIES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-3 font-mono">
            <span>100% AIR-GAPPED COMPLIANT</span>
            <span>·</span>
            <span>ISA-88 / ISA-106 EMULATION</span>
            <span>·</span>
            <span className="text-[#777b86]">CAIRO, EGYPT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
