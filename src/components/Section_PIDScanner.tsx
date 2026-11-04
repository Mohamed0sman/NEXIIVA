import React, { useState, useEffect } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';

type BlueprintPreset = 'CDU' | 'VDU' | 'REFORMER';

export const Section_PIDScanner: React.FC = () => {
  const { language } = useSimulationJourney();
  const [selectedPreset, setSelectedPreset] = useState<BlueprintPreset>('CDU');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [detectedCount, setDetectedCount] = useState(387);
  const [activeTag, setActiveTag] = useState<string | null>('C-101');

  const isRTL = language === 'AR';

  const triggerScan = (preset: BlueprintPreset) => {
    setSelectedPreset(preset);
    setIsScanning(true);
    setScanProgress(0);
    setDetectedCount(0);
    dcsAudio.playClick();

    let p = 0;
    const interval = setInterval(() => {
      p += 4;
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
    }, 40);
  };

  const tagDetails: Record<string, { name: string; type: string; eos: string; desc: string }> = {
    'C-101': {
      name: isRTL ? 'برج التقطير الجوي الرئيسي' : 'Atmospheric Crude Fractionator',
      type: 'Fractionation Column (48 Sieve Trays)',
      eos: 'Peng-Robinson EOS · Liquid-Vapor Equilibrium',
      desc: isRTL
        ? 'تم التعرف التلقائي على 48 صينية تقطير ونقاط سحب الكيروسين والسولار والديزل مع توازن الكتلة والطاقة.'
        : 'Auto-synthesized 48 sieve trays, 3 side-strippers (Kero, LGO, HGO), and thermodynamic stage holdups in 0.8s.',
    },
    'F-101': {
      name: isRTL ? 'فرن تسخين النفط الخام' : 'Crude Charge Fired Heater',
      type: 'Radiant/Convection Furnace (32 Burners)',
      eos: 'Combustion Stoichiometry + Heat Flux Matrix',
      desc: isRTL
        ? 'حساب ديناميكي لدرجة حرارة مخرج الأنابيب (COT 365°C) مع محاكاة هبوط ضغط الغاز وتوزيع اللهب.'
        : 'Dynamic coil outlet temperature (COT) tracking, radiant tube skin heat-flux limits, and fuel gas draft control.',
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
    'E-101': {
      name: isRTL ? 'مكثف أبخرة القمة المفرغ' : 'Overhead Condenser & Heat Exchanger',
      type: 'TEMA Type E Shell & Tube Exchanger',
      eos: 'Log Mean Temperature Difference (LMTD) Rigorous Model',
      desc: isRTL
        ? 'حساب التكثيف الجزئي للهيدروكربونات الخفيفة والماء وتوازن وعاء الارتجاع ثلاثي الأطوار.'
        : 'Rigorous vapor condensation curve, cooling water thermal duty, and 3-phase accumulator mass balance.',
    },
  };

  return (
    <section id="pid-scanner" className="py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#04060E] border-t border-purple-500/15">
      {/* Background ambient beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-purple-500/15 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>{isRTL ? 'براءة الاختراع والابتكار الصناعي' : 'PROPRIETARY AUTOMATED FLOWSHEET SYNTHESIS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-metallic tracking-tight">
              {isRTL ? 'كيف نبني محاكاة متطابقة في أسبوع واحد؟' : 'From Scanned P&ID to Running OTS in ~7 Days.'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isRTL
                ? 'الشركات التقليدية (Honeywell & AspenTech) تحتاج 6 إلى 9 أشهر من البرمجة اليدوية بتكلفة تتجاوز 110 ألف دولار. نكسيفا تحلل مخططات P&ID الخاصة بمصفاتك آلياً وتولد المعادلات الديناميكية في أيام.'
                : 'Legacy vendors spend 6 to 9 months manually hardcoding thermodynamic blocks. NEXIIVA parses your refinery P&IDs and piping drawings to auto-compile dynamic mass & energy balances in ~1 week.'}
            </p>
          </div>

          {/* Unit Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-[#080B1C] p-1.5 rounded-xl border border-purple-500/20">
            <button
              onClick={() => triggerScan('CDU')}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPreset === 'CDU'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isRTL ? 'وحدة التقطير الجوي (CDU-100)' : 'Atmospheric CDU-100'}
            </button>
            <button
              onClick={() => triggerScan('VDU')}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPreset === 'VDU'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isRTL ? 'برج التفريغ (VDU-200)' : 'Vacuum VDU-200'}
            </button>
            <button
              onClick={() => triggerScan('REFORMER')}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPreset === 'REFORMER'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isRTL ? 'وحدة التهذيب (CRU-300)' : 'Reformer CRU-300'}
            </button>
          </div>
        </div>

        {/* The Interactive P&ID Ingestion Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: The Scanning Blueprint Viewer (8 Cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#060918] border border-purple-500/30 p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/15 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-white font-bold">
                  {isScanning
                    ? isRTL ? 'جاري الفحص العصبي لمخطط P&ID...' : 'NEURAL P&ID INGESTION IN PROGRESS...'
                    : isRTL ? 'تم اكتمال التوليف الديناميكي' : 'SYNTHESIS COMPLETE · READY FOR SIMULATION'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-purple-300">
                  {detectedCount} / 387 {isRTL ? 'معدة تم التعرف عليها' : 'EQUIPMENT NODES'}
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-cyan-400">{scanProgress}%</span>
              </div>
            </div>

            {/* The Blueprint Display Canvas */}
            <div className="relative flex-1 my-4 rounded-xl bg-[#04060E] border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
              {/* Engineering Blueprint Grid */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #3361FC 1px, transparent 1px), linear-gradient(to bottom, #3361FC 1px, transparent 1px)`,
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Laser Scanning Beam */}
              {isScanning && (
                <div
                  className="absolute inset-y-0 w-1 bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 shadow-[0_0_20px_#06B6D4] z-30 transition-all duration-75 pointer-events-none"
                  style={{ left: `${scanProgress}%` }}
                >
                  <div className="absolute top-0 bottom-0 -left-12 w-12 bg-gradient-to-r from-transparent to-cyan-500/20" />
                </div>
              )}

              {/* Architectural P&ID Layout SVG */}
              <svg className="w-full h-full max-h-[320px] select-none" viewBox="0 0 800 320" fill="none">
                {/* Process Flow Lines */}
                <path d="M 60 160 L 180 160" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 2" />
                <path d="M 260 160 L 360 160" stroke="#F59E0B" strokeWidth="3" />
                <path d="M 410 70 L 410 40 L 580 40 L 580 70" stroke="#A855F7" strokeWidth="2.5" />
                <path d="M 580 120 L 580 180 L 640 180" stroke="#38BDF8" strokeWidth="2" />
                <path d="M 680 180 L 740 180 L 740 120 L 440 120" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 3" />
                <path d="M 410 250 L 410 280 L 490 280" stroke="#EF4444" strokeWidth="2.5" />

                {/* Hotspot 1: F-101 Crude Furnace */}
                <g
                  onClick={() => {
                    setActiveTag('F-101');
                    dcsAudio.playClick();
                  }}
                  className="cursor-pointer group"
                >
                  <rect
                    x="180"
                    y="110"
                    width="80"
                    height="100"
                    rx="4"
                    fill="#0B132B"
                    stroke={activeTag === 'F-101' ? '#A855F7' : '#3361FC'}
                    strokeWidth={activeTag === 'F-101' ? '2.5' : '1.5'}
                    className="transition-all"
                  />
                  <path d="M 200 190 L 210 170 L 220 190 Z" fill="#F59E0B" />
                  <path d="M 220 190 L 230 165 L 240 190 Z" fill="#EF4444" />
                  <text x="220" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    F-101
                  </text>
                  <text x="220" y="202" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                    FURNACE
                  </text>
                  {/* Bounding Box Tag */}
                  <rect x="175" y="105" width="90" height="110" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
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
                    y="60"
                    width="80"
                    height="200"
                    rx="16"
                    fill="#0B132B"
                    stroke={activeTag === 'C-101' ? '#A855F7' : '#3361FC'}
                    strokeWidth={activeTag === 'C-101' ? '2.5' : '1.5'}
                    className="transition-all"
                  />
                  {/* Sieve Trays lines */}
                  {[90, 110, 130, 150, 170, 190, 210, 230].map((y, i) => (
                    <line key={i} x1="370" y1={y} x2="430" y2={y} stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                  ))}
                  <text x="400" y="150" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="black" fontFamily="monospace">
                    C-101
                  </text>
                  <text x="400" y="165" textAnchor="middle" fill="#38BDF8" fontSize="9" fontFamily="monospace">
                    48 TRAYS
                  </text>
                  {/* Bounding Box Tag */}
                  <rect x="355" y="55" width="90" height="210" fill="none" stroke="#A855F7" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                </g>

                {/* Hotspot 3: E-101 Condenser */}
                <g
                  onClick={() => {
                    setActiveTag('E-101');
                    dcsAudio.playClick();
                  }}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="580"
                    cy="95"
                    r="30"
                    fill="#0B132B"
                    stroke={activeTag === 'E-101' ? '#A855F7' : '#3361FC'}
                    strokeWidth={activeTag === 'E-101' ? '2' : '1.5'}
                  />
                  <line x1="560" y1="95" x2="600" y2="95" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="580" y="99" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    E-101
                  </text>
                </g>

                {/* Hotspot 4: P-101A/B Pumps */}
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
                    fill="#0B132B"
                    stroke={activeTag === 'P-101A/B' ? '#A855F7' : '#3361FC'}
                    strokeWidth={activeTag === 'P-101A/B' ? '2' : '1.5'}
                  />
                  <path d="M 660 160 L 675 180 L 660 180 Z" fill="#3361FC" />
                  <text x="660" y="184" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="monospace">
                    P-101
                  </text>
                </g>

                {/* Hotspot 5: FIC-102 Controller */}
                <g
                  onClick={() => {
                    setActiveTag('FIC-102');
                    dcsAudio.playClick();
                  }}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="510"
                    cy="120"
                    r="16"
                    fill="#04060E"
                    stroke={activeTag === 'FIC-102' ? '#A855F7' : '#06B6D4'}
                    strokeWidth="1.5"
                  />
                  <line x1="494" y1="120" x2="526" y2="120" stroke="#06B6D4" strokeWidth="1" />
                  <text x="510" y="117" textAnchor="middle" fill="#06B6D4" fontSize="7" fontWeight="bold" fontFamily="monospace">
                    FIC
                  </text>
                  <text x="510" y="127" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="monospace">
                    102
                  </text>
                </g>
              </svg>

              {/* Tag Selection Guidance Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#0B0F24]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-purple-500/20 text-[10px] font-mono text-slate-300">
                {isRTL ? 'اضغط على أي معدة (C-101, F-101, P-101) لفحص كود المحاكاة الرياضي' : 'Click any equipment tag (C-101, F-101, P-101, FIC-102) to inspect mathematical model'}
              </div>
            </div>

            {/* Bottom Ingestion Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-purple-500/15 text-center">
              <div className="p-2.5 rounded-xl bg-[#090D22] border border-purple-500/15">
                <div className="text-xl font-mono font-bold text-brand-gradient">7 DAYS</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  {isRTL ? 'زمن التوليف الكامل' : 'CUSTOM BUILD TIME'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#090D22] border border-purple-500/15">
                <div className="text-xl font-mono font-bold text-cyan-400">387</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  {isRTL ? 'أنواع المعدات المدعومة' : 'EQUIPMENT SPECS'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#090D22] border border-purple-500/15">
                <div className="text-xl font-mono font-bold text-purple-300">100%</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  {isRTL ? 'تطابق رموز P&ID' : 'P&ID TAG FIDELITY'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#090D22] border border-purple-500/15">
                <div className="text-xl font-mono font-bold text-emerald-400">0.00 ms</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  {isRTL ? 'زمن استجابة المحاكي' : 'SOLVER LATENCY'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Live Engineering Tag Dossier (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#070A1A] border border-purple-500/30 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                  {isRTL ? 'سجل المعادلات الهندسية' : 'EQUIPMENT DOSSIER'}
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
                  TAG: {activeTag}
                </span>
              </div>

              {activeTag && tagDetails[activeTag] && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {tagDetails[activeTag].name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">
                      {tagDetails[activeTag].type}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#04060E] border border-purple-500/20 space-y-2">
                    <span className="text-[10px] font-mono text-purple-300 block uppercase tracking-wider">
                      {isRTL ? 'معادلة الحالة الثرموديناميكية:' : 'THERMODYNAMIC EOS SOLVER:'}
                    </span>
                    <div className="text-xs font-mono text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                      {tagDetails[activeTag].eos}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tagDetails[activeTag].desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-purple-500/15 text-xs font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>{isRTL ? 'المعيار الصناعي:' : 'Standard:'}</span>
                      <span className="text-slate-200">API 520 / ISA-5.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'خطوة التكامل الرياضي:' : 'Integration Step:'}</span>
                      <span className="text-slate-200">100ms Rigorous</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'جاهزية غرفة التحكم:' : 'DCS Interlock:'}</span>
                      <span className="text-emerald-400 font-bold">SIL-3 Mapped</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Re-Scan Trigger */}
            <button
              onClick={() => triggerScan(selectedPreset)}
              disabled={isScanning}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-brand-glow flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span>⚡</span>
              <span>{isRTL ? 'إعادة توليد المحاكاة للوحدة' : 'RE-COMPILE PROCESS UNIT'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
