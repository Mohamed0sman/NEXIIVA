import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { SCENARIOS } from '../data/scenarios';
import { ScenarioId } from '../types/simulation';

export const Stage02_03_InstructOperate: React.FC = () => {
  const {
    activeScenario,
    selectScenario,
    simState,
    telemetry,
    injectFault,
    acknowledgeAlarm,
    startStandbyPump,
    adjustValve,
    resetSimulation,
    scrollToStage,
    activeFaceplate,
    setActiveFaceplate,
  } = useSimulationJourney();

  const [controllerMode, setControllerMode] = useState<'AUTO' | 'MAN'>('AUTO');
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

  // The 12 Live Trend Charts from Nexiiva's official CDU/VDU screen
  const trendCharts = [
    { id: 't1', title: 'VDU OVHD TEMP', unit: '°C', normal: '82.4', fault: '94.2', tag: 'TI-601' },
    { id: 't2', title: 'ATM PRESSURE', unit: 'bar', normal: '1.48', fault: '1.62', tag: 'PI-102' },
    { id: 't3', title: 'FLASH ZONE TEMP', unit: '°C', normal: '358.4', fault: '352.0', tag: 'TI-105' },
    { id: 't4', title: 'ATM BOTTOM LEVEL', unit: '%', normal: '48.5', fault: '46.0', tag: 'LIC-103' },
    { id: 't5', title: 'VDU OVHD LEVEL', unit: '%', normal: '51.2', fault: '53.0', tag: 'LIC-601' },
    { id: 't6', title: 'HGO CUT TEMP', unit: '°C', normal: '284.1', fault: '276.5', tag: 'TI-108' },
    { id: 't7', title: 'VACUUM PRESSURE', unit: 'mmHg', normal: '45.2', fault: '135.0', tag: 'PI-601' },
    { id: 't8', title: 'LVGO LEVEL', unit: '%', normal: '50.0', fault: '47.8', tag: 'LIC-602' },
    { id: 't9', title: 'HVGO LEVEL', unit: '%', normal: '52.1', fault: '56.3', tag: 'LIC-603' },
    { id: 't10', title: 'VAC RESIDUE LEVEL', unit: '%', normal: '45.8', fault: '44.2', tag: 'LIC-604' },
    { id: 't11', title: 'VDU PREFLASH LEVEL', unit: '%', normal: '49.0', fault: '50.1', tag: 'LIC-605' },
    { id: 't12', title: 'VDU FURNACE TEMP', unit: '°C', normal: '395.0', fault: '408.5', tag: 'TI-609' },
  ];

  return (
    <section id="stage-02" className="bg-[#081838] py-16 px-4 lg:px-8 border-b border-[#182838] relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 font-mono text-[11px] text-[#C8A048]">
            <span>[STAGE 02 & 03 // DUAL-SCREEN LIVE WORKSTATION]</span>
            <span className="text-[#182838]">|</span>
            <span className="text-[#94A3B8]">INSTRUCTOR INJECTION & OPERATOR RECOVERY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0F0F8] tracking-tight">
            The Instructor Injects Emergency Upsets. The Trainee Recovers on Real DCS Screens.
          </h2>
          <p className="text-[#94A3B8] max-w-3xl text-sm sm:text-base leading-relaxed">
            In legacy training, operators only study manuals. In NEXIIVA, instructors trigger unannounced equipment trips, valve stiction, and feed fluctuations in real time. The trainee must acknowledge DCS alarms within 30 seconds, start standby pumps, and prevent thermal column run-away.
          </p>
        </div>

        {/* WORKSTATION DUAL CONSOLE: INSTRUCTOR (TOP) + TRAINEE DCS (BOTTOM) */}
        <div className="bg-[#080818] border border-[#182838] shadow-2xl flex flex-col corner-crosshairs">
          {/* PANEL 1: INSTRUCTOR FAULT INJECTION CONTROL STRIP */}
          <div className="p-4 bg-[#0A1428] border-b border-[#182838]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#182838]/60">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-red-500 inline-block" />
                <span className="font-mono text-xs font-bold text-[#F0F0F8] uppercase tracking-wider">
                  INSTRUCTOR CONSOLE // FAULT INJECTOR PANEL
                </span>
                <span className="text-[#64748B] text-[10px] hidden sm:inline">
                  (Simulate authentic refinery upsets)
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#94A3B8]">
                CURRENT SCENARIO: <span className="text-[#C8A048] font-bold">{activeScenario.title}</span>
              </div>
            </div>

            {/* 3 Scenario Injection Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3">
              {SCENARIOS.map((sc) => {
                const isSelected = activeScenario.id === sc.id;
                const isTripped = isSelected && simState === 'FAULT_INJECTED';
                return (
                  <div
                    key={sc.id}
                    className={`p-3 border font-mono transition-all flex flex-col justify-between ${
                      isTripped
                        ? 'border-red-500 bg-red-950/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : isSelected
                        ? 'border-[#C8A048] bg-[#0E1A29]'
                        : 'border-[#182838] bg-[#08101E] hover:border-[#204070]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-bold text-[#C8A048]">{sc.id}</span>
                        <span className="text-[#64748B] text-[9px]">{sc.unit}</span>
                      </div>
                      <div className="text-[11px] font-bold text-[#F0F0F8] mb-1 leading-snug">
                        {sc.title}
                      </div>
                      <div className="text-[10px] text-[#94A3B8] line-clamp-2 mb-3">
                        {sc.initialFault}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-[#182838]">
                      {isTripped ? (
                        <div className="w-full text-center text-red-400 font-bold text-[10px] py-1 bg-red-900/30 border border-red-500/50 animate-pulse">
                          ⚡ FAULT ACTIVE ON DCS
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            selectScenario(sc.id);
                            injectFault(sc.id);
                          }}
                          className="w-full py-1 text-center bg-red-600/20 hover:bg-red-600/40 border border-red-500/60 text-red-300 font-bold text-[10px] uppercase transition-colors cursor-pointer"
                        >
                          ⚡ Inject Fault
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PANEL 2: TRAINEE DCS RECOVERY INTERFACE */}
          <div className="p-4 bg-[#080818] grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column (8 Cols): DCS Interactive Alarms & Controls */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              {/* Alarms Banner */}
              {telemetry.alarmActive ? (
                <div
                  className={`p-3 border font-mono text-[11px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    telemetry.alarmAcked
                      ? 'bg-amber-950/20 border-amber-500/60 text-amber-300'
                      : 'bg-red-950/40 border-red-500 text-red-300 animate-alarm-flash'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <div className="font-bold">
                        TAH-101 // HIGH OVERHEAD TEMPERATURE ALARM ({telemetry.overheadTemp} °C)
                      </div>
                      <div className="text-[10px] text-[#D8E0F0]">
                        Overhead reflux pump P-1007A tripped. Reflux flow FIC-102 dropped to 0 m³/h.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    {!telemetry.alarmAcked && (
                      <button
                        onClick={acknowledgeAlarm}
                        className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg"
                      >
                        [ACK ALARM (14s)]
                      </button>
                    )}
                    {telemetry.alarmAcked && (
                      <span className="font-bold text-emerald-400 text-[10px]">✓ ALARM ACKNOWLEDGED</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-2.5 bg-[#0A1428] border border-emerald-500/30 text-emerald-400 font-mono text-[11px] flex items-center justify-between">
                  <span>● ALL DCS LOOPS IN NORMAL CONTROL ENVELOPE</span>
                  <span className="text-[10px] text-[#64748B]">LATENCY: 8ms · SCAN: 100ms</span>
                </div>
              )}

              {/* Action Recovery Station: Pump Startup & Valve Adjustments */}
              <div className="p-4 bg-[#0A1428] border border-[#182838] space-y-3 font-mono text-[11px]">
                <div className="flex items-center justify-between border-b border-[#182838] pb-2">
                  <span className="text-[#C8A048] font-bold">
                    OPERATOR CONTROL STATION: P-1007 & FV-102 RECOVERY
                  </span>
                  <button
                    onClick={resetSimulation}
                    className="text-[10px] text-[#94A3B8] hover:text-[#F0F0F8] underline"
                  >
                    Reset Unit to Normal
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Standby Pump P-1007B Line-up */}
                  <div className="p-3 bg-[#08101E] border border-[#182838] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#F0F0F8]">STANDBY PUMP P-1007B</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 font-bold ${
                          telemetry.refluxPumpB_Running
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-[#64748B]/20 text-[#64748B]'
                        }`}
                      >
                        {telemetry.refluxPumpB_Running ? 'ONLINE' : 'STANDBY READY'}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#94A3B8]">
                      Suction & discharge valves lined up to Reflux Drum V-102.
                    </div>
                    <button
                      onClick={startStandbyPump}
                      disabled={telemetry.refluxPumpB_Running}
                      className={`w-full py-2 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        telemetry.refluxPumpB_Running
                          ? 'bg-[#182838] text-[#64748B] cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse'
                      }`}
                    >
                      {telemetry.refluxPumpB_Running
                        ? '✓ P-1007B RUNNING (82.0 m³/h)'
                        : '▶ START STANDBY PUMP P-1007B'}
                    </button>
                  </div>

                  {/* Reflux Flow Control Valve FV-102 Faceplate */}
                  <div className="p-3 bg-[#08101E] border border-[#182838] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#F0F0F8]">FIC-102 / FV-102 VALVE</span>
                      <div className="flex border border-[#182838]">
                        <button
                          onClick={() => setControllerMode('AUTO')}
                          className={`px-1.5 py-0.5 text-[9px] ${
                            controllerMode === 'AUTO'
                              ? 'bg-[#C8A048] text-[#03050C] font-bold'
                              : 'text-[#64748B]'
                          }`}
                        >
                          AUTO
                        </button>
                        <button
                          onClick={() => setControllerMode('MAN')}
                          className={`px-1.5 py-0.5 text-[9px] ${
                            controllerMode === 'MAN'
                              ? 'bg-[#C8A048] text-[#03050C] font-bold'
                              : 'text-[#64748B]'
                          }`}
                        >
                          MAN
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#94A3B8]">Valve Output (OP):</span>
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

                    <div className="flex justify-between text-[9px] text-[#64748B]">
                      <span>0% (Closed)</span>
                      <span>Current Flow: {telemetry.refluxFlow} m³/h</span>
                      <span>100% (Full Open)</span>
                    </div>
                  </div>
                </div>

                {/* Status Readout Bar */}
                <div className="pt-2 border-t border-[#182838] flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <div>
                    <span className="text-[#64748B]">TI-101 OVERHEAD TEMP: </span>
                    <span
                      className={`font-bold ${
                        telemetry.overheadTemp > 120
                          ? 'text-red-400'
                          : telemetry.overheadTemp > 116
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {telemetry.overheadTemp} °C
                    </span>
                    <span className="text-[#64748B]"> (TARGET: &lt;116.0 °C)</span>
                  </div>
                  <div>
                    <span className="text-[#64748B]">EVALUATION: </span>
                    <span className="text-[#F0F0F8] font-semibold">
                      {simState === 'FAULT_INJECTED'
                        ? 'UPSET UNSTABLE — ACTION REQUIRED'
                        : simState === 'RECOVERING'
                        ? 'PUMP B RECOVERING FLOW...'
                        : 'REFINERY UNIT FULLY STABILIZED'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (4 Cols): Live DCS Process Overview */}
            <div className="lg:col-span-4 p-4 bg-[#0A1428] border border-[#182838] flex flex-col justify-between font-mono text-[11px]">
              <div>
                <div className="font-bold text-[#C8A048] pb-2 border-b border-[#182838]">
                  CDU-VDU REAL-TIME METRICS
                </div>
                <div className="mt-3 space-y-2 text-[10px]">
                  <div className="flex justify-between py-1 border-b border-[#182838]/60">
                    <span className="text-[#94A3B8]">Atmospheric Overhead:</span>
                    <span className={telemetry.overheadTemp > 120 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {telemetry.overheadTemp} °C
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#182838]/60">
                    <span className="text-[#94A3B8]">Overhead Reflux Flow:</span>
                    <span className={telemetry.refluxFlow < 20 ? 'text-red-400 font-bold' : 'text-[#F0F0F8] font-bold'}>
                      {telemetry.refluxFlow} m³/h
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#182838]/60">
                    <span className="text-[#94A3B8]">Reflux Drum Level LIC-101:</span>
                    <span className="text-emerald-400 font-bold">{telemetry.refluxLevel}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#182838]/60">
                    <span className="text-[#94A3B8]">Crude Heater F-101 COT:</span>
                    <span className="text-amber-400 font-bold">{telemetry.furnaceOutletTemp} °C</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#182838]/60">
                    <span className="text-[#94A3B8]">Vacuum Column T-60 Press:</span>
                    <span className="text-[#F0F0F8] font-bold">{telemetry.vacuumPressure} mmHg</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#94A3B8]">Total Crude Throughput:</span>
                    <span className="text-[#F0F0F8] font-bold">{telemetry.feedRate} m³/h</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Jump CTA */}
              <div className="pt-4 border-t border-[#182838]">
                <button
                  onClick={() => scrollToStage(4)}
                  className="w-full py-2 bg-[#C8A048] hover:bg-[#d4af55] text-[#03050C] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <span>Auto-Score & Certify Session ↓</span>
                </button>
              </div>
            </div>
          </div>

          {/* PANEL 3: 12 LIVE TREND CHARTS (3x4 GRID) MATCHING NEXIIVA SCREEN */}
          <div className="p-4 bg-[#060B16] border-t border-[#182838] space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between pb-2 border-b border-[#182838]">
              <div className="flex items-center space-x-2">
                <span className="text-[#C8A048] font-bold">12 LIVE TREND STRIP CHARTS</span>
                <span className="text-[#64748B] text-[10px] hidden sm:inline">
                  (Mirrored live from CDU/VDU process sensors)
                </span>
              </div>
              <div className="text-[10px] text-[#64748B]">
                STATUS: {simState === 'FAULT_INJECTED' ? <span className="text-red-400 font-bold">TRANSIENT UPSET SPIKING</span> : <span className="text-emerald-400">STEADY-STATE DYNAMICS</span>}
              </div>
            </div>

            {/* 3x4 Grid of Mini Animated Trend Strip Charts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {trendCharts.map((chart) => {
                const isOverheadTemp = chart.title === 'VDU OVHD TEMP' || chart.id === 't1';
                const isAtmPressure = chart.title === 'ATM PRESSURE' || chart.id === 't2';
                const isVacPressure = chart.title === 'VACUUM PRESSURE' || chart.id === 't7';
                const isSpiking = (isOverheadTemp || isAtmPressure || isVacPressure) && simState === 'FAULT_INJECTED';

                return (
                  <div
                    key={chart.id}
                    onClick={() => setSelectedTrend(chart.title)}
                    className={`p-2 bg-[#08101E] border transition-colors cursor-pointer flex flex-col justify-between h-28 ${
                      isSpiking
                        ? 'border-red-500 bg-red-950/20'
                        : 'border-[#182838] hover:border-[#204070]'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-[#F0F0F8] font-bold truncate">{chart.title}</span>
                      <span className="text-[#64748B]">{chart.tag}</span>
                    </div>

                    {/* SVG Sparkline */}
                    <div className="w-full h-12 my-1">
                      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path
                          d={
                            isSpiking
                              ? 'M 0 25 L 30 25 L 50 10 L 70 5 L 100 4'
                              : simState === 'RECOVERING' && isOverheadTemp
                              ? 'M 0 5 L 20 6 L 50 18 L 80 23 L 100 24'
                              : 'M 0 20 L 20 22 L 40 19 L 60 21 L 80 20 L 100 20'
                          }
                          fill="none"
                          stroke={isSpiking ? '#EF4444' : '#C8A048'}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[10px]">
                      <span className={isSpiking ? 'text-red-400 font-bold' : 'text-[#C8A048] font-bold'}>
                        {isSpiking ? chart.fault : chart.normal} {chart.unit}
                      </span>
                      <span className="text-[#64748B] text-[8px]">-15m TREND</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
