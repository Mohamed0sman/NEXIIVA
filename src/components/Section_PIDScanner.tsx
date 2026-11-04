import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Bot, Cpu, Layers, Sparkles, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';

type BlueprintPreset = 'CDU' | 'VDU' | 'REFORMER';
type CategoryKey = 'COLUMNS' | 'HEATERS' | 'ROTATING' | 'CONTROLS' | 'SAFETY';

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
                <span className="text-xs font-mono font-bold text-slate-700 block uppercase">
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

                {/* Connection Process Lines */}
                <path d="M 80 180 L 220 180" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="6 3" />
                <path d="M 320 180 L 440 180" fill="none" stroke="#3b82f6" strokeWidth="3" />
                <path d="M 520 180 L 640 180" fill="none" stroke="#3b82f6" strokeWidth="3" />
                <path d="M 480 90 L 480 60 L 640 60 L 640 120" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />

                {/* Equipment Node 1: Fired Heater F-101 */}
                <g
                  onClick={() => {
                    setActiveTag('F-101');
                    dcsAudio.playClick();
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="220"
                    y="130"
                    width="100"
                    height="100"
                    rx="12"
                    fill={activeTag === 'F-101' ? '#ede9fe' : '#ffffff'}
                    stroke={activeTag === 'F-101' ? '#7C3AED' : '#cbd5e1'}
                    strokeWidth={activeTag === 'F-101' ? '2.5' : '1.5'}
                  />
                  <text x="270" y="175" textAnchor="middle" fill="#0B1120" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    F-101
                  </text>
                  <text x="270" y="195" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="sans-serif">
                    Charge Heater
                  </text>
                </g>

                {/* Equipment Node 2: Fractionation Column C-101 */}
                <g
                  onClick={() => {
                    setActiveTag('C-101');
                    dcsAudio.playClick();
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="440"
                    y="90"
                    width="80"
                    height="180"
                    rx="18"
                    fill={activeTag === 'C-101' ? '#ede9fe' : '#ffffff'}
                    stroke={activeTag === 'C-101' ? '#7C3AED' : '#cbd5e1'}
                    strokeWidth={activeTag === 'C-101' ? '2.5' : '1.5'}
                  />
                  <text x="480" y="175" textAnchor="middle" fill="#0B1120" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    C-101
                  </text>
                  <text x="480" y="195" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="sans-serif">
                    ATM Column
                  </text>
                </g>

                {/* Equipment Node 3: Reflux Pump P-101 */}
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
                    r="22"
                    fill={activeTag === 'P-101A/B' ? '#dcfce7' : '#ffffff'}
                    stroke={activeTag === 'P-101A/B' ? '#059669' : '#cbd5e1'}
                    strokeWidth={activeTag === 'P-101A/B' ? '2.5' : '1.5'}
                  />
                  <text x="660" y="184" textAnchor="middle" fill="#0B1120" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    P-101
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono text-slate-600 shadow-xs">
                {isRTL ? 'اضغط على أي معدة في المخطط لفحص كود المحاكاة والمعادلات' : 'Click equipment node in drawing to inspect thermodynamic solver'}
              </div>
            </div>

            {/* Ingestion KPI Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="text-lg font-bold text-[#0B1120]">~1 WEEK</div>
                <div className="text-[10px] text-slate-500 uppercase">RAPID BUILD TARGET</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="text-lg font-bold text-[#4F46E5]">387</div>
                <div className="text-[10px] text-slate-500 uppercase">EQUIPMENT SPECS</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="text-lg font-bold text-[#4F46E5]">100%</div>
                <div className="text-[10px] text-slate-500 uppercase">P&ID TAG FIDELITY</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                <div className="text-lg font-bold text-[#059669]">0.00ms</div>
                <div className="text-[10px] text-slate-500 uppercase">OFFLINE LATENCY</div>
              </div>
            </div>
          </div>

          {/* Right: The Thermodynamic Equation Dossier & 387 Codex (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between space-y-6 text-left shadow-sm" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-mono font-bold text-slate-600 uppercase">THERMODYNAMIC SOLVER DOSSIER</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0B1120] font-mono text-xs font-bold border border-slate-200 shadow-xs">
                  TAG: {activeTag}
                </span>
              </div>

              {activeTag && tagDetails[activeTag] && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1120] font-sans">
                      {tagDetails[activeTag].name}
                    </h3>
                    <p className="text-xs font-mono text-[#4F46E5] font-semibold mt-0.5">
                      {tagDetails[activeTag].type}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      EQUATION OF STATE (EOS):
                    </span>
                    <div className="text-xs font-mono text-[#059669] bg-[#ecfdf5] p-2 rounded border border-[#a7f3d0] font-semibold">
                      {tagDetails[activeTag].eos}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {tagDetails[activeTag].desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs font-mono text-slate-600">
                    <div className="flex justify-between">
                      <span>Standard:</span>
                      <span className="text-[#0B1120] font-medium">API 520 / ISA-5.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time-Step:</span>
                      <span className="text-[#0B1120] font-medium">100ms Rigorous</span>
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
            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
              <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold block">
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
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-xs'
                        : 'bg-white text-slate-600 hover:text-[#0B1120] border border-slate-200'
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
