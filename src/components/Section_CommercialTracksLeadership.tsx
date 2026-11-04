import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

export const Section_CommercialTracksLeadership: React.FC = () => {
  const { selectedUnit, activeScenario, setPilotDrawerOpen } = useSimulationJourney();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    title: 'Operations Superintendent / Lead Process Engineer',
    organization: 'MIDOR Refinery / EGPC Affiliate',
    email: '',
    phone: '',
    unitType: selectedUnit === 'CDU_VDU' ? 'CDU/VDU Atmospheric & Vacuum Distillation' : selectedUnit,
    deployment: '100% Air-Gapped On-Premise (3 Stations)',
    pilotInterest: 'Track 01: 90-Day Refinery Validation Pilot ($800)',
    message: `We would like to validate a custom unit simulation for our process train based on Scenario ${activeScenario.id} (${activeScenario.title}).`,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="commercial-tracks" className="bg-[#081838] py-16 px-4 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 font-mono text-[11px] text-[#C8A048]">
            <span>[SYS-08 // COMMERCIAL TRACKS & INDUSTRIAL PEDIGREE]</span>
            <span className="text-[#182838]">|</span>
            <span className="text-[#94A3B8]">TRANSPARENT B2B ENGAGEMENT PACKAGES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0F0F8] tracking-tight">
            Transparent Commercial Packages. No Hidden Enterprise Tolls.
          </h2>
          <p className="text-[#94A3B8] max-w-3xl text-sm sm:text-base leading-relaxed">
            Every dollar is modeled transparently based on actual engineering hours and computational requirements. Start with a risk-free 90-day pilot before expanding to perpetual on-premise control room stations.
          </p>
        </div>

        {/* 1. 4 Structured B2B Engagement Packages (Blueprint Spec Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {/* TRACK 01 */}
          <div className="p-5 bg-[#060B16] border-2 border-[#C8A048] flex flex-col justify-between corner-crosshairs relative">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-[#C8A048] font-bold">TRACK 01 // ENTRY</span>
                <span className="px-1.5 py-0.5 bg-[#C8A048]/20 text-[#C8A048] text-[9px] font-bold">
                  RECOMMENDED
                </span>
              </div>
              <div className="text-base font-bold text-[#F0F0F8]">
                90-Day Refinery Validation Pilot
              </div>
              <div className="text-2xl font-extrabold text-[#C8A048]">
                $800 <span className="text-xs font-normal text-[#94A3B8]">/ 3 months</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Full 3-month plant pilot on real unit data. Zero risk entry point to validate simulation fidelity with your senior process engineering team.
              </p>

              <div className="pt-3 border-t border-[#182838] space-y-1.5 text-[10px] text-[#D8E0F0]">
                <div>✓ 1 Custom Refinery Unit Model</div>
                <div>✓ First Scenario Pack (Upsets & Trips)</div>
                <div>✓ Frontline Process SME Validation</div>
                <div>✓ Detailed Operator Evaluation Reports</div>
                <div>✓ Convertible to full contract</div>
              </div>
            </div>

            <button
              onClick={() => setPilotDrawerOpen(true)}
              className="mt-6 w-full py-2 bg-[#C8A048] hover:bg-[#d4af55] text-[#03050C] font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
            >
              Start 90-Day Pilot ($800)
            </button>
          </div>

          {/* TRACK 02 */}
          <div className="p-5 bg-[#060B16] border border-[#182838] hover:border-[#204070] flex flex-col justify-between corner-crosshairs">
            <div className="space-y-3">
              <div className="text-[10px] text-[#64748B]">TRACK 02 // CLOUD</div>
              <div className="text-base font-bold text-[#F0F0F8]">
                Cloud OTS Enterprise Subscription
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#F0F0F8]">
                  $5,180 <span className="text-xs font-normal text-[#94A3B8]">Year-1</span>
                </div>
                <div className="text-[10px] text-[#64748B] line-through">
                  List Price: $7,400 (30% Launch Discount)
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Private cloud-hosted simulator for continuous multi-operator training with zero hardware overhead.
              </p>

              <div className="pt-3 border-t border-[#182838] space-y-1.5 text-[10px] text-[#94A3B8]">
                <div>• Initial configuration ($1,000)</div>
                <div>• Custom unit build ($1,000)</div>
                <div>• 2-Day instructor training ($600)</div>
                <div>• Annual renewal ($800/yr up to 8 users)</div>
                <div>• Trainee hours billed at $10/hr</div>
              </div>
            </div>

            <button
              onClick={() => setPilotDrawerOpen(true)}
              className="mt-6 w-full py-2 border border-[#C8A048]/50 hover:bg-[#C8A048]/10 text-[#F0F0F8] font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
            >
              Select Cloud Track
            </button>
          </div>

          {/* TRACK 03 */}
          <div className="p-5 bg-[#060B16] border border-[#3361FC]/60 flex flex-col justify-between corner-crosshairs">
            <div className="space-y-3">
              <div className="text-[10px] text-[#3361FC] font-bold">TRACK 03 // AIR-GAPPED</div>
              <div className="text-base font-bold text-[#F0F0F8]">
                Perpetual On-Premise Control Room
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#3361FC]">
                  $5,320 <span className="text-xs font-normal text-[#94A3B8]">Year-1</span>
                </div>
                <div className="text-[10px] text-[#64748B] line-through">
                  List Price: $7,600 (30% Launch Discount)
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Perpetual license running completely offline on your internal plant training network (1 Server + 3 Stations).
              </p>

              <div className="pt-3 border-t border-[#182838] space-y-1.5 text-[10px] text-[#94A3B8]">
                <div>• Perpetual unit build ($4,000 base)</div>
                <div>• 3 Local stations installed ($1,000/stn)</div>
                <div>• 2-Day on-site training ($600)</div>
                <div>• From Year 2: $500/station/yr support</div>
                <div>• 100% Air-Gapped (Zero internet dependency)</div>
              </div>
            </div>

            <button
              onClick={() => setPilotDrawerOpen(true)}
              className="mt-6 w-full py-2 bg-[#3361FC]/20 hover:bg-[#3361FC]/30 border border-[#3361FC] text-white font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
            >
              Select On-Prem Track
            </button>
          </div>

          {/* TRACK 04 */}
          <div className="p-5 bg-[#060B16] border border-[#182838] hover:border-[#204070] flex flex-col justify-between corner-crosshairs">
            <div className="space-y-3">
              <div className="text-[10px] text-[#64748B]">TRACK 04 // ACADEMIES</div>
              <div className="text-base font-bold text-[#F0F0F8]">
                Training Centers Partner Program
              </div>
              <div className="text-2xl font-extrabold text-[#F0F0F8]">
                $100–$500 <span className="text-xs font-normal text-[#94A3B8]">/ trainee</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                5-day intensive operator certification courses with automated audit scoring and printable certificates.
              </p>

              <div className="pt-3 border-t border-[#182838] space-y-1.5 text-[10px] text-[#94A3B8]">
                <div>• $100/trainee on Generic CDU/VDU</div>
                <div>• $500/trainee on Custom Units</div>
                <div>• Minimum 5 trainees per cohort</div>
                <div>• Full rubric grading & verification stamp</div>
                <div>• Partner revenue-share available</div>
              </div>
            </div>

            <button
              onClick={() => setPilotDrawerOpen(true)}
              className="mt-6 w-full py-2 border border-[#182838] hover:border-[#C8A048] text-[#94A3B8] hover:text-[#F0F0F8] font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
            >
              Inquire for Academies
            </button>
          </div>
        </div>

        {/* 2. Leadership & Frontline Industrial Pedigree */}
        <div className="bg-[#060B16] border border-[#182838] p-6 lg:p-8 space-y-6 corner-crosshairs">
          <div className="border-b border-[#182838] pb-3 flex justify-between items-center">
            <span className="font-mono text-xs font-bold text-[#C8A048]">
              [INDUSTRIAL LEADERSHIP & OPERATIONAL PEDIGREE]
            </span>
            <span className="font-mono text-[10px] text-[#64748B]">
              BUILT BY REFINERY OPERATORS FOR REFINERY OPERATORS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start font-mono text-xs">
            {/* Founder Profile */}
            <div className="p-4 bg-[#08101E] border border-[#182838] space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#102030] border border-[#C8A048] flex items-center justify-center font-bold text-[#C8A048] text-base">
                  MA
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F0F0F8]">ENG. MOSTAFA ADEL</div>
                  <div className="text-[11px] text-[#C8A048]">Founder & Chief Executive Officer</div>
                </div>
              </div>

              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                10 years of frontline process operations engineering across petroleum refining, petrochemicals, and natural gas processing. Personally operated and commissioned major units across Egypt and Africa:
              </p>

              <div className="space-y-1 text-[10px] text-[#D8E0F0] border-t border-[#182838] pt-2">
                <div>• <strong className="text-[#F0F0F8]">MIDOR Refinery (Alexandria, Egypt):</strong> Middle East Oil Refinery atmospheric & vacuum crude distillation, hydrocracking, and reformate units.</div>
                <div>• <strong className="text-[#F0F0F8]">Sanmar Petrochemicals (Port Said):</strong> Caustic soda, chlorine, and PVC petrochemical plant operations.</div>
                <div>• <strong className="text-[#F0F0F8]">Agiba Petroleum (Western Desert):</strong> Gas processing, condensate stabilization, and sour gas handling.</div>
                <div>• <strong className="text-[#F0F0F8]">Port Harcourt Refinery (Nigeria):</strong> International crude processing rehabilitation and DCS operator training.</div>
              </div>

              <div className="text-[10px] text-[#C8A048] font-semibold pt-1">
                Architect & Author of the CDU/VDU Simulator & OTS Builder.
              </div>
            </div>

            {/* CTO / Systems Architecture */}
            <div className="p-4 bg-[#08101E] border border-[#182838] space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#102030] border border-[#3361FC] flex items-center justify-center font-bold text-[#3361FC] text-base">
                  OT
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F0F0F8]">SYSTEMS & OT CYBERSECURITY ARCHITECTURE</div>
                  <div className="text-[11px] text-[#3361FC]">Engineering & Infrastructure Practice</div>
                </div>
              </div>

              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Specialized industrial software engineering practice focusing on ultra-low latency real-time solvers, WebAssembly emulation, containerized air-gapped on-premise deployments, and ISA/IEC 62443 industrial cybersecurity standards.
              </p>

              <div className="space-y-1 text-[10px] text-[#D8E0F0] border-t border-[#182838] pt-2">
                <div>• <strong className="text-[#F0F0F8]">Dynamic Process Solver:</strong> Discrete differential equation solver running deterministic mass & energy balances at &lt;15ms latency.</div>
                <div>• <strong className="text-[#F0F0F8]">Air-Gapped Containerization:</strong> Single-binary Docker/Podman bundles for rapid on-prem deployment without external package managers.</div>
                <div>• <strong className="text-[#F0F0F8]">DCS Protocol Mirroring:</strong> Emulating Honeywell Experion, Yokogawa CENTUM, Emerson DeltaV, and Foxboro I/A consoles.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Interactive "Request a 90-Day Pilot" Console Form */}
        <div id="request-pilot" className="bg-[#060B16] border border-[#C8A048] p-6 lg:p-8 space-y-6 corner-crosshairs">
          <div className="border-b border-[#182838] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <div className="font-mono text-xs text-[#C8A048] font-bold">
                [INTERACTIVE CONSOLE: SCHEDULE LIVE CDU/VDU DEMO OR 90-DAY PILOT]
              </div>
              <div className="text-xs text-[#94A3B8] mt-0.5">
                Pre-populated from your interactive journey session ({activeScenario.id}: {activeScenario.title})
              </div>
            </div>
            <div className="font-mono text-[10px] text-emerald-400">
              RESPONSE TIME: &lt; 24 BUSINESS HOURS
            </div>
          </div>

          {submitted ? (
            <div className="p-8 text-center font-mono space-y-3 bg-[#081838] border border-emerald-500/50">
              <div className="text-3xl">✓</div>
              <div className="text-base font-bold text-emerald-400">
                PILOT REQUEST DISPATCHED TO ENG. MOSTAFA ADEL
              </div>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                Thank you for initiating the 90-day refinery validation pilot. Our lead process engineering team will contact your technical office to coordinate P&ID intake and NDA signing.
              </p>
              <div className="text-[10px] text-[#64748B]">
                CONFIRMATION HASH: NX-REQ-2026-99214
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#94A3B8]">FULL NAME & ENGINEERING TITLE</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Eng. Ahmed Hassan — Operations Manager"
                    className="w-full p-2.5 bg-[#081838] border border-[#182838] focus:border-[#C8A048] text-[#F0F0F8] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8]">REFINERY / PETROCHEMICAL COMPANY</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full p-2.5 bg-[#081838] border border-[#182838] focus:border-[#C8A048] text-[#F0F0F8] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8]">WORK EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="a.hassan@midor.com.eg"
                    className="w-full p-2.5 bg-[#081838] border border-[#182838] focus:border-[#C8A048] text-[#F0F0F8] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8]">CONTACT PHONE / WHATSAPP</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+20 100 123 4567"
                    className="w-full p-2.5 bg-[#081838] border border-[#182838] focus:border-[#C8A048] text-[#F0F0F8] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8]">TARGET PROCESS UNIT</label>
                  <select
                    value={formData.unitType}
                    onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                    className="w-full p-2.5 bg-[#081838] border border-[#182838] focus:border-[#C8A048] text-[#F0F0F8] outline-none"
                  >
                    <option>CDU/VDU Atmospheric & Vacuum Distillation</option>
                    <option>Hydrocracker Unit (HCU)</option>
                    <option>Delayed Coking Unit (DCU)</option>
                    <option>Naphtha Hydrotreater & CCR Platformer</option>
                    <option>Amine Gas Sweetening & Claus SRU</option>
                    <option>Other Custom Plant Unit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8]">PREFERRED DEPLOYMENT</label>
                  <select
                    value={formData.deployment}
                    onChange={(e) => setFormData({ ...formData, deployment: e.target.value })}
                    className="w-full p-2.5 bg-[#081838] border border-[#182838] focus:border-[#C8A048] text-[#F0F0F8] outline-none"
                  >
                    <option>100% Air-Gapped On-Premise (3 Stations)</option>
                    <option>Private Cloud Enterprise Subscription</option>
                    <option>Training Academy Course Package</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#94A3B8]">SPECIFIC TRAINING OBJECTIVES & OPERATING UPSETS</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 bg-[#081838] border border-[#182838] focus:border-[#C8A048] text-[#F0F0F8] outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[10px] text-[#64748B]">
                  * Under strict NDA. No proprietary drawings shared outside the validation team.
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#C8A048] hover:bg-[#d4af55] text-[#03050C] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(200,160,72,0.25)]"
                >
                  Submit Pilot Request ($800) →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
