import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';
import { Layers, Database, Cpu, CheckCircle2, Sliders, ShieldAlert, ArrowRight } from 'lucide-react';

type BlueprintPreset = 'CDU' | 'VDU' | 'REFORMER';
type CategoryKey = 'COLUMNS' | 'HEATERS' | 'ROTATING' | 'CONTROLS' | 'SAFETY';

interface EquipmentItem {
  tag: string;
  name: string;
  nameAr: string;
  symbol: string;
  equation: string;
  failureModes: string[];
  failureModesAr: string[];
}

export const Section_PIDScanner: React.FC = () => {
  const { language } = useSimulationJourney();
  const [selectedPreset, setSelectedPreset] = useState<BlueprintPreset>('CDU');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [detectedCount, setDetectedCount] = useState(387);
  const [activeTag, setActiveTag] = useState<string>('C-101');
  const [selectedCat, setSelectedCat] = useState<CategoryKey>('COLUMNS');

  const isRTL = language === 'AR';

  const triggerScan = (preset: BlueprintPreset) => {
    setSelectedPreset(preset);
    setIsScanning(true);
    setScanProgress(0);
    setDetectedCount(0);
    dcsAudio.playClick();

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
    }, 35);
  };

  const tagDetails: Record<string, { name: string; type: string; eos: string; desc: string }> = {
    'C-101': {
      name: isRTL ? 'برج التقطير الجوي الرئيسي' : 'Atmospheric Crude Fractionator',
      type: 'Fractionation Column (48 Sieve Trays)',
      eos: 'Peng-Robinson EOS · Rigorous Liquid-Vapor Equilibrium',
      desc: isRTL
        ? 'تم التعرف التلقائي على 48 صينية تقطير ونقاط سحب الكيروسين والسولار والديزل مع توازن الكتلة والطاقة اللحظي.'
        : 'Auto-synthesized 48 sieve trays, 3 side-strippers (Kerosene, Gasoil, Diesel), and dynamic tray holdups.',
    },
    'F-101': {
      name: isRTL ? 'فرن تسخين النفط الخام' : 'Crude Charge Fired Heater',
      type: 'Radiant/Convection Furnace (32 Burners)',
      eos: 'Combustion Stoichiometry + Heat Flux Matrix',
      desc: isRTL
        ? 'حساب ديناميكي لدرجة حرارة مخرج الأنابيب (COT 365°C) مع محاكاة هبوط ضغط الغاز وتوزيع اللهب.'
        : 'Dynamic coil outlet temperature (COT) tracking, tube skin heat-flux limits, and fuel gas draft control.',
    },
    'P-101A/B': {
      name: isRTL ? 'مضخات سائل الارتجاع المزدوجة' : 'Overhead Reflux Dual Redundant Pumps',
      type: 'API 610 Centrifugal Pumps (100% Sparing)',
      eos: 'Bernoulli Dynamic Hydraulic Curve',
      desc: isRTL
        ? 'محاكاة التبديل التلقائي وفشل المحرك الكهربائي مع حساب منحنيات الهيدروليك NPSH الحقيقية.'
        : 'Full auto-switchover logic, NPSH cavitation limits, motor thermal trip modeling, and discharge check valves.',
    },
    'FIC-102': {
      name: isRTL ? 'حلقة التحكم في تدفق الارتجاع' : 'Reflux Cascade Flow Controller',
      type: 'ISA-5.1 PID Cascade Instrument Loop',
      eos: 'Velocity-Form Discrete PID (0.1s Loop)',
      desc: isRTL
        ? 'ربط مباشر مع واجهة غرفة التحكم DCS للتحويل بين النمط اليدوي والتلقائي والتحكم التتابعي.'
        : 'Auto-mapped DCS faceplate with anti-reset windup, rate-of-change alarming, and remote SP tracking.',
    },
  };

  const codexCategories: Record<CategoryKey, { label: string; count: number; items: EquipmentItem[] }> = {
    COLUMNS: {
      label: isRTL ? 'أبراج التقطير والفصل' : 'Fractionation Columns',
      count: 42,
      items: [
        {
          tag: 'T-22',
          name: 'Atmospheric Distillation Column',
          nameAr: 'برج التقطير الجوي متعدد الصواني',
          symbol: 'FRACTIONATOR',
          equation: 'dM_i/dt = L_{i-1} + V_{i+1} - L_i - V_i + F_i',
          failureModes: ['Tray Flooding / Entrainment', 'Weeping / Dumping', 'Reflux Subcooling Shock'],
          failureModesAr: ['طوفان السائل وتجاوز الصواني', 'تسريب وتفريغ السائل السفلي', 'صدمة حرارية لفرط برودة الارتجاع'],
        },
        {
          tag: 'T-60',
          name: 'Deep Vacuum Distillation Tower',
          nameAr: 'برج التقطير المفرغ العميق',
          symbol: 'VACUUM TOWER',
          equation: 'P_{vac} = P_{ejector} - \\Delta P_{packing} - \\rho g h',
          failureModes: ['Barometric Ejector Choke', 'Residue Overheating & Coking', 'Wash Bed Dryout'],
          failureModesAr: ['انسداد طارد البخار وفقدان التفريغ', 'تفحم واحتراق المتبقي السفلي', 'جفاف طبقات الغسيل السفلية'],
        },
      ],
    },
    HEATERS: {
      label: isRTL ? 'الأفران والمبادلات' : 'Fired Heaters & Exchangers',
      count: 58,
      items: [
        {
          tag: 'F-101',
          name: 'Crude Charge Fired Heater',
          nameAr: 'فرن تسخين النفط الخام الرئيسي',
          symbol: 'FURNACE',
          equation: 'Q = \\eta \\cdot m_{fuel} \\cdot LHV = m_{crude} C_p \\Delta T',
          failureModes: ['Tube Rupture / Firebox Flare', 'Fuel Gas Flameout', 'Tube Skin Hotspots'],
          failureModesAr: ['انفجار وتمزق أنبوب داخل بيت النار', 'انخفاض ضغط الوقود وانطفاء الشعلات', 'تفحم وتكلس موضعي بالأنبوب'],
        },
        {
          tag: 'E-101',
          name: 'Crude Preheat Exchanger Train',
          nameAr: 'مصفوفة مبادلات التسخين المسبق',
          symbol: 'HEAT EXCHANGER',
          equation: 'Q = U \\cdot A \\cdot LMTD \\cdot F_t',
          failureModes: ['Tube Bundle Fouling', 'Hydrocarbon Cross-Leak'],
          failureModesAr: ['ترسبات وتكلس الحزمة الأنبوبية', 'تلف الحشوة وتسرب الهيدروكربون الداخلي'],
        },
      ],
    },
    ROTATING: {
      label: isRTL ? 'المضخات والضواغط' : 'Pumps & Compressors',
      count: 86,
      items: [
        {
          tag: 'P-1007 A/B',
          name: 'Overhead Reflux Centrifugal Pump',
          nameAr: 'مضخة الارتجاع المزدوجة للطرد المركزي',
          symbol: 'CENTRIFUGAL PUMP',
          equation: 'H = H_0 - A \\cdot Q^2 \\quad (NPSH_a > NPSH_r)',
          failureModes: ['Motor Electrical Thermal Trip', 'NPSH Cavitation', 'Mechanical Seal Blowout'],
          failureModesAr: ['هبوط حراري للمحرك الكهربائي', 'تكوه البخار داخل المضخة (Cavitation)', 'تلف مانع التسرب الميكانيكي'],
        },
      ],
    },
    CONTROLS: {
      label: isRTL ? 'أجهزة وحلقات PID' : 'Instrumentation & PID Loops',
      count: 114,
      items: [
        {
          tag: 'TIC-101',
          name: 'Column Top Temperature Loop',
          nameAr: 'حلقة التحكم التتابعي بحرارة القمة',
          symbol: 'CASCADE PID',
          equation: 'u(t) = K_p e(t) + K_i \\int e(\\tau) d\\tau + K_d \\frac{de}{dt}',
          failureModes: ['Thermocouple Drift', 'Transmitter Freeze', 'Tuning Oscillation Hunting'],
          failureModesAr: ['انقطاع سلك الحساس الحراري', 'تجمد جهاز الإرسال على آخر قيمة', 'تذبذب مفرط في حلقة التحكم'],
        },
      ],
    },
    SAFETY: {
      label: isRTL ? 'أنظمة الأمان والـ ESD' : 'Safety, Interlocks & Flare',
      count: 87,
      items: [
        {
          tag: 'ESD-01',
          name: 'Emergency Shutdown Matrix (SIL-3)',
          nameAr: 'نظام الإغلاق الاضطراري للمصفاة (SIL-3)',
          symbol: 'SIL-3 ESD MATRIX',
          equation: 'PFD_{avg} < 10^{-3} \\quad \\text{IEC 61508 / 61511}',
          failureModes: ['Spurious Trip Causing Blackout', 'Stuck Solenoid Valve on Critical ESD'],
          failureModesAr: ['هبوط كاذب يتسبب في توقف المصفاة', 'انحشار صمام الملف اللولبي عند الطوارئ'],
        },
      ],
    },
  };

  return (
    <section id="pid-scanner" className="py-24 px-4 sm:px-6 lg:px-12 relative bg-[#080B14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-slate-800 pb-8" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#121826] border border-slate-700/60 text-slate-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{isRTL ? 'محرك التوليف الآلي لمخططات P&ID' : 'PROPRIETARY AUTOMATED FLOWSHEET SYNTHESIS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
              {isRTL ? 'من مخططات P&ID إلى محاكٍ ديناميكي كامل في 7 أيام.' : 'From Scanned P&ID to Running OTS in ~7 Days.'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isRTL
                ? 'الشركات التقليدية تحتاج 6 إلى 9 أشهر من البرمجة اليدوية بتكلفة 110 ألف دولار. نكسيفا تحلل مخططات P&ID الخاصة بمصفاتك آلياً وتولد المعادلات الديناميكية ومكتبة الـ 387 معدة في أسبوع واحد.'
                : 'Legacy vendors spend 6 to 9 months manually hardcoding equations. NEXIIVA parses your refinery P&IDs to auto-compile dynamic mass & energy balances across 387 equipment types in ~7 days.'}
            </p>
          </div>

          {/* Unit Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#101522] p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => triggerScan('CDU')}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPreset === 'CDU'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CDU-100 (Atmospheric)
            </button>
            <button
              onClick={() => triggerScan('VDU')}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPreset === 'VDU'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              VDU-200 (Vacuum)
            </button>
            <button
              onClick={() => triggerScan('REFORMER')}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPreset === 'REFORMER'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CRU-300 (Reformer)
            </button>
          </div>
        </div>

        {/* The Engineering Light-Table & Blueprint Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: The Scanning Blueprint Viewer (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0B0F1C] border border-slate-800 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[460px]">
            {/* Top Status Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-white font-bold">
                  {isScanning ? 'SCANNING P&ID SCHEMATIC...' : 'P&ID SYNTHESIS VERIFIED'}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <span className="text-purple-300 font-bold">{detectedCount} / 387 NODES</span>
                <span>|</span>
                <span className="text-cyan-400 font-bold">{scanProgress}%</span>
              </div>
            </div>

            {/* The Blueprint Canvas */}
            <div className="relative flex-1 my-4 rounded-xl bg-[#040711] border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
              {/* CAD Grid Lines */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)`,
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Laser Scanning Beam */}
              {isScanning && (
                <div
                  className="absolute inset-y-0 w-1 bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 shadow-[0_0_20px_#38BDF8] z-30 transition-all duration-75 pointer-events-none"
                  style={{ left: `${scanProgress}%` }}
                />
              )}

              {/* Architectural P&ID Layout SVG */}
              <svg className="w-full h-full max-h-[300px] select-none" viewBox="0 0 800 300" fill="none">
                {/* Piping lines */}
                <path d="M 60 150 L 180 150" stroke="#38BDF8" strokeWidth="2.5" />
                <path d="M 260 150 L 360 150" stroke="#F59E0B" strokeWidth="2.5" />
                <path d="M 410 70 L 410 40 L 580 40 L 580 70" stroke="#A855F7" strokeWidth="2.5" />
                <path d="M 580 120 L 580 180 L 640 180" stroke="#38BDF8" strokeWidth="2" />
                <path d="M 680 180 L 740 180 L 740 120 L 440 120" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 3" />

                {/* Hotspot 1: F-101 Furnace */}
                <g
                  onClick={() => {
                    setActiveTag('F-101');
                    dcsAudio.playClick();
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="180"
                    y="100"
                    width="80"
                    height="100"
                    rx="4"
                    fill="#10162A"
                    stroke={activeTag === 'F-101' ? '#A855F7' : '#3361FC'}
                    strokeWidth={activeTag === 'F-101' ? '2.5' : '1.5'}
                  />
                  <text x="220" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    F-101
                  </text>
                  <text x="220" y="165" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace">
                    FURNACE
                  </text>
                </g>

                {/* Hotspot 2: C-101 Column */}
                <g
                  onClick={() => {
                    setActiveTag('C-101');
                    dcsAudio.playClick();
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="360"
                    y="50"
                    width="80"
                    height="200"
                    rx="16"
                    fill="#10162A"
                    stroke={activeTag === 'C-101' ? '#A855F7' : '#3361FC'}
                    strokeWidth={activeTag === 'C-101' ? '2.5' : '1.5'}
                  />
                  {[80, 100, 120, 140, 160, 180, 200, 220].map((y, i) => (
                    <line key={i} x1="370" y1={y} x2="430" y2={y} stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                  ))}
                  <text x="400" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="black" fontFamily="monospace">
                    C-101
                  </text>
                  <text x="400" y="165" textAnchor="middle" fill="#38BDF8" fontSize="9" fontFamily="monospace">
                    48 TRAYS
                  </text>
                </g>

                {/* Hotspot 3: P-101 Pumps */}
                <g
                  onClick={() => {
                    setActiveTag('P-101A/B');
                    dcsAudio.playClick();
                  }}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="660"
                    cy="180"
                    r="20"
                    fill="#10162A"
                    stroke={activeTag === 'P-101A/B' ? '#A855F7' : '#3361FC'}
                    strokeWidth={activeTag === 'P-101A/B' ? '2' : '1.5'}
                  />
                  <text x="660" y="184" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    P-101
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-3 left-3 bg-[#0B1020]/90 px-3 py-1.5 rounded-md border border-slate-800 text-[10px] font-mono text-slate-300">
                {isRTL ? 'اضغط على أي معدة في المخطط لفحص كود المحاكاة والمعادلات' : 'Click equipment node in drawing to inspect thermodynamic solver'}
              </div>
            </div>

            {/* Ingestion KPI Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800 text-center font-mono">
              <div className="p-2.5 rounded-lg bg-[#101524] border border-slate-800">
                <div className="text-lg font-black text-white">7 DAYS</div>
                <div className="text-[10px] text-slate-500 uppercase">CUSTOM DELIVERY</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101524] border border-slate-800">
                <div className="text-lg font-black text-cyan-400">387</div>
                <div className="text-[10px] text-slate-500 uppercase">EQUIPMENT SPECS</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101524] border border-slate-800">
                <div className="text-lg font-black text-purple-300">100%</div>
                <div className="text-[10px] text-slate-500 uppercase">P&ID TAG FIDELITY</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101524] border border-slate-800">
                <div className="text-lg font-black text-emerald-400">0.00ms</div>
                <div className="text-[10px] text-slate-500 uppercase">JITTER LATENCY</div>
              </div>
            </div>
          </div>

          {/* Right: The Thermodynamic Equation Dossier & 387 Codex (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0D1220] border border-slate-800 p-6 flex flex-col justify-between shadow-2xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">THERMODYNAMIC SOLVER DOSSIER</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
                  TAG: {activeTag}
                </span>
              </div>

              {activeTag && tagDetails[activeTag] && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {tagDetails[activeTag].name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">
                      {tagDetails[activeTag].type}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      EQUATION OF STATE (EOS):
                    </span>
                    <div className="text-xs font-mono text-emerald-300 bg-emerald-950/20 p-2 rounded border border-emerald-500/20">
                      {tagDetails[activeTag].eos}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tagDetails[activeTag].desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>Standard:</span>
                      <span className="text-slate-200">API 520 / ISA-5.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time-Step:</span>
                      <span className="text-slate-200">100ms Rigorous</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interlock Safety:</span>
                      <span className="text-emerald-400 font-bold">SIL-3 Verified</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Codex Category Selector */}
            <div className="pt-4 border-t border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-[10px] text-slate-400 uppercase block">
                EXPLORE 387 EQUIPMENT CATEGORIES:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(codexCategories) as CategoryKey[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCat(cat);
                      dcsAudio.playClick();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] transition-all cursor-pointer ${
                      selectedCat === cat
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-black/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    {codexCategories[cat].label} ({codexCategories[cat].count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
