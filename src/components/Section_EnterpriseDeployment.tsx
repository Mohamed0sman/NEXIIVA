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
    <section id="deployment" className="py-24 px-6 lg:px-12 relative border-t border-slate-800/80 bg-[#04060E]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header: Architectural & Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>{isRTL ? 'معيار الحماية السيبرانية الصناعية ISA/IEC 62443' : 'SEC_04 // INDUSTRIAL CYBER-DEFENSE & PURDUE MODEL'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              {isRTL ? 'بنية تشغيل معزولة تماماً عن شبكة المصفاة الحية' : 'Zero-Risk Industrial Deployment. Complete P&ID Sovereignty.'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {isRTL
                ? 'لا نلمس شبكة التحكم الحي (DCS) أبداً. محاكي نكسيفا يعمل كمنظومة مستقلة ومحمية لا تتطلب أي اتصال بالإنترنت.'
                : 'NEXIIVA operates strictly in Level 3 Simulation DMZ with zero connection to live Level 1/2 DCS controllers. Your plant data, proprietary yields, and tag nomenclatures never leave the refinery fence.'}
            </p>
          </div>

          {/* Architecture Mode Toggle */}
          <div className="flex items-center bg-[#0B0F1C] p-1.5 rounded-xl border border-slate-800 self-start md:self-end">
            <button
              onClick={() => {
                setActiveDeploymentTab('AIR_GAPPED');
                dcsAudio.playClick();
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeDeploymentTab === 'AIR_GAPPED'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
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
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeDeploymentTab === 'PRIVATE_CLOUD'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>{isRTL ? 'سحابة خاصة معزولة' : 'Isolated Private Cloud'}</span>
            </button>
          </div>
        </div>

        {/* The Purdue Model Cyber-Security Blueprint Diagram */}
        <div className="rounded-2xl bg-[#080B16] border border-slate-800 p-6 lg:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                PURDUE ARCHITECTURE // COMPLIANT
              </span>
              <span className="text-slate-400">
                {activeDeploymentTab === 'AIR_GAPPED' ? 'OFFLINE PHYSICAL SERVER' : 'DEDICATED VPN TUNNEL'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>ZERO OUTBOUND TELEMETRY</span>
            </div>
          </div>

          {/* Visual Architecture Schematic */}
          <div className="my-8 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Level 4: Enterprise Network */}
            <div className="p-4 rounded-xl bg-[#0D1224] border border-slate-800 text-left space-y-2 relative">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">LEVEL 4 // ERP & CORP</div>
              <div className="text-sm font-bold text-white">Corporate Enterprise</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {isRTL ? 'إدارة الموارد، تخطيط الإنتاج، البريد المؤسسي' : 'SAP / ERP, logistics, business networks'}
              </div>
              <div className="pt-2 text-[10px] font-mono text-slate-500">
                FIREWALL PERIMETER
              </div>
            </div>

            {/* Level 3: Simulation Academy (NEXIIVA HIGHLIGHT) */}
            <div className="p-5 rounded-xl bg-purple-950/20 border-2 border-purple-500/50 text-left space-y-3 relative shadow-[0_0_40px_rgba(123,60,252,0.2)] md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 font-bold">
                  LEVEL 3 // SIMULATION DMZ
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>NEXIIVA RUNTIME ENGINE</span>
                </span>
              </div>
              <div className="text-base font-bold text-white">
                {activeDeploymentTab === 'AIR_GAPPED'
                  ? 'Air-Gapped Training Center Server (1 Host + 3 Trainee Stations)'
                  : 'Isolated Private VPC with Client-Controlled Encryption Keys'}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDeploymentTab === 'AIR_GAPPED'
                  ? (isRTL
                      ? 'مخدم محلي يوضع داخل قاعة التدريب. لا يحتاج لأي اتصال خارجي. بيانات المصفاة ومخططات P&ID مشفرة داخلياً بـ AES-256 ولا تغادر جدران المصفاة.'
                      : 'Physical dedicated appliance placed in your training facility. Zero external internet required. P&IDs and custom process models are AES-256 encrypted on local NVMe storage.')
                  : (isRTL
                      ? 'مثالي لمراكز التدريب الإقليمية والمشغلين المتنقلين. يعمل داخل سحابة سريعة خاصة مع عزل كامل للبيانات وتحديثات لحظية للسيناريوهات.'
                      : 'Zero hardware footprint. Accessible via modern browser over SSO / corporate VPN. Instant scenario updates and automated competency scorecards.')}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-500/20 text-[10px] font-mono text-purple-200">
                <span className="bg-purple-900/40 px-2 py-0.5 rounded">Air-Gap Verification</span>
                <span className="bg-purple-900/40 px-2 py-0.5 rounded">No Ingestion Cloud Dependencies</span>
                <span className="bg-purple-900/40 px-2 py-0.5 rounded">Perpetual Offline Licensing</span>
              </div>
            </div>

            {/* Level 2 & 1: Live DCS & Plant Floor */}
            <div className="p-4 rounded-xl bg-[#090D1A] border border-slate-800 text-left space-y-2 relative opacity-80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">LEVEL 1 & 2 // LIVE DCS</span>
                <span className="text-[10px] font-mono text-rose-400 font-bold">AIR-GAP ISOLATED</span>
              </div>
              <div className="text-sm font-bold text-white">Live Refinery Control Loops</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {isRTL ? 'صمامات ومضخات المصفاة الحقيقية' : 'Physical valves, distillation trays, ESD interlocks'}
              </div>
              <div className="pt-2 text-[10px] font-mono text-rose-400/90 flex items-center space-x-1">
                <AlertOctagon className="w-3 h-3" />
                <span>100% UNTOUCHED // ZERO RISK</span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 text-left">
            <div className="space-y-2">
              <div className="text-xs font-mono text-purple-400 font-bold flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>DATA SOVEREIGNTY</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isRTL
                  ? 'مخططاتك الهندسية وتسميات الحقول وسجلات الصيانة لا تُرفع أبداً على أي سحابة خارجية.'
                  : 'Refinery P&IDs, process flowsheets, and stream compositions remain completely confidential on-premises.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-purple-400 font-bold flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>HARDWARE AGNOSTIC</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isRTL
                  ? 'يعمل على أجهزة PC القياسية الحديثة مع دعم شاشتين محاكية لوحدات DCS الحقيقية دون الحاجة لخوادم بملايين الدولارات.'
                  : 'Runs on standard commercial off-the-shelf workstation PCs with multi-display DCS console emulation.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-purple-400 font-bold flex items-center space-x-2">
                <Network className="w-4 h-4 text-purple-400" />
                <span>FAST PILOT VALIDATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isRTL
                  ? 'ابدأ تجربة الـ 90 يوم بـ 800 دولار فقط وتحقق من دقة النموذج مع مهندسي العمليات لديك.'
                  : 'Deploy the 90-day pilot for $800 to validate thermodynamic fidelity before full corporate deployment.'}
              </p>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400 text-left">
              {isRTL
                ? 'جاهز للاختبار في مصفاتك؟ احصل على العرض الفني ودليل التثبيت المعزول.'
                : 'Need the technical whitepaper and Purdue model architecture packet?'}
            </div>
            <button
              onClick={() => {
                dcsAudio.playClick();
                setPilotDrawerOpen(true);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-xs font-bold font-mono uppercase tracking-wider shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer"
            >
              {isRTL ? 'طلب وثيقة الأمان والحزم الهندسية' : 'Request Architecture Whitepaper'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
