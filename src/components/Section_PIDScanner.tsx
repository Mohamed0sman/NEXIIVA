import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Bot, Cpu, Layers, Sparkles, CheckCircle2, Sliders, ShieldCheck, Flame, Gauge, ArrowRight } from 'lucide-react';

type BlueprintPreset = 'CDU' | 'VDU' | 'REFORMER';
type CategoryKey = 'COLUMNS' | 'HEATERS' | 'ROTATING' | 'CONTROLS' | 'SAFETY';

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
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [detectedCount, setDetectedCount] = useState(387);
  const [activeTag, setActiveTag] = useState<string>('C-101');
  const [selectedCat, setSelectedCat] = useState<CategoryKey>('COLUMNS');

  const triggerScan = (preset: BlueprintPreset) => {
    setSelectedPreset(preset);
    setIsScanning(true);
    setScanProgress(0);
    setDetectedCount(0);
    dcsAudio.playClick();

    // Default tag for preset
    if (preset === 'CDU') setActiveTag('C-101');
    if (preset === 'VDU') setActiveTag('C-201');
    if (preset === 'REFORMER') setActiveTag('R-301');

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setScanProgress(p);
      setDetectedCount(Math.min(387, Math.round((p / 100) * 387)));

      if (p % 20 === 0) {
        dcsAudio.playClick();
      }

      if (p >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        dcsAudio.playSuccess();
      }
    }, 30);
  };

  const tagDatabase: Record<string, TagData> = {
    // CDU
    'C-101': {
      tag: 'C-101',
      name: isRTL ? 'برج التقطير الجوي الرئيسي' : 'Atmospheric Crude Fractionator',
      type: 'Fractionation Column (48 Sieve Trays)',
      eos: 'Peng-Robinson EOS · Rigorous Liquid-Vapor Equilibrium',
      desc: isRTL
        ? 'تم التعرف التلقائي على 48 صينية تقطير ونقاط سحب الكيروسين والسولار والديزل مع توازن الكتلة والطاقة اللحظي.'
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
      standard: 'HEI Standards',
      timeStep: '20ms Dynamic',
      safety: 'Water Seal Safe',
      temp: '140 °C Motive',
      pressure: '12 mmHg Abs',
    },
    'P-202': {
      tag: 'P-202',
      name: isRTL ? 'مضخات مخلفات التفريغ (الأسفلت)' : 'Vacuum Bottoms (Bitumen) Pumps',
      type: 'High-Temperature API 610 Heavy Residue Pumps',
      eos: 'Non-Newtonian Viscosity Flow & Seal Flush Plan 53B',
      desc: isRTL
        ? 'محاكاة تدفق المخلفات شديدة اللزوجة عند 360°C مع مراقبة خطوط تبريد الحشو الميكانيكي ومنع التصلب.'
        : 'Simulates high-viscosity residue pumping with seal flush barrier fluid and line steam tracing.',
      standard: 'API 610 (OH2 High-Temp)',
      timeStep: '50ms Hydraulic',
      safety: 'Thermal Relief Verified',
      temp: '360 °C',
      pressure: '12.4 bar',
    },

    // REFORMER
    'R-301': {
      tag: 'R-301',
      name: isRTL ? 'مفاعل التهذيب المستمر الحفزي (CCR)' : 'Continuous Catalytic Reforming Reactor',
      type: 'Stacked Radial Flow Moving-Bed Catalyst Reactor',
      eos: 'Smith Kinetic Multi-Reaction Dehydrogenation Matrix',
      desc: isRTL
        ? 'محاكاة تحويل النافثا إلى أروماتيات عالية الأوكتان (RON 102) مع احتساب انخفاض حرارة التفاعل الماص.'
        : 'Endothermic dehydrogenation kinetics yielding RON 102 reformate and pure hydrogen gas co-product.',
      standard: 'ASME Sec VIII Div 2',
      timeStep: '50ms Kinetics',
      safety: 'Emergency H2 Depressuring',
      temp: '515 °C In',
      pressure: '4.8 bar',
    },
    'E-301': {
      tag: 'E-301',
      name: isRTL ? 'المبادل الحراري لتغذية ومخرجات المفاعل' : 'Packinox Combined Feed/Effluent Exchanger',
      type: 'High-Efficiency Plate-Pack Counter-Current Exchanger',
      eos: 'Counter-Current Micro-Channel Heat Transfer Dynamics',
      desc: isRTL
        ? 'استرجاع فائق للطاقة الحرارية بين مخرجات المفاعلات وتغذية النافثا الباردة مع محاكاة هبوط الضغط الدقيق.'
        : 'Recovers 85%+ thermal energy between effluent gas and cold charge naphtha under ultra-compact volume.',
      standard: 'API 662',
      timeStep: '100ms Rigorous',
      safety: 'Overpressure Protected',
      temp: '495 °C / 95 °C',
      pressure: '5.2 bar',
    },
    'V-301': {
      tag: 'V-301',
      name: isRTL ? 'وعاء فصل غاز الهيدروجين الفلاشي' : 'Cold Hydrogen Flash Drum',
      type: 'Three-Phase High-Pressure Knockout Vessel',
      eos: 'Gas-Liquid Separation & Entrainment Demister Kinetics',
      desc: isRTL
        ? 'فصل غاز الهيدروجين الغني لإعادة تدويره إلى المفاعلات وضمان استقرار مستوى السائل الهيدروكربوني.'
        : 'High-purity H2 gas separation (90%+ purity) feeding recycle compressor suction with mist pad monitoring.',
      standard: 'API 12J / ASME VIII',
      timeStep: '50ms Hydraulic',
      safety: 'High-High Level Trip',
      temp: '38 °C',
      pressure: '3.9 bar',
    },
    'K-301': {
      tag: 'K-301',
      name: isRTL ? 'ضاغط إعادة تدوير الهيدروجين' : 'Centrifugal Recycle Gas Compressor',
      type: 'Multi-Stage Centrifugal Compressor with Dry Gas Seals',
      eos: 'Polytropic Head Compression & Anti-Surge Controller',
      desc: isRTL
        ? 'حماية أوتوماتيكية ضد الاندفاع المفاجئ (Anti-Surge) مع محاكاة نظام حماية الأختام الغازية الجافة.'
        : 'Full dynamic anti-surge fast-opening valve emulation, polytropic head curves, and dry gas seal buffering.',
      standard: 'API 617 / API 614',
      timeStep: '5ms High-Speed',
      safety: 'Anti-Surge SIL-3 Loop',
      temp: '85 °C Discharge',
      pressure: '9.5 bar',
    },

    // Category Tags
    'C-102': {
      tag: 'C-102',
      name: isRTL ? 'برج تثبيت النافثا الخفيفة' : 'Light Naphtha Stabilizer Column',
      type: '30-Tray Fractionator with Thermosiphon Reboiler',
      eos: 'De-ethanization & De-propanization Separation Model',
      desc: isRTL
        ? 'ضبط ضغط البخار الجاف للنافثا المستقرة (RVP) وفصل غاز الوقود وغاز البترول المسال (LPG).'
        : 'Rigorous RVP Reid Vapor Pressure stabilization stripping off C1-C3 light ends for downstream storage.',
      standard: 'API 520 / ISA-5.1',
      timeStep: '100ms Rigorous',
      safety: 'SIL-2 Certified',
      temp: '165 °C',
      pressure: '9.8 bar',
    },
    'E-102': {
      tag: 'E-102',
      name: isRTL ? 'مبادل التبريد المائي للمنتجات' : 'Product Trim Water Coolers',
      type: 'Floating Head Shell & Tube Heat Exchangers',
      eos: 'Fouling Factor Growth & Cooling Water Scaling Model',
      desc: isRTL
        ? 'تبريد الكيروسين والديزل قبل إرسالها إلى مستودعات التخزين مع مراقبة حرارة مياه التبريد.'
        : 'Final run-down product cooling to safe storage temperatures with heat transfer coefficient tracking.',
      standard: 'TEMA R / API 660',
      timeStep: '100ms Thermal',
      safety: 'Thermal Relief Protected',
      temp: '65 °C',
      pressure: '6.0 bar',
    },
    'P-201': {
      tag: 'P-201',
      name: isRTL ? 'مضخات السولار الخفيف للتفريغ' : 'LVGO Vacuum Distillate Pumps',
      type: 'Centrifugal API 610 Top Discharge Pump Set',
      eos: 'Dynamic Head vs Flow & Cavitation Tracking',
      desc: isRTL
        ? 'سحب مقطر السولار الخفيف من صواني التكثيف تحت التفريغ مع حماية منع التجويف.'
        : 'Draws LVGO cuts from internal column collector trays under tight low NPSH available conditions.',
      standard: 'API 610 (OH2)',
      timeStep: '20ms Hydraulic',
      safety: 'Low-Flow Bypass Equipped',
      temp: '185 °C',
      pressure: '7.5 bar',
    },
    'TIC-101': {
      tag: 'TIC-101',
      name: isRTL ? 'حلقة التحكم في حرارة قمة البرج' : 'Overhead Vapor Temp Controller (TIC-101)',
      type: 'Digital PID Controller with Anti-Windup',
      eos: 'Discrete ISA-Algorithm PID with Reflux Rate Output',
      desc: isRTL
        ? 'حلقة تحكم دقيقة تعدل تدفق الراجع للحفاظ على مواصفات نقطة غليان النافثا الثقيلة ضمن ±0.5°C.'
        : 'Tightly regulates reflux control valve FV-102 to maintain distillation cut point specifications within ±0.5°C.',
      standard: 'ISA-88 / ISA-5.1',
      timeStep: '50ms Closed-Loop',
      safety: 'High-Temp Alarm TAH-101',
      temp: '114.5 °C (SP)',
      pressure: '1.48 bar',
    },
    'PSV-101': {
      tag: 'PSV-101',
      name: isRTL ? 'صمام تصريف الضغط والوقاية لقمة البرج' : 'Column Overhead Safety Relief Valve (PSV-101)',
      type: 'Pilot-Operated Spring-Loaded Pressure Safety Valve',
      eos: 'API 520 Critical Choked Flow Discharge Capacity Solver',
      desc: isRTL
        ? 'صمام أمان رئيسي ينفتح تلقائياً عند تجاوز الضغط لـ 2.2 بار لتوجيه الغازات فوراً إلى شعلة المصفاة (Flare).'
        : 'Critical plant defense designed for full fire case and reflux failure relief scenarios into refinery flare.',
      standard: 'API 520 / API 526',
      timeStep: '1ms Mechanical',
      safety: 'SIL-4 Certified Interlock',
      temp: '135 °C Set',
      pressure: '2.20 bar Set',
    },
  };

  const codexCategoryItems: Record<CategoryKey, { label: string; count: number; tags: string[] }> = {
    COLUMNS: {
      label: isRTL ? 'أبراج التقطير والفصل' : 'Fractionators & Trays',
      count: 18,
      tags: ['C-101', 'C-201', 'C-102'],
    },
    HEATERS: {
      label: isRTL ? 'الأفران والمبادلات' : 'Fired Heaters & Boilers',
      count: 42,
      tags: ['F-101', 'F-201', 'E-101', 'E-301', 'E-102'],
    },
    ROTATING: {
      label: isRTL ? 'المضخات والضواغط' : 'Pumps & Compressors',
      count: 86,
      tags: ['P-101A/B', 'P-202', 'P-201', 'K-301'],
    },
    CONTROLS: {
      label: isRTL ? 'حلقات التحكم PID' : 'Control Valves & PIDs',
      count: 147,
      tags: ['TIC-101'],
    },
    SAFETY: {
      label: isRTL ? 'صمامات الأمان والـ ESD' : 'PSVs & Interlocks',
      count: 94,
      tags: ['PSV-101'],
    },
  };

  const currentTagData = tagDatabase[activeTag] || tagDatabase['C-101'];

  return (
    <section id="ots-builder" className="py-24 px-6 lg:px-12 relative bg-white border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
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

        {/* 3 Core OTS Builder Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          {t.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-[#4F46E5]/40 transition-all space-y-3 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#4F46E5]">
                {idx === 0 && <Bot className="w-5 h-5" />}
                {idx === 1 && <Cpu className="w-5 h-5" />}
                {idx === 2 && <Layers className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-bold text-[#0B1120] font-sans">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive P&ID Blueprint Ingestion Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Ingestion Canvas (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-sm text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-slate-800 block uppercase tracking-wide">
                  {isRTL ? 'مختبر فحص مخططات P&ID التفاعلي' : 'P&ID NEURAL INGESTION ENGINE'}
                </span>
                <span className="text-[11px] font-sans text-slate-500">
                  {isRTL ? 'تحليل مسارات التدفق والتوازن الهيدروليكي آلياً' : 'Automated topological graph generation from engineering drawings'}
                </span>
              </div>

              {/* Preset Selector */}
              <div className="flex items-center bg-[#F1F5F9] p-1 rounded-full text-xs font-sans shrink-0 border border-slate-200">
                <button
                  onClick={() => triggerScan('CDU')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedPreset === 'CDU'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1120]'
                  }`}
                >
                  CDU-100
                </button>
                <button
                  onClick={() => triggerScan('VDU')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedPreset === 'VDU'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1120]'
                  }`}
                >
                  VDU-200
                </button>
                <button
                  onClick={() => triggerScan('REFORMER')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedPreset === 'REFORMER'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1120]'
                  }`}
                >
                  CRU-300
                </button>
              </div>
            </div>

            {/* Ingestion Scan Status & Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-600 font-semibold">
                  {isScanning
                    ? (isRTL ? 'جاري فحص المخطط واستخراج المعدات...' : 'PARSING P&ID BLUEPRINT NODES IN REAL-TIME...')
                    : (isRTL ? 'اكتمل التوليف · معادلات توازن الكتلة والطاقة جاهزة' : 'SYNTHESIS COMPLETE · DYNAMIC MASS & ENERGY BALANCE READY')}
                </span>
                <span className="text-[#4F46E5] font-bold">
                  {detectedCount} / 387 {isRTL ? 'معدة' : 'NODES'}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>

            {/* Interactive Vector CAD Blueprint Canvas */}
            <div className="h-64 sm:h-72 w-full bg-[#FAFAFA] border border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center p-4">
              <svg className="w-full h-full select-none" viewBox="0 0 800 320">
                {/* Blueprint Grid Lines */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Animated Pipeline Lines for CDU-100 */}
                {selectedPreset === 'CDU' && (
                  <>
                    <path d="M 60 180 L 200 180" fill="none" stroke="#6366f1" strokeWidth="2.5" className="animate-flow-dash" />
                    <path d="M 300 180 L 420 180" fill="none" stroke="#3b82f6" strokeWidth="3" className="animate-flow-dash" />
                    <path d="M 500 180 L 640 180" fill="none" stroke="#10b981" strokeWidth="3" className="animate-flow-dash" />
                    <path d="M 460 80 L 460 50 L 660 50 L 660 150" fill="none" stroke="#ec4899" strokeWidth="2" className="animate-flow-dash" />

                    {/* Node 1: F-101 */}
                    <g onClick={() => { setActiveTag('F-101'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <rect x="200" y="130" width="100" height="100" rx="12" fill={activeTag === 'F-101' ? '#ede9fe' : '#ffffff'} stroke={activeTag === 'F-101' ? '#7C3AED' : '#cbd5e1'} strokeWidth={activeTag === 'F-101' ? '2.5' : '1.5'} />
                      <text x="250" y="175" textAnchor="middle" fill="#0B1120" fontSize="12" fontWeight="bold" fontFamily="monospace">F-101</text>
                      <text x="250" y="195" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="sans-serif">Charge Heater</text>
                    </g>

                    {/* Node 2: C-101 */}
                    <g onClick={() => { setActiveTag('C-101'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <rect x="420" y="80" width="80" height="190" rx="18" fill={activeTag === 'C-101' ? '#ede9fe' : '#ffffff'} stroke={activeTag === 'C-101' ? '#7C3AED' : '#cbd5e1'} strokeWidth={activeTag === 'C-101' ? '2.5' : '1.5'} />
                      <text x="460" y="170" textAnchor="middle" fill="#0B1120" fontSize="12" fontWeight="bold" fontFamily="monospace">C-101</text>
                      <text x="460" y="190" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="sans-serif">ATM Column</text>
                    </g>

                    {/* Node 3: P-101A/B */}
                    <g onClick={() => { setActiveTag('P-101A/B'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <circle cx="660" cy="180" r="24" fill={activeTag === 'P-101A/B' ? '#dcfce7' : '#ffffff'} stroke={activeTag === 'P-101A/B' ? '#059669' : '#cbd5e1'} strokeWidth={activeTag === 'P-101A/B' ? '2.5' : '1.5'} />
                      <text x="660" y="184" textAnchor="middle" fill="#0B1120" fontSize="9" fontWeight="bold" fontFamily="monospace">P-101</text>
                    </g>
                  </>
                )}

                {/* Animated Pipeline Lines for VDU-200 */}
                {selectedPreset === 'VDU' && (
                  <>
                    <path d="M 60 180 L 200 180" fill="none" stroke="#f59e0b" strokeWidth="2.5" className="animate-flow-dash" />
                    <path d="M 300 180 L 410 180" fill="none" stroke="#ef4444" strokeWidth="3" className="animate-flow-dash" />
                    <path d="M 510 180 L 640 180" fill="none" stroke="#8b5cf6" strokeWidth="3" className="animate-flow-dash" />
                    <path d="M 460 70 L 460 40 L 660 40 L 660 110" fill="none" stroke="#06b6d4" strokeWidth="2" className="animate-flow-dash" />

                    {/* Node 1: F-201 */}
                    <g onClick={() => { setActiveTag('F-201'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <rect x="200" y="130" width="100" height="100" rx="12" fill={activeTag === 'F-201' ? '#ede9fe' : '#ffffff'} stroke={activeTag === 'F-201' ? '#7C3AED' : '#cbd5e1'} strokeWidth={activeTag === 'F-201' ? '2.5' : '1.5'} />
                      <text x="250" y="175" textAnchor="middle" fill="#0B1120" fontSize="12" fontWeight="bold" fontFamily="monospace">F-201</text>
                      <text x="250" y="195" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="sans-serif">Vacuum Heater</text>
                    </g>

                    {/* Node 2: C-201 */}
                    <g onClick={() => { setActiveTag('C-201'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <rect x="410" y="70" width="100" height="200" rx="20" fill={activeTag === 'C-201' ? '#ede9fe' : '#ffffff'} stroke={activeTag === 'C-201' ? '#7C3AED' : '#cbd5e1'} strokeWidth={activeTag === 'C-201' ? '2.5' : '1.5'} />
                      <text x="460" y="165" textAnchor="middle" fill="#0B1120" fontSize="12" fontWeight="bold" fontFamily="monospace">C-201</text>
                      <text x="460" y="185" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="sans-serif">Deep Vacuum</text>
                    </g>

                    {/* Node 3: EJ-201 */}
                    <g onClick={() => { setActiveTag('EJ-201'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <polygon points="630,110 690,110 660,140" fill={activeTag === 'EJ-201' ? '#cffafe' : '#ffffff'} stroke={activeTag === 'EJ-201' ? '#0891b2' : '#cbd5e1'} strokeWidth={activeTag === 'EJ-201' ? '2.5' : '1.5'} />
                      <text x="660" y="125" textAnchor="middle" fill="#0B1120" fontSize="9" fontWeight="bold" fontFamily="monospace">EJ-201</text>
                    </g>

                    {/* Node 4: P-202 */}
                    <g onClick={() => { setActiveTag('P-202'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <circle cx="660" cy="200" r="22" fill={activeTag === 'P-202' ? '#dcfce7' : '#ffffff'} stroke={activeTag === 'P-202' ? '#059669' : '#cbd5e1'} strokeWidth={activeTag === 'P-202' ? '2.5' : '1.5'} />
                      <text x="660" y="204" textAnchor="middle" fill="#0B1120" fontSize="9" fontWeight="bold" fontFamily="monospace">P-202</text>
                    </g>
                  </>
                )}

                {/* Animated Pipeline Lines for REFORMER */}
                {selectedPreset === 'REFORMER' && (
                  <>
                    <path d="M 60 180 L 190 180" fill="none" stroke="#10b981" strokeWidth="2.5" className="animate-flow-dash" />
                    <path d="M 290 180 L 410 180" fill="none" stroke="#f43f5e" strokeWidth="3" className="animate-flow-dash" />
                    <path d="M 510 180 L 630 180" fill="none" stroke="#3b82f6" strokeWidth="3" className="animate-flow-dash" />
                    <path d="M 630 140 L 630 80 L 350 80 L 350 140" fill="none" stroke="#a855f7" strokeWidth="2" className="animate-flow-dash" />

                    {/* Node 1: E-301 */}
                    <g onClick={() => { setActiveTag('E-301'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <circle cx="240" cy="180" r="32" fill={activeTag === 'E-301' ? '#ede9fe' : '#ffffff'} stroke={activeTag === 'E-301' ? '#7C3AED' : '#cbd5e1'} strokeWidth={activeTag === 'E-301' ? '2.5' : '1.5'} />
                      <text x="240" y="184" textAnchor="middle" fill="#0B1120" fontSize="10" fontWeight="bold" fontFamily="monospace">E-301</text>
                    </g>

                    {/* Node 2: R-301 */}
                    <g onClick={() => { setActiveTag('R-301'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <rect x="410" y="90" width="100" height="180" rx="14" fill={activeTag === 'R-301' ? '#ede9fe' : '#ffffff'} stroke={activeTag === 'R-301' ? '#7C3AED' : '#cbd5e1'} strokeWidth={activeTag === 'R-301' ? '2.5' : '1.5'} />
                      <text x="460" y="170" textAnchor="middle" fill="#0B1120" fontSize="12" fontWeight="bold" fontFamily="monospace">R-301</text>
                      <text x="460" y="190" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="sans-serif">CCR Reactor</text>
                    </g>

                    {/* Node 3: V-301 */}
                    <g onClick={() => { setActiveTag('V-301'); dcsAudio.playClick(); }} className="cursor-pointer group">
                      <rect x="620" y="140" width="60" height="90" rx="10" fill={activeTag === 'V-301' ? '#ede9fe' : '#ffffff'} stroke={activeTag === 'V-301' ? '#7C3AED' : '#cbd5e1'} strokeWidth={activeTag === 'V-301' ? '2.5' : '1.5'} />
                      <text x="650" y="190" textAnchor="middle" fill="#0B1120" fontSize="9" fontWeight="bold" fontFamily="monospace">V-301</text>
                    </g>
                  </>
                )}
              </svg>

              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono text-slate-600 shadow-xs">
                {isRTL ? 'اضغط على أي معدة في المخطط لفحص كود المحاكاة والمعادلات' : 'Click equipment node in drawing to inspect thermodynamic solver'}
              </div>
            </div>

            {/* Ingestion KPI Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="text-lg font-bold text-[#0B1120]">~1 WEEK</div>
                <div className="text-[10px] text-slate-500 uppercase">{isRTL ? 'زمن التوليف' : 'RAPID BUILD TARGET'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="text-lg font-bold text-[#4F46E5]">387</div>
                <div className="text-[10px] text-slate-500 uppercase">{isRTL ? 'معدة قياسية' : 'EQUIPMENT SPECS'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="text-lg font-bold text-[#4F46E5]">100%</div>
                <div className="text-[10px] text-slate-500 uppercase">{isRTL ? 'دقة وسوم P&ID' : 'P&ID TAG FIDELITY'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="text-lg font-bold text-[#059669]">0.00ms</div>
                <div className="text-[10px] text-slate-500 uppercase">{isRTL ? 'استجابة أوفلاين' : 'OFFLINE LATENCY'}</div>
              </div>
            </div>
          </div>

          {/* Right: The Thermodynamic Equation Dossier & 387 Codex (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between space-y-6 text-left shadow-sm" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wide">
                  {isRTL ? 'ملف المعادلات الديناميكية' : 'THERMODYNAMIC SOLVER DOSSIER'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0B1120] font-mono text-xs font-bold border border-slate-200 shadow-xs">
                  TAG: {currentTagData.tag}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0B1120] font-sans">
                    {currentTagData.name}
                  </h3>
                  <p className="text-xs font-mono text-[#4F46E5] font-semibold mt-0.5">
                    {currentTagData.type}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                    {isRTL ? 'معادلة الحالة الثرموديناميكية (EOS):' : 'EQUATION OF STATE (EOS):'}
                  </span>
                  <div className="text-xs font-mono text-[#059669] bg-[#ecfdf5] p-2 rounded border border-[#a7f3d0] font-semibold leading-relaxed">
                    {currentTagData.eos}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {currentTagData.desc}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs font-mono text-slate-600">
                  <div className="p-2 rounded bg-white border border-slate-200/80">
                    <span className="text-slate-400 block text-[10px]">Standard:</span>
                    <span className="text-[#0B1120] font-medium">{currentTagData.standard}</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200/80">
                    <span className="text-slate-400 block text-[10px]">Time-Step:</span>
                    <span className="text-[#0B1120] font-medium">{currentTagData.timeStep}</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200/80">
                    <span className="text-slate-400 block text-[10px]">Design Temp:</span>
                    <span className="text-[#0B1120] font-medium">{currentTagData.temp}</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200/80">
                    <span className="text-slate-400 block text-[10px]">Interlock Safety:</span>
                    <span className="text-[#059669] font-bold">{currentTagData.safety}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Codex Category Selector & Equipment Tag Browser */}
            <div className="pt-4 border-t border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold block">
                  {isRTL ? 'استكشف معدات المنظومة (387 نوعاً):' : 'EXPLORE 387 EQUIPMENT CODEX:'}
                </span>
                <span className="text-[10px] font-mono text-[#4F46E5] font-bold">
                  {codexCategoryItems[selectedCat].count} {isRTL ? 'معدة' : 'MODELS'}
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(codexCategoryItems) as CategoryKey[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCat(cat);
                      const firstTag = codexCategoryItems[cat].tags[0];
                      if (firstTag) setActiveTag(firstTag);
                      dcsAudio.playClick();
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all cursor-pointer ${
                      selectedCat === cat
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-xs'
                        : 'bg-white text-slate-600 hover:text-[#0B1120] border border-slate-200'
                    }`}
                  >
                    {codexCategoryItems[cat].label}
                  </button>
                ))}
              </div>

              {/* Category Equipment Tag Pills */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <div className="text-[10px] text-slate-400 font-mono">
                  {isRTL ? 'المعدات المتاحة للاختبار في هذه الفئة:' : 'AVAILABLE TAGS IN THIS CATEGORY:'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {codexCategoryItems[selectedCat].tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setActiveTag(tag);
                        dcsAudio.playClick();
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                        activeTag === tag
                          ? 'bg-purple-100 text-[#4F46E5] border border-purple-300 font-bold'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
