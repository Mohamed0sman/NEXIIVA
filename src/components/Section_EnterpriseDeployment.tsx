import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { ShieldCheck, Lock, Server, Cloud, Network, CheckCircle2, AlertOctagon, Terminal } from 'lucide-react';

export const Section_EnterpriseDeployment: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  const [activeDeploymentTab, setActiveDeploymentTab] = useState<'AIR_GAPPED' | 'PRIVATE_CLOUD'>('AIR_GAPPED');

  return (
    <section id="deployment" className="py-24 px-6 lg:px-12 relative border-t border-[#ececec] bg-white">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header: Steep Editorial Serif Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f2f2f3] pb-8 text-left">
          <div className="space-y-3 max-w-2xl" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="text-xs font-sans text-[#979799] uppercase tracking-wider">
              {isRTL ? 'معيار الحماية السيبرانية الصناعية ISA/IEC 62443' : 'SEC_04 // INDUSTRIAL CYBER-DEFENSE & PURDUE MODEL'}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1120] tracking-[-0.02em] leading-[1.2] font-sans">
              {isRTL ? (
                <>
                  بنية تشغيل معزولة تماماً{' '}
                  <span className="italic bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                    عن شبكة المصفاة الحية.
                  </span>
                </>
              ) : (
                <>
                  Zero-Risk Industrial Deployment.{' '}
                  <span className="italic bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                    Complete P&ID Sovereignty.
                  </span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-sans font-normal leading-[1.45]">
              {isRTL
                ? 'لا نلمس شبكة التحكم الحي (DCS) أبداً. محاكي نكسيفا يعمل كمنظومة مستقلة ومحمية لا تتطلب أي اتصال بالإنترنت، مع سرية تامة لمخططات الإنتاج.'
                : 'NEXIIVA operates strictly in Level 3 Simulation DMZ with zero connection to live Level 1/2 DCS controllers. Your plant data, proprietary yields, and tag nomenclatures never leave the refinery fence.'}
            </p>
          </div>

          {/* Architecture Mode Pill Toggle */}
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-full self-start md:self-end shrink-0 border border-slate-200">
            <button
              onClick={() => {
                setActiveDeploymentTab('AIR_GAPPED');
                dcsAudio.playClick();
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeDeploymentTab === 'AIR_GAPPED'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-[#64748B] hover:text-[#0B1120]'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>{isRTL ? 'أون-بريميس معزول 100%' : '100% Air-Gapped (On-Prem)'}</span>
            </button>
            <button
              onClick={() => {
                setActiveDeploymentTab('PRIVATE_CLOUD');
                dcsAudio.playClick();
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeDeploymentTab === 'PRIVATE_CLOUD'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-[#64748B] hover:text-[#0B1120]'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>{isRTL ? 'سحابة خاصة معزولة' : 'Isolated Private Cloud'}</span>
            </button>
          </div>
        </div>

        {/* The Purdue Model Cyber-Security Blueprint Diagram Artifact */}
        <div className="rounded-[24px] bg-white border border-[#ececec] shadow-artifact p-6 lg:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-[#f2f2f3] text-xs font-sans">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#059669] font-medium border border-[#a7f3d0]">
                PURDUE ARCHITECTURE // COMPLIANT
              </span>
              <span className="text-[#777b86] font-mono text-[11px]">
                {activeDeploymentTab === 'AIR_GAPPED' ? 'OFFLINE PHYSICAL SERVER' : 'DEDICATED VPN TUNNEL'}
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-[#777b86] font-mono text-[11px]">
              <Lock className="w-3.5 h-3.5 text-[#17191c]" />
              <span>ZERO OUTBOUND TELEMETRY</span>
            </div>
          </div>

          {/* Visual Architecture Schematic in Clean Neutral Cards */}
          <div className="my-8 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Level 4: Enterprise Network */}
            <div className="p-5 rounded-[16px] bg-[#f8fafc] border border-[#e2e8f0] text-left space-y-2 relative">
              <div className="text-[10px] font-mono text-[#979799] uppercase tracking-widest">LEVEL 4 // ERP & CORP</div>
              <div className="text-sm font-medium text-[#17191c]">Corporate Enterprise</div>
              <div className="text-xs text-[#777b86] leading-relaxed">
                {isRTL ? 'إدارة الموارد، تخطيط الإنتاج، البريد المؤسسي' : 'SAP / ERP, logistics, business networks'}
              </div>
              <div className="pt-2 text-[10px] font-mono text-[#979799]">
                FIREWALL PERIMETER
              </div>
            </div>

            {/* Level 3: Simulation Academy (NEXIIVA HIGHLIGHT) */}
            <div className="p-6 rounded-[16px] bg-gradient-to-b from-purple-500/5 via-indigo-500/5 to-blue-500/5 border-2 border-[#4F46E5] text-left space-y-3 relative shadow-[0_12px_30px_-10px_rgba(79,70,229,0.15)] md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold">
                  LEVEL 3 // SIMULATION DMZ
                </span>
                <span className="text-[10px] font-mono text-[#059669] font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>NEXIIVA RUNTIME ENGINE</span>
                </span>
              </div>
              <div className="text-base font-semibold text-[#0B1120] font-sans">
                {activeDeploymentTab === 'AIR_GAPPED'
                  ? 'Air-Gapped Training Center Server (1 Host + 3 Trainee Stations)'
                  : 'Isolated Private VPC with Client-Controlled Encryption Keys'}
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                {activeDeploymentTab === 'AIR_GAPPED'
                  ? (isRTL
                      ? 'مخدم محلي يوضع داخل قاعة التدريب. لا يحتاج لأي اتصال خارجي. بيانات المصفاة ومخططات P&ID مشفرة داخلياً بـ AES-256 ولا تغادر جدران المصفاة.'
                      : 'Physical dedicated appliance placed in your training facility. Zero external internet required. P&IDs and custom process models are AES-256 encrypted on local storage.')
                  : (isRTL
                      ? 'مثالي لمراكز التدريب الإقليمية والمشغلين المتنقلين. يعمل داخل سحابة سريعة خاصة مع عزل كامل للبيانات وتحديثات لحظية للسيناريوهات.'
                      : 'Zero hardware footprint. Accessible via modern browser over corporate SSO / VPN. Instant scenario updates and automated scorecards.')}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-500/10 text-[10px] font-mono text-[#64748B]">
                <span className="bg-white/80 border border-slate-200 px-2 py-0.5 rounded">Air-Gap Verification</span>
                <span className="bg-white/80 border border-slate-200 px-2 py-0.5 rounded">Zero Cloud Telemetry</span>
                <span className="bg-white/80 border border-slate-200 px-2 py-0.5 rounded">Perpetual Offline License</span>
              </div>
            </div>

            {/* Level 2 & 1: Live DCS & Plant Floor */}
            <div className="p-5 rounded-[16px] bg-[#f8fafc] border border-[#e2e8f0] text-left space-y-2 relative opacity-80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#dc2626] uppercase tracking-widest">LEVEL 1 & 2 // LIVE DCS</span>
                <span className="text-[10px] font-mono text-[#059669] font-bold">AIR-GAP ISOLATED</span>
              </div>
              <div className="text-sm font-medium text-[#17191c]">Live Refinery Control Loops</div>
              <div className="text-xs text-[#777b86] leading-relaxed">
                {isRTL ? 'صمامات ومضخات المصفاة الحقيقية' : 'Physical valves, distillation trays, ESD interlocks'}
              </div>
              <div className="pt-2 text-[10px] font-mono text-[#059669] flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>100% UNTOUCHED // ZERO RISK</span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#f2f2f3] text-left">
            <div className="space-y-1.5">
              <div className="text-xs font-sans text-[#17191c] font-medium flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span>DATA SOVEREIGNTY</span>
              </div>
              <p className="text-xs text-[#777b86] leading-relaxed font-sans">
                {isRTL
                  ? 'مخططاتك الهندسية وتسميات الحقول وسجلات الصيانة لا تُرفع أبداً على أي سحابة خارجية.'
                  : 'Refinery P&IDs, process flowsheets, and stream compositions remain completely confidential on-premises.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-sans text-[#17191c] font-medium flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-[#0284c7]" />
                <span>HARDWARE AGNOSTIC</span>
              </div>
              <p className="text-xs text-[#777b86] leading-relaxed font-sans">
                {isRTL
                  ? 'يعمل على أجهزة PC القياسية الحديثة مع دعم شاشتين محاكية لوحدات DCS الحقيقية دون الحاجة لخوادم بملايين الدولارات.'
                  : 'Runs on standard commercial off-the-shelf workstation PCs with multi-display DCS console emulation.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-sans text-[#17191c] font-medium flex items-center space-x-2">
                <Network className="w-4 h-4 text-[#4F46E5]" />
                <span>FAST PILOT VALIDATION</span>
              </div>
              <p className="text-xs text-[#777b86] leading-relaxed font-sans">
                {isRTL
                  ? 'ابدأ تجربة الـ 90 يوم بـ 800 دولار فقط وتحقق من دقة النموذج مع مهندسي العمليات لديك.'
                  : 'Deploy the 90-day pilot for $800 to validate thermodynamic fidelity before full corporate deployment.'}
              </p>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="mt-8 pt-6 border-t border-[#f2f2f3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#777b86] text-left font-sans">
              {isRTL
                ? 'جاهز للاختبار في مصفاتك؟ احصل على العرض الفني ودليل التثبيت المعزول.'
                : 'Need the technical whitepaper and Purdue model architecture packet?'}
            </div>
            <button
              onClick={() => {
                dcsAudio.playClick();
                setPilotDrawerOpen(true);
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-semibold text-xs shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <span>{isRTL ? 'طلب وثيقة الأمان والحزم الهندسية' : 'Request Architecture Whitepaper'}</span>
              <span className="ml-1.5">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
