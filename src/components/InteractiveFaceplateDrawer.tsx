import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

export const InteractiveFaceplateDrawer: React.FC = () => {
  const {
    activeFaceplate,
    setActiveFaceplate,
    telemetry,
    acknowledgeAlarm,
    startStandbyPump,
    adjustValve,
  } = useSimulationJourney();

  if (!activeFaceplate) return null;

  const isTemp = activeFaceplate === 'TIC-101';
  const isValve = activeFaceplate === 'FV-102';
  const isPumpA = activeFaceplate === 'P-1007A';
  const isPumpB = activeFaceplate === 'P-1007B';

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-[#081838] border-2 border-[#C8A048] shadow-2xl corner-crosshairs font-mono text-xs select-none">
      {/* Faceplate Header */}
      <div className="bg-[#0E1A29] border-b border-[#182838] p-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#C8A048]" />
          <span className="font-bold text-[#F0F0F8]">DCS FACEPLATE: {activeFaceplate}</span>
        </div>
        <button
          onClick={() => setActiveFaceplate(null)}
          className="text-[#94A3B8] hover:text-[#F0F0F8] text-xs px-1.5 py-0.5 border border-[#182838] cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Faceplate Body */}
      <div className="p-3 space-y-3 bg-[#080818]">
        {/* Service Title */}
        <div className="text-[10px] text-[#94A3B8] border-b border-[#182838] pb-1.5">
          {isTemp && 'Atmospheric Column T-22 Overhead Vapor Temp'}
          {isValve && 'Column T-22 Reflux Control Valve'}
          {isPumpA && 'Main Reflux Centrifugal Pump (API 610)'}
          {isPumpB && 'Standby Reflux Centrifugal Pump (API 610)'}
        </div>

        {/* Readouts */}
        {isTemp && (
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-[#64748B]">PROCESS VARIABLE (PV):</span>
              <span className={`font-bold text-sm ${telemetry.overheadTemp > 120 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                {telemetry.overheadTemp} °C
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[#64748B]">SETPOINT (SP):</span>
              <span className="text-[#F0F0F8] font-bold">114.5 °C</span>
            </div>
            {telemetry.alarmActive && (
              <button
                onClick={acknowledgeAlarm}
                className="w-full py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer shadow"
              >
                [ACKNOWLEDGE TAH-101 ALARM]
              </button>
            )}
          </div>
        )}

        {isValve && (
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-[#64748B]">FLOW RATE:</span>
              <span className="font-bold text-sm text-[#F0F0F8]">
                {telemetry.refluxFlow} m³/h
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#94A3B8]">VALVE OUTPUT (OP):</span>
                <span className="text-[#C8A048] font-bold">{telemetry.refluxControlValvePct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={telemetry.refluxControlValvePct}
                onChange={(e) => adjustValve(parseFloat(e.target.value))}
                className="w-full accent-[#C8A048] bg-[#182838] h-1.5 cursor-pointer"
              />
            </div>
          </div>
        )}

        {(isPumpA || isPumpB) && (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[#64748B]">MOTOR STATUS:</span>
              <span className={`font-bold ${
                isPumpA
                  ? (telemetry.refluxPumpA_Running ? 'text-emerald-400' : 'text-red-400')
                  : (telemetry.refluxPumpB_Running ? 'text-emerald-400' : 'text-[#64748B]')
              }`}>
                {isPumpA
                  ? (telemetry.refluxPumpA_Running ? 'RUNNING (ONLINE)' : 'TRIPPED')
                  : (telemetry.refluxPumpB_Running ? 'RUNNING (ONLINE)' : 'STANDBY READY')}
              </span>
            </div>

            {isPumpB && (
              <button
                onClick={startStandbyPump}
                disabled={telemetry.refluxPumpB_Running}
                className={`w-full py-2 font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                  telemetry.refluxPumpB_Running
                    ? 'bg-[#182838] text-[#64748B] cursor-not-allowed'
                    : 'bg-[#C8A048] hover:bg-[#d4af55] text-[#03050C] shadow-lg animate-pulse'
                }`}
              >
                {telemetry.refluxPumpB_Running ? '✓ PUMP ONLINE' : '▶ START STANDBY PUMP P-1007B'}
              </button>
            )}
          </div>
        )}

        {/* Mode Selector */}
        <div className="pt-2 border-t border-[#182838] flex items-center justify-between text-[10px]">
          <span className="text-[#64748B]">CONTROL MODE:</span>
          <div className="flex border border-[#182838]">
            <span className="px-1.5 py-0.5 bg-[#C8A048] text-[#03050C] font-bold">AUTO</span>
            <span className="px-1.5 py-0.5 text-[#64748B]">MAN</span>
            <span className="px-1.5 py-0.5 text-[#64748B]">CAS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
