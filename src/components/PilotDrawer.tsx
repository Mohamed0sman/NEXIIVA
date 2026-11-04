import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

export const PilotDrawer: React.FC = () => {
  const { pilotDrawerOpen, setPilotDrawerOpen, selectedUnit } = useSimulationJourney();

  const [pilotUnit, setPilotUnit] = useState(
    selectedUnit === 'CDU_VDU' ? 'CDU/VDU Atmospheric & Vacuum Distillation' : selectedUnit
  );
  const [deployment, setDeployment] = useState('100% Air-Gapped On-Premise');
  const [extraStations, setExtraStations] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  if (!pilotDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0B0F22] border-l border-purple-500/30 h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-8 text-xs font-sans">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
            <div>
              <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                90-DAY REFINERY PILOT
              </div>
              <div className="text-xl font-bold text-white mt-1">
                Configure Plant Validation
              </div>
            </div>
            <button
              onClick={() => setPilotDrawerOpen(false)}
              className="text-slate-400 hover:text-white p-2 text-base rounded-full hover:bg-white/5 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-3xl flex items-center justify-center mx-auto">
                ✓
              </div>
              <div className="text-xl font-bold text-white">Pilot Request Sent</div>
              <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                Thank you! Eng. Mostafa Adel will contact your engineering team within 24 hours to coordinate P&ID intake and mutual NDA execution.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setPilotDrawerOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              {/* Pilot Summary Box */}
              <div className="p-5 rounded-2xl bg-[#04060E] border border-purple-500/30 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-white font-semibold text-sm">Fixed Pilot Investment:</span>
                  <span className="text-2xl font-black text-brand-gradient">$800 USD</span>
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Includes 3 full months of access, 1 custom refinery unit build, first scenario pack (upsets & trips), and process SME validation on real unit operating data.
                </div>
              </div>

              {/* Step 1: Unit Selection */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold text-xs">1. TARGET REFINERY PROCESS UNIT</label>
                <select
                  value={pilotUnit}
                  onChange={(e) => setPilotUnit(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#04060E] border border-purple-500/20 text-white text-xs outline-none"
                >
                  <option>CDU/VDU Atmospheric & Vacuum Distillation</option>
                  <option>Hydrocracker Unit (HCU)</option>
                  <option>Delayed Coking Unit (DCU)</option>
                  <option>Naphtha Hydrotreater & CCR Platformer</option>
                  <option>Amine Gas Sweetening & Claus SRU</option>
                </select>
              </div>

              {/* Step 2: Deployment Mode */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold text-xs">2. PILOT DEPLOYMENT TOPOLOGY</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeployment('100% Air-Gapped On-Premise')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      deployment === '100% Air-Gapped On-Premise'
                        ? 'border-purple-500 bg-purple-600/20 text-white font-bold'
                        : 'border-purple-500/10 bg-[#04060E] text-slate-400'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white">Air-Gapped On-Prem</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">100% Offline inside plant LAN</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeployment('Private Cloud SaaS')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      deployment === 'Private Cloud SaaS'
                        ? 'border-blue-500 bg-blue-600/20 text-white font-bold'
                        : 'border-purple-500/10 bg-[#04060E] text-slate-400'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white">Private Cloud SaaS</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Instant browser multi-seat</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Stations Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-300 font-semibold">3. OPERATOR STATIONS REQUIRED</label>
                  <span className="font-mono text-purple-300 font-bold">{extraStations} Stations</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={extraStations}
                  onChange={(e) => setExtraStations(parseInt(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-800 h-1.5 cursor-pointer"
                />
              </div>

              {/* Step 4: Contact Info */}
              <div className="space-y-3 pt-2 border-t border-purple-500/10">
                <div className="space-y-1">
                  <label className="text-slate-400 text-xs font-semibold">WORK EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="operations@refinery.com"
                    className="w-full p-3 rounded-xl bg-[#04060E] border border-purple-500/20 text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 text-xs font-semibold">PHONE / WHATSAPP</label>
                  <input
                    type="tel"
                    required
                    placeholder="+20 100 000 0000"
                    className="w-full p-3 rounded-xl bg-[#04060E] border border-purple-500/20 text-white text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="pt-4 border-t border-purple-500/10 space-y-2">
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3.5 rounded-full bg-brand-gradient text-white text-xs font-bold uppercase tracking-wider shadow-brand-glow hover:opacity-95 transition-all cursor-pointer"
            >
              Confirm 90-Day Pilot Request ($800) →
            </button>
            <div className="text-[11px] text-center text-slate-500">
              * Invoiced upon mutual NDA signing. Billed in USD or equivalent EGP.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
