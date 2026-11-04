import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';

export const Section_ComparisonROI: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].comparison;

  // Minimal 2 Sliders
  const [numUnits, setNumUnits] = useState(2);
  const [numOperators, setNumOperators] = useState(12);

  // Financial Calculations from Nexiiva model
  const legacyUnitCost = 110000;
  const totalLegacy = numUnits * legacyUnitCost;

  // Nexiiva launch cost for N units
  const nexiivaUnitCost = 5320;
  const totalNexiiva = numUnits * nexiivaUnitCost;
  const capexSaved = totalLegacy - totalNexiiva;
  const percentSaved = Math.round((capexSaved / totalLegacy) * 100);
  const weeksSaved = numUnits * 20;

  return (
    <section id="comparison" className="py-28 px-6 lg:px-12 relative border-t border-purple-500/10">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-metallic tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 1. Clean 4-Row Comparison Table (With Glowing NEXIIVA Column) */}
        <div className="rounded-2xl bg-[#0B0F22]/70 backdrop-blur-xl border border-purple-500/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-purple-500/20 text-slate-400 text-xs font-mono">
                  <th className="p-5 w-1/4">{t.spec}</th>
                  <th className="p-5 w-1/4">{t.legacy}</th>
                  <th className="p-5 w-1/4">{t.specialist}</th>
                  <th className="p-5 w-1/4 bg-purple-600/15 border-x-2 border-t-2 border-purple-500 text-purple-300 font-bold">
                    {t.nexiiva}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10 text-slate-300">
                {/* Row 1 */}
                <tr>
                  <td className="p-5 font-bold text-white">{t.row1Title}</td>
                  <td className="p-5 text-rose-400">{t.row1Legacy}</td>
                  <td className="p-5 text-slate-300">{t.row1Spec}</td>
                  <td className="p-5 font-bold text-emerald-400 bg-purple-600/15 border-x-2 border-purple-500">
                    {t.row1Nex}
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="p-5 font-bold text-white">{t.row2Title}</td>
                  <td className="p-5 text-slate-400">{t.row2Legacy}</td>
                  <td className="p-5 text-slate-400">{t.row2Spec}</td>
                  <td className="p-5 font-bold text-white bg-purple-600/15 border-x-2 border-purple-500">
                    {t.row2Nex}
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="p-5 font-bold text-white">{t.row3Title}</td>
                  <td className="p-5 text-slate-400">{t.row3Legacy}</td>
                  <td className="p-5 text-slate-400">{t.row3Spec}</td>
                  <td className="p-5 font-bold text-blue-300 bg-purple-600/15 border-x-2 border-purple-500">
                    {t.row3Nex}
                  </td>
                </tr>

                {/* Row 4 */}
                <tr>
                  <td className="p-5 font-bold text-white">{t.row4Title}</td>
                  <td className="p-5 text-rose-400">{t.row4Legacy}</td>
                  <td className="p-5 text-slate-400">{t.row4Spec}</td>
                  <td className="p-5 font-bold text-brand-gradient bg-purple-600/15 border-x-2 border-b-2 border-purple-500">
                    {t.row4Nex}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Minimal 2-Slider Savings Calculator */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0F22]/70 backdrop-blur-xl border border-purple-500/20 shadow-stage-glow">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/15 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{t.calcTitle}</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  {t.calcSub}
                </p>
              </div>
              <div className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                ~{percentSaved}% CAPEX REDUCTION
              </div>
            </div>

            {/* 2 Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Slider 1: Process Units */}
              <div className="p-5 rounded-xl bg-white/5 border border-purple-500/10 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-white">{t.sliderUnits}</span>
                  <span className="font-mono font-bold text-purple-300 text-lg">{numUnits} Units</span>
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
                  className="w-full accent-purple-500 bg-slate-800 h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>1 Unit (CDU/VDU)</span>
                  <span>5 Units (Refining Block)</span>
                  <span>10 Units</span>
                </div>
              </div>

              {/* Slider 2: Operators */}
              <div className="p-5 rounded-xl bg-white/5 border border-purple-500/10 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-white">{t.sliderOperators}</span>
                  <span className="font-mono font-bold text-blue-300 text-lg">{numOperators} Operators</span>
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
                  className="w-full accent-blue-500 bg-slate-800 h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>4 Shift Operators</span>
                  <span>25 Engineers</span>
                  <span>50 Operators</span>
                </div>
              </div>
            </div>

            {/* Real-Time Impact Readout Row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 rounded-xl bg-[#04060E]/80 border border-purple-500/20 text-center font-mono">
              <div className="space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">{t.legacyCost}</div>
                <div className="text-xl font-bold text-rose-400 line-through">
                  ${totalLegacy.toLocaleString()}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">{t.nexiivaCost}</div>
                <div className="text-xl font-bold text-purple-300">
                  ${totalNexiiva.toLocaleString()}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-emerald-400 uppercase font-bold">{t.capexSaved}</div>
                <div className="text-2xl font-black text-emerald-400">
                  ${capexSaved.toLocaleString()}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-blue-400 uppercase font-bold">{t.weeksSaved}</div>
                <div className="text-2xl font-black text-blue-400">
                  ~{weeksSaved} Wks
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className="px-8 py-3.5 rounded-full bg-brand-gradient text-white text-xs font-bold font-mono uppercase tracking-wider shadow-brand-glow hover:opacity-95 transition-all cursor-pointer"
              >
                {t.calcBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
