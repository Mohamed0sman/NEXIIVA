import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';

type BlueprintPreset = 'CDU' | 'VDU' | 'REFORMER';
type CategoryKey = 'COLUMNS' | 'HEATERS' | 'ROTATING' | 'CONTROLS' | 'SAFETY';

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
      name: isRTL ? 'مضخات تغذية برج التقطير' : 'Crude Column Charge Pumps',
      type: 'Centrifugal API 610 Dual Set (A-Duty / B-Standby)',
      eos: 'Head-Capacity Affiliation Curves + NPSHa/NPSHr Cavitation',
      desc: isRTL
        ? 'منظومة تبديل أوتوماتيكي ومحاكاة أعطال المحركات وتجويف المضخات عند انخفاض ضغط السحب.'
        : 'Auto-start standby logic, motor trip simulation, and hydraulic cavitation detection.',
    },
  };

  const codexCategories: Record<CategoryKey, { label: string; count: number }> = {
    COLUMNS: { label: isRTL ? 'أبراج التقطير والفصل' : 'Fractionators & Trays', count: 18 },
    HEATERS: { label: isRTL ? 'الأفران والمبادلات' : 'Fired Heaters & Boilers', count: 42 },
    ROTATING: { label: isRTL ? 'المضخات والضواغط' : 'Pumps & Compressors', count: 86 },
    CONTROLS: { label: isRTL ? 'حلقات التحكم PID' : 'Control Valves & PIDs', count: 147 },
    SAFETY: { label: isRTL ? 'صمامات الأمان والـ ESD' : 'PSVs & Interlocks', count: 94 },
  };

  return (
    <section id="pid-scanner" className="py-24 px-6 lg:px-12 relative bg-white border-t border-[#ececec]">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-[#f2f2f3] pb-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-sans text-[#979799] uppercase tracking-wider">
              {isRTL ? 'محرك التوليف الآلي لمخططات P&ID' : 'PROPRIETARY AUTOMATED FLOWSHEET SYNTHESIS'}
            </div>
            <h2
              className={`text-4xl sm:text-5xl font-normal text-[#17191c] tracking-[-0.02em] leading-[1.2] ${
                isRTL ? 'font-serif-ar' : 'font-serif'
              }`}
            >
              {isRTL ? (
                <>
                  من مخططات P&ID إلى محاكٍ ديناميكي كامل{' '}
                  <span className="italic text-[#5d2a1a]">في أسبوع واحد.</span>
                </>
              ) : (
                <>
                  From scanned P&ID to running OTS{' '}
                  <span className="italic text-[#5d2a1a]">in ~7 business days.</span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg text-[#777b86] font-sans font-normal leading-[1.45]">
              {isRTL
                ? 'الشركات التقليدية تحتاج 6 إلى 9 أشهر من البرمجة اليدوية بتكلفة 110 ألف دولار. نكسيفا تحلل مخططات P&ID الخاصة بمصفاتك آلياً وتولد المعادلات الديناميكية ومكتبة الـ 387 معدة في 7 أيام فقط.'
                : 'Legacy vendors spend 6 to 9 months manually hardcoding equations. NEXIIVA parses your refinery P&IDs to auto-compile dynamic mass & energy balances across 387 equipment types in ~7 days.'}
            </p>
          </div>

          {/* Unit Selector Pill Tabs */}
          <div className="flex items-center gap-1.5 bg-[#f2f2f3] p-1 rounded-full shrink-0">
            <button
              onClick={() => triggerScan('CDU')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer ${
                selectedPreset === 'CDU'
                  ? 'bg-[#17191c] text-white font-medium shadow-sm'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
            >
              CDU-100 (Atmospheric)
            </button>
            <button
              onClick={() => triggerScan('VDU')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer ${
                selectedPreset === 'VDU'
                  ? 'bg-[#17191c] text-white font-medium shadow-sm'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
            >
              VDU-200 (Vacuum)
            </button>
            <button
              onClick={() => triggerScan('REFORMER')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer ${
                selectedPreset === 'REFORMER'
                  ? 'bg-[#17191c] text-white font-medium shadow-sm'
                  : 'text-[#777b86] hover:text-[#17191c]'
              }`}
            >
              CRU-300 (Reformer)
            </button>
          </div>
        </div>

        {/* The Engineering Light-Table & Blueprint Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: The Scanning Blueprint Viewer (7 Cols) */}
          <div className="lg:col-span-7 rounded-[24px] bg-white border border-[#ececec] shadow-artifact p-6 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
            {/* Top Status Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-[#f2f2f3] text-xs font-sans">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-[#0284c7] animate-ping' : 'bg-[#059669]'}`} />
                <span className="text-[#17191c] font-medium">
                  {isScanning ? 'SCANNING P&ID SCHEMATIC...' : 'P&ID SYNTHESIS VERIFIED'}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-[#777b86] font-mono text-[11px]">
                <span className="text-[#17191c] font-bold">{detectedCount} / 387 NODES</span>
                <span>|</span>
                <span className="text-[#059669] font-bold">{scanProgress}%</span>
              </div>
            </div>

            {/* The Blueprint Canvas */}
            <div className="relative flex-1 my-4 rounded-[16px] bg-[#f8fafc] border border-[#e2e8f0] p-4 flex items-center justify-center overflow-hidden">
              {/* CAD Grid Lines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Laser Scanning Beam */}
              {isScanning && (
                <div
                  className="absolute inset-y-0 w-1 bg-[#0284c7] shadow-[0_0_12px_#38bdf8] z-30 transition-all duration-75 pointer-events-none"
                  style={{ left: `${scanProgress}%` }}
                />
              )}

              {/* Architectural P&ID Layout SVG */}
              <svg className="w-full h-full max-h-[300px] select-none" viewBox="0 0 800 300" fill="none">
                {/* Piping lines */}
                <path d="M 60 150 L 180 150" stroke="#0284c7" strokeWidth="2.5" />
                <path d="M 260 150 L 360 150" stroke="#d97706" strokeWidth="2.5" />
                <path d="M 410 70 L 410 40 L 580 40 L 580 70" stroke="#5d2a1a" strokeWidth="2.5" />
                <path d="M 580 120 L 580 180 L 640 180" stroke="#0284c7" strokeWidth="2" />
                <path d="M 680 180 L 740 180 L 740 120 L 440 120" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 3" />

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
                    fill={activeTag === 'F-101' ? '#fed7aa' : '#ffffff'}
                    stroke={activeTag === 'F-101' ? '#ea580c' : '#cbd5e1'}
                    strokeWidth={activeTag === 'F-101' ? '2.5' : '1.5'}
                  />
                  <text x="220" y="145" textAnchor="middle" fill="#17191c" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    F-101
                  </text>
                  <text x="220" y="165" textAnchor="middle" fill="#d97706" fontSize="9" fontFamily="monospace">
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
                    fill={activeTag === 'C-101' ? '#e0f2fe' : '#ffffff'}
                    stroke={activeTag === 'C-101' ? '#0284c7' : '#cbd5e1'}
                    strokeWidth={activeTag === 'C-101' ? '2.5' : '1.5'}
                  />
                  {[80, 100, 120, 140, 160, 180, 200, 220].map((y, i) => (
                    <line key={i} x1="370" y1={y} x2="430" y2={y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                  ))}
                  <text x="400" y="145" textAnchor="middle" fill="#17191c" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    C-101
                  </text>
                  <text x="400" y="165" textAnchor="middle" fill="#0284c7" fontSize="9" fontFamily="monospace">
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
                    fill={activeTag === 'P-101A/B' ? '#dcfce7' : '#ffffff'}
                    stroke={activeTag === 'P-101A/B' ? '#059669' : '#cbd5e1'}
                    strokeWidth={activeTag === 'P-101A/B' ? '2.5' : '1.5'}
                  />
                  <text x="660" y="184" textAnchor="middle" fill="#17191c" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    P-101
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md border border-[#e2e8f0] text-[10px] font-mono text-[#777b86]">
                {isRTL ? 'اضغط على أي معدة في المخطط لفحص كود المحاكاة والمعادلات' : 'Click equipment node in drawing to inspect thermodynamic solver'}
              </div>
            </div>

            {/* Ingestion KPI Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#f2f2f3] text-center font-mono">
              <div className="p-2.5 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="text-lg font-bold text-[#17191c]">7 DAYS</div>
                <div className="text-[10px] text-[#777b86] uppercase">CUSTOM DELIVERY</div>
              </div>
              <div className="p-2.5 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="text-lg font-bold text-[#0284c7]">387</div>
                <div className="text-[10px] text-[#777b86] uppercase">EQUIPMENT SPECS</div>
              </div>
              <div className="p-2.5 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="text-lg font-bold text-[#5d2a1a]">100%</div>
                <div className="text-[10px] text-[#777b86] uppercase">P&ID TAG FIDELITY</div>
              </div>
              <div className="p-2.5 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="text-lg font-bold text-[#059669]">0.00ms</div>
                <div className="text-[10px] text-[#777b86] uppercase">JITTER LATENCY</div>
              </div>
            </div>
          </div>

          {/* Right: The Thermodynamic Equation Dossier & 387 Codex (5 Cols) */}
          <div className="lg:col-span-5 rounded-[24px] bg-[#f2f2f3] p-6 flex flex-col justify-between space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e2e2e4] pb-3">
                <span className="text-xs font-sans text-[#777b86] uppercase">THERMODYNAMIC SOLVER DOSSIER</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[#17191c] font-mono text-xs font-bold border border-[#ececec]">
                  TAG: {activeTag}
                </span>
              </div>

              {activeTag && tagDetails[activeTag] && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-lg font-normal text-[#17191c] font-sans">
                      {tagDetails[activeTag].name}
                    </h3>
                    <p className="text-xs font-mono text-[#0284c7] mt-0.5">
                      {tagDetails[activeTag].type}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[16px] bg-white border border-[#ececec] space-y-1.5">
                    <span className="text-[10px] font-sans text-[#777b86] uppercase tracking-wider block">
                      EQUATION OF STATE (EOS):
                    </span>
                    <div className="text-xs font-mono text-[#059669] bg-[#ecfdf5] p-2 rounded border border-[#a7f3d0]">
                      {tagDetails[activeTag].eos}
                    </div>
                  </div>

                  <p className="text-xs text-[#777b86] leading-relaxed">
                    {tagDetails[activeTag].desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#e2e2e4] text-xs font-mono text-[#777b86]">
                    <div className="flex justify-between">
                      <span>Standard:</span>
                      <span className="text-[#17191c] font-medium">API 520 / ISA-5.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time-Step:</span>
                      <span className="text-[#17191c] font-medium">100ms Rigorous</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interlock Safety:</span>
                      <span className="text-[#059669] font-bold">SIL-3 Verified</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Codex Category Selector */}
            <div className="pt-4 border-t border-[#e2e2e4] space-y-2 text-xs">
              <span className="text-[10px] text-[#979799] uppercase font-sans block">
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
                    className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all cursor-pointer ${
                      selectedCat === cat
                        ? 'bg-[#17191c] text-white font-medium'
                        : 'bg-white text-[#777b86] hover:text-[#17191c] border border-[#ececec]'
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
