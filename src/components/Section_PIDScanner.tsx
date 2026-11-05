import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { EQUIPMENT_DOMAINS, SAMPLE_EQUIPMENT_ITEMS } from '../data/equipmentCatalog';
import { EquipmentItem } from '../types/simulation';
import {
  Cpu,
  Bot,
  ShieldCheck,
  Layers,
  Sparkles,
  CheckCircle2,
  Sliders,
  Filter,
  Search,
  ArrowRight,
  Database,
  Flame,
  Activity,
  Zap,
} from 'lucide-react';

export const Section_PIDScanner: React.FC = () => {
  const { language, setPilotDrawerOpen } = useSimulationJourney();
  const isRTL = language === 'AR';

  // Mode: AI Agent vs 100% Air-Gapped Offline Wizard
  const [builderMode, setBuilderMode] = useState<'AI_AGENT' | 'AIR_GAPPED'>('AI_AGENT');

  // AI Prompt State
  const [promptText, setPromptText] = useState(
    isRTL
      ? 'ابنِ وحدة تقطير خام جوي CDU بطاقة 100 ألف برميل مع فاصل أملاح كهروستاتيكي ومسار تسخين مبدئي وأبراج تجريد جانبية للكيروسين والديزل'
      : 'Assemble a 100 kBD Atmospheric Crude Distillation Unit (CDU) with 2-stage electrostatic desalter, preheat exchanger train, and side strippers for kerosene and diesel.'
  );
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledSuccess, setCompiledSuccess] = useState(true);

  // Air-Gapped Wizard Step State (1-6)
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardConfig, setWizardConfig] = useState({
    crudeType: 'Arab Light (33.4° API)',
    desalter: '2-Stage Electrostatic (25 kV)',
    preheatTemp: '280 °C (Shell & Tube Train)',
    columnTrays: '48 Valve Trays + 3 Side Draws',
    strippers: 'Live Steam Stripping',
    overheadSystem: 'Air Coolers + Flare KO Drum',
  });

  // Equipment Library Explorer
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem>(SAMPLE_EQUIPMENT_ITEMS[0]);

  const handleRunAi = () => {
    setIsCompiling(true);
    setCompiledSuccess(false);
    setTimeout(() => {
      setIsCompiling(false);
      setCompiledSuccess(true);
    }, 900);
  };

  const filteredEquipment = SAMPLE_EQUIPMENT_ITEMS.filter((item) => {
    const matchesDomain = selectedDomain === 'all' || item.domain === selectedDomain;
    const matchesSearch =
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const wizardSteps = [
    { num: 1, title: isRTL ? 'تحليل الخام (Crude Assay)' : '1. Crude Assay', value: wizardConfig.crudeType },
    { num: 2, title: isRTL ? 'فاصل الأملاح (Desalter)' : '2. Desalter Type', value: wizardConfig.desalter },
    { num: 3, title: isRTL ? 'مسار التسخين (Preheat Train)' : '3. Preheat Train', value: wizardConfig.preheatTemp },
    { num: 4, title: isRTL ? 'برج التقطير (CDU Column)' : '4. CDU Fractionator', value: wizardConfig.columnTrays },
    { num: 5, title: isRTL ? 'أبراج التجريد (Side Strippers)' : '5. Side Strippers', value: wizardConfig.strippers },
    { num: 6, title: isRTL ? 'المكثفات والشعلة (Flare KO)' : '6. Flare & Offsites', value: wizardConfig.overheadSystem },
  ];

  return (
    <section
      id="ots-builder"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative bg-[#03050C] border-t border-white/10"
    >
      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(142,66,254,0.10),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(51,97,252,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="inline-flex items-center space-x-2 space-x-reverse text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
            <span>[STAGE 03 // ENGINEERING WORKSPACE]</span>
            <span className="text-slate-600">|</span>
            <span>{isRTL ? 'استوديو بناء الوحدات OTS' : 'THE OTS BUILDER STUDIO'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]">
            <span className="heading-metallic block">
              {isRTL
                ? 'بناء وحدات المصافي المخصصة في ~ أسبوع واحد'
                : 'Assemble Custom Refinery Units in ~1 Week'}
            </span>
            <span className="bg-gradient-to-r from-[#A855F7] via-[#8E42FE] to-[#38BDF8] bg-clip-text text-transparent block mt-1">
              {isRTL
                ? 'عبر الذكاء الاصطناعي أو المعالج المعزول 100%.'
                : 'via AI Agent or 100% Air-Gapped Offline Mode.'}
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
            {isRTL
              ? 'حوّل مخططات P&ID الخاصة بمصفاتكم إلى نموذج محاكاة ديناميكي فائق الدقة. اختر بين المحادثة الذكية أو المعالج الهندسي الحتمي المعزول تماماً عن الإنترنت.'
              : 'Transform plant P&IDs into high-fidelity dynamic models rapidly. Choose between natural-language AI assembly or our 100% offline deterministic wizard for high-security petroleum perimeters.'}
          </p>
        </div>

        {/* The Studio Workspace Container */}
        <div className="rounded-2xl border border-white/10 bg-[#080D1F]/90 backdrop-blur-2xl shadow-2xl overflow-hidden text-left" dir="ltr">
          {/* Top Control Bar: Mode Toggle */}
          <div className="bg-[#050814] border-b border-white/10 p-3 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                OTS BUILDER ENGINE v3.2
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800">
                387 INDUSTRIAL BLOCKS
              </span>
            </div>

            {/* Dual Mode Selector */}
            <div className="grid grid-cols-2 bg-[#0B1124] p-1 rounded-xl border border-white/10 font-mono text-xs">
              <button
                onClick={() => setBuilderMode('AI_AGENT')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  builderMode === 'AI_AGENT'
                    ? 'bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-cyan-300" />
                <span>Mode A: AI Agent</span>
              </button>

              <button
                onClick={() => setBuilderMode('AIR_GAPPED')}
                className={`px-3 sm:px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  builderMode === 'AIR_GAPPED'
                    ? 'bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mode B: 100% Air-Gapped</span>
              </button>
            </div>
          </div>

          {/* Studio Body: Mode A (AI Agent) or Mode B (Air-Gapped 6-Step) */}
          <div className="p-4 sm:p-8 space-y-6">
            {builderMode === 'AI_AGENT' ? (
              /* MODE A: AI AGENT WORKSPACE */
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1 text-purple-400 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>NATURAL LANGUAGE FLOWSHEET SYNTHESIS (ARABIC & ENGLISH)</span>
                    </span>
                    <span className="text-slate-500">API: Claude 3.5 / Gemini Process Agent</span>
                  </div>

                  <div className="relative">
                    <textarea
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      rows={3}
                      className="w-full bg-[#030612] border border-white/15 rounded-xl p-4 text-xs sm:text-sm font-sans text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none leading-relaxed"
                    />

                    <button
                      onClick={handleRunAi}
                      disabled={isCompiling}
                      className="mt-2 sm:mt-0 sm:absolute sm:bottom-3 sm:right-3 px-5 py-2 rounded-lg bg-gradient-to-r from-[#8E42FE] to-[#3361FC] hover:shadow-[0_0_20px_rgba(123,60,252,0.6)] text-white text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isCompiling ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>SYNTHESIZING P&ID...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-cyan-300" />
                          <span>SYNTHESIZE FLOWSHEET</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Synthesis Output Display */}
                {compiledSuccess && (
                  <div className="rounded-xl bg-[#040817] border border-emerald-500/40 p-4 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 text-xs font-mono">
                      <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>SYNTHESIS COMPLETE: 14 EQUIPMENT NODES ASSEMBLED</span>
                      </div>
                      <span className="text-slate-400">Convergence: Peng-Robinson EOS Δt=100ms</span>
                    </div>

                    {/* Nodes Visualizer */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] text-cyan-400 font-bold">V-101 (Desalter)</div>
                        <div className="text-white text-[11px]">2-Stage Electrostatic</div>
                        <div className="text-[10px] text-emerald-400">✓ Grid 25 kV Active</div>
                      </div>

                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] text-amber-400 font-bold">F-101 (Preheater)</div>
                        <div className="text-white text-[11px]">Cabin Fired Heater</div>
                        <div className="text-[10px] text-emerald-400">✓ 32 Burners Mapped</div>
                      </div>

                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] text-purple-400 font-bold">T-22 (CDU Column)</div>
                        <div className="text-white text-[11px]">48 Sieve Trays</div>
                        <div className="text-[10px] text-emerald-400">✓ 3 Side Strippers</div>
                      </div>

                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] text-emerald-400 font-bold">P-1007A/B (Reflux)</div>
                        <div className="text-white text-[11px]">Dual Centrifugal OH2</div>
                        <div className="text-[10px] text-emerald-400">✓ Auto-Interlocked</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* MODE B: 100% AIR-GAPPED OFFLINE 6-STEP WIZARD */
              <div className="space-y-6">
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">ZERO CLOUD DEPENDENCY // 100% AIR-GAPPED REFINERY LOCAL DEPLOYMENT</span>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] text-slate-400">Classified Plant Perimeters</span>
                </div>

                {/* 6 Step Visual Progress */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {wizardSteps.map((s) => (
                    <button
                      key={s.num}
                      onClick={() => setWizardStep(s.num)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer font-mono ${
                        wizardStep === s.num
                          ? 'bg-gradient-to-b from-purple-900/60 to-[#0A0F24] border-purple-500 shadow-md'
                          : 'bg-[#030612] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] text-purple-400 font-bold">STEP 0{s.num}</div>
                      <div className="text-xs font-bold text-white mt-0.5 truncate">{s.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">{s.value}</div>
                    </button>
                  ))}
                </div>

                {/* Wizard Detail Card */}
                <div className="p-5 rounded-xl bg-[#030612] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      CONFIGURATION STEP {wizardStep}: {wizardSteps[wizardStep - 1].title}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400">
                      Deterministic Physics Engine
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {wizardStep === 1 && 'Define petroleum distillation assay (API gravity, Sulfur wt%, Reid Vapor Pressure, True Boiling Point distribution curve) to initialize phase equilibrium calculations.'}
                    {wizardStep === 2 && 'Configure raw crude desalting stage to prevent heat exchanger fouling and chloride-induced overhead corrosion. Models high-voltage AC electric field coalescence.'}
                    {wizardStep === 3 && 'Simulate multi-pass shell-and-tube heat exchanger network transferring waste heat from atmospheric residue and side-streams into incoming crude charge.'}
                    {wizardStep === 4 && '48 fractionation stages with rigorous stage-by-stage tray hydraulics, vapor-liquid flash algorithms, and dynamic holdup for pressure surge simulation.'}
                    {wizardStep === 5 && 'Side product strippers for Kerosene, Light Gas Oil (LGO), and Heavy Gas Oil (HGO) using low-pressure live superheated stripping steam.'}
                    {wizardStep === 6 && 'Overhead condensers, reflux accumulator drum, flare relief headers, and emergency blowdown knockout vessels.'}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
                      disabled={wizardStep === 1}
                      className="px-4 py-1.5 rounded-lg bg-white/10 text-white font-mono text-xs disabled:opacity-30 cursor-pointer"
                    >
                      ← Previous Step
                    </button>
                    <button
                      onClick={() => setWizardStep(Math.min(6, wizardStep + 1))}
                      disabled={wizardStep === 6}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white font-mono text-xs disabled:opacity-30 cursor-pointer"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 387-Equipment Library Explorer */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-white font-bold">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>387-EQUIPMENT REFINERY CODEX EXPLORER</span>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search equipment tag or type..."
                    className="w-full bg-[#030612] border border-white/15 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Domain Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none font-mono text-[11px]">
                {EQUIPMENT_DOMAINS.map((dom) => (
                  <button
                    key={dom.id}
                    onClick={() => setSelectedDomain(dom.id)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                      selectedDomain === dom.id
                        ? 'bg-purple-600 text-white font-bold shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {dom.label} ({dom.count})
                  </button>
                ))}
              </div>

              {/* Equipment Items Grid + Selected Item Detail */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Equipment List (7 Cols) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {filteredEquipment.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedEquipment(item)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer font-mono text-xs ${
                        selectedEquipment.id === item.id
                          ? 'bg-gradient-to-r from-purple-950/60 to-indigo-950/40 border-purple-500 text-white'
                          : 'bg-[#030612] border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-400">{item.tag}</span>
                        <span className="text-[10px] text-slate-500">{item.category}</span>
                      </div>
                      <div className="text-[11px] font-sans text-slate-200 mt-1 truncate">{item.name}</div>
                    </div>
                  ))}
                </div>

                {/* Selected Item Engineering Card (5 Cols) */}
                <div className="lg:col-span-5 p-4 rounded-xl bg-[#030612] border border-purple-500/30 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-purple-400 font-bold text-sm">{selectedEquipment.tag}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      API VERIFIED
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400">EQUIPMENT NAME</div>
                    <div className="text-white font-sans font-bold text-sm mt-0.5">{selectedEquipment.name}</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400">TECHNICAL SPECIFICATION</div>
                    <div className="text-slate-300 text-[11px] font-sans mt-0.5 leading-relaxed">{selectedEquipment.spec}</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400">CONSTRUCTION METALLURGY</div>
                    <div className="text-cyan-400 text-[11px] mt-0.5">{selectedEquipment.mats}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
