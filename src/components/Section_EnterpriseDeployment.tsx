import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { ShieldCheck, Lock, Server, Cloud, Network, CheckCircle2, Terminal } from 'lucide-react';

export const Section_EnterpriseDeployment: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].deployment;
  const isRTL = language === 'AR';

  const [activeDeploymentTab, setActiveDeploymentTab] = useState<'AIR_GAPPED' | 'PRIVATE_CLOUD'>('AIR_GAPPED');

  return (
    <section id="deployment" className="py-24 px-6 lg:px-12 relative border-t border-slate-200 bg-white">
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

          {/* Architecture Mode Pill Toggle */}
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-full self-start lg:self-end shrink-0 border border-slate-200">
            <button
              onClick={() => {
                setActiveDeploymentTab('AIR_GAPPED');
                dcsAudio.playClick();
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeDeploymentTab === 'AIR_GAPPED'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1120]'
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
                  : 'text-slate-600 hover:text-[#0B1120]'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>{isRTL ? 'سحابة خاصة معزولة' : 'Isolated Private Cloud'}</span>
            </button>
          </div>
        </div>

        {/* 3 Deployment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.cards.map((card, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl border transition-all space-y-3 shadow-xs ${
                idx === 0
                  ? 'bg-gradient-to-b from-purple-500/5 via-indigo-500/5 to-blue-500/5 border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-sm'
                  : 'bg-[#F8FAFC] border-slate-200/90'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#4F46E5]">
                  {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 1 && <Cloud className="w-5 h-5" />}
                  {idx === 2 && <Server className="w-5 h-5" />}
                </div>
                {idx === 0 && (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold">
                    {isRTL ? 'موصى به للبدء' : 'RECOMMENDED'}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-[#0B1120] font-sans">{card.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* The Purdue Model Cyber-Security Blueprint Diagram Artifact */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 lg:p-8 relative overflow-hidden text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-sans">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px] font-mono">
                ISA/IEC 62443 & PURDUE MODEL // COMPLIANT
              </span>
              <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">
                {activeDeploymentTab === 'AIR_GAPPED' ? 'OFFLINE PHYSICAL APPLIANCE' : 'DEDICATED IPSEC VPN TUNNEL'}
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-600 font-mono text-[11px]">
              <Lock className="w-3.5 h-3.5 text-[#0B1120]" />
              <span>ZERO OUTBOUND TELEMETRY</span>
            </div>
          </div>

          {/* Visual Architecture Schematic */}
          <div className="my-8 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Level 4 */}
            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                LEVEL 4 // ERP & CORP
              </div>
              <div className="text-sm font-bold text-[#0B1120]">Corporate Enterprise</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isRTL ? 'إدارة الموارد، تخطيط الإنتاج، البريد المؤسسي' : 'SAP / ERP, plant logistics, corporate network'}
              </div>
              <div className="pt-2 text-[10px] font-mono text-slate-400">FIREWALL PERIMETER</div>
            </div>

            {/* Level 3: Simulation Academy */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-purple-500/5 via-indigo-500/5 to-blue-500/5 border-2 border-[#4F46E5] space-y-3 shadow-sm md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold">
                  LEVEL 3 // SIMULATION DMZ
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>NEXIIVA RUNTIME ENGINE</span>
                </span>
              </div>
              <div className="text-base font-bold text-[#0B1120] font-sans">
                {activeDeploymentTab === 'AIR_GAPPED'
                  ? (isRTL ? 'خادم مركز التدريب المعزول (خادم رئيسي + 3 محطات مشغلين)' : 'Air-Gapped Training Center Server (1 Host + 3 Trainee Stations)')
                  : (isRTL ? 'سحابة خاصة معزولة مع تشفير كامل بمفاتيح العميل' : 'Isolated Private VPC with Client-Controlled Encryption Keys')}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {activeDeploymentTab === 'AIR_GAPPED'
                  ? (isRTL
                      ? 'مخدم محلي يوضع داخل قاعة التدريب. لا يحتاج لأي اتصال خارجي. بيانات المصفاة ومخططات P&ID مشفرة داخلياً بـ AES-256 ولا تغادر جدران المصفاة.'
                      : 'Physical dedicated appliance placed in your training facility. Zero external internet required. P&IDs and custom process models are AES-256 encrypted on local storage.')
                  : (isRTL
                      ? 'مثالي لمراكز التدريب الإقليمية والمشغلين المتنقلين. يعمل داخل سحابة سريعة خاصة مع عزل كامل للبيانات وتحديثات لحظية للسيناريوهات.'
                      : 'Zero hardware footprint. Accessible via modern browser over corporate SSO / VPN. Instant scenario updates and automated scorecards.')}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-500/10 text-[10px] font-mono text-slate-600">
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">Air-Gap Verification</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">Zero Cloud Telemetry</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">Perpetual Offline License</span>
              </div>
            </div>

            {/* Level 2 & 1 */}
            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2 opacity-85">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-red-600 uppercase tracking-widest font-semibold">
                  LEVEL 1 & 2 // LIVE DCS
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">AIR-GAP ISOLATED</span>
              </div>
              <div className="text-sm font-bold text-[#0B1120]">Live Refinery Control Loops</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isRTL ? 'صمامات ومضخات المصفاة الحقيقية' : 'Physical valves, distillation trays, ESD interlocks'}
              </div>
              <div className="pt-2 text-[10px] font-mono text-emerald-600 flex items-center space-x-1 font-bold">
                <ShieldCheck className="w-3 h-3" />
                <span>100% UNTOUCHED // ZERO RISK</span>
              </div>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 font-sans">
              {isRTL
                ? 'جاهز لاختبار المحاكي في منشأتك؟ احصل على العرض الفني ودليل التثبيت المعزول.'
                : 'Need the technical deployment brief and Purdue model architecture packet?'}
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
