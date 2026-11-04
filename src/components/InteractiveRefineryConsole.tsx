import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';
import { SCENARIOS } from '../data/scenarios';
import {
  Activity,
  Layers,
  AlertTriangle,
  Award,
  RotateCcw,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Eye,
  Play,
  FileCheck,
  Flame,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

type ConsoleViewMode = 'SIMULATOR' | 'REAL_SCREENS' | 'EMERGENCY_DRILL' | 'CERTIFICATE';

export const InteractiveRefineryConsole: React.FC = () => {
  const {
    telemetry,
    simState,
    injectFault,
    startStandbyPump,
    acknowledgeAlarm,
    adjustValve,
    resetSimulation,
    language,
  } = useSimulationJourney();

  const [viewMode, setViewMode] = useState<ConsoleViewMode>('SIMULATOR');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [selectedRealScreen, setSelectedRealScreen] = useState<'CDU' | 'BUILDER' | 'TRENDS'>('CDU');

  const isRTL = language === 'AR';

  const handleTabChange = (mode: ConsoleViewMode) => {
    setViewMode(mode);
    dcsAudio.playClick();
  };

  const handleInjectFault = () => {
    dcsAudio.playAlarm();
    injectFault('S1');
  };

  const handleAckAlarm = () => {
    dcsAudio.playSuccess();
    acknowledgeAlarm();
  };

  const handleStartPump = () => {
    dcsAudio.playSuccess();
    startStandbyPump();
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl bg-[#060918]/95 backdrop-blur-2xl border border-purple-500/30 shadow-stage-glow overflow-hidden text-left relative z-20">
      {/* 1. Control Room Hardware Bezel Header */}
      <div className="bg-[#0A0E24] border-b border-purple-500/20 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Unit Identity & Hardware Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                simState === 'FAULT_INJECTED' ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span className="font-mono text-xs font-bold text-white tracking-wide">
              NEXIIVA REFINERY CONSOLE // #STN-01
            </span>
          </div>

          <span className="text-slate-600 hidden sm:inline">|</span>

          <span className="text-[11px] font-mono text-purple-300 hidden md:inline">
            UNIT: CDU/VDU (ATM T-22 / VAC T-60)
          </span>

          <span className="text-slate-600 hidden lg:inline">|</span>

          <span className="text-[10px] font-mono text-slate-400 hidden lg:inline">
            LATENCY: 8ms · SOLVER: RIGOROUS MASS & ENERGY
          </span>
        </div>

        {/* Right: Quick Action Indicators */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          {simState === 'FAULT_INJECTED' ? (
            <div className="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/60 text-rose-300 font-bold animate-pulse flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>TAH-101 ACTIVE ({telemetry.overheadTemp} °C)</span>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>STEADY STATE</span>
            </div>
          )}

          <button
            onClick={() => {
              dcsAudio.playClick();
              resetSimulation();
            }}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 2. Bespoke Console Mode Selector */}
      <div className="bg-[#04060E] border-b border-purple-500/15 px-4 sm:px-6 py-2.5 flex items-center overflow-x-auto space-x-2 sm:space-x-3 text-xs font-mono scrollbar-none">
        <button
          onClick={() => handleTabChange('SIMULATOR')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            viewMode === 'SIMULATOR'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-brand-glow'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isRTL ? 'المحاكي التفاعلي الحي (PFD)' : 'Interactive PFD Simulator'}</span>
        </button>

        <button
          onClick={() => handleTabChange('REAL_SCREENS')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            viewMode === 'REAL_SCREENS'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-brand-glow'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-purple-300" />
          <span>{isRTL ? 'شاشات المنظومة الحقيقية (المعتمدة)' : 'Real Running Software Screens'}</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-500/30 text-purple-200">
            PROVEN
          </span>
        </button>

        <button
          onClick={() => handleTabChange('EMERGENCY_DRILL')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            viewMode === 'EMERGENCY_DRILL'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-brand-glow'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>{isRTL ? 'طوارئ وأعطال حقيقية (Scenarios)' : 'Emergency Fault Drills (3 Scenarios)'}</span>
        </button>

        <button
          onClick={() => handleTabChange('CERTIFICATE')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            viewMode === 'CERTIFICATE'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-brand-glow'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isRTL ? 'شهادة التقييم والاعتماد' : 'Accredited Certificate'}</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/30 text-emerald-200">
            Grade A
          </span>
        </button>
      </div>

      {/* 3. Main Console Display Body */}
      <div className="p-6 sm:p-8">
        {/* VIEW 1: INTERACTIVE DYNAMIC PFD SIMULATOR */}
        {viewMode === 'SIMULATOR' && (
          <div className="space-y-6">
            {/* Top Interactive DCS Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0A0E24]/70 border border-purple-500/20 font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="text-slate-400">
                  {isRTL ? 'حالة التجربة الميدانية:' : 'Live Trainee Scenario:'}
                </span>
                <span className="text-purple-300 font-bold">
                  {simState === 'NORMAL' &&
                    (isRTL ? 'الوحدة في حالة استقرار مثالي' : 'Unit in Baseline Equilibrium')}
                  {simState === 'FAULT_INJECTED' &&
                    (isRTL ? 'عطل مفاجئ بمضخة الراجع P-1007A' : 'Reflux Pump P-1007A Tripped')}
                  {simState === 'RECOVERING' &&
                    (isRTL
                      ? 'جاري استعادة الاستقرار بمضخة الاحتياط 7B'
                      : 'Standby Pump 7B Restoring Column')}
                  {simState === 'CERTIFIED' &&
                    (isRTL ? 'تم اجتياز الاختبار بنجاح (100.0%)' : 'Safety Envelope Preserved (100.0%)')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {simState === 'NORMAL' ? (
                  <button
                    onClick={handleInjectFault}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer flex items-center space-x-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'حقن عطل طارئ: توقف الراجع' : 'Inject Upset: Reflux Loss'}</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    {!telemetry.alarmAcked && (
                      <button
                        onClick={handleAckAlarm}
                        className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold animate-pulse transition-all cursor-pointer"
                      >
                        [ACK ALARM (14s)]
                      </button>
                    )}
                    {!telemetry.refluxPumpB_Running && (
                      <button
                        onClick={handleStartPump}
                        className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer flex items-center space-x-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{isRTL ? 'تشغيل الاحتياط P-1007B' : 'Start Standby P-1007B'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 3 Large Real-Time Telemetry Dials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#04060E]/80 border border-purple-500/20 font-mono">
                <div className="text-[11px] text-slate-400">COLUMN TOP TEMP (TI-101)</div>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
                    telemetry.overheadTemp > 120
                      ? 'text-rose-400 animate-pulse'
                      : 'text-emerald-400'
                  }`}
                >
                  {telemetry.overheadTemp} °C
                </div>
                <div className="text-xs text-slate-500 mt-1">Setpoint: 114.5 °C (Alarm: 120 °C)</div>
              </div>

              <div className="p-4 rounded-xl bg-[#04060E]/80 border border-purple-500/20 font-mono">
                <div className="text-[11px] text-slate-400">REFLUX FLOW (FIC-102)</div>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
                    telemetry.refluxFlow < 20 ? 'text-rose-400' : 'text-blue-400'
                  }`}
                >
                  {telemetry.refluxFlow} m³/h
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  P-1007A: {telemetry.refluxPumpA_Running ? 'RUNNING' : 'TRIPPED'} · B:{' '}
                  {telemetry.refluxPumpB_Running ? 'ONLINE' : 'STANDBY'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#04060E]/80 border border-purple-500/20 font-mono">
                <div className="text-[11px] text-slate-400">SAFETY INTEGRITY LEVEL</div>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
                    simState === 'FAULT_INJECTED'
                      ? 'text-rose-400'
                      : simState === 'CERTIFIED'
                      ? 'text-emerald-400'
                      : 'text-purple-300'
                  }`}
                >
                  {simState === 'FAULT_INJECTED'
                    ? 'ALARM TAH-101'
                    : simState === 'CERTIFIED'
                    ? 'GRADE A (100%)'
                    : 'SIL-3 NORMAL'}
                </div>
                <div className="text-xs text-slate-500 mt-1">Response Clock: 14.2s (Threshold 30s)</div>
              </div>
            </div>

            {/* Interactive Animated SVG Process Flow Diagram */}
            <div className="relative rounded-2xl bg-[#04060E] border border-purple-500/30 p-4 sm:p-6 shadow-inner overflow-hidden">
              <svg className="w-full h-auto select-none max-h-[360px]" viewBox="0 0 900 360" fill="none">
                {/* Flow lines */}
                {/* Feed to Column */}
                <path d="M 60 180 L 260 180" stroke="#38BDF8" strokeWidth="3" />
                <text x="120" y="170" fill="#38BDF8" fontSize="11" fontFamily="monospace">
                  CRUDE CHARGE 52,400 BPD
                </text>

                {/* Overhead Vapor to Condenser */}
                <path d="M 310 90 L 310 50 L 520 50 L 520 90" stroke="#A855F7" strokeWidth="3" />
                <text x="380" y="42" fill="#A855F7" fontSize="11" fontFamily="monospace">
                  OVERHEAD VAPOR (TI-101: {telemetry.overheadTemp}°C)
                </text>

                {/* Condenser to Reflux Drum */}
                <path d="M 520 120 L 520 160" stroke="#38BDF8" strokeWidth="2.5" />

                {/* Reflux Drum to Pumps */}
                <path d="M 520 200 L 520 240 L 580 240" stroke="#38BDF8" strokeWidth="2.5" />

                {/* Pump Return to Column */}
                <path
                  d="M 640 240 L 720 240 L 720 120 L 340 120"
                  stroke={telemetry.refluxFlow > 0 ? '#38BDF8' : '#F43F5E'}
                  strokeWidth="3"
                  strokeDasharray={telemetry.refluxFlow > 0 ? '6 3' : 'none'}
                />
                <text x="680" y="110" fill="#38BDF8" fontSize="11" fontFamily="monospace">
                  REFLUX RETURN: {telemetry.refluxFlow} m³/h
                </text>

                {/* Bottoms to Reboiler */}
                <path d="M 310 270 L 310 310 L 220 310 L 220 250" stroke="#F59E0B" strokeWidth="2.5" />
                <path d="M 220 220 L 220 200 L 280 200" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />

                {/* Equipment 1: Distillation Tower C-101 */}
                <rect
                  x="260"
                  y="80"
                  width="100"
                  height="190"
                  rx="20"
                  fill="#0B132B"
                  stroke="#8E42FE"
                  strokeWidth="2.5"
                />
                {[110, 130, 150, 170, 190, 210, 230, 250].map((y, idx) => (
                  <line
                    key={idx}
                    x1="270"
                    y1={y}
                    x2="350"
                    y2={y}
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                ))}
                <text
                  x="310"
                  y="160"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  COLUMN T-22
                </text>
                <text
                  x="310"
                  y="180"
                  textAnchor="middle"
                  fill="#38BDF8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  48 SIEVE TRAYS
                </text>

                {/* Equipment 2: Condenser E-101 */}
                <circle cx="520" cy="105" r="25" fill="#0B132B" stroke="#3361FC" strokeWidth="2" />
                <text
                  x="520"
                  y="109"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  E-101
                </text>

                {/* Equipment 3: Reflux Drum V-102 */}
                <rect
                  x="480"
                  y="160"
                  width="80"
                  height="40"
                  rx="10"
                  fill="#0B132B"
                  stroke="#3361FC"
                  strokeWidth="2"
                />
                <text
                  x="520"
                  y="184"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  V-102
                </text>

                {/* Equipment 4: Pump P-1007A (Primary) */}
                <g
                  onClick={() => {
                    dcsAudio.playClick();
                    if (telemetry.refluxPumpA_Running) handleInjectFault();
                  }}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="610"
                    cy="225"
                    r="18"
                    fill={telemetry.refluxPumpA_Running ? '#065F46' : '#7F1D1D'}
                    stroke={telemetry.refluxPumpA_Running ? '#10B981' : '#F43F5E'}
                    strokeWidth="2"
                  />
                  <text
                    x="610"
                    y="229"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    7A
                  </text>
                  <text
                    x="610"
                    y="255"
                    textAnchor="middle"
                    fill={telemetry.refluxPumpA_Running ? '#10B981' : '#F43F5E'}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {telemetry.refluxPumpA_Running ? 'RUN' : 'TRIP'}
                  </text>
                </g>

                {/* Equipment 5: Pump P-1007B (Standby) */}
                <g
                  onClick={() => {
                    dcsAudio.playClick();
                    if (!telemetry.refluxPumpB_Running) handleStartPump();
                  }}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="610"
                    cy="285"
                    r="18"
                    fill={telemetry.refluxPumpB_Running ? '#065F46' : '#1E293B'}
                    stroke={telemetry.refluxPumpB_Running ? '#10B981' : '#64748B'}
                    strokeWidth="2"
                  />
                  <text
                    x="610"
                    y="289"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    7B
                  </text>
                  <text
                    x="610"
                    y="315"
                    textAnchor="middle"
                    fill={telemetry.refluxPumpB_Running ? '#10B981' : '#94A3B8'}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {telemetry.refluxPumpB_Running ? 'ONLINE' : 'STANDBY'}
                  </text>
                </g>

                {/* Equipment 6: Reboiler F-101 */}
                <rect
                  x="180"
                  y="220"
                  width="70"
                  height="70"
                  rx="6"
                  fill="#0B132B"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <text
                  x="215"
                  y="255"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  F-101
                </text>
                <text
                  x="215"
                  y="270"
                  textAnchor="middle"
                  fill="#F59E0B"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  REBOILER
                </text>
              </svg>
            </div>

            {/* Bottom Faceplate Controller: Reflux Control Valve LV-102 */}
            <div className="p-4 rounded-xl bg-[#0A0E24]/70 border border-purple-500/20 font-mono space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-bold flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  <span>DCS FACEPLATE: REFLUX CONTROL VALVE (LV-102)</span>
                </span>
                <span className="text-purple-300 font-bold">
                  {telemetry.refluxControlValvePct}% OPEN
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={telemetry.refluxControlValvePct}
                onChange={(e) => adjustValve(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (Closed - Reflux Starvation)</span>
                <span>Current Flow: {telemetry.refluxFlow} m³/h</span>
                <span>100% (Maximum Overhead Cooling)</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: REAL RUNNING SOFTWARE SCREENS */}
        {viewMode === 'REAL_SCREENS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
                  AUTHENTIC PRODUCTION SCREENS // ZERO MOCKUPS
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  Real Running CDU/VDU Simulator & OTS Builder
                </h4>
              </div>

              {/* Sub-screen tabs */}
              <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-xl text-xs font-mono">
                <button
                  onClick={() => setSelectedRealScreen('CDU')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedRealScreen === 'CDU'
                      ? 'bg-purple-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CDU/VDU Console (Slide 3)
                </button>
                <button
                  onClick={() => setSelectedRealScreen('BUILDER')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedRealScreen === 'BUILDER'
                      ? 'bg-purple-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  OTS Builder (Slide 4)
                </button>
                <button
                  onClick={() => setSelectedRealScreen('TRENDS')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedRealScreen === 'TRENDS'
                      ? 'bg-purple-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  12 Trends & Alarms
                </button>
              </div>
            </div>

            {/* Display High-Res Screenshot with Hotspots */}
            <div className="relative rounded-xl border-2 border-purple-500/30 overflow-hidden bg-black shadow-2xl group">
              {selectedRealScreen === 'CDU' && (
                <div className="relative">
                  <img
                    src="/assets/image1.png"
                    alt="NEXIIVA CDU/VDU Running Simulator Screen"
                    className="w-full h-auto object-contain max-h-[500px]"
                  />
                  {/* Hotspots */}
                  <div
                    onClick={() =>
                      setSelectedHotspot(
                        'Atmospheric Tower T-22: 48-tray crude fractionator with side strippers for kerosene and diesel'
                      )
                    }
                    className="absolute top-[28%] left-[42%] w-6 h-6 rounded-full bg-purple-500/80 border-2 border-white animate-ping cursor-pointer"
                    title="Click to inspect T-22 Column"
                  />
                  <div
                    onClick={() =>
                      setSelectedHotspot(
                        'Reflux Pumps P-1007A/B: Motor overload trip logic and standby automatic interlock'
                      )
                    }
                    className="absolute top-[38%] left-[64%] w-6 h-6 rounded-full bg-blue-500/80 border-2 border-white animate-ping cursor-pointer"
                    title="Click to inspect Reflux Pumps"
                  />
                  <div
                    onClick={() =>
                      setSelectedHotspot(
                        'Fired Heater F-101: Cabin preheater furnace with 4 pass flows and COT telemetry'
                      )
                    }
                    className="absolute top-[48%] left-[22%] w-6 h-6 rounded-full bg-amber-500/80 border-2 border-white animate-ping cursor-pointer"
                    title="Click to inspect Furnace F-101"
                  />
                </div>
              )}

              {selectedRealScreen === 'BUILDER' && (
                <div className="relative">
                  <img
                    src="/assets/image2.png"
                    alt="NEXIIVA OTS Builder Running Screen"
                    className="w-full h-auto object-contain max-h-[500px]"
                  />
                  <div
                    onClick={() =>
                      setSelectedHotspot(
                        'OTS Builder Flowsheet Canvas: 387 equipment types compiled dynamically in Arabic or English'
                      )
                    }
                    className="absolute top-[35%] left-[50%] w-6 h-6 rounded-full bg-purple-500/80 border-2 border-white animate-ping cursor-pointer"
                    title="Click to inspect OTS Builder Flowsheet"
                  />
                </div>
              )}

              {selectedRealScreen === 'TRENDS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#04060E]">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-purple-300 font-bold">
                      12 LIVE TREND CHARTS (REAL RUNNING SCREEN):
                    </div>
                    <img
                      src="/assets/page_3__Image24_Image24.jpg"
                      alt="12 Live Process Trend Charts"
                      className="w-full rounded-lg border border-purple-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-emerald-300 font-bold">
                      OFFICIAL ACCREDITED CERTIFICATE (REAL GENERATED):
                    </div>
                    <img
                      src="/assets/page_3__Image25_Image25.jpg"
                      alt="Certificate Generated Automatically"
                      className="w-full rounded-lg border border-emerald-500/20"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Hotspot Tooltip */}
            {selectedHotspot && (
              <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/50 font-mono text-xs text-purple-200 flex items-center justify-between">
                <span>
                  <strong>ENGINEERING INSPECTION:</strong> {selectedHotspot}
                </span>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-slate-400 hover:text-white px-2 py-0.5"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="p-4 rounded-xl bg-[#04060E]/60 border border-purple-500/20 font-mono text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>
                Source: <strong className="text-white">Nexiiva Official Pitch Deck (Slide 3 & 4)</strong>
              </span>
              <span className="text-purple-300 font-semibold">STATUS: RUNNING IN EGYPT TODAY</span>
            </div>
          </div>
        )}

        {/* VIEW 3: EMERGENCY DRILL SCENARIOS */}
        {viewMode === 'EMERGENCY_DRILL' && (
          <div className="space-y-6">
            <div className="border-b border-purple-500/20 pb-4">
              <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
                TRAINING SCENARIO PACKS
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">
                Authentic Refinery Operational Upsets
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SCENARIOS.map((sc) => (
                <div
                  key={sc.id}
                  className="p-6 rounded-2xl bg-[#04060E]/70 border border-purple-500/20 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-rose-400">{sc.id}</span>
                      <span className="text-slate-500">{sc.unit}</span>
                    </div>
                    <div className="text-sm font-bold text-white">{sc.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{sc.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-purple-500/10">
                    <div className="text-[11px] font-mono text-purple-300 font-semibold">
                      Trainee Objectives:
                    </div>
                    {sc.expectedActions.map((act, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] text-slate-400 flex items-start space-x-1.5"
                      >
                        <span className="text-purple-400">•</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setViewMode('SIMULATOR');
                      injectFault(sc.id);
                      dcsAudio.playAlarm();
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-rose-950/40 border border-purple-500/30 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Run Drill on Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: ACCREDITED CERTIFICATE */}
        {viewMode === 'CERTIFICATE' && (
          <div className="space-y-6">
            <div className="border-b border-purple-500/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
                  COMPETENCY AUDIT RECORD
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  Automated Trainee Verification & Certificate
                </h4>
              </div>

              <div className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SAFETY ENVELOPE PRESERVED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Authentic Generated Certificate Scan from Pitch Deck */}
              <div className="rounded-2xl border-2 border-emerald-500/40 overflow-hidden shadow-2xl bg-black">
                <img
                  src="/assets/page_3__Image25_Image25.jpg"
                  alt="Real Certificate from Nexiiva Pitch Deck"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Right: Digital Trainee Dossier */}
              <div className="space-y-4 font-mono text-xs text-slate-300 p-6 rounded-2xl bg-[#04060E]/80 border border-purple-500/20">
                <div className="flex justify-between border-b border-purple-500/10 pb-2">
                  <span className="text-slate-500">TRAINEE OPERATOR:</span>
                  <span className="text-white font-bold">ENG. REFINERY DRILL PARTICIPANT</span>
                </div>
                <div className="flex justify-between border-b border-purple-500/10 pb-2">
                  <span className="text-slate-500">SIMULATION DRILL:</span>
                  <span className="text-purple-300">CDU-100 REFLUX PUMP TRIP (S1)</span>
                </div>
                <div className="flex justify-between border-b border-purple-500/10 pb-2">
                  <span className="text-slate-500">REACTION TIME:</span>
                  <span className="text-emerald-400 font-bold">14.2 SECONDS (PASS &lt; 30s)</span>
                </div>
                <div className="flex justify-between border-b border-purple-500/10 pb-2">
                  <span className="text-slate-500">OFF-SPEC FLARING:</span>
                  <span className="text-emerald-400 font-bold">0.00 BBLS (PREVENTED)</span>
                </div>
                <div className="flex justify-between border-b border-purple-500/10 pb-2">
                  <span className="text-slate-500">ESTIMATED LOSS AVOIDED:</span>
                  <span className="text-emerald-400 font-bold">$2,400,000 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FINAL GRADE:</span>
                  <span className="text-emerald-400 font-black text-sm">GRADE A (100.0%)</span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      dcsAudio.playSuccess();
                      window.print();
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Print Accredited Operator Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
