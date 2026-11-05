import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { ShieldCheck, Lock, Server, Cloud, Network, CheckCircle2, Terminal, Info, ChevronRight, ArrowDown } from 'lucide-react';

export const Section_EnterpriseDeployment: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].deployment;
  const isRTL = language === 'AR';

  const [activeDeploymentTab, setActiveDeploymentTab] = useState<'AIR_GAPPED' | 'PRIVATE_CLOUD'>('AIR_GAPPED');
  const [inspectedLevel, setInspectedLevel] = useState<'LEVEL_4' | 'LEVEL_3' | 'LEVEL_1_2'>('LEVEL_3');

  const levelSecurityDetails = {
    LEVEL_4: {
      title: isRTL ? 'المستوى 4 // شبكة المؤسسة وإدارة الموارد (ERP & Business LAN)' : 'LEVEL 4 // ERP & Enterprise Corporate Network',
      scope: isRTL ? 'إدارة الموارد، تخطيط الإنتاج، البريد المؤسسي، وتكامل الـ SAP' : 'Business logistics, ERP scheduling, corporate email, and management reports',
      firewall: isRTL ? 'جدار ناري معزول بفصل تام (Stateful Deep Packet Inspection)' : 'Strict DMZ firewall with stateful inspection & zero inbound OT routes',
      controls: [
        isRTL ? 'مصادقة موحدة عبر SAML 2.0 / Azure AD / Okta' : 'Corporate SAML 2.0 / Azure AD / Okta SSO integration',
        isRTL ? 'تشفير كامل لكافة الاتصالات عبر بروتوكول TLS 1.3' : 'End-to-end TLS 1.3 encrypted browser sessions',
        isRTL ? 'عزل كامل عن شبكات التحكم والتحكم الإشرافي SCADA' : 'Air-tight segmentation preventing enterprise access to plant control',
      ],
    },
    LEVEL_3: {
      title: isRTL ? 'المستوى 3 // منطقة محاكاة العمليات الآمنة (Simulation DMZ)' : 'LEVEL 3 // Operational Simulation DMZ (NEXIIVA Runtime)',
      scope: isRTL ? 'خادم تشغيل محاكي نكسيفا، محطات تدريب المشغلين، وكونسول المدرب' : 'Nexiiva real-time dynamic engine, trainee operator consoles, and instructor station',
      firewall: isRTL ? 'تشغيل أوفلاين 100% دون الحاجة لأي اتصال بالإنترنت' : 'Zero outbound cloud telemetry, 100% air-gapped offline runtime capability',
      controls: [
        isRTL ? 'تشفير كامل لقواعد بيانات المصفاة ومخططات P&ID بـ AES-256' : 'AES-256 encrypted local database for proprietary refinery P&ID blueprints',
        isRTL ? 'فصل فيزيائي وشبكي كامل يمنع أي تأثير على العمليات الحية' : 'Physical or VLAN network isolation ensuring zero disruption to live throughput',
        isRTL ? 'تسجيل كامل لكافة أحداث التدريب مع بصمة رقمية SHA-256' : 'Tamper-evident audit logging for all emergency drills & certification sessions',
      ],
    },
    LEVEL_1_2: {
      title: isRTL ? 'المستوى 1 و 2 // منظومة التحكم الميداني الحي (Live DCS & SIS)' : 'LEVEL 1 & 2 // Physical Plant DCS & Safety Instrumented Systems',
      scope: isRTL ? 'صمامات ومضخات المصفاة الحقيقية، وحدات التحكم PLC، ومنظومة الإغلاق الطارئ ESD' : 'Physical distillation columns, fired heaters, safety interlocks, and live field PLCs',
      firewall: isRTL ? 'عزل كلفاني وشبكي تام 100% (Galvanic & Network Air-Gap)' : '100% Galvanic and network air-gap; unidirectional data-diode compatible',
      controls: [
        isRTL ? 'منع قطعي لأي إشارات تحكم عكسية نحو معدات المصفاة' : 'Zero feedback loop to physical control valves or ESD emergency interlocks',
        isRTL ? 'سلامة المنشأة مضمونة 100% أثناء كافة سيناريوهات الطوارئ' : 'Zero process safety or production disruption risk during extreme drill scenarios',
        isRTL ? 'مطابقة كاملة لمعايير ISA/IEC 62443 Security Level 3/4' : 'Full compliance with ISA/IEC 62443 Security Level 3/4 zone requirements',
      ],
    },
  };

  const currentLevelInfo = levelSecurityDetails[inspectedLevel];

  return (
    <section id="deployment" className="py-24 px-6 lg:px-12 relative border-t border-slate-200 bg-white">
      <div className="max-w-[1240px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-slate-200 pb-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200/60 inline-block">
              {t.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.2] font-sans">
              {t.headingMain}{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent inline-block">
                {t.headingItalic}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-sans font-normal leading-relaxed">
              {t.subheading}
            </p>
          </div>

          {/* Architecture Mode Pill Toggle */}
          <div className="flex items-center bg-[#F1F5F9] p-1.5 rounded-full self-start lg:self-end shrink-0 border border-slate-200">
            <button
              onClick={() => setActiveDeploymentTab('AIR_GAPPED')}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                activeDeploymentTab === 'AIR_GAPPED'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:text-[#0B1120]'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>{isRTL ? 'أون-بريميس معزول 100%' : '100% Air-Gapped (On-Prem)'}</span>
            </button>
            <button
              onClick={() => setActiveDeploymentTab('PRIVATE_CLOUD')}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
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

        {/* 3 Deployment Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.cards.map((card, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#4F46E5]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-3.5 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#4F46E5]">
                {idx === 0 && <ShieldCheck className="w-6 h-6" />}
                {idx === 1 && <Cloud className="w-6 h-6" />}
                {idx === 2 && <Server className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-bold text-[#0B1120] font-sans">{card.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Industrial Security Architecture (Purdue Model) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
            <div className="flex items-center space-x-2.5 space-x-reverse">
              <ShieldCheck className="w-5 h-5 text-[#4F46E5]" />
              <span className="font-mono text-xs font-bold text-[#0B1120]">
                {isRTL ? 'معيار الأمان السيبراني الصناعي ISA/IEC 62443 — نموذج بيردو (Purdue Model)' : 'ISA/IEC 62443 PURDUE MODEL CYBERSECURITY HARDENING'}
              </span>
            </div>
            <div className="flex items-center space-x-1.5 space-x-reverse text-slate-600 font-mono text-[11px]">
              <Lock className="w-3.5 h-3.5 text-[#0B1120]" />
              <span>ZERO OUTBOUND TELEMETRY</span>
            </div>
          </div>

          {/* Purdue Layers Grid */}
          <div className="my-8 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Level 4 */}
            <div
              onClick={() => setInspectedLevel('LEVEL_4')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                inspectedLevel === 'LEVEL_4'
                  ? 'bg-purple-50/50 border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-sm'
                  : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                  LEVEL 4 // ERP & CORP
                </span>
                <span className="text-[10px] text-[#4F46E5] font-mono font-bold">INFO ↗</span>
              </div>
              <div className="text-sm font-bold text-[#0B1120]">Corporate Enterprise</div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {isRTL ? 'إدارة الموارد، تخطيط الإنتاج، البريد المؤسسي' : 'SAP / ERP, plant logistics, corporate network'}
              </div>
              <div className="pt-2 text-[10px] font-mono text-slate-400">FIREWALL PERIMETER</div>
            </div>

            {/* Level 3: Simulation Academy */}
            <div
              onClick={() => setInspectedLevel('LEVEL_3')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer space-y-3.5 shadow-sm md:col-span-2 ${
                inspectedLevel === 'LEVEL_3'
                  ? 'bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-blue-500/5 border-[#4F46E5] ring-2 ring-[#4F46E5]/30'
                  : 'bg-gradient-to-b from-purple-500/5 via-indigo-500/5 to-blue-500/5 border-indigo-300 hover:border-[#4F46E5]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold shadow-xs">
                  LEVEL 3 // SIMULATION DMZ
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center space-x-1 space-x-reverse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>NEXIIVA RUNTIME ENGINE</span>
                </span>
              </div>
              <div className="text-base font-bold text-[#0B1120] font-sans">
                {activeDeploymentTab === 'AIR_GAPPED'
                  ? (isRTL ? 'خادم مركز التدريب المعزول (خادم رئيسي + محطات المشغلين)' : 'Air-Gapped Training Center Server (Dedicated Host + Multi-Station LAN)')
                  : (isRTL ? 'سحابة خاصة معزولة مع تشفير كامل بمفاتيح العميل' : 'Isolated Private VPC with Client-Controlled Encryption Keys')}
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans">
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
            <div
              onClick={() => setInspectedLevel('LEVEL_1_2')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                inspectedLevel === 'LEVEL_1_2'
                  ? 'bg-rose-50/50 border-rose-400 ring-2 ring-rose-200 shadow-sm'
                  : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
              }`}
            >
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
              <div className="pt-2 text-[10px] font-mono text-emerald-600 flex items-center space-x-1 space-x-reverse font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% UNTOUCHED // ZERO RISK</span>
              </div>
            </div>
          </div>

          {/* Interactive Purdue Security Detail Inspector Box */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3.5 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <span className="text-xs font-mono font-bold text-[#0B1120]">
                {currentLevelInfo.title}
              </span>
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                {currentLevelInfo.firewall}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 text-xs text-slate-600">
              {currentLevelInfo.controls.map((ctrl, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/90 flex items-start space-x-2.5 space-x-reverse shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{ctrl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 font-sans">
              {isRTL
                ? 'جاهز للاشتراك والبدء في منشأتك؟ احصل على العرض الفني ودليل التثبيت المعزول.'
                : 'Ready to subscribe and evaluate on your plant data? Request the Purdue architecture packet.'}
            </div>
            <button
              onClick={() => setPilotDrawerOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-semibold text-xs shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center space-x-1.5 space-x-reverse"
            >
              <span>{isRTL ? 'طلب وثيقة الأمان والبدء' : 'Request Architecture Whitepaper & Subscribe'}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
