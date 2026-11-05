import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Bot, Cpu, Layers, Sparkles, CheckCircle2, ShieldCheck, Flame, Gauge, ArrowRight, BookOpen, Activity } from 'lucide-react';

type BlueprintPreset = 'CDU' | 'VDU' | 'REFORMER';

interface TagData {
  tag: string;
  name: string;
  type: string;
  eos: string;
  desc: string;
  standard: string;
  timeStep: string;
  safety: string;
  temp: string;
  pressure: string;
}

export const Section_PIDScanner: React.FC = () => {
  const { language } = useSimulationJourney();
  const t = translations[language].otsBuilder;
  const isRTL = language === 'AR';

  const [selectedPreset, setSelectedPreset] = useState<BlueprintPreset>('CDU');
  const [activeTag, setActiveTag] = useState<string>('C-101');

  const tagDatabase: Record<string, TagData> = {
    // CDU
    'C-101': {
      tag: 'C-101',
      name: isRTL ? 'برج التقطير الجوي الرئيسي' : 'Atmospheric Crude Fractionator',
      type: 'Fractionation Column (48 Sieve Trays)',
      eos: 'Peng-Robinson EOS · Rigorous Liquid-Vapor Equilibrium',
      desc: isRTL
        ? 'نموذج ديناميكي متقدم لـ 48 صينية تقطير ونقاط سحب الكيروسين والسولار والديزل مع توازن الكتلة والطاقة اللحظي.'
        : 'Auto-synthesized 48 sieve trays, 3 side-strippers (Kerosene, Gasoil, Diesel), and dynamic tray holdups.',
      standard: 'API 520 / ISA-5.1',
      timeStep: '100ms Rigorous',
      safety: 'SIL-3 Verified',
      temp: '345 °C Base',
      pressure: '1.48 bar',
    },
    'F-101': {
      tag: 'F-101',
      name: isRTL ? 'فرن تسخين النفط الخام' : 'Crude Charge Fired Heater',
      type: 'Radiant/Convection Furnace (32 Burners)',
      eos: 'Combustion Stoichiometry + Radiant Heat Flux Matrix',
      desc: isRTL
        ? 'حساب ديناميكي لدرجة حرارة مخرج الأنابيب (COT 365°C) مع محاكاة هبوط ضغط الغاز وتوزيع اللهب.'
        : 'Dynamic coil outlet temperature (COT) tracking, tube skin heat-flux limits, and fuel gas draft control.',
      standard: 'API 560 / NFPA 85',
      timeStep: '50ms Kinetics',
      safety: 'BMS Interlocked',
      temp: '365 °C (COT)',
      pressure: '18.5 bar',
    },
    'P-101A/B': {
      tag: 'P-101A/B',
      name: isRTL ? 'مضخات تغذية برج التقطير والراجع' : 'Crude Column Reflux Pumps',
      type: 'Centrifugal API 610 Dual Set (A-Duty / B-Standby)',
      eos: 'Head-Capacity Affiliation Curves + NPSHa/NPSHr Cavitation',
      desc: isRTL
        ? 'منظومة تبديل أوتوماتيكي ومحاكاة أعطال المحركات وتجويف المضخات عند انخفاض ضغط السحب.'
        : 'Auto-start standby logic, motor trip simulation, and hydraulic cavitation detection.',
      standard: 'API 610 (OH2)',
      timeStep: '10ms Hydraulic',
      safety: 'Auto-Switch Ready',
      temp: '115 °C',
      pressure: '8.2 bar',
    },
    'E-101': {
      tag: 'E-101',
      name: isRTL ? 'مكثف بخار أعلى البرج' : 'Atmospheric Overhead Condenser Train',
      type: 'Shell & Tube Air-Cooled Exchanger (4 Bays)',
      eos: 'Bell-Delaware Multi-Phase Condensation Protocol',
      desc: isRTL
        ? 'محاكاة ديناميكية لتكاثف الهيدروكربونات الخفيفة والماء الحامضي مع مراقبة هبوط الضغط عبر الأنابيب.'
        : 'Two-phase condensing curves with sub-cooling dynamics, air louvre regulation, and fouling factor emulation.',
      standard: 'TEMA R / API 660',
      timeStep: '100ms Thermal',
      safety: 'Dual Relief Protected',
      temp: '110 °C / 42 °C',
      pressure: '1.25 bar',
    },

    // VDU
    'C-201': {
      tag: 'C-201',
      name: isRTL ? 'برج التقطير التفريغي العميق' : 'Deep Vacuum Distillation Tower',
      type: 'Structured Packing Vacuum Column (Mellapak 250X)',
      eos: 'Lee-Kesler Plöcker EOS · Sub-Atmospheric Vaporization',
      desc: isRTL
        ? 'محاكاة ديناميكية للتقطير تحت تفريغ عالي (15 مليمتر زئبق) لفصل السولار الثقيل (HVGO) والأسفلت.'
        : 'Simulates deep sub-atmospheric flash zone (15 mmHg abs) for heavy vacuum gas oil (HVGO) separation.',
      standard: 'API 520 / TEMA E',
      timeStep: '100ms Rigorous',
      safety: 'Vacuum Breaker System',
      temp: '390 °C Flash',
      pressure: '18 mmHg Abs',
    },
    'F-201': {
      tag: 'F-201',
      name: isRTL ? 'فرن تسخين النفط المتبقي' : 'Atmospheric Residue Vacuum Heater',
      type: 'Twin-Cell Radiant Vacuum Furnace with Steam Injection',
      eos: 'Two-Phase Velocity Sonic Choke Boundary Model',
      desc: isRTL
        ? 'محاكاة حقن بخار التكسير (Coil Steam) لمنع ترسب الكربون داخل الأنابيب عند درجات حرارة تصل 410°C.'
        : 'Models velocity steam injection to prevent coil coking at severe 410°C peak film boundary conditions.',
      standard: 'API 560 / NFPA 86',
      timeStep: '50ms Thermal',
      safety: 'High-Temp Interlock',
      temp: '410 °C Max Skin',
      pressure: '2.5 bar',
    },
    'EJ-201': {
      tag: 'EJ-201',
      name: isRTL ? 'منظومة طوارد الغاز البخارية التفريغية' : '3-Stage Steam Jet Ejector Train',
      type: 'Supersonic Steam Jet Ejectors + Barometric Condensers',
      eos: 'Isentropic Nozzle Momentum Balance & Supersonic Shock',
      desc: isRTL
        ? 'محاكاة توليد التفريغ الهوائي بواسطة نفثات البخار عالي الضغط، مع رصد فقدان التفريغ عند انخفاض ضغط البخار.'
        : 'Models vacuum pull loss during motive steam pressure fluctuations or cooling water temperature surges.',
      standard: 'HEI Standards for Steam Ejectors',
      timeStep: '20ms Dynamic',
      safety: 'Rupture Pin System',
      temp: '165 °C / 38 °C',
      pressure: '15 mmHg Abs',
    },

    // Reformer
    'R-301': {
      tag: 'R-301',
      name: isRTL ? 'مفاعل التهذيب الحفزي المستمر' : 'CCR Radial Catalytic Reactor',
      type: 'Moving-Bed Radial Flow Catalytic Reactor Train',
      eos: '38-Lump Kinetic Dehydrogenation & Ring-Closure Network',
      desc: isRTL
        ? 'محاكاة ديناميكية لتحويل النافثا إلى أروماتكس عالية الأوكتان مع تتبع هبوط نشاط العامل الحفاز وانتقال الهيدروجين.'
        : 'Models catalytic dehydrogenation kinetics, endothermic temperature drop, and catalyst transfer interlocks.',
      standard: 'ASME Sec VIII Div 2',
      timeStep: '100ms Reaction Matrix',
      safety: 'Emergency H2 Depressurization',
      temp: '515 °C Inlet / 460 °C Bed',
      pressure: '4.8 bar',
    },
    'C-301': {
      tag: 'C-301',
      name: isRTL ? 'برج تثبيت البنزين عالي الأوكتان' : 'Reformer Debutanizer Column',
      type: 'Trayed Distillation Fractionator (36 Valves)',
      eos: 'Soave-Redlich-Kwong (SRK) Light Ends Matrix',
      desc: isRTL
        ? 'فصل غازات البترول المسال (LPG C3/C4) عن الريفورمات عالي الأوكتان (RON 98+) مع ضبط دقيق لضغط البخار RVP.'
        : 'Sharp fractionation between C4 light ends and high-RON reformate with closed-loop Reid Vapor Pressure control.',
      standard: 'API 520 / ISA-5.1',
      timeStep: '100ms Rigorous',
      safety: 'High-Pressure Safety Relief',
      temp: '168 °C Base',
      pressure: '11.5 bar',
    },
    'K-301': {
      tag: 'K-301',
      name: isRTL ? 'ضاغط تدوير غاز الهيدروجين' : 'Centrifugal Hydrogen Recycle Compressor',
      type: 'Multi-Stage Centrifugal Compressor (Turbine Driven)',
      eos: 'Polytropic Compression Curves with Real Gas Compressibility (Z)',
      desc: isRTL
        ? 'محاكاة حماية مانع الارتجاف (Anti-Surge Control) وسلوك ختم الغاز الجاف عند هبوط كثافة الهيدروجين.'
        : 'High-speed anti-surge fast loop calculation (10ms) and dynamic dry gas seal differential monitoring.',
      standard: 'API 617 / API 670',
      timeStep: '10ms Anti-Surge',
      safety: 'Automated Surge Spillback',
      temp: '112 °C Discharge',
      pressure: '24.2 bar',
    },
  };

  const currentTags =
    selectedPreset === 'CDU'
      ? ['C-101', 'F-101', 'P-101A/B', 'E-101']
      : selectedPreset === 'VDU'
      ? ['C-201', 'F-201', 'EJ-201']
      : ['R-301', 'C-301', 'K-301'];

  const activeData = tagDatabase[activeTag] || tagDatabase['C-101'];

  return (
    <section id="ots-builder" className="py-24 px-6 lg:px-12 relative bg-white border-t border-slate-200">
      <div className="max-w-[1240px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 space-x-reverse text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200/60">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.eyebrow}</span>
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

        {/* 3 Core Platform Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#4F46E5]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-3.5 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#4F46E5]">
                {idx === 0 && <Bot className="w-6 h-6" />}
                {idx === 1 && <Cpu className="w-6 h-6" />}
                {idx === 2 && <Layers className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-bold text-[#0B1120] font-sans">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Technical Architecture & 387 Equipment Codex Showcase */}
        <div className="bg-[#070B14] rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl text-white space-y-8 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] pointer-events-none" />

          {/* Top Bar: Unit Model Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/90 pb-6 relative z-10">
            <div>
              <span className="text-[11px] font-mono text-[#06B6D4] font-semibold uppercase tracking-wider block">
                NEXIIVA CODEX // RIGOROUS EQUIPMENT ENGINE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mt-1">
                {isRTL ? 'استكشف مواصفات المعدات الصناعية ونماذج الديناميكا' : 'Industrial Equipment & Kinetic Specifications'}
              </h3>
            </div>

            {/* Bilingual Unit Selector Pills */}
            <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
              {(['CDU', 'VDU', 'REFORMER'] as BlueprintPreset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setSelectedPreset(preset);
                    if (preset === 'CDU') setActiveTag('C-101');
                    if (preset === 'VDU') setActiveTag('C-201');
                    if (preset === 'REFORMER') setActiveTag('R-301');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                    selectedPreset === preset
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {preset === 'CDU'
                    ? isRTL ? 'التقطير الجوي (CDU)' : 'Atmospheric CDU'
                    : preset === 'VDU'
                    ? isRTL ? 'التقطير المفرغ (VDU)' : 'Vacuum VDU'
                    : isRTL ? 'التهذيب الحفزي (CCR)' : 'Catalytic Reformer'}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 text-left">
            {/* Tag List on the Left */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                {isRTL ? 'المعدات الرئيسية في النموذج المستهدف:' : 'Synthesized Unit Equipment Tags:'}
              </span>
              <div className="space-y-2.5">
                {currentTags.map((tagKey) => {
                  const tag = tagDatabase[tagKey];
                  const isActive = activeTag === tagKey;
                  return (
                    <div
                      key={tagKey}
                      onClick={() => setActiveTag(tagKey)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500/20 via-indigo-500/15 to-transparent border-[#4F46E5] text-white shadow-md'
                          : 'bg-white/5 border-slate-800/80 text-slate-300 hover:bg-white/10 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#06B6D4]">{tag.tag}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/5">
                          {tag.standard}
                        </span>
                      </div>
                      <div className="text-xs font-sans font-medium text-slate-200 mt-1 truncate">
                        {tag.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Engineering Spec Card on the Right */}
            <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#7C3AED] font-bold">TAG ID: {activeData.tag}</span>
                  <h4 className="text-xl sm:text-2xl font-bold font-sans text-white mt-0.5">{activeData.name}</h4>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">{activeData.type}</div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[11px] font-mono font-medium">
                    {activeData.safety}
                  </span>
                </div>
              </div>

              {/* Thermodynamic Equations of State & Solver Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    THERMODYNAMIC EOS
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-200 mt-1 block">
                    {activeData.eos}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    DESIGN LIMITS
                  </span>
                  <span className="text-xs font-mono font-bold text-white mt-1 block" dir="ltr">
                    {activeData.temp} · {activeData.pressure}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    SOLVER TIMESTEP
                  </span>
                  <span className="text-xs font-mono font-bold text-[#06B6D4] mt-1 block">
                    {activeData.timeStep}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isRTL ? 'النمذجة الرياضية وسلوك المحاكاة الديناميكي:' : 'Mathematical Kinetics & Dynamic Simulation Behavior:'}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {activeData.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>VERIFICATION: INDUSTRIAL STANDARDS COMPLIANT</span>
                <span className="text-emerald-400 font-bold flex items-center space-x-1.5 space-x-reverse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>READY FOR TRAINING</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
