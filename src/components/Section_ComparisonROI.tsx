import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { TrendingDown, Zap, Database, ArrowRight, ShieldAlert, DollarSign } from 'lucide-react';

export const Section_ComparisonROI: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].economics;
  const isRTL = language === 'AR';

  // Interactive Sliders for Boardroom Simulator
  const [numUnits, setNumUnits] = useState(2);
  const [numOperators, setNumOperators] = useState(15);

  // Financial Calculations from real Nexiiva business model
  const legacyUnitCost = 110000;
  const totalLegacy = numUnits * legacyUnitCost;

  const nexiivaUnitCost = 5320;
  const totalNexiiva = numUnits * nexiivaUnitCost;
  const capexSaved = totalLegacy - totalNexiiva;
  const percentSaved = Math.round((capexSaved / totalLegacy) * 100);

  // Downtime avoidance value (1 unplanned shutdown avoided per unit per year = $35,000/hr * 12 hrs = $420,000)
  const downtimeAverted = numUnits * 420000;

  return (
    <section id="economics" className="py-24 px-4 sm:px-6 lg:px-12 relative bg-[#0D111A] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#161D2B] border border-slate-700/60 text-slate-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            {t.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Boardroom Layout: Left Narrative & Fact, Right Interactive ROI Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Problem & The 3 Performance Pillars (5 Cols) */}
          <div className="lg:col-span-5 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* The Harsh Reality Card */}
            <div className="p-6 rounded-2xl bg-[#121724] border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>{t.legacyProblemTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.legacyProblemDesc}
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono text-amber-300">
                ⚠️ {t.downtimeFact}
              </div>
            </div>

            {/* 3 High-Density Performance Stats */}
            <div className="grid grid-cols-1 gap-3 font-mono">
              <div className="p-4 rounded-xl bg-[#121724] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">TCO REDUCTION</span>
                  <span className="text-2xl font-black text-emerald-400">~90% LOWER</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">~$5K vs $110K legacy unit</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121724] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">DELIVERY VELOCITY</span>
                  <span className="text-2xl font-black text-cyan-400">~7 DAYS</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">vs 6–9 months legacy consulting</span>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121724] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">MODELING RIGOR</span>
                  <span className="text-2xl font-black text-purple-300">387 MODELS</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">19 process domains with failure injection</span>
                </div>
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-300">
                  <Database className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Comparison Matrix & Interactive ROI Calculator (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Clean Comparison Matrix */}
            <div className="rounded-2xl bg-[#121724] border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-4 bg-[#161D2D] border-b border-slate-800 text-xs font-mono font-bold text-white flex justify-between items-center">
                <span>COMMERCIAL & TECHNICAL BENCHMARK</span>
                <span className="text-emerald-400">VERIFIED DATA</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-mono">
                      <th className="p-4">SPECIFICATION</th>
                      <th className="p-4">LEGACY VENDORS</th>
                      <th className="p-4 text-emerald-400 font-bold bg-[#1A2234]">
                        NEXIIVA PLATFORM
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono text-[11px]">
                    <tr>
                      <td className="p-4 font-bold text-white">First-Year Cost Model</td>
                      <td className="p-4 text-rose-400">~$110,000+ / unit</td>
                      <td className="p-4 font-bold text-emerald-400 bg-[#1A2234]">
                        ~$5,180 total (or $800 Pilot)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Custom Build Velocity</td>
                      <td className="p-4 text-slate-400">6 to 9 Months</td>
                      <td className="p-4 font-bold text-cyan-400 bg-[#1A2234]">
                        ~1 Week (7 Days)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Refinery Air-Gap Mode</td>
                      <td className="p-4 text-slate-400">Complex proprietary lock-in</td>
                      <td className="p-4 font-bold text-white bg-[#1A2234]">
                        100% Offline Local 2U Server
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Annual Maintenance Fee</td>
                      <td className="p-4 text-rose-400">$25,000+ / year</td>
                      <td className="p-4 font-bold text-purple-300 bg-[#1A2234]">
                        $800 / year flat
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* The Interactive Boardroom ROI Simulator */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#121724] border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{t.calcTitle}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{t.calcSub}</p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold shrink-0">
                  {percentSaved}% CAPEX SAVED
                </span>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{t.sliderUnits}</span>
                    <span className="font-bold text-purple-300 text-sm">{numUnits} Units</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={numUnits}
                    onChange={(e) => {
                      setNumUnits(parseInt(e.target.value));
                      dcsAudio.playClick();
                    }}
                    className="w-full accent-purple-500 bg-slate-800 h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>1 Unit (CDU)</span>
                    <span>5 Units</span>
                    <span>10 Units</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{t.sliderOperators}</span>
                    <span className="font-bold text-blue-300 text-sm">{numOperators} Operators</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={numOperators}
                    onChange={(e) => {
                      setNumOperators(parseInt(e.target.value));
                      dcsAudio.playClick();
                    }}
                    className="w-full accent-blue-500 bg-slate-800 h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>4 Operators</span>
                    <span>25 Operators</span>
                    <span>50 Operators</span>
                  </div>
                </div>
              </div>

              {/* Live Impact Readout Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-black/60 border border-slate-800 text-center font-mono">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">{t.legacyCost}</div>
                  <div className="text-lg font-bold text-rose-400 line-through mt-0.5">
                    ${totalLegacy.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-emerald-400 uppercase font-bold">{t.capexSaved}</div>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">
                    ${capexSaved.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-cyan-400 uppercase font-bold">DOWNTIME RISK AVERTED</div>
                  <div className="text-lg font-black text-cyan-400 mt-0.5">
                    ${downtimeAverted.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Request Boardroom Pilot Proposal ($800)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
