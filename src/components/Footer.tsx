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
    <footer className="bg-[#04060E] border-t border-slate-800/80 py-16 px-6 lg:px-12 text-slate-400 font-sans text-xs">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <NexiivaLogo height={30} />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {isRTL
                ? 'المنظومة الصناعية المعتمدة لمحاكاة مشغلي مصافي النفط والغاز. نكسيفا تحول مخططات P&ID إلى نماذج ديناميكية متكاملة في 7 أيام فقط لتأهيل الكفاءات وحماية الأرواح والمنشآت من كوارث الإغلاق غير المخطط له.'
                : 'Industrial Process Operator Training Simulator (OTS). Built to make plant-specific high-fidelity simulation accessible to every refinery, petrochemical complex, and gas facility in Egypt, the Gulf, and Africa.'}
            </p>
            <div className="text-purple-400 font-mono text-[11px] font-semibold">
              Entrepreneurs Investment Program (EIP) · GEF 2026 Cairo Official Showcase
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3 text-left">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {isRTL ? 'أقسام المنصة الهندسية' : 'NAVIGATION SPECIFICATION'}
            </div>
            <div className="flex flex-col space-y-2 text-slate-400 font-mono text-xs">
              <button onClick={() => scrollTo('simulator-stage')} className="text-left hover:text-white transition-colors cursor-pointer">
                01. {isRTL ? 'محطة التحكم والتدريب' : 'DCS Crisis Console'}
              </button>
              <button onClick={() => scrollTo('economics')} className="text-left hover:text-white transition-colors cursor-pointer">
                02. {isRTL ? 'الجدوى الاقتصادية والوفر' : 'Economics & ROI'}
              </button>
              <button onClick={() => scrollTo('pid-scanner')} className="text-left hover:text-white transition-colors cursor-pointer">
                03. {isRTL ? 'توليف P&ID وموسوعة 387 معدة' : 'P&ID Ingestion & Codex'}
              </button>
              <button onClick={() => scrollTo('journey')} className="text-left hover:text-white transition-colors cursor-pointer">
                04. {isRTL ? 'دورة التدريب والشهادات' : 'Training Lifecycle'}
              </button>
              <button onClick={() => scrollTo('deployment')} className="text-left hover:text-white transition-colors cursor-pointer">
                05. {isRTL ? 'الأمان المعزول (Purdue Model)' : 'Air-Gapped Security'}
              </button>
              <button onClick={() => scrollTo('pricing')} className="text-left hover:text-white transition-colors cursor-pointer">
                06. {isRTL ? 'التسعير وسيرة المؤسس' : 'Commercial & Founder'}
              </button>
            </div>
          </div>

          {/* Leadership & Contact (4 Cols) */}
          <div className="md:col-span-4 space-y-3 text-left">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {isRTL ? 'المكتب الفني للمؤسس' : 'FOUNDER & TECHNICAL OFFICE'}
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="font-semibold text-white">Eng. Mostafa Adel</div>
              <div className="text-slate-400 text-xs font-mono">Founder & Chief Process Simulation Architect</div>
              <div className="text-slate-500 text-[11px]">
                Ex-MIDOR Refinery, Sanmar Chemicals, Agiba Petroleum, Port Harcourt
              </div>
              <div className="pt-3">
                <button
                  onClick={() => setPilotDrawerOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer"
                >
                  {isRTL ? 'طلب تجربة 90 يوماً ($800) ←' : 'Request 90-Day Pilot ($800) →'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Security Notice */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © 2026 NEXIIVA SIMULATION TECHNOLOGIES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-3 font-mono">
            <span>100% AIR-GAPPED COMPLIANT</span>
            <span>·</span>
            <span>ISA-88 / ISA-106 EMULATION</span>
            <span>·</span>
            <span className="text-purple-400">CAIRO, EGYPT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
