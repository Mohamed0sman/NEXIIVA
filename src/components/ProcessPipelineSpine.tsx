import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

export const ProcessPipelineSpine: React.FC = () => {
  const { activeStage, scrollToStage, simState, telemetry } = useSimulationJourney();

  const stages = [
    {
      num: 1,
      id: 'stage-01',
      tag: 'STAGE 01 // BUILD',
      title: 'OTS Builder (Custom Unit Assembly)',
      badge: '387 Equipment Types',
    },
    {
      num: 2,
      id: 'stage-02',
      tag: 'STAGE 02 // INSTRUCT',
      title: 'Instructor Fault Injection Console',
      badge: simState === 'FAULT_INJECTED' ? 'UPSET ACTIVE' : '3 Scenarios',
    },
    {
      num: 3,
      id: 'stage-03',
      tag: 'STAGE 03 // OPERATE',
      title: 'Trainee DCS Recovery Station',
      badge: `${telemetry.overheadTemp} °C | 12 Trends`,
    },
    {
      num: 4,
      id: 'stage-04',
      tag: 'STAGE 04 // CERTIFY',
      title: 'Audit Scoring & Auto-Certification',
      badge: 'Grade A (100%)',
    },
  ];

  return (
    <div id="journey" className="bg-[#081838] border-y border-[#182838] py-4 px-4 lg:px-8 select-none sticky top-16 z-30 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Pipeline Title */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="w-2.5 h-2.5 bg-[#C8A048]" />
          <div>
            <div className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider">
              [THE PLANT LIFECYCLE SPINE // STREAM-01]
            </div>
            <div className="font-mono text-xs font-bold text-[#F0F0F8]">
              4-Stage Interactive Simulation Journey
            </div>
          </div>
        </div>

        {/* 4 Interactive Connected Stage Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto">
          {stages.map((stage) => {
            const isActive = activeStage === stage.num;
            return (
              <button
                key={stage.num}
                onClick={() => scrollToStage(stage.num)}
                className={`text-left p-2 border font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#C8A048] bg-[#0E1A29] shadow-[0_0_15px_rgba(200,160,72,0.15)]'
                    : 'border-[#182838] bg-[#03050C]/60 hover:border-[#204070] hover:bg-[#08101E]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className={isActive ? 'text-[#C8A048] font-bold' : 'text-[#64748B]'}>
                    [0{stage.num}]
                  </span>
                  <span
                    className={`text-[9px] px-1 py-0.2 ${
                      stage.num === 2 && simState === 'FAULT_INJECTED'
                        ? 'bg-red-500/20 text-red-400 font-bold animate-pulse'
                        : isActive
                        ? 'bg-[#C8A048]/20 text-[#C8A048]'
                        : 'text-[#64748B]'
                    }`}
                  >
                    {stage.badge}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-[#F0F0F8] truncate mt-0.5">
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
