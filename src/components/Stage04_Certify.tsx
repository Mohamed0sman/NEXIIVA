import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { NexiivaLogo } from './NexiivaLogo';

export const Stage04_Certify: React.FC = () => {
  const { activeScenario, simState, telemetry, setPilotDrawerOpen } = useSimulationJourney();
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    setDownloading(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 400);
  };

  return (
    <section id="stage-04" className="bg-[#03050C] py-16 px-4 lg:px-8 border-b border-[#182838] relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 font-mono text-[11px] text-[#C8A048]">
            <span>[STAGE 04 // OBJECTIVE AUDIT & CERTIFICATION]</span>
            <span className="text-[#182838]">|</span>
            <span className="text-[#94A3B8]">SAFETY ENVELOPE VERIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0F0F8] tracking-tight">
            Objective, Audit-Ready Operator Certification the Moment the Scenario Ends.
          </h2>
          <p className="text-[#94A3B8] max-w-3xl text-sm sm:text-base leading-relaxed">
            Eliminate subjective evaluations. NEXIIVA timestamps every switch, alarm acknowledgement, and valve adjustment against the plant's safe operating limits—generating tamper-evident competency certificates for refinery management and safety auditors.
          </p>
        </div>

        {/* 2-Column Grid: Rubric Breakdown (Left) + High-End Technical Certificate (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Real-time Rubric Checklist */}
          <div className="lg:col-span-5 bg-[#081838] border border-[#182838] p-5 space-y-4 font-mono text-[11px] corner-crosshairs">
            <div className="flex items-center justify-between pb-3 border-b border-[#182838]">
              <span className="font-bold text-[#C8A048] text-xs">
                SCENARIO SCORING RUBRIC: {activeScenario.id}
              </span>
              <span className="text-emerald-400 font-bold text-sm">
                SCORE: {simState === 'FAULT_INJECTED' ? '82.5%' : '100.0%'}
              </span>
            </div>

            <div className="space-y-3">
              {activeScenario.rubric.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#0A1428] border border-[#182838] space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-[#F0F0F8] leading-tight">
                      {item.code}: {item.description}
                    </span>
                    <span className="shrink-0 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold text-[9px] border border-emerald-500/40">
                      PASSED (25%)
                    </span>
                  </div>

                  <div className="text-[10px] text-[#94A3B8] leading-relaxed">
                    {item.notes}
                  </div>

                  {item.targetSeconds && (
                    <div className="flex justify-between text-[9px] text-[#64748B] pt-1 border-t border-[#182838]/50">
                      <span>Target: &lt;{item.targetSeconds}s</span>
                      <span className="text-[#C8A048] font-semibold">
                        Actual: {item.actualSeconds}s (Within Limit)
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Total Competency Readout */}
            <div className="p-3 bg-[#0E1A29] border border-[#C8A048]/40 flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">Audit Classification:</span>
              <span className="text-[#C8A048] font-bold">GRADE A // OPERATIONAL MASTERY</span>
            </div>
          </div>

          {/* Right Column (7 Cols): Official Certificate Preview Card */}
          <div className="lg:col-span-7 bg-[#060B16] border-2 border-[#C8A048] p-6 lg:p-8 relative shadow-[0_0_35px_rgba(200,160,72,0.15)] corner-crosshairs text-left print:border-black print:text-black">
            {/* Watermark Logo Icon */}
            <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
              <NexiivaLogo height={70} />
            </div>

            {/* Certificate Header */}
            <div className="flex items-start justify-between border-b border-[#182838] pb-4">
              <div>
                <NexiivaLogo height={32} />
                <div className="font-mono text-[9px] text-[#C8A048] uppercase tracking-widest mt-1">
                  OFFICIAL AUDIT & COMPETENCY ACCREDITATION
                </div>
              </div>
              <div className="text-right font-mono text-[10px]">
                <div className="text-[#64748B]">DOC ID: NX-2026-CERT-0842</div>
                <div className="text-[#94A3B8]">DATE: 04 NOV 2026</div>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="py-6 space-y-4">
              <div className="text-center space-y-1">
                <div className="font-mono text-xs text-[#94A3B8] tracking-widest uppercase">
                  THIS CERTIFIES THAT
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#F0F0F8] tracking-tight">
                  ENGR. REFINERY PROCESS OPERATOR
                </div>
                <div className="font-mono text-[11px] text-[#C8A048]">
                  OPERATOR ID: #OP-88214 · MIDOR REFINERY ATM/VAC DISTILLATION UNIT
                </div>
              </div>

              <div className="text-center max-w-lg mx-auto text-xs text-[#94A3B8] leading-relaxed">
                Has successfully demonstrated full emergency containment, DCS loop stabilization, and safety envelope preservation during real-time dynamic fault injection on the:
              </div>

              {/* Unit & Scenario Highlight Box */}
              <div className="p-3 bg-[#081838] border border-[#182838] text-center font-mono space-y-1">
                <div className="text-xs font-bold text-[#F0F0F8]">
                  CRUDE DISTILLATION UNIT (CDU T-22 / VDU T-60)
                </div>
                <div className="text-[11px] text-[#C8A048]">
                  SCENARIO S1: REFLUX PUMP P-1007A TRIP & OVERHEAD TEMP EXCURSION RECOVERY
                </div>
              </div>

              {/* Performance Metrics Breakdown */}
              <div className="grid grid-cols-3 gap-2 font-mono text-center pt-2">
                <div className="p-2 border border-[#182838] bg-[#0A1428]">
                  <div className="text-[9px] text-[#64748B]">FINAL SCORE</div>
                  <div className="text-lg font-bold text-emerald-400">100.0%</div>
                  <div className="text-[9px] text-emerald-500 font-semibold">GRADE A</div>
                </div>
                <div className="p-2 border border-[#182838] bg-[#0A1428]">
                  <div className="text-[9px] text-[#64748B]">ALARM RESPONSE</div>
                  <div className="text-lg font-bold text-[#F0F0F8]">14 sec</div>
                  <div className="text-[9px] text-[#64748B]">&lt; 30s LIMIT</div>
                </div>
                <div className="p-2 border border-[#182838] bg-[#0A1428]">
                  <div className="text-[9px] text-[#64748B]">STANDBY START</div>
                  <div className="text-lg font-bold text-[#F0F0F8]">42 sec</div>
                  <div className="text-[9px] text-[#64748B]">&lt; 120s LIMIT</div>
                </div>
              </div>

              {/* Assessment Narrative */}
              <div className="text-[11px] text-[#94A3B8] bg-[#0A1428] p-3 border border-[#182838] space-y-1 font-mono">
                <div>
                  <strong className="text-[#F0F0F8]">Key Strengths:</strong> Fast diagnosis of reflux collapse. Standby pump P-1007B lined up safely; drum level V-102 kept within 20%–85% envelope without flaring.
                </div>
                <div>
                  <strong className="text-[#C8A048]">Recommendation:</strong> Approved for unassisted solo console operation on atmospheric column T-22.
                </div>
              </div>
            </div>

            {/* Certificate Sign-off */}
            <div className="border-t border-[#182838] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[10px]">
              <div>
                <div className="text-[#F0F0F8] font-bold">ENG. MOSTAFA ADEL</div>
                <div className="text-[#64748B]">Founder & Lead Process Architect, NEXIIVA</div>
                <div className="text-[9px] text-[#64748B]">Ex-MIDOR, Sanmar, Agiba, Port Harcourt Operations</div>
              </div>

              {/* Verification Seal */}
              <div className="flex items-center space-x-2 border border-[#C8A048]/40 px-3 py-1.5 bg-[#C8A048]/5 text-[#C8A048]">
                <span className="text-sm">🛡️</span>
                <div>
                  <div className="font-bold tracking-wider">VERIFIED OTS HASH</div>
                  <div className="text-[8px] text-[#64748B]">SHA256: 8a9f24e1...0c7b</div>
                </div>
              </div>
            </div>

            {/* Certificate Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#182838] print:hidden">
              <button
                onClick={handlePrint}
                disabled={downloading}
                className="flex-1 py-2.5 bg-[#C8A048] hover:bg-[#d4af55] text-[#03050C] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-md"
              >
                <span>🖨️ Download / Print Certificate</span>
              </button>

              <button
                onClick={() => setPilotDrawerOpen(true)}
                className="flex-1 py-2.5 border border-[#C8A048]/60 hover:bg-[#C8A048]/10 text-[#F0F0F8] font-mono text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Deploy Unit to Control Room →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
