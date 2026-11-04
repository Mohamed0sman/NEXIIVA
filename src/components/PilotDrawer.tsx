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
              <div className="text-[11px] font-mono text-[#777b86] font-semibold uppercase tracking-wider">
                90-DAY REFINERY PILOT PROGRAM
              </div>
              <div className="text-2xl font-normal font-serif text-[#17191c] mt-1 tracking-tight">
                Configure Plant Validation
              </div>
            </div>
            <button
              onClick={() => setPilotDrawerOpen(false)}
              className="text-[#777b86] hover:text-[#17191c] p-2 text-base rounded-full hover:bg-[#f2f2f3] transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#fbe1d1] border border-[#f5cbb3] text-[#5d2a1a] text-3xl flex items-center justify-center mx-auto">
                ✓
              </div>
              <div className="text-2xl font-serif font-normal text-[#17191c]">Pilot Request Sent</div>
              <p className="text-[#777b86] text-sm max-w-sm mx-auto leading-relaxed">
                Thank you! Eng. Mostafa Adel will contact your engineering team within 24 hours to coordinate P&ID intake and mutual NDA execution.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setPilotDrawerOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-[#17191c] hover:bg-[#2b2f35] text-white font-medium transition-all cursor-pointer shadow-sm"
              >
                Close Drawer
              </button>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              {/* Pilot Summary Box (Accent Blush Peach) */}
              <div className="p-5 rounded-[20px] bg-[#fbe1d1] border border-[#f5cbb3] text-[#5d2a1a] space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-xs text-[#5d2a1a]/80">Fixed Pilot Investment:</span>
                  <span className="text-2xl font-bold font-sans text-[#5d2a1a]">$800 USD</span>
                </div>
                <div className="text-xs text-[#5d2a1a]/90 leading-relaxed">
                  Includes 3 full months of access, 1 custom refinery unit build, first scenario pack (upsets & trips), and process SME validation on real unit operating data.
                </div>
              </div>

              {/* Step 1: Unit Selection */}
              <div className="space-y-1.5">
                <label className="text-[#17191c] font-medium text-xs">1. TARGET REFINERY PROCESS UNIT</label>
                <select
                  value={pilotUnit}
                  onChange={(e) => setPilotUnit(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#fafafb] border border-[#ececec] text-[#17191c] text-xs outline-none focus:border-[#17191c] transition-colors"
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
                <label className="text-[#17191c] font-medium text-xs">2. PILOT DEPLOYMENT TOPOLOGY</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeployment('100% Air-Gapped On-Premise')}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      deployment === '100% Air-Gapped On-Premise'
                        ? 'border-[#17191c] bg-[#fafafb] text-[#17191c] font-medium shadow-sm'
                        : 'border-[#ececec] bg-white text-[#777b86] hover:border-[#cfcfcf]'
                    }`}
                  >
                    <div className="font-medium text-xs text-[#17191c]">Air-Gapped On-Prem</div>
                    <div className="text-[10px] text-[#777b86] mt-0.5">100% Offline inside plant LAN</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeployment('Private Cloud SaaS')}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      deployment === 'Private Cloud SaaS'
                        ? 'border-[#17191c] bg-[#fafafb] text-[#17191c] font-medium shadow-sm'
                        : 'border-[#ececec] bg-white text-[#777b86] hover:border-[#cfcfcf]'
                    }`}
                  >
                    <div className="font-medium text-xs text-[#17191c]">Private Cloud SaaS</div>
                    <div className="text-[10px] text-[#777b86] mt-0.5">Instant browser multi-seat</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Stations Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-[#17191c] font-medium">3. OPERATOR STATIONS REQUIRED</label>
                  <span className="font-mono text-[#17191c] font-semibold">{extraStations} Stations</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={extraStations}
                  onChange={(e) => setExtraStations(parseInt(e.target.value))}
                  className="w-full accent-[#17191c] bg-[#e5e5e5] h-1.5 rounded cursor-pointer"
                />
              </div>

              {/* Step 4: Contact Info */}
              <div className="space-y-3 pt-3 border-t border-[#ececec]">
                <div className="space-y-1">
                  <label className="text-[#777b86] text-xs font-medium">WORK EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="operations@refinery.com"
                    className="w-full p-3 rounded-xl bg-[#fafafb] border border-[#ececec] text-[#17191c] text-xs outline-none focus:border-[#17191c] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#777b86] text-xs font-medium">PHONE / WHATSAPP</label>
                  <input
                    type="tel"
                    required
                    placeholder="+20 100 000 0000"
                    className="w-full p-3 rounded-xl bg-[#fafafb] border border-[#ececec] text-[#17191c] text-xs outline-none focus:border-[#17191c] transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="pt-4 border-t border-[#ececec] space-y-2">
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3.5 rounded-full bg-[#17191c] hover:bg-[#2b2f35] text-white text-xs font-medium uppercase tracking-wider shadow-sm transition-all cursor-pointer"
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
