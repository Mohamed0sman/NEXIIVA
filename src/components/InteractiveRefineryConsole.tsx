import React, { useState, useEffect, useRef } from 'react';
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
  Zap,
  Timer,
  TrendingUp,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';

type ConsoleViewMode = 'SIMULATOR' | 'REAL_SCREENS' | 'EMERGENCY_DRILL' | 'CERTIFICATE';

interface TrendPoint {
  time: number;
  temp: number;
  flow: number;
  pressure: number;
  stability: number;
}

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

  // Gamification state
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(35.0);
  const [plantHealth, setPlantHealth] = useState(100);
  const [drillScore, setDrillScore] = useState(10000);
  const [traineeName, setTraineeName] = useState('Eng. Lead DCS Specialist');
  const [actionStep1Done, setActionStep1Done] = useState(false); // ACK Alarm
  const [actionStep2Done, setActionStep2Done] = useState(false); // Open valve > 70%
  const [actionStep3Done, setActionStep3Done] = useState(false); // Start standby pump
  const [gameResult, setGameResult] = useState<'IDLE' | 'WON' | 'LOST'>('IDLE');

  // Live Multi-Pen Trend History (Oscilloscope buffer)
  const [trendHistory, setTrendHistory] = useState<TrendPoint[]>(() => {
    const pts: TrendPoint[] = [];
    for (let i = 0; i < 30; i++) {
      pts.push({
        time: i,
        temp: 114.2,
        flow: 84.5,
        pressure: 1.38,
        stability: 100,
      });
    }
    return pts;
  });

  const isRTL = language === 'AR';

  // Game countdown timer & health degradation loop
  useEffect(() => {
    let timer: any = null;
    if (gameActive && gameResult === 'IDLE') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.2) {
            // Player lost: column overpressurized
            setGameResult('LOST');
            setGameActive(false);
            dcsAudio.stopAlarmLoop();
            dcsAudio.playFlareHiss();
            return 0;
          }
          return parseFloat((prev - 0.2).toFixed(1));
        });

        // Health drops while upset is active
        if (!actionStep3Done) {
          setPlantHealth((prev) => Math.max(15, prev - 0.6));
          setDrillScore((prev) => Math.max(2000, prev - 25));
        } else {
          // Recovering health
          setPlantHealth((prev) => Math.min(100, prev + 1.2));
        }
      }, 200);
    }
    return () => clearInterval(timer);
  }, [gameActive, gameResult, actionStep3Done]);

  // Rolling trend chart update loop
  useEffect(() => {
    const chartInterval = setInterval(() => {
      setTrendHistory((prev) => {
        const nextTime = (prev[prev.length - 1]?.time || 0) + 1;
        const newPoint: TrendPoint = {
          time: nextTime,
          temp: telemetry.overheadTemp,
          flow: telemetry.refluxFlow,
          pressure: telemetry.columnPressure,
          stability: plantHealth,
        };
        return [...prev.slice(1), newPoint];
      });
    }, 400);
    return () => clearInterval(chartInterval);
  }, [telemetry, plantHealth]);

  // Start the Emergency Drill Game
  const handleStartGameDrill = () => {
    setGameActive(true);
    setGameResult('IDLE');
    setTimeLeft(35.0);
    setPlantHealth(92);
    setDrillScore(10000);
    setActionStep1Done(false);
    setActionStep2Done(false);
    setActionStep3Done(false);

    injectFault('S1');
    dcsAudio.startAlarmLoop();
  };

  // Step 1: Acknowledge alarm
  const handleStep1Ack = () => {
    if (!actionStep1Done) {
      setActionStep1Done(true);
      acknowledgeAlarm();
      dcsAudio.stopAlarmLoop();
      dcsAudio.playSuccess();
    }
  };

  // Step 2: Valve adjustment check
  const handleValveChange = (val: number) => {
    adjustValve(val);
    dcsAudio.playClick();
    if (val >= 70 && !actionStep2Done) {
      setActionStep2Done(true);
      dcsAudio.playSuccess();
    }
  };

  // Step 3: Start Standby Pump
  const handleStep3StartPump = () => {
    if (!actionStep3Done) {
      setActionStep3Done(true);
      startStandbyPump();
      dcsAudio.playRelaySwitch();

      // Check win condition
      setTimeout(() => {
        setGameResult('WON');
        setGameActive(false);
        setPlantHealth(100);
        dcsAudio.stopAlarmLoop();
        dcsAudio.playVictory();
      }, 1200);
    }
  };

  const handleResetGame = () => {
    setGameActive(false);
    setGameResult('IDLE');
    setTimeLeft(35.0);
    setPlantHealth(100);
    setDrillScore(10000);
    setActionStep1Done(false);
    setActionStep2Done(false);
    setActionStep3Done(false);
    resetSimulation();
    dcsAudio.stopAlarmLoop();
    dcsAudio.playClick();
  };

  const potentialLoss = Math.round((1 - plantHealth / 100) * 2400000);

  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl bg-[#070B14] border border-purple-500/20 shadow-2xl overflow-hidden text-left relative z-20">
      {/* 1. Control Room Hardware Bezel Header */}
      <div className="bg-[#0B1120] border-b border-purple-500/10 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)] pointer-events-none" />
        {/* Left: Unit Identity & Hardware Status */}
        <div className="flex items-center space-x-3 relative z-10">
          <div className="flex items-center space-x-2">
            <span
              className={`w-3 h-3 rounded-full ${
                simState === 'FAULT_INJECTED' || gameActive
                  ? 'bg-rose-500 animate-ping'
                  : 'bg-[#10B981]'
              }`}
            />
            <span className="font-mono text-xs font-black text-white tracking-widest uppercase">
              NEXIIVA // DCS MASTER WORKSTATION #01
            </span>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <span className="text-[11px] font-mono text-slate-300 hidden md:inline">
            UNIT: CDU - ATM T23 / VDU - T60 PROCESS FLOW
          </span>

          <span className="text-slate-700 hidden lg:inline">|</span>

          <span className="text-[10px] font-mono text-cyan-400 hidden lg:inline">
            ENGINE: 100% AIR-GAPPED DYNAMIC EOS
          </span>
        </div>

        {/* Right: Fault Triggers & Quick Action Indicators */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono relative z-10">
          <div className="flex items-center space-x-1.5 font-mono text-[10px]">
            <span className="text-slate-400 uppercase text-[9px] mr-0.5 hidden xl:inline">INJECT:</span>
            <button
              onClick={() => {
                injectFault('S1');
                handleStartGameDrill();
              }}
              title="Inject Reflux Pump Failure"
              className="px-2 py-1 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-500/80 text-rose-300 hover:text-white font-bold transition-colors cursor-pointer text-[10px]"
            >
              ⚡ REFLUX LOSS
            </button>
            <button
              onClick={() => {
                injectFault('S3');
                handleStartGameDrill();
              }}
              title="Inject Vacuum Loss"
              className="px-2 py-1 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-500/80 text-rose-300 hover:text-white font-bold transition-colors cursor-pointer text-[10px]"
            >
              ⚡ VACUUM LOSS
            </button>
            <button
              onClick={() => {
                injectFault('S2');
                handleStartGameDrill();
              }}
              title="Inject Furnace Emergency Trip"
              className="px-2 py-1 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-500/80 text-rose-300 hover:text-white font-bold transition-colors cursor-pointer text-[10px]"
            >
              ⚡ H23 EMERGENCY
            </button>
          </div>

          {gameActive && (
            <div className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 font-bold animate-pulse flex items-center space-x-2 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <Timer className="w-3.5 h-3.5 text-rose-400" />
              <span>
                {isRTL ? 'زمن الاستجابة المتبقي:' : 'CRISIS CLOCK:'} {timeLeft}s
              </span>
            </div>
          )}

          <button
            onClick={handleResetGame}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isRTL ? 'إعادة الضبط' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* 2. Bespoke Console Mode Selector */}
      <div className="bg-[#070B14] border-b border-slate-800/80 px-4 sm:px-6 py-2.5 flex items-center overflow-x-auto space-x-2 sm:space-x-3 text-xs font-mono scrollbar-none">
        <button
          onClick={() => {
            setViewMode('SIMULATOR');
            dcsAudio.playClick();
          }}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            viewMode === 'SIMULATOR'
              ? 'bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-bold shadow-[0_4px_16px_rgba(124,58,237,0.3)]'
              : 'bg-[#0B1120] text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isRTL ? 'المحاكي التفاعلي ولعبة الطوارئ' : 'Interactive Simulator & Crisis Game'}</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/30 text-emerald-300 font-bold">
            PLAYABLE
          </span>
        </button>

        <button
          onClick={() => {
            setViewMode('REAL_SCREENS');
            dcsAudio.playClick();
          }}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            viewMode === 'REAL_SCREENS'
              ? 'bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-bold shadow-[0_4px_16px_rgba(124,58,237,0.3)]'
              : 'bg-[#0B1120] text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-slate-300" />
          <span>{isRTL ? 'شاشات المنظومة الحقيقية (المعتمدة)' : 'Real Running Software Screens'}</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-indigo-900/40 text-slate-200">
            PROVEN
          </span>
        </button>

        <button
          onClick={() => {
            setViewMode('EMERGENCY_DRILL');
            dcsAudio.playClick();
          }}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            viewMode === 'EMERGENCY_DRILL'
              ? 'bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-bold shadow-[0_4px_16px_rgba(124,58,237,0.3)]'
              : 'bg-[#0B1120] text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>{isRTL ? 'حزم سيناريوهات الطوارئ' : 'Emergency Scenario Packs'}</span>
        </button>

        <button
          onClick={() => {
            setViewMode('CERTIFICATE');
            dcsAudio.playClick();
          }}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            viewMode === 'CERTIFICATE'
              ? 'bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-bold shadow-[0_4px_16px_rgba(124,58,237,0.3)]'
              : 'bg-[#0B1120] text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800'
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
      <div className="p-4 sm:p-6 lg:p-8">
        {/* VIEW 1: INTERACTIVE DYNAMIC PFD SIMULATOR & EMERGENCY CRISIS DRILL */}
        {viewMode === 'SIMULATOR' && (
          <div className="space-y-6">
            {/* GAME BANNER & CRISIS MISSION STATUS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1120] border border-purple-500/20 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-blue-900/40 text-slate-300">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      {isRTL ? 'تحدي طوارئ المصفاة الميداني' : 'REFINERY CRISIS DRILL CHALLENGE'}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white">
                      {isRTL
                        ? 'توقف مضخة الراجع الأساسية P-1007A وخطر طوفان البرج'
                        : 'Scenario: Overhead Reflux Loss & Column Overpressure'}
                    </div>
                  </div>
                </div>

                {/* Drill Trigger / Action Button */}
                {!gameActive && gameResult === 'IDLE' && (
                  <button
                    onClick={handleStartGameDrill}
                    className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border border-red-500 shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>⚡</span>
                    <span>{isRTL ? 'بدء تحدي الطوارئ (35 ثانية)' : 'START CRISIS DRILL (35s)'}</span>
                  </button>
                )}

                {gameActive && (
                  <div className="flex items-center space-x-3 text-xs font-mono">
                    <span className="text-slate-400">{isRTL ? 'النقاط:' : 'SCORE:'}</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">
                      {drillScore} PTS
                    </span>
                  </div>
                )}

                {gameResult === 'WON' && (
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 font-mono text-xs font-bold animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isRTL ? 'نجحت في إنقاذ المصفاة!' : 'CRISIS RESOLVED · GRADE A+'}</span>
                  </div>
                )}

                {gameResult === 'LOST' && (
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-300 font-mono text-xs font-bold">
                    <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
                    <span>{isRTL ? 'فشل الضغط وتفجر الصمام إلى الشعلة!' : 'COLUMN TRIPPED TO FLARE!'}</span>
                  </div>
                )}
              </div>

              {/* Real-Time Plant Stability Meter & Loss Counter */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center font-mono text-xs">
                {/* Stability Progress Bar (7 Cols) */}
                <div className="sm:col-span-7 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">
                      {isRTL ? 'مؤشر استقرار الوحدة (Plant Stability):' : 'PLANT STABILITY INDEX:'}
                    </span>
                    <span
                      className={`font-black ${
                        plantHealth > 70
                          ? 'text-emerald-400'
                          : plantHealth > 40
                          ? 'text-amber-400'
                          : 'text-rose-400 animate-pulse'
                      }`}
                    >
                      {plantHealth.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        plantHealth > 70
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : plantHealth > 40
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-gradient-to-r from-rose-600 to-red-500 animate-pulse'
                      }`}
                      style={{ width: `${plantHealth}%` }}
                    />
                  </div>
                </div>

                {/* Economic Loss at Risk (5 Cols) */}
                <div className="sm:col-span-5 p-2.5 rounded-xl bg-[#070B14] border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">
                    {isRTL ? 'الخسائر المعرضة للخطر:' : 'FLARING RISK:'}
                  </span>
                  <span
                    className={`font-black text-sm ${
                      potentialLoss > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
                    }`}
                  >
                    ${potentialLoss.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* The 3-Step Interactive Action Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {/* Step 1 */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    actionStep1Done
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                      : gameActive
                      ? 'bg-rose-950/40 border-rose-500/60 text-rose-200 animate-pulse'
                      : 'bg-[#070B14] border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold">STEP 01</span>
                    {actionStep1Done ? (
                      <span className="text-emerald-400 font-bold">✓ ACKNOWLEDGED</span>
                    ) : (
                      <span className="text-rose-400 font-bold">PENDING</span>
                    )}
                  </div>
                  <div className="text-xs font-bold mt-1 text-white">
                    {isRTL ? 'كتم الإنذار وتأكيد إشعار الطوارئ' : 'Silence & Acknowledge Alarm'}
                  </div>
                  {gameActive && !actionStep1Done && (
                    <button
                      onClick={handleStep1Ack}
                      className="mt-2 w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-mono font-bold uppercase transition-all shadow-md cursor-pointer"
                    >
                      [CLICK TO ACK ALARM]
                    </button>
                  )}
                </div>

                {/* Step 2 */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    actionStep2Done
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                      : actionStep1Done
                      ? 'bg-[#0B1120] border-purple-500 text-slate-200 animate-pulse'
                      : 'bg-[#070B14] border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold">STEP 02</span>
                    {actionStep2Done ? (
                      <span className="text-emerald-400 font-bold">✓ VALVE OPEN</span>
                    ) : (
                      <span className="text-slate-500">SET &gt; 70%</span>
                    )}
                  </div>
                  <div className="text-xs font-bold mt-1 text-white">
                    {isRTL ? 'فتح صمام الراجع LV-102 أكبر من 70%' : 'Open Reflux Bypass LV-102 > 70%'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 mt-1">
                    Current: {telemetry.refluxControlValvePct}%
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    actionStep3Done
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                      : actionStep2Done
                      ? 'bg-[#0B1120] border-indigo-500 text-indigo-200 animate-pulse'
                      : 'bg-[#070B14] border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold">STEP 03</span>
                    {actionStep3Done ? (
                      <span className="text-emerald-400 font-bold">✓ PUMP ONLINE</span>
                    ) : (
                      <span className="text-slate-500">START PUMP</span>
                    )}
                  </div>
                  <div className="text-xs font-bold mt-1 text-white">
                    {isRTL ? 'تشغيل مضخة الاحتياط P-1007B' : 'Start Standby Reflux Pump P-1007B'}
                  </div>
                  {gameActive && actionStep2Done && !actionStep3Done && (
                    <button
                      onClick={handleStep3StartPump}
                      className="mt-2 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-mono font-bold uppercase transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>[START PUMP 7B]</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* LIVE MULTI-PEN OSCILLOSCOPE STRIP CHART */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#070B14] border border-slate-800 shadow-inner space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-white font-bold">
                    {isRTL ? 'راسم الإشارات الحي (Multi-Pen DCS Strip Chart)' : 'LIVE MULTI-PEN PROCESS OSCILLOSCOPE'}
                  </span>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center space-x-1.5 text-rose-400">
                    <span className="w-2.5 h-1 bg-rose-500 inline-block rounded" />
                    <span>TI-101 ({telemetry.overheadTemp}°C)</span>
                  </span>
                  <span className="flex items-center space-x-1.5 text-blue-400">
                    <span className="w-2.5 h-1 bg-blue-500 inline-block rounded" />
                    <span>FIC-102 ({telemetry.refluxFlow} m³/h)</span>
                  </span>
                  <span className="flex items-center space-x-1.5 text-cyan-400">
                    <span className="w-2.5 h-1 bg-cyan-400 inline-block rounded" />
                    <span>PIC-104 ({telemetry.columnPressure} bar)</span>
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Waveform Drawing */}
              <div className="h-32 sm:h-40 w-full relative overflow-hidden rounded-xl bg-[#020308] border border-slate-900">
                {/* Horizontal Gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none opacity-20">
                  <div className="border-b border-cyan-500/40 text-[9px] font-mono text-cyan-400">130°C / 2.0 bar</div>
                  <div className="border-b border-cyan-500/40 text-[9px] font-mono text-cyan-400">120°C (ALARM)</div>
                  <div className="border-b border-cyan-500/40 text-[9px] font-mono text-cyan-400">114.5°C (SETPOINT)</div>
                  <div className="text-[9px] font-mono text-cyan-400">100°C / 1.0 bar</div>
                </div>

                {/* SVG Curves */}
                <svg className="w-full h-full select-none" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* Temperature Curve (Red) */}
                  <polyline
                    fill="none"
                    stroke="#F43F5E"
                    strokeWidth="2"
                    points={trendHistory
                      .map((pt, idx) => {
                        const x = (idx / (trendHistory.length - 1)) * 300;
                        // Map temp 110-130 to y 80-10
                        const y = Math.max(5, Math.min(95, 100 - ((pt.temp - 110) / 20) * 80));
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Reflux Flow Curve (Blue) */}
                  <polyline
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.8"
                    strokeDasharray="4 2"
                    points={trendHistory
                      .map((pt, idx) => {
                        const x = (idx / (trendHistory.length - 1)) * 300;
                        // Map flow 0-100 to y 95-20
                        const y = Math.max(5, Math.min(95, 95 - (pt.flow / 100) * 75));
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Stability Fill Underneath */}
                  <polygon
                    fill="url(#stabilityGlow)"
                    points={`0,100 ${trendHistory
                      .map((pt, idx) => {
                        const x = (idx / (trendHistory.length - 1)) * 300;
                        const y = Math.max(10, Math.min(95, 100 - (pt.stability / 100) * 40));
                        return `${x},${y}`;
                      })
                      .join(' ')} 300,100`}
                  />

                  <defs>
                    <linearGradient id="stabilityGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8E42FE" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8E42FE" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* 6-TILE PHYSICAL DCS ALARM ANNUNCIATOR MATRIX */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 font-mono text-center">
              <div
                onClick={handleStep1Ack}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  telemetry.overheadTemp > 120 && !telemetry.alarmAcked
                    ? 'bg-rose-950 border-rose-500 text-rose-200 animate-ping'
                    : telemetry.overheadTemp > 120
                    ? 'bg-rose-950/60 border-rose-500/60 text-rose-300'
                    : 'bg-[#070B14] border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-bold">TAH-101</div>
                <div className="text-[9px] truncate">HIGH TOP TEMP</div>
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  telemetry.refluxFlow < 20
                    ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
                    : 'bg-[#070B14] border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold">FAL-102</div>
                <div className="text-[9px] truncate">REFLUX LOSS</div>
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  telemetry.columnPressure > 1.6
                    ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
                    : 'bg-[#070B14] border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold">PAH-104</div>
                <div className="text-[9px] truncate">OVERPRESSURE</div>
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  !telemetry.refluxPumpA_Running
                    ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                    : 'bg-[#070B14] border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold">P-1007A</div>
                <div className="text-[9px] truncate">
                  {!telemetry.refluxPumpA_Running ? 'MOTOR TRIP' : 'MOTOR RUN'}
                </div>
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  telemetry.columnPressure > 1.8
                    ? 'bg-amber-950 border-amber-500 text-amber-200 animate-bounce'
                    : 'bg-[#070B14] border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold">PSV-102</div>
                <div className="text-[9px] truncate">FLARE RELIEF</div>
              </div>

              <div className="p-2.5 rounded-lg border bg-emerald-950/40 border-emerald-500/40 text-emerald-300">
                <div className="text-[10px] font-bold">SIL-3</div>
                <div className="text-[9px] truncate">SAFETY ARMED</div>
              </div>
            </div>

            {/* INTERACTIVE ANIMATED SVG PROCESS SCHEMATIC */}
            <div className="relative rounded-2xl bg-[#070B14] border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden">
              {/* Flare Stack with Dynamic Fire Graphics if overpressurized */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-[#080B1C]/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                <Flame
                  className={`w-4 h-4 ${
                    telemetry.columnPressure > 1.6
                      ? 'text-rose-500 animate-bounce'
                      : 'text-slate-600'
                  }`}
                />
                <span className="text-slate-400">FLARE STACK:</span>
                <span
                  className={`font-bold ${
                    telemetry.columnPressure > 1.6 ? 'text-rose-400' : 'text-slate-500'
                  }`}
                >
                  {telemetry.columnPressure > 1.6 ? 'BURNING 1,200 kg/h' : 'PILOT ONLY'}
                </span>
              </div>

              <svg className="w-full h-auto select-none max-h-[380px]" viewBox="0 0 900 380" fill="none">
                {/* Flare line */}
                <path d="M 310 90 L 310 30 L 840 30 L 840 70" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="840" cy="80" r="10" fill={telemetry.columnPressure > 1.6 ? '#F43F5E' : '#334155'} />

                {/* Crude Feed Line */}
                <path d="M 40 190 L 260 190" stroke="#38BDF8" strokeWidth="3.5" />
                <text x="70" y="180" fill="#38BDF8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  CRUDE CHARGE 52,400 BPD
                </text>

                {/* Overhead Vapor Line */}
                <path
                  d="M 310 90 L 310 50 L 520 50 L 520 90"
                  stroke={telemetry.overheadTemp > 120 ? '#F43F5E' : '#A855F7'}
                  strokeWidth="3.5"
                  className={telemetry.overheadTemp > 120 ? 'animate-pulse' : ''}
                />
                <text x="350" y="42" fill="#A855F7" fontSize="11" fontFamily="monospace">
                  OVERHEAD VAPORS (TI-101: {telemetry.overheadTemp}°C)
                </text>

                {/* Condenser to Reflux Drum */}
                <path d="M 520 130 L 520 170" stroke="#38BDF8" strokeWidth="3" />

                {/* Reflux Drum to Pumps */}
                <path d="M 520 210 L 520 250 L 580 250" stroke="#38BDF8" strokeWidth="3" />

                {/* Reflux Return Line back to Column */}
                <path
                  d="M 640 250 L 730 250 L 730 130 L 340 130"
                  stroke={telemetry.refluxFlow > 10 ? '#38BDF8' : '#F43F5E'}
                  strokeWidth="3.5"
                  strokeDasharray={telemetry.refluxFlow > 10 ? '6 3' : 'none'}
                />
                <text x="680" y="120" fill="#38BDF8" fontSize="11" fontFamily="monospace">
                  REFLUX RETURN: {telemetry.refluxFlow} m³/h
                </text>

                {/* Bottoms to Reboiler */}
                <path d="M 310 280 L 310 320 L 220 320 L 220 260" stroke="#F59E0B" strokeWidth="3" />
                <path d="M 220 220 L 220 200 L 280 200" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 2" />

                {/* Equipment 1: Distillation Tower C-101 */}
                <rect
                  x="260"
                  y="80"
                  width="100"
                  height="200"
                  rx="20"
                  fill="#0B132B"
                  stroke={telemetry.overheadTemp > 120 ? '#F43F5E' : '#8E42FE'}
                  strokeWidth="3"
                  className="transition-colors"
                />
                {[110, 130, 150, 170, 190, 210, 230, 250, 270].map((y, idx) => (
                  <line
                    key={idx}
                    x1="270"
                    y1={y}
                    x2="350"
                    y2={y}
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                ))}
                <text
                  x="310"
                  y="160"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="13"
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
                <circle cx="520" cy="110" r="26" fill="#0B132B" stroke="#3361FC" strokeWidth="2.5" />
                <text
                  x="520"
                  y="114"
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
                  y="170"
                  width="80"
                  height="40"
                  rx="10"
                  fill="#0B132B"
                  stroke="#3361FC"
                  strokeWidth="2.5"
                />
                <text
                  x="520"
                  y="194"
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
                    if (telemetry.refluxPumpA_Running) {
                      handleStartGameDrill();
                    }
                  }}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="610"
                    cy="235"
                    r="20"
                    fill={telemetry.refluxPumpA_Running ? '#065F46' : '#7F1D1D'}
                    stroke={telemetry.refluxPumpA_Running ? '#10B981' : '#F43F5E'}
                    strokeWidth="2.5"
                  />
                  <text
                    x="610"
                    y="239"
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
                    y="270"
                    textAnchor="middle"
                    fill={telemetry.refluxPumpA_Running ? '#10B981' : '#F43F5E'}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {telemetry.refluxPumpA_Running ? 'RUN' : 'TRIPPED'}
                  </text>
                </g>

                {/* Equipment 5: Pump P-1007B (Standby) */}
                <g
                  onClick={() => {
                    handleStep3StartPump();
                  }}
                  className="cursor-pointer group"
                >
                  <circle
                    cx="610"
                    cy="305"
                    r="20"
                    fill={telemetry.refluxPumpB_Running ? '#065F46' : '#1E293B'}
                    stroke={telemetry.refluxPumpB_Running ? '#10B981' : '#64748B'}
                    strokeWidth="2.5"
                  />
                  <text
                    x="610"
                    y="309"
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
                    y="340"
                    textAnchor="middle"
                    fill={telemetry.refluxPumpB_Running ? '#10B981' : '#94A3B8'}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {telemetry.refluxPumpB_Running ? 'ONLINE' : 'CLICK START'}
                  </text>
                </g>

                {/* Equipment 6: Reboiler F-101 */}
                <rect
                  x="180"
                  y="230"
                  width="70"
                  height="70"
                  rx="8"
                  fill="#0B132B"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                />
                <text
                  x="215"
                  y="265"
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
                  y="280"
                  textAnchor="middle"
                  fill="#F59E0B"
                  fontSize="8"
                  fontFamily="monospace"
                >
                  REBOILER
                </text>
              </svg>
            </div>

            {/* Bottom Interactive Faceplate: Reflux Control Valve LV-102 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1120] border border-purple-500/20 font-mono space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white font-bold flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>DCS FACEPLATE: REFLUX CONTROL VALVE (LV-102)</span>
                </span>
                <span className="text-slate-300 font-bold text-sm">
                  {telemetry.refluxControlValvePct}% OPEN
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={telemetry.refluxControlValvePct}
                onChange={(e) => handleValveChange(parseFloat(e.target.value))}
                className="w-full accent-[#4F46E5] bg-slate-800 h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0% (Closed - Reflux Starvation)</span>
                <span className="text-cyan-400 font-bold">
                  Flow: {telemetry.refluxFlow} m³/h
                </span>
                <span>100% (Maximum Overhead Cooling)</span>
              </div>
            </div>

            {/* Victory Certificate Pop-up Drawer when drill is won */}
            {gameResult === 'WON' && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#070A1A] to-teal-950/80 border-2 border-emerald-500/60 shadow-[0_0_60px_rgba(16,185,129,0.3)] space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {isRTL ? 'تهانينا! تم اجتياز تحدي الطوارئ بنجاح' : 'CRISIS DRILL COMPLETED WITH GRADE A+'}
                      </h3>
                      <p className="text-xs font-mono text-emerald-300">
                        {isRTL
                          ? 'تم الحفاظ على توازن المصفاة وتفادي حرق وتلويث 1,200 كجم هيدروكربونات'
                          : 'Zero flaring occurred. Estimated plant loss of $2,400,000 USD successfully prevented.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-400">{isRTL ? 'التقييم:' : 'FINAL RATING:'}</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-black font-black text-xs font-mono">
                      100.0% GRADE A
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-300">
                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                    <div className="text-slate-500">REACTION TIME</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">
                      {(35.0 - timeLeft).toFixed(1)}s (Threshold 35s)
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                    <div className="text-slate-500">PLANT INTEGRITY</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">
                      100% NOMINAL
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                    <div className="text-slate-500">LOSS PREVENTED</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">
                      $2,400,000 USD
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <input
                    type="text"
                    value={traineeName}
                    onChange={(e) => setTraineeName(e.target.value)}
                    placeholder="Enter your name for Certificate"
                    className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-500/30 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                  />

                  <button
                    onClick={() => {
                      setViewMode('CERTIFICATE');
                      dcsAudio.playSuccess();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>{isRTL ? 'إصدار وطباعة الشهادة المعتمدة' : 'VIEW ACCREDITED CERTIFICATE →'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: REAL RUNNING SOFTWARE SCREENS */}
        {viewMode === 'REAL_SCREENS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
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
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CDU/VDU Console (Slide 3)
                </button>
                <button
                  onClick={() => setSelectedRealScreen('BUILDER')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedRealScreen === 'BUILDER'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  OTS Builder (Slide 4)
                </button>
                <button
                  onClick={() => setSelectedRealScreen('TRENDS')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedRealScreen === 'TRENDS'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  12 Trends & Alarms
                </button>
              </div>
            </div>

            {/* Display High-Res Screenshot with Hotspots */}
            <div className="relative rounded-xl border-2 border-slate-700 overflow-hidden bg-black shadow-2xl group">
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
                    className="absolute top-[28%] left-[42%] w-6 h-6 rounded-full bg-cyan-500/80 border-2 border-white animate-ping cursor-pointer"
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
                    className="absolute top-[35%] left-[50%] w-6 h-6 rounded-full bg-cyan-500/80 border-2 border-white animate-ping cursor-pointer"
                    title="Click to inspect OTS Builder Flowsheet"
                  />
                </div>
              )}

              {selectedRealScreen === 'TRENDS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#070B14]">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-300 font-bold">
                      12 LIVE TREND CHARTS (REAL RUNNING SCREEN):
                    </div>
                    <img
                      src="/assets/page_3__Image24_Image24.jpg"
                      alt="12 Live Process Trend Charts"
                      className="w-full rounded-lg border border-slate-800"
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
              <div className="p-4 rounded-xl bg-[#0B1120] border border-purple-500/40 font-mono text-xs text-slate-200 flex items-center justify-between">
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

            <div className="p-4 rounded-xl bg-[#070B14] border border-slate-800 font-mono text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>
                Source: <strong className="text-white">Nexiiva Official Pitch Deck (Slide 3 & 4)</strong>
              </span>
              <span className="text-slate-300 font-semibold">STATUS: RUNNING IN EGYPT TODAY</span>
            </div>
          </div>
        )}

        {/* VIEW 3: EMERGENCY DRILL SCENARIOS */}
        {viewMode === 'EMERGENCY_DRILL' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
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
                  className="p-6 rounded-2xl bg-[#070B14] border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-rose-400">{sc.id}</span>
                      <span className="text-slate-500">{sc.unit}</span>
                    </div>
                    <div className="text-sm font-bold text-white">{sc.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{sc.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <div className="text-[11px] font-mono text-slate-300 font-semibold">
                      Trainee Objectives:
                    </div>
                    {sc.expectedActions.map((act, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] text-slate-400 flex items-start space-x-1.5"
                      >
                        <span className="text-indigo-400">•</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setViewMode('SIMULATOR');
                      handleStartGameDrill();
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-rose-950/40 border border-slate-700 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-2"
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
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
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
              <div className="space-y-4 font-mono text-xs text-slate-300 p-6 rounded-2xl bg-[#070B14] border border-slate-800">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">TRAINEE OPERATOR:</span>
                  <span className="text-white font-bold uppercase">{traineeName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">SIMULATION DRILL:</span>
                  <span className="text-slate-300">CDU-100 REFLUX PUMP TRIP (S1)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">REACTION TIME:</span>
                  <span className="text-emerald-400 font-bold">13.8 SECONDS (PASS &lt; 35s)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">OFF-SPEC FLARING:</span>
                  <span className="text-emerald-400 font-bold">0.00 BBLS (PREVENTED)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">ESTIMATED LOSS AVOIDED:</span>
                  <span className="text-emerald-400 font-bold">$2,400,000 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FINAL GRADE:</span>
                  <span className="text-emerald-400 font-black text-sm">GRADE A+ (100.0%)</span>
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
