import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

interface CduVduSimulatorScreenProps {
  compact?: boolean;
}

export const CduVduSimulatorScreen: React.FC<CduVduSimulatorScreenProps> = ({ compact = false }) => {
  const {
    telemetry,
    simState,
    injectFault,
    acknowledgeAlarm,
    startStandbyPump,
    resetSimulation,
    activeScenario,
    setActiveFaceplate,
    adjustValve,
  } = useSimulationJourney();

  const [activeTab, setActiveTab] = useState<string>('PFD');
  const [activeSubTab, setActiveSubTab] = useState<string>('CDU - ATM T22');

  const tabs = [
    'NORMAL OPERATION',
    'PFD',
    'PROCESS',
    'CONTROL VALVES',
    'PUMPS',
    'FURNACE',
    'TRENDS',
    'TOTALIZER',
    'ALARMS',
    'SCORE',
  ];

  const subTabs = ['CDU - ATM T22', 'VDU - T60', 'PREHEAT TRAIN'];

  return (
    <div className="bg-[#080818] border border-[#182838] shadow-2xl relative flex flex-col font-mono text-[12px] text-[#F0F0F8] overflow-hidden corner-crosshairs">
      {/* 1. Header Bar: System Bar & Mode Selector */}
      <div className="bg-[#0E1A29] border-b border-[#182838] px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${simState === 'FAULT_INJECTED' ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
          </div>
          <span className="font-bold text-[#F0F0F8] text-[11px] tracking-wide">
            CDU/VDU DYNAMIC OPERATOR STATION // #DCS-01
          </span>
          <span className="text-[#64748B] text-[10px] hidden sm:inline">|</span>
          <span className="text-[#C8A048] text-[10px] hidden sm:inline font-semibold">
            {simState === 'NORMAL' && '[STATUS: NORMAL BASELINE]'}
            {simState === 'FAULT_INJECTED' && '[STATUS: UPSET IN PROGRESS]'}
            {simState === 'RECOVERING' && '[STATUS: TRAINEE RECOVERY]'}
            {simState === 'CERTIFIED' && '[STATUS: STABILIZED & AUDITED]'}
          </span>
        </div>

        {/* Quick Fault Injection & Reset Controls */}
        <div className="flex items-center space-x-2">
          {simState === 'NORMAL' ? (
            <button
              onClick={() => injectFault('S1')}
              className="px-2.5 py-1 bg-red-600/20 border border-red-500/60 text-red-300 hover:bg-red-600/40 text-[11px] font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>⚡ INJECT FAULT: S1 (Reflux Loss P-1007)</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={resetSimulation}
                className="px-2.5 py-1 bg-[#182838] hover:bg-[#204070] text-[#94A3B8] hover:text-[#F0F0F8] text-[10px] transition-all cursor-pointer"
              >
                ⟳ Reset Unit
              </button>
              {simState === 'FAULT_INJECTED' && (
                <button
                  onClick={startStandbyPump}
                  className="px-2.5 py-1 bg-emerald-600/30 border border-emerald-500 text-emerald-300 hover:bg-emerald-600/50 text-[11px] font-bold animate-pulse transition-all cursor-pointer"
                >
                  ▶ Start Standby P-1007B
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. 10 Authentic DCS Tabs */}
      <div className="bg-[#0A1428] border-b border-[#182838] flex items-center overflow-x-auto scrollbar-none px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const isAlarmTab = tab === 'ALARMS' && telemetry.alarmActive;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-[10px] font-semibold tracking-wider whitespace-nowrap transition-colors relative cursor-pointer ${
                isAlarmTab
                  ? 'bg-red-900/40 text-red-300 animate-alarm-flash border-r border-red-500/30'
                  : isActive
                  ? 'bg-[#102030] text-[#C8A048] border-b-2 border-[#C8A048]'
                  : 'text-[#94A3B8] hover:text-[#F0F0F8] hover:bg-[#102030]/50'
              }`}
            >
              {tab}
              {isAlarmTab && ' (1)'}
            </button>
          );
        })}
      </div>

      {/* 3. Sub-unit Tabs */}
      <div className="bg-[#08101E] border-b border-[#182838] px-3 py-1 flex items-center justify-between text-[10px]">
        <div className="flex items-center space-x-2">
          {subTabs.map((st) => (
            <button
              key={st}
              onClick={() => setActiveSubTab(st)}
              className={`px-2 py-0.5 ${
                activeSubTab === st
                  ? 'bg-[#204070] text-[#F0F0F8] font-bold'
                  : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
        <div className="text-[10px] text-[#64748B] hidden sm:block">
          TIME: <span className="text-[#F0F0F8]">{telemetry.elapsedSeconds}s</span> · CRUDE: <span className="text-[#C8A048]">32.4° API</span>
        </div>
      </div>

      {/* 4. Main Interactive Canvas / PFD Display */}
      <div className="p-3 bg-[#080818] min-h-[340px] relative">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 dcs-scanlines opacity-40 z-10 pointer-events-none" />

        {/* TAB 1 & 2: PFD / NORMAL OPERATION SCHEMATIC */}
        {(activeTab === 'PFD' || activeTab === 'NORMAL OPERATION') && (
          <div className="relative w-full h-[320px] select-none">
            {/* SVG Interactive Process Flow Schematic */}
            <svg className="w-full h-full" viewBox="0 0 760 300" fill="none">
              <defs>
                <linearGradient id="columnGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1E324A" />
                  <stop offset="50%" stopColor="#2A486C" />
                  <stop offset="100%" stopColor="#162538" />
                </linearGradient>
                <linearGradient id="furnaceFire" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#7C2D12" />
                </linearGradient>
              </defs>

              {/* 1. Feed Stream Line -> Preheater -> Desalter V-101 */}
              <path
                d="M 10 160 L 60 160"
                stroke="#206080"
                strokeWidth="2.5"
                className="animate-pipe-flow"
              />
              <text x="12" y="152" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                CRUDE 320 m³/h
              </text>

              {/* Preheater Box E-101 */}
              <rect x="60" y="145" width="35" height="30" fill="#102030" stroke="#204070" strokeWidth="1.5" />
              <text x="66" y="163" fill="#C8A048" fontSize="9" fontWeight="bold">E-101</text>

              {/* Desalter Vessel V-101 */}
              <path
                d="M 95 160 L 120 160"
                stroke="#206080"
                strokeWidth="2.5"
                className="animate-pipe-flow"
              />
              <rect x="120" y="140" width="55" height="40" rx="6" fill="#102030" stroke="#204070" strokeWidth="1.5" />
              <text x="128" y="158" fill="#F0F0F8" fontSize="9" fontWeight="bold">V-101</text>
              <text x="126" y="170" fill="#64748B" fontSize="8">DESALTER</text>

              {/* Pipe Desalter -> Furnace F-101 */}
              <path
                d="M 175 160 L 210 160"
                stroke="#206080"
                strokeWidth="2.5"
                className="animate-pipe-flow"
              />

              {/* Fired Heater / Furnace F-101 */}
              <rect x="210" y="130" width="55" height="60" fill="#102030" stroke="#EA580C" strokeWidth="1.5" />
              <polygon points="215,185 237,145 260,185" fill="url(#furnaceFire)" opacity="0.4" />
              <text x="218" y="146" fill="#EA580C" fontSize="9" fontWeight="bold">F-101</text>
              <text x="215" y="175" fill="#F0F0F8" fontSize="8">FURNACE</text>
              <text x="214" y="202" fill="#EA580C" fontSize="8" fontWeight="bold">
                {telemetry.furnaceOutletTemp}°C
              </text>

              {/* Transfer Line: F-101 to Column Flash Zone */}
              <path
                d="M 265 160 L 320 160"
                stroke="#EA580C"
                strokeWidth="3.5"
                className="animate-pipe-flow-fast"
              />

              {/* Atmospheric Crude Fractionator Column T-22 */}
              <rect x="320" y="40" width="70" height="200" rx="8" fill="url(#columnGrad)" stroke="#204070" strokeWidth="2" />
              <text x="337" y="65" fill="#F0F0F8" fontSize="12" fontWeight="bold">T-22</text>
              <text x="331" y="78" fill="#94A3B8" fontSize="8">ATM TOWER</text>

              {/* Internal Trays Representation */}
              {[95, 115, 135, 155, 175, 195, 215].map((y, idx) => (
                <line key={idx} x1="324" y1={y} x2="386" y2={y} stroke="#182838" strokeDasharray="2 2" strokeWidth="1.5" />
              ))}

              {/* Flash Zone Temperature Readout Box */}
              <rect x="330" y="168" width="50" height="15" fill="#080818" stroke="#182838" />
              <text x="334" y="179" fill="#10B981" fontSize="8">358.4°C</text>

              {/* Top Overhead Vapor Stream: T-22 Top -> Overhead Condenser */}
              <path
                d="M 355 40 L 355 20 L 460 20 L 460 40"
                stroke={telemetry.alarmActive ? '#EF4444' : '#206080'}
                strokeWidth="2.5"
                className="animate-pipe-flow"
              />

              {/* Overhead Temperature TI-101 Tag Box (Clickable Faceplate) */}
              <g
                className="cursor-pointer group"
                onClick={() => setActiveFaceplate('TIC-101')}
              >
                <rect
                  x="380"
                  y="12"
                  width="70"
                  height="22"
                  fill="#0E1A29"
                  stroke={telemetry.alarmActive ? '#EF4444' : '#204070'}
                  strokeWidth={telemetry.alarmActive ? '2' : '1'}
                  className={telemetry.alarmActive ? 'animate-alarm-flash' : ''}
                />
                <text x="386" y="22" fill="#94A3B8" fontSize="8">TI-101 (OVHD)</text>
                <text
                  x="386"
                  y="31"
                  fill={telemetry.alarmActive ? '#EF4444' : '#10B981'}
                  fontSize="9"
                  fontWeight="bold"
                >
                  {telemetry.overheadTemp} °C
                </text>
              </g>

              {/* Overhead Condenser E-102 */}
              <circle cx="460" cy="50" r="14" fill="#102030" stroke="#204070" strokeWidth="1.5" />
              <text x="447" y="53" fill="#64748B" fontSize="8">E-102</text>

              {/* Condenser -> Reflux Drum V-102 */}
              <path d="M 460 64 L 460 90" stroke="#206080" strokeWidth="2.5" />
              <rect x="430" y="90" width="60" height="35" rx="5" fill="#102030" stroke="#204070" strokeWidth="1.5" />
              <text x="442" y="105" fill="#F0F0F8" fontSize="9" fontWeight="bold">V-102</text>
              <text x="436" y="117" fill="#10B981" fontSize="8">
                LIC: {telemetry.refluxLevel}%
              </text>

              {/* Reflux Drum Boot / Suction -> Pumps P-1007A / P-1007B */}
              <path d="M 460 125 L 460 145 L 500 145" stroke="#206080" strokeWidth="2" />
              <path d="M 460 145 L 460 175 L 500 175" stroke="#206080" strokeWidth="2" />

              {/* Pump P-1007A (Main) */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveFaceplate('P-1007A')}
              >
                <circle
                  cx="515"
                  cy="145"
                  r="12"
                  fill="#102030"
                  stroke={telemetry.refluxPumpA_Running ? '#10B981' : '#EF4444'}
                  strokeWidth="2"
                />
                <text x="507" y="148" fill={telemetry.refluxPumpA_Running ? '#10B981' : '#EF4444'} fontSize="8" fontWeight="bold">
                  7A
                </text>
                <text x="532" y="148" fill="#94A3B8" fontSize="8">
                  P-1007A {telemetry.refluxPumpA_Running ? '[RUN]' : '[TRIP]'}
                </text>
              </g>

              {/* Pump P-1007B (Standby) */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveFaceplate('P-1007B')}
              >
                <circle
                  cx="515"
                  cy="175"
                  r="12"
                  fill="#102030"
                  stroke={telemetry.refluxPumpB_Running ? '#10B981' : '#64748B'}
                  strokeWidth="2"
                />
                <text x="507" y="178" fill={telemetry.refluxPumpB_Running ? '#10B981' : '#94A3B8'} fontSize="8" fontWeight="bold">
                  7B
                </text>
                <text x="532" y="178" fill="#94A3B8" fontSize="8">
                  P-1007B {telemetry.refluxPumpB_Running ? '[RUN]' : '[STDBY]'}
                </text>
              </g>

              {/* Reflux Return Line -> Control Valve FV-102 -> Column Top */}
              <path
                d="M 580 145 L 610 145 L 610 55 L 400 55 L 390 55"
                stroke={telemetry.refluxFlow > 10 ? '#10B981' : '#EF4444'}
                strokeWidth="2.5"
                strokeDasharray={telemetry.refluxFlow > 10 ? '5 3' : 'none'}
                className={telemetry.refluxFlow > 10 ? 'animate-pipe-flow' : ''}
              />

              {/* Reflux Flow Indicator FIC-102 / FV-102 */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveFaceplate('FV-102')}
              >
                <polygon points="605,95 615,95 610,105" fill="#C8A048" />
                <polygon points="605,115 615,115 610,105" fill="#C8A048" />
                <rect x="622" y="93" width="75" height="24" fill="#0E1A29" stroke="#C8A048" strokeWidth="1" />
                <text x="626" y="103" fill="#C8A048" fontSize="8">FIC-102 / FV-102</text>
                <text x="626" y="113" fill="#F0F0F8" fontSize="9" fontWeight="bold">
                  {telemetry.refluxFlow} m³/h
                </text>
              </g>

              {/* Side Stream 1: Kerosene to T-23 */}
              <path d="M 390 100 L 420 100" stroke="#206080" strokeWidth="2" />
              <text x="425" y="103" fill="#94A3B8" fontSize="8">KEROSENE CUT (T-23)</text>

              {/* Side Stream 2: Diesel to T-24 */}
              <path d="M 390 140 L 420 140" stroke="#206080" strokeWidth="2" />
              <text x="425" y="143" fill="#94A3B8" fontSize="8">DIESEL CUT (T-24)</text>

              {/* Bottom Residue Stream -> Vacuum Column T-60 */}
              <path
                d="M 355 240 L 355 270 L 680 270"
                stroke="#64748B"
                strokeWidth="3"
                className="animate-pipe-flow"
              />
              <text x="365" y="265" fill="#94A3B8" fontSize="8">
                ATM RESIDUE TO VACUUM COLUMN T-60 (348.0°C)
              </text>
            </svg>

            {/* Bottom Real-time Telemetry Readout Strip */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#0E1A29]/90 border-t border-[#182838] px-3 py-1.5 flex flex-wrap items-center justify-between gap-3 text-[10px]">
              <div>
                <span className="text-[#64748B]">T-22 TOP TEMP: </span>
                <span className={`font-bold ${telemetry.alarmActive ? 'text-red-400' : 'text-emerald-400'}`}>
                  {telemetry.overheadTemp} °C
                </span>
                <span className="text-[#64748B] text-[9px]"> (SP: 114.5 °C)</span>
              </div>
              <div>
                <span className="text-[#64748B]">REFLUX FLOW: </span>
                <span className={`font-bold ${telemetry.refluxFlow < 20 ? 'text-red-400' : 'text-[#F0F0F8]'}`}>
                  {telemetry.refluxFlow} m³/h
                </span>
              </div>
              <div>
                <span className="text-[#64748B]">COL PRESSURE: </span>
                <span className="text-[#F0F0F8] font-bold">{telemetry.columnPressure} bar</span>
              </div>
              <div>
                <span className="text-[#64748B]">DRUM LEVEL: </span>
                <span className="text-[#F0F0F8] font-bold">{telemetry.refluxLevel} %</span>
              </div>
              <div>
                <span className="text-[#64748B]">FURNACE OUTLET: </span>
                <span className="text-amber-400 font-bold">{telemetry.furnaceOutletTemp} °C</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROCESS DATA TABLE */}
        {activeTab === 'PROCESS' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-[#102030] text-[#C8A048] border-b border-[#182838]">
                  <th className="p-2">TAG</th>
                  <th className="p-2">DESCRIPTION</th>
                  <th className="p-2">PV (MEASURED)</th>
                  <th className="p-2">SP (SETPOINT)</th>
                  <th className="p-2">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#182838]">
                <tr>
                  <td className="p-2 font-bold text-[#F0F0F8]">TI-101</td>
                  <td className="p-2 text-[#94A3B8]">Atmospheric Column Overhead Vapor Temp</td>
                  <td className={`p-2 font-bold ${telemetry.overheadTemp > 120 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {telemetry.overheadTemp} °C
                  </td>
                  <td className="p-2 text-[#64748B]">114.5 °C</td>
                  <td className="p-2">
                    {telemetry.overheadTemp > 120 ? (
                      <span className="text-red-400 font-bold">ALARM HIGH</span>
                    ) : (
                      <span className="text-emerald-400">NORMAL</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[#F0F0F8]">FIC-102</td>
                  <td className="p-2 text-[#94A3B8]">T-22 Column Overhead Reflux Flow</td>
                  <td className={`p-2 font-bold ${telemetry.refluxFlow === 0 ? 'text-red-400' : 'text-[#F0F0F8]'}`}>
                    {telemetry.refluxFlow} m³/h
                  </td>
                  <td className="p-2 text-[#64748B]">84.5 m³/h</td>
                  <td className="p-2">
                    {telemetry.refluxFlow === 0 ? (
                      <span className="text-red-400 font-bold">NO FLOW (TRIP)</span>
                    ) : (
                      <span className="text-emerald-400">CONTROLLING</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[#F0F0F8]">LIC-101</td>
                  <td className="p-2 text-[#94A3B8]">Overhead Reflux Drum V-102 Level</td>
                  <td className="p-2 text-emerald-400 font-bold">{telemetry.refluxLevel} %</td>
                  <td className="p-2 text-[#64748B]">50.0 %</td>
                  <td className="p-2 text-emerald-400">NORMAL ENVELOPE</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[#F0F0F8]">PIC-101</td>
                  <td className="p-2 text-[#94A3B8]">Atmospheric Column Top Pressure</td>
                  <td className="p-2 text-[#F0F0F8] font-bold">{telemetry.columnPressure} bar</td>
                  <td className="p-2 text-[#64748B]">1.45 bar</td>
                  <td className="p-2 text-emerald-400">NORMAL</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-[#F0F0F8]">TI-204</td>
                  <td className="p-2 text-[#94A3B8]">Fired Heater F-101 Coil Outlet Temp (COT)</td>
                  <td className="p-2 text-amber-400 font-bold">{telemetry.furnaceOutletTemp} °C</td>
                  <td className="p-2 text-[#64748B]">362.0 °C</td>
                  <td className="p-2 text-emerald-400">NORMAL FIRING</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: ALARMS LIST */}
        {activeTab === 'ALARMS' && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#182838]">
              <span className="text-[#C8A048] font-bold">ACTIVE PROCESS ALARM LOG</span>
              <button
                onClick={acknowledgeAlarm}
                className="px-3 py-1 bg-[#182838] hover:bg-[#C8A048] hover:text-[#03050C] text-[#F0F0F8] text-[10px] font-bold transition-all cursor-pointer"
              >
                [ACKNOWLEDGE ALL ALARMS]
              </button>
            </div>
            {telemetry.alarmActive ? (
              <div
                className={`p-3 border flex items-center justify-between transition-colors ${
                  telemetry.alarmAcked
                    ? 'bg-amber-950/20 border-amber-500/50 text-amber-300'
                    : 'bg-red-950/40 border-red-500 text-red-300 animate-alarm-flash'
                }`}
              >
                <div>
                  <div className="font-bold flex items-center space-x-2">
                    <span>⚠️ TAH-101: T-22 OVERHEAD TEMPERATURE HIGH</span>
                    <span className="text-[10px] px-1 bg-red-600 text-white font-mono">PRIORITY 1</span>
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-1">
                    Process Variable: <strong className="text-white">{telemetry.overheadTemp} °C</strong> (Alarm Setpoint: 120.0 °C). Cause: Reflux Pump P-1007A Tripped.
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#64748B]">TIME: +00:{telemetry.elapsedSeconds}s</div>
                  <span className="text-[10px] font-bold underline">
                    {telemetry.alarmAcked ? 'ACKNOWLEDGED' : 'UNACKNOWLEDGED'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-[#64748B] font-mono">
                [NO ACTIVE PROCESS ALARMS — UNIT WITHIN NORMAL OPERATING ENVELOPE]
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PUMPS STATUS */}
        {activeTab === 'PUMPS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`p-3 border ${telemetry.refluxPumpA_Running ? 'border-[#182838] bg-[#0A1428]' : 'border-red-500 bg-red-950/20'}`}>
              <div className="flex justify-between items-center pb-2 border-b border-[#182838]">
                <span className="font-bold text-[#F0F0F8]">P-1007A // MAIN REFLUX PUMP</span>
                <span className={`text-[10px] px-1.5 py-0.5 font-bold ${telemetry.refluxPumpA_Running ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {telemetry.refluxPumpA_Running ? 'RUNNING' : 'TRIPPED (OVERLOAD)'}
                </span>
              </div>
              <div className="mt-2 space-y-1 text-[11px] text-[#94A3B8]">
                <div>Motor Rating: 75 kW / 3.3 kV · Flow: {telemetry.refluxPumpA_Running ? '84.5 m³/h' : '0.0 m³/h'}</div>
                <div>Suction Press: 2.1 bar · Discharge Press: {telemetry.refluxPumpA_Running ? '9.4 bar' : '2.1 bar'}</div>
              </div>
            </div>

            <div className={`p-3 border ${telemetry.refluxPumpB_Running ? 'border-emerald-500 bg-emerald-950/20' : 'border-[#182838] bg-[#0A1428]'}`}>
              <div className="flex justify-between items-center pb-2 border-b border-[#182838]">
                <span className="font-bold text-[#F0F0F8]">P-1007B // STANDBY REFLUX PUMP</span>
                <span className={`text-[10px] px-1.5 py-0.5 font-bold ${telemetry.refluxPumpB_Running ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#64748B]/20 text-[#64748B]'}`}>
                  {telemetry.refluxPumpB_Running ? 'RUNNING (ONLINE)' : 'STANDBY READY'}
                </span>
              </div>
              <div className="mt-2 space-y-1 text-[11px] text-[#94A3B8]">
                <div>Motor Rating: 75 kW / 3.3 kV · Lined up to V-102 Reflux Drum</div>
                <div className="pt-2">
                  <button
                    onClick={startStandbyPump}
                    disabled={telemetry.refluxPumpB_Running}
                    className={`w-full py-1 text-center font-bold text-[11px] transition-all ${
                      telemetry.refluxPumpB_Running
                        ? 'bg-[#182838] text-[#64748B] cursor-not-allowed'
                        : 'bg-[#C8A048] text-[#03050C] hover:bg-[#d4af55] cursor-pointer'
                    }`}
                  >
                    {telemetry.refluxPumpB_Running ? '✓ PUMP ONLINE' : '▶ START STANDBY PUMP P-1007B'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TRENDS PREVIEW */}
        {activeTab === 'TRENDS' && (
          <div className="space-y-2">
            <div className="text-[11px] text-[#C8A048] font-bold">
              LIVE PROCESS STRIP TREND: TI-101 (OVERHEAD TEMP) & FIC-102 (REFLUX FLOW)
            </div>
            <div className="h-44 bg-[#03050C] border border-[#182838] relative p-2 flex flex-col justify-between">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-cad-subgrid opacity-30" />
              <svg className="w-full h-full relative z-10" viewBox="0 0 500 120" preserveAspectRatio="none">
                {/* 120 C Alarm Threshold Line */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#EF4444" strokeDasharray="3 3" strokeWidth="1" />
                <text x="5" y="36" fill="#EF4444" fontSize="8">HIGH ALARM LIMIT 120.0 °C</text>

                {/* Overhead Temp Line */}
                <path
                  d={
                    simState === 'FAULT_INJECTED'
                      ? 'M 0 65 L 120 65 L 200 65 L 280 45 L 360 25 L 440 20 L 500 18'
                      : simState === 'RECOVERING'
                      ? 'M 0 65 L 100 65 L 180 20 L 260 22 L 360 40 L 440 60 L 500 64'
                      : 'M 0 65 L 100 64 L 200 66 L 300 65 L 400 64 L 500 65'
                  }
                  fill="none"
                  stroke="#F0F0F8"
                  strokeWidth="2"
                />

                {/* Reflux Flow Line (Cyan) */}
                <path
                  d={
                    simState === 'FAULT_INJECTED'
                      ? 'M 0 85 L 120 85 L 200 85 L 220 115 L 500 115'
                      : simState === 'RECOVERING'
                      ? 'M 0 85 L 100 85 L 150 115 L 280 115 L 340 88 L 500 85'
                      : 'M 0 85 L 100 84 L 200 86 L 300 85 L 400 84 L 500 85'
                  }
                  fill="none"
                  stroke="#206080"
                  strokeWidth="2"
                />
              </svg>
              <div className="flex justify-between text-[9px] text-[#64748B] z-10 pt-1">
                <span className="text-[#F0F0F8]">■ TI-101 (PV: {telemetry.overheadTemp} °C)</span>
                <span className="text-[#206080]">■ FIC-102 (PV: {telemetry.refluxFlow} m³/h)</span>
                <span>RANGE: -5m TO NOW</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SCORECARD PREVIEW */}
        {activeTab === 'SCORE' && (
          <div className="p-3 bg-[#0A1428] border border-[#182838] space-y-2">
            <div className="flex justify-between items-center border-b border-[#182838] pb-2">
              <span className="font-bold text-[#C8A048]">REAL-TIME AUDIT SCORE: {activeScenario.tag}</span>
              <span className="text-xl font-bold font-mono text-[#F0F0F8]">
                {simState === 'FAULT_INJECTED' ? '82.5%' : simState === 'CERTIFIED' ? '100.0% (GRADE A)' : '100.0%'}
              </span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between py-1 border-b border-[#182838]/50">
                <span className="text-[#94A3B8]">Alarm Response Time:</span>
                <span className={telemetry.alarmAcked ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  {telemetry.alarmAcked ? '14s (PASSED < 30s)' : 'WAITING ACKNOWLEDGMENT'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#182838]/50">
                <span className="text-[#94A3B8]">Standby Pump P-1007B Startup:</span>
                <span className={telemetry.refluxPumpB_Running ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  {telemetry.refluxPumpB_Running ? '42s (PASSED < 120s)' : 'PENDING ACTION'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#94A3B8]">Column Safety Envelope:</span>
                <span className="text-emerald-400 font-bold">PRESERVED (NO RELIEF TRIP)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Interactive DCS Faceplate Popup Drawer (When Tag is Clicked) */}
      {/* We handle faceplates globally or locally */}
    </div>
  );
};
