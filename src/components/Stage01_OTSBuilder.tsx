import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { EQUIPMENT_DOMAINS, SAMPLE_EQUIPMENT_ITEMS } from '../data/equipmentCatalog';
import { EquipmentItem } from '../types/simulation';

export const Stage01_OTSBuilder: React.FC = () => {
  const {
    builderMode,
    setBuilderMode,
    wizardAnswers,
    setWizardAnswer,
    scrollToStage,
  } = useSimulationJourney();

  const [activeBuilderTab, setActiveBuilderTab] = useState('CDU1 Crude feed and preheat');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // AI Agent Prompt state
  const [promptText, setPromptText] = useState(
    'ابنِ وحدة تقطير خام جوي CDU مع فاصل أملاح كهروستاتيكي ومسار تسخين مبدئي قياسي وأبراج تجريد جانبية للكيروسين والديزل'
  );
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiCompiled, setAiCompiled] = useState(false);

  const builderTabs = [
    'CDU1 Crude feed and preheat',
    'CDU1 Furnace and column',
    'CDU1 Overhead and products',
  ];

  const handleRunAiAgent = () => {
    setAiGenerating(true);
    setAiCompiled(false);
    setTimeout(() => {
      setAiGenerating(false);
      setAiCompiled(true);
    }, 1200);
  };

  const handleExport = (type: string) => {
    setExportNotice(`Exported ${type}: CDU_VDU_PLANT_FLOWSHEET_REV2.json`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  const filteredEquipment = SAMPLE_EQUIPMENT_ITEMS.filter((item) => {
    const matchesDomain = selectedDomain === 'all' || item.domain === selectedDomain;
    const matchesSearch =
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <section id="stage-01" className="bg-[#03050C] py-16 px-4 lg:px-8 border-b border-[#182838] relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 font-mono text-[11px] text-[#C8A048]">
            <span>[STAGE 01 // OTS BUILDER WORKSPACE]</span>
            <span className="text-[#182838]">|</span>
            <span className="text-[#94A3B8]">THE JEWEL OF NEXIIVA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0F0F8] tracking-tight">
            Assemble a Custom Refinery Unit in ~1 Week—Instead of Waiting 6 Months.
          </h2>
          <p className="text-[#94A3B8] max-w-3xl text-sm sm:text-base leading-relaxed">
            Legacy simulator vendors charge hundreds of thousands of dollars and take months to deliver generic models. With Nexiiva's internal <strong className="text-[#F0F0F8]">OTS Builder</strong>, process engineers configure deterministic unit flowsheets offline or through an AI agent in Arabic and English, instantly compiled from a <strong className="text-[#C8A048]">387-type equipment library</strong>.
          </p>
        </div>

        {/* The Authentic OTS Builder Workspace Frame (Modeled on Slide 4) */}
        <div className="bg-[#081838] border border-[#182838] shadow-2xl overflow-hidden corner-crosshairs">
          {/* Top Control Ribbon */}
          <div className="bg-[#0A1428] border-b border-[#182838] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-[#F0F0F8] bg-[#C8A048]/20 text-[#C8A048] px-2 py-0.5 border border-[#C8A048]/40">
                OTS BUILDER v2.4
              </span>
              <span className="text-[#64748B]">|</span>
              <span className="text-[#F0F0F8] font-semibold">UNIT: CDU (Crude Distillation Unit)</span>
            </div>

            {/* Export & Project Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport('Flowsheet JSON')}
                className="px-2.5 py-1 bg-[#102030] hover:bg-[#204070] text-[#94A3B8] hover:text-[#F0F0F8] border border-[#182838] transition-all cursor-pointer"
              >
                [Export JSON]
              </button>
              <button
                onClick={() => handleExport('CAD Diagram')}
                className="px-2.5 py-1 bg-[#102030] hover:bg-[#204070] text-[#94A3B8] hover:text-[#F0F0F8] border border-[#182838] transition-all cursor-pointer"
              >
                [Export Diagram]
              </button>
              <button
                onClick={() => handleExport('Project Package')}
                className="px-2.5 py-1 bg-[#C8A048]/10 hover:bg-[#C8A048]/20 text-[#C8A048] border border-[#C8A048]/40 transition-all font-semibold cursor-pointer"
              >
                [Save Project]
              </button>
            </div>
          </div>

          {/* Sub-Tabs: Feeds / Furnace & Column / Overhead & Products */}
          <div className="bg-[#060B16] border-b border-[#182838] px-4 flex items-center overflow-x-auto space-x-2 text-[11px] font-mono">
            {builderTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveBuilderTab(tab)}
                className={`py-2 px-3 transition-colors border-b-2 cursor-pointer ${
                  activeBuilderTab === tab
                    ? 'border-[#C8A048] text-[#C8A048] font-bold bg-[#081838]'
                    : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Export Toast Notification */}
          {exportNotice && (
            <div className="bg-emerald-950/40 border-b border-emerald-500/50 px-4 py-1.5 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
              <span>✓ {exportNotice}</span>
              <span className="text-[10px] text-emerald-400">READY FOR SIMULATION ENGINE</span>
            </div>
          )}

          {/* Main 2-Column Builder Grid: Left Terminal / Right Flowsheet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#182838]">
            {/* Left Column (5 Cols): Dual-Mode Configuration Engine */}
            <div className="lg:col-span-5 p-4 bg-[#08101E] flex flex-col space-y-4 font-mono text-[11px]">
              {/* Mode Toggle Switcher */}
              <div className="flex border border-[#182838] bg-[#03050C]">
                <button
                  onClick={() => setBuilderMode('OFFLINE_WIZARD')}
                  className={`flex-1 py-2 text-center transition-all cursor-pointer ${
                    builderMode === 'OFFLINE_WIZARD'
                      ? 'bg-[#C8A048] text-[#03050C] font-bold'
                      : 'text-[#94A3B8] hover:text-[#F0F0F8]'
                  }`}
                >
                  Offline Mode (100% Air-Gapped)
                </button>
                <button
                  onClick={() => setBuilderMode('AI_AGENT')}
                  className={`flex-1 py-2 text-center transition-all cursor-pointer ${
                    builderMode === 'AI_AGENT'
                      ? 'bg-[#7838F8] text-[#F0F0F8] font-bold'
                      : 'text-[#94A3B8] hover:text-[#F0F0F8]'
                  }`}
                >
                  AI Agent Mode (AR / EN)
                </button>
              </div>

              {/* MODE A: 100% Air-Gapped Deterministic Terminal */}
              {builderMode === 'OFFLINE_WIZARD' && (
                <div className="space-y-4">
                  <div className="text-[#64748B] text-[10px] leading-relaxed">
                    [AIR-GAPPED COMPILATION: 6 DETERMINISTIC QUESTIONS · ZERO INTERNET DEPENDENCY · ZERO PROPRIETARY LEAKAGE]
                  </div>

                  {/* Q1: Crude Oil Grade */}
                  <div className="space-y-1.5 p-2.5 bg-[#03050C]/60 border border-[#182838]">
                    <div className="text-[#F0F0F8] font-semibold">
                      [1/6] Crude oil feed grade & API gravity?
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['Light', 'Medium (Default)', 'Heavy'] as const).map((grade) => (
                        <button
                          key={grade}
                          onClick={() => setWizardAnswer('crudeGrade', grade)}
                          className={`p-1.5 text-center text-[10px] border transition-colors cursor-pointer ${
                            wizardAnswers.crudeGrade === grade
                              ? 'border-[#C8A048] bg-[#C8A048]/10 text-[#C8A048] font-bold'
                              : 'border-[#182838] text-[#94A3B8] hover:bg-[#102030]'
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q2: Electrostatic Desalter */}
                  <div className="space-y-1.5 p-2.5 bg-[#03050C]/60 border border-[#182838]">
                    <div className="text-[#F0F0F8] font-semibold">
                      [2/6] Include an electrostatic desalter (V-101)?
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setWizardAnswer('desalter', true)}
                        className={`p-1.5 text-center text-[10px] border transition-colors cursor-pointer ${
                          wizardAnswers.desalter
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                            : 'border-[#182838] text-[#94A3B8] hover:bg-[#102030]'
                        }`}
                      >
                        ✓ Yes (Two-Stage AC Grid)
                      </button>
                      <button
                        onClick={() => setWizardAnswer('desalter', false)}
                        className={`p-1.5 text-center text-[10px] border transition-colors cursor-pointer ${
                          !wizardAnswers.desalter
                            ? 'border-[#C8A048] bg-[#C8A048]/10 text-[#C8A048] font-bold'
                            : 'border-[#182838] text-[#94A3B8] hover:bg-[#102030]'
                        }`}
                      >
                        ✕ No (Desalted Feed)
                      </button>
                    </div>
                  </div>

                  {/* Q3: Preheat Train Configuration */}
                  <div className="space-y-1.5 p-2.5 bg-[#03050C]/60 border border-[#182838]">
                    <div className="text-[#F0F0F8] font-semibold">
                      [3/6] Preheat train exchanger configuration?
                    </div>
                    <div className="space-y-1">
                      {[
                        'Standard — heat from diesel & residue',
                        'Simple',
                      ].map((train) => (
                        <button
                          key={train}
                          onClick={() => setWizardAnswer('preheatTrain', train as any)}
                          className={`w-full p-1.5 text-left text-[10px] border transition-colors cursor-pointer ${
                            wizardAnswers.preheatTrain === train
                              ? 'border-[#C8A048] bg-[#C8A048]/10 text-[#C8A048] font-bold'
                              : 'border-[#182838] text-[#94A3B8] hover:bg-[#102030]'
                          }`}
                        >
                          {train === 'Standard — heat from diesel & residue' ? '1. ' : '2. '}
                          {train}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q4: Side Strippers */}
                  <div className="space-y-1.5 p-2.5 bg-[#03050C]/60 border border-[#182838]">
                    <div className="text-[#F0F0F8] font-semibold">
                      [4/6] Include side strippers on kerosene & diesel?
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setWizardAnswer('sideStrippers', true)}
                        className={`p-1.5 text-center text-[10px] border transition-colors cursor-pointer ${
                          wizardAnswers.sideStrippers
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                            : 'border-[#182838] text-[#94A3B8] hover:bg-[#102030]'
                        }`}
                      >
                        ✓ Yes (T-23 & T-24 Steam Stripping)
                      </button>
                      <button
                        onClick={() => setWizardAnswer('sideStrippers', false)}
                        className={`p-1.5 text-center text-[10px] border transition-colors cursor-pointer ${
                          !wizardAnswers.sideStrippers
                            ? 'border-[#C8A048] bg-[#C8A048]/10 text-[#C8A048] font-bold'
                            : 'border-[#182838] text-[#94A3B8] hover:bg-[#102030]'
                        }`}
                      >
                        ✕ No (Direct Product Draw)
                      </button>
                    </div>
                  </div>

                  {/* Q5: Flare System KO Drum */}
                  <div className="space-y-1.5 p-2.5 bg-[#03050C]/60 border border-[#182838]">
                    <div className="text-[#F0F0F8] font-semibold">
                      [5/6] Send overhead gas to flare system (KO Drum + Stack)?
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setWizardAnswer('flareSystem', true)}
                        className={`p-1.5 text-center text-[10px] border transition-colors cursor-pointer ${
                          wizardAnswers.flareSystem
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                            : 'border-[#182838] text-[#94A3B8] hover:bg-[#102030]'
                        }`}
                      >
                        ✓ Yes — Flare KO Drum (V-105)
                      </button>
                      <button
                        onClick={() => setWizardAnswer('flareSystem', false)}
                        className={`p-1.5 text-center text-[10px] border transition-colors cursor-pointer ${
                          !wizardAnswers.flareSystem
                            ? 'border-[#C8A048] bg-[#C8A048]/10 text-[#C8A048] font-bold'
                            : 'border-[#182838] text-[#94A3B8] hover:bg-[#102030]'
                        }`}
                      >
                        ✕ No — Direct to Fuel Gas Header
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* MODE B: AI Agent Prompt Terminal (Online via API) */}
              {builderMode === 'AI_AGENT' && (
                <div className="space-y-3">
                  <div className="text-[#64748B] text-[10px]">
                    [LLM PROCESS SPECIFICATION PARSER // BILINGUAL ARABIC & ENGLISH]
                  </div>

                  {/* Prompt Presets */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#94A3B8]">Quick Prompt Templates:</span>
                    <button
                      onClick={() =>
                        setPromptText(
                          'ابنِ وحدة تقطير خام جوي CDU مع فاصل أملاح كهروستاتيكي ومسار تسخين مبدئي قياسي وأبراج تجريد جانبية للكيروسين والديزل'
                        )
                      }
                      className="w-full text-right p-2 bg-[#03050C] border border-[#182838] hover:border-[#7838F8] text-[11px] text-[#D8E0F0] font-sans transition-colors cursor-pointer"
                      dir="rtl"
                    >
                      "ابنِ وحدة تقطير خام جوي CDU مع فاصل أملاح كهروستاتيكي ومسار تسخين قياسي وأبراج تجريد..."
                    </button>

                    <button
                      onClick={() =>
                        setPromptText(
                          'Build a 100,000 BPD Crude Distillation Unit (CDU) with 2-stage desalter, 4-pass fired heater F-101, 48-tray fractionator T-22 with Kero/Diesel strippers, and overhead flare KO drum.'
                        )
                      }
                      className="w-full text-left p-2 bg-[#03050C] border border-[#182838] hover:border-[#7838F8] text-[10px] text-[#D8E0F0] font-mono transition-colors cursor-pointer"
                    >
                      "Build a 100,000 BPD CDU with 2-stage desalter, 4-pass fired heater F-101..."
                    </button>
                  </div>

                  {/* Prompt Textarea */}
                  <div className="relative">
                    <textarea
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      rows={4}
                      className="w-full p-2.5 bg-[#03050C] border border-[#182838] focus:border-[#7838F8] text-[#F0F0F8] text-[11px] font-mono outline-none resize-none"
                      placeholder="Type custom plant requirements in English or Arabic..."
                    />
                  </div>

                  <button
                    onClick={handleRunAiAgent}
                    disabled={aiGenerating}
                    className="w-full py-2 bg-gradient-to-r from-[#7838F8] to-[#3361FC] hover:opacity-90 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(120,56,248,0.25)]"
                  >
                    {aiGenerating ? (
                      <span>⚙ PARSING P&ID TOPOLOGY & TAGS...</span>
                    ) : (
                      <span>▶ EXECUTE OTS BUILDER AGENT</span>
                    )}
                  </button>

                  {aiCompiled && (
                    <div className="p-2.5 bg-[#102030] border border-emerald-500/50 text-emerald-300 text-[10px] space-y-1">
                      <div className="font-bold">✓ AI SYNTHESIS COMPLETE: 18 EQUIPMENT NODES COMPILED</div>
                      <div>• Matched Desalter V-101, Furnace F-101, Column T-22, Strippers T-23/24</div>
                      <div>• Control philosophy: Cascade TIC-101 to FIC-102 Reflux Loop loaded</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column (7 Cols): Dynamic SVG Flowsheet Canvas */}
            <div className="lg:col-span-7 p-4 bg-[#080818] relative min-h-[380px] flex flex-col justify-between">
              {/* Canvas Header */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] border-b border-[#182838] pb-2">
                <span>[DYNAMIC FLOWSHEET CANVAS // REAL-TIME SCHEMATIC]</span>
                <span className="text-[#C8A048]">
                  NODES ACTIVE: {wizardAnswers.desalter ? '8' : '7'} EQUIPMENT BLOCKS
                </span>
              </div>

              {/* Dynamic SVG Canvas */}
              <div className="relative w-full h-[280px] select-none my-auto">
                <svg className="w-full h-full" viewBox="0 0 680 260" fill="none">
                  {/* Pipeline 1: Crude Feed */}
                  <path d="M 10 130 L 60 130" stroke="#206080" strokeWidth="2.5" className="animate-pipe-flow" />
                  <text x="12" y="122" fill="#94A3B8" fontSize="8" fontFamily="monospace">FEED</text>

                  {/* Preheater Box */}
                  <rect x="60" y="115" width="40" height="30" fill="#102030" stroke="#204070" strokeWidth="1.5" />
                  <text x="65" y="133" fill="#C8A048" fontSize="8" fontWeight="bold">E-101A/B</text>

                  {/* Conditional Desalter V-101 */}
                  {wizardAnswers.desalter && (
                    <>
                      <path d="M 100 130 L 130 130" stroke="#206080" strokeWidth="2.5" className="animate-pipe-flow" />
                      <rect x="130" y="110" width="55" height="40" rx="5" fill="#102030" stroke="#10B981" strokeWidth="1.5" />
                      <text x="138" y="128" fill="#10B981" fontSize="9" fontWeight="bold">V-101</text>
                      <text x="133" y="140" fill="#94A3B8" fontSize="7">DESALTER</text>
                    </>
                  )}

                  {/* Pipe to Furnace F-101 */}
                  <path
                    d={wizardAnswers.desalter ? "M 185 130 L 225 130" : "M 100 130 L 225 130"}
                    stroke="#206080"
                    strokeWidth="2.5"
                    className="animate-pipe-flow"
                  />

                  {/* Fired Heater F-101 */}
                  <rect x="225" y="105" width="55" height="50" fill="#102030" stroke="#EA580C" strokeWidth="1.5" />
                  <text x="235" y="125" fill="#EA580C" fontSize="9" fontWeight="bold">F-101</text>
                  <text x="230" y="142" fill="#94A3B8" fontSize="7">FURNACE</text>

                  {/* Transfer Line into Column Flash Zone */}
                  <path d="M 280 130 L 330 130" stroke="#EA580C" strokeWidth="3" className="animate-pipe-flow-fast" />

                  {/* Atmospheric Column T-22 */}
                  <rect x="330" y="30" width="60" height="190" rx="6" fill="#102030" stroke="#204070" strokeWidth="2" />
                  <text x="345" y="55" fill="#F0F0F8" fontSize="11" fontWeight="bold">T-22</text>
                  <text x="340" y="68" fill="#94A3B8" fontSize="7">48 TRAYS</text>

                  {/* Overhead Vapor to Drum V-102 */}
                  <path d="M 360 30 L 360 15 L 450 15 L 450 35" stroke="#206080" strokeWidth="2" className="animate-pipe-flow" />
                  <rect x="425" y="35" width="50" height="30" rx="4" fill="#102030" stroke="#204070" strokeWidth="1.5" />
                  <text x="435" y="52" fill="#F0F0F8" fontSize="8" fontWeight="bold">V-102</text>

                  {/* Reflux Pump P-1007 */}
                  <path d="M 450 65 L 450 90 L 490 90" stroke="#206080" strokeWidth="2" />
                  <circle cx="505" cy="90" r="12" fill="#102030" stroke="#10B981" strokeWidth="1.5" />
                  <text x="496" y="93" fill="#10B981" fontSize="8" fontWeight="bold">P-1007</text>

                  {/* Reflux Return to T-22 */}
                  <path d="M 505 78 L 505 45 L 395 45 L 390 45" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Conditional Stripper Columns T-23 & T-24 */}
                  {wizardAnswers.sideStrippers && (
                    <>
                      {/* Kerosene Stripper T-23 */}
                      <path d="M 390 90 L 430 90" stroke="#206080" strokeWidth="1.5" />
                      <rect x="430" y="80" width="35" height="40" rx="3" fill="#102030" stroke="#204070" strokeWidth="1.5" />
                      <text x="435" y="102" fill="#C8A048" fontSize="8" fontWeight="bold">T-23</text>
                      <text x="432" y="114" fill="#64748B" fontSize="6">KERO STRIP</text>

                      {/* Diesel Stripper T-24 */}
                      <path d="M 390 135 L 430 135" stroke="#206080" strokeWidth="1.5" />
                      <rect x="430" y="125" width="35" height="40" rx="3" fill="#102030" stroke="#204070" strokeWidth="1.5" />
                      <text x="435" y="147" fill="#C8A048" fontSize="8" fontWeight="bold">T-24</text>
                      <text x="432" y="159" fill="#64748B" fontSize="6">DIESEL STRIP</text>
                    </>
                  )}

                  {/* Conditional Flare KO Drum V-105 */}
                  {wizardAnswers.flareSystem && (
                    <>
                      <path d="M 475 45 L 560 45 L 560 65" stroke="#EA580C" strokeWidth="2" strokeDasharray="3 3" />
                      <rect x="540" y="65" width="45" height="30" rx="4" fill="#102030" stroke="#EA580C" strokeWidth="1.5" />
                      <text x="547" y="82" fill="#EA580C" fontSize="8" fontWeight="bold">V-105</text>
                      <text x="545" y="91" fill="#64748B" fontSize="6">FLARE KO</text>
                      {/* Flare Stack */}
                      <line x1="562" y1="65" x2="562" y2="20" stroke="#EA580C" strokeWidth="2" />
                      <polygon points="562,15 558,25 566,25" fill="#EA580C" />
                    </>
                  )}

                  {/* Atmospheric Residue Line to VDU */}
                  <path d="M 360 220 L 360 240 L 600 240" stroke="#64748B" strokeWidth="2.5" className="animate-pipe-flow" />
                  <text x="370" y="235" fill="#94A3B8" fontSize="8">RESIDUE TO VACUUM T-60</text>
                </svg>
              </div>

              {/* Bottom Journey Transition Trigger */}
              <div className="pt-3 border-t border-[#182838] flex flex-wrap items-center justify-between gap-3">
                <div className="text-[10px] font-mono text-[#94A3B8]">
                  COMPILED STATE: <span className="text-emerald-400 font-bold">READY FOR INSTRUCTOR FAULT INJECTION</span>
                </div>
                <button
                  onClick={() => scrollToStage(2)}
                  className="px-4 py-2 bg-[#C8A048] hover:bg-[#d4af55] text-[#03050C] font-mono text-[11px] font-bold tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 shadow-[0_0_15px_rgba(200,160,72,0.2)]"
                >
                  <span>✓ Compile Flowsheet & Send to Instructor Console ↓</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Drawer: 387-Type Equipment Catalog Filter */}
          <div className="bg-[#060B16] border-t border-[#182838] p-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="font-mono text-xs font-bold text-[#F0F0F8] flex items-center space-x-2">
                <span className="text-[#C8A048]">387-TYPE EQUIPMENT LIBRARY</span>
                <span className="text-[#64748B] text-[10px] font-normal">
                  (Explore industrial process symbols, metallurgy & API standards)
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search equipment tag, pump, column..."
                className="px-2.5 py-1 bg-[#081838] border border-[#182838] text-[11px] font-mono text-[#F0F0F8] placeholder-[#64748B] outline-none w-full sm:w-64"
              />
            </div>

            {/* Domain Filter Pills */}
            <div className="flex items-center overflow-x-auto space-x-1.5 pb-1">
              {EQUIPMENT_DOMAINS.map((dom) => (
                <button
                  key={dom.id}
                  onClick={() => setSelectedDomain(dom.id)}
                  className={`px-2.5 py-1 text-[10px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDomain === dom.id
                      ? 'bg-[#C8A048] text-[#03050C] font-bold'
                      : 'bg-[#102030] text-[#94A3B8] hover:text-[#F0F0F8] border border-[#182838]'
                  }`}
                >
                  {dom.label} ({dom.count})
                </button>
              ))}
            </div>

            {/* Equipment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 max-h-48 overflow-y-auto pr-1">
              {filteredEquipment.slice(0, 8).map((eq) => (
                <div
                  key={eq.id}
                  className="p-2 bg-[#08101E] border border-[#182838] hover:border-[#C8A048]/50 transition-colors font-mono text-[10px]"
                >
                  <div className="flex justify-between items-center text-[#C8A048] font-bold">
                    <span>{eq.tag}</span>
                    <span className="text-[#64748B] text-[9px]">{eq.category}</span>
                  </div>
                  <div className="text-[#F0F0F8] font-semibold truncate mt-0.5">{eq.name}</div>
                  <div className="text-[#94A3B8] text-[9px] truncate mt-0.5">{eq.spec}</div>
                  <div className="text-[#64748B] text-[8px] mt-1">MAT: {eq.mats}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
