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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white border-l border-[#ececec] h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-8 text-xs font-sans text-[#17191c] shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#ececec] pb-5">
            <div>
              <div className="text-[11px] font-mono text-[#4F46E5] font-semibold uppercase tracking-wider">
                90-DAY REFINERY PILOT PROGRAM
              </div>
              <div className="text-2xl font-bold font-sans text-[#0B1120] mt-1 tracking-tight">
                Configure Plant Validation
              </div>
            </div>
            <button
              onClick={() => setPilotDrawerOpen(false)}
              className="text-[#64748B] hover:text-[#0B1120] p-2 text-base rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-[#4F46E5] text-3xl flex items-center justify-center mx-auto font-bold">
                ✓
              </div>
              <div className="text-2xl font-sans font-bold text-[#0B1120]">Pilot Request Sent</div>
              <p className="text-[#64748B] text-sm max-w-sm mx-auto leading-relaxed">
                Thank you! Eng. Mostafa Adel will contact your engineering team within 24 hours to coordinate P&ID intake and mutual NDA execution.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setPilotDrawerOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-semibold transition-all cursor-pointer shadow-md"
              >
                Close Drawer
              </button>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              {/* Pilot Summary Box (Cool Indigo Tint) */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-blue-500/5 border border-purple-500/20 text-[#0B1120] space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-xs text-[#4F46E5]">Fixed Pilot Investment:</span>
                  <span className="text-2xl font-bold font-sans text-[#0B1120]">$800 USD</span>
                </div>
                <div className="text-xs text-[#64748B] leading-relaxed">
                  Includes 3 full months of access, 1 custom refinery unit build, first scenario pack (upsets & trips), and process SME validation on real unit operating data.
                </div>
              </div>

              {/* Step 1: Unit Selection */}
              <div className="space-y-1.5">
                <label className="text-[#0B1120] font-semibold text-xs">1. TARGET REFINERY PROCESS UNIT</label>
                <select
                  value={pilotUnit}
                  onChange={(e) => setPilotUnit(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0B1120] text-xs outline-none focus:border-[#4F46E5] transition-colors"
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
                <label className="text-[#0B1120] font-semibold text-xs">2. PILOT DEPLOYMENT TOPOLOGY</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeployment('100% Air-Gapped On-Premise')}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      deployment === '100% Air-Gapped On-Premise'
                        ? 'border-[#4F46E5] bg-purple-500/5 text-[#0B1120] font-medium shadow-sm'
                        : 'border-slate-200 bg-white text-[#64748B] hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs text-[#0B1120]">Air-Gapped On-Prem</div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">100% Offline inside plant LAN</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeployment('Private Cloud SaaS')}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      deployment === 'Private Cloud SaaS'
                        ? 'border-[#4F46E5] bg-purple-500/5 text-[#0B1120] font-medium shadow-sm'
                        : 'border-slate-200 bg-white text-[#64748B] hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs text-[#0B1120]">Private Cloud SaaS</div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">Instant browser multi-seat</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Stations Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-[#0B1120] font-semibold">3. OPERATOR STATIONS REQUIRED</label>
                  <span className="font-mono text-[#4F46E5] font-bold">{extraStations} Stations</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={extraStations}
                  onChange={(e) => setExtraStations(parseInt(e.target.value))}
                  className="w-full accent-[#4F46E5] bg-slate-200 h-1.5 rounded cursor-pointer"
                />
              </div>

              {/* Step 4: Contact Info */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="space-y-1">
                  <label className="text-[#64748B] text-xs font-medium">WORK EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="operations@refinery.com"
                    className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0B1120] text-xs outline-none focus:border-[#4F46E5] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#64748B] text-xs font-medium">PHONE / WHATSAPP</label>
                  <input
                    type="tel"
                    required
                    placeholder="+20 100 000 0000"
                    className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0B1120] text-xs outline-none focus:border-[#4F46E5] transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white text-xs font-semibold uppercase tracking-wider shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] transition-all cursor-pointer"
            >
              Confirm 90-Day Pilot Request ($800) →
            </button>
            <div className="text-[11px] text-center text-[#979799]">
              * Invoiced upon mutual NDA signing. Billed in USD or equivalent EGP.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
