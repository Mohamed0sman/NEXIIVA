import React, { useState, useEffect } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';
import {
  Play,
  RotateCcw,
  AlertTriangle,
  Award,
  Activity,
  Flame,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
} from 'lucide-react';

type ConsoleStep = 'NORMAL' | 'FAULT' | 'CERT';

export const HeroSection: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  const [activeStep, setActiveStep] = useState<ConsoleStep>('NORMAL');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [faultResolved, setFaultResolved] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);

  // Dynamic Telemetry State
  const [telemetry, setTelemetry] = useState({
    temp: 114.2,
    pressure: 1.48,
    flow: 84.5,
    furnaceCOT: 365.0,
    pumpAOnline: true,
    pumpBOnline: false,
    valvePos: 55,
  });

  // Oscillating gentle telemetry jitter during normal state
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeStep === 'NORMAL') {
        const jitter = (Math.random() - 0.5) * 0.4;
        setTelemetry((prev) => ({
          ...prev,
          temp: parseFloat((114.2 + jitter).toFixed(1)),
          pressure: parseFloat((1.48 + jitter * 0.02).toFixed(2)),
          flow: parseFloat((84.5 + jitter * 0.8).toFixed(1)),
          furnaceCOT: parseFloat((365.0 + jitter * 0.5).toFixed(1)),
          pumpAOnline: true,
          pumpBOnline: false,
        }));
      } else if (activeStep === 'FAULT' && !faultResolved) {
        // Temperature surges, pump A is tripped, pressure climbs
        setTelemetry((prev) => ({
          ...prev,
          temp: parseFloat(Math.min(125.8, prev.temp + 0.5).toFixed(1)),
          pressure: parseFloat(Math.min(1.92, prev.pressure + 0.02).toFixed(2)),
          flow: 0.0,
          furnaceCOT: 368.5,
          pumpAOnline: false,
          pumpBOnline: false,
        }));
      } else if (activeStep === 'FAULT' && faultResolved) {
        // Recovering towards normal
        setTelemetry((prev) => ({
          ...prev,
          temp: parseFloat(Math.max(114.5, prev.temp - 0.8).toFixed(1)),
          pressure: parseFloat(Math.max(1.49, prev.pressure - 0.03).toFixed(2)),
          flow: 86.2,
          furnaceCOT: 365.2,
          pumpAOnline: false,
          pumpBOnline: true,
        }));
      }
    }, 400);

    return () => clearInterval(interval);
  }, [activeStep, faultResolved]);

  // Handle Mode Change
  const handleSelectStep = (step: ConsoleStep) => {
    setActiveStep(step);
    if (step === 'NORMAL') {
      setFaultResolved(false);
      setAlarmActive(false);
      dcsAudio.stopAlarmLoop();
      setTelemetry({
        temp: 114.2,
        pressure: 1.48,
        flow: 84.5,
        furnaceCOT: 365.0,
        pumpAOnline: true,
        pumpBOnline: false,
        valvePos: 55,
      });
    } else if (step === 'FAULT') {
      setFaultResolved(false);
      setAlarmActive(true);
      if (soundEnabled) {
        dcsAudio.playAlarm();
      }
    } else if (step === 'CERT') {
      setAlarmActive(false);
      dcsAudio.stopAlarmLoop();
    }
  };

  // Resolve Fault by Starting Standby Pump 7B
  const handleStartPumpB = () => {
    setFaultResolved(true);
    setAlarmActive(false);
    dcsAudio.stopAlarmLoop();
    if (soundEnabled) {
      dcsAudio.playRelaySwitch();
    }
  };

  const scrollToDilemma = () => {
    const el = document.getElementById('industry-dilemma');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#03050C]">
      {/* Structural Blueprint Grid (48px ultra-subtle lines) */}
      <div className="absolute inset-0 blueprint-grid opacity-70 pointer-events-none" />

      {/* Ambient Electric Violet & Cobalt Radial Blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(142,66,254,0.12),transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(51,97,252,0.10),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-10 sm:space-y-12 relative z-10 text-center">
        {/* Hero Header (Centered & Imposing) */}
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
          {/* Official Pill Badge */}
          <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-1.5 rounded-full bg-white/5 border border-purple-500/30 backdrop-blur-md text-[11px] font-mono tracking-wider text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>
              {isRTL
                ? 'محاكاة تدريب مشغلي مصافي التكرير (OTS) · اختيار رسمي EIP 2026'
                : 'INDUSTRIAL OPERATOR TRAINING SIMULATION (OTS) · EIP 2026 OFFICIAL SELECTION'}
            </span>
          </div>

          {/* Imposing Metallic Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight leading-[1.18] sm:leading-[1.14]">
            <span className="heading-metallic block">
              {isRTL
                ? 'تدرّب على طوارئ مصافي التكرير الحرجة.'
                : 'Rehearse Critical Refinery Emergencies.'}
            </span>
            <span className="bg-gradient-to-r from-[#A855F7] via-[#8E42FE] to-[#38BDF8] bg-clip-text text-transparent block mt-1">
              {isRTL
                ? 'قبل لمس المنشأة الحقيقية.'
                : 'Before Touching the Real Plant.'}
            </span>
          </h1>

          {/* High-Contrast Cool Slate Subtitle */}
          <p className="text-sm sm:text-lg lg:text-[19px] text-[#94A3B8] font-normal leading-relaxed max-w-3xl mx-auto px-2">
            {isRTL
              ? 'محاكاة ديناميكية عالية الدقة مطابقة لمخططات P&ID الخاصة بمصفاتكم خلال أسبوع واحد — وبتكلفة أقل بنسبة 90% من الأنظمة التقليدية القديمة ذات الـ $110,000.'
              : 'High-fidelity dynamic simulation tailored to your plant’s exact P&IDs in ~1 week—at 90% lower cost than $110K legacy systems.'}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2 sm:pt-4 w-full max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => setPilotDrawerOpen(true)}
              className="btn-cta-primary min-h-[52px] text-sm sm:text-base group"
            >
              <span>{isRTL ? 'ابدأ تجربة المصفاة لـ 90 يوماً ($800)' : 'Start a 90-Day Plant Pilot ($800)'}</span>
              <span className={`group-hover:translate-x-1 transition-transform inline-block ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`}>→</span>
            </button>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="btn-cta-secondary min-h-[52px] text-sm sm:text-base"
            >
              <Play className="w-4 h-4 fill-current text-cyan-400 mr-2" />
              <span>{isRTL ? 'شاهد جولة حية للمنظومة (15 دقيقة)' : '▶ Watch 15-Min Live Walkthrough'}</span>
            </button>
          </div>
        </div>

        {/* Centerpiece: Cinematic Refinery Digital Twin Control Console (NO FAKE 3D CUBES) */}
        <div className="pt-2 sm:pt-4 max-w-5xl mx-auto">
          <div
            className="rounded-2xl border border-purple-500/30 bg-[#080D1F]/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(123,60,252,0.22)] overflow-hidden text-left relative"
            dir="ltr"
          >
            {/* Top Interactive Mode Bar (3 Big Clickable Steps) */}
            <div className="bg-[#050814] border-b border-white/10 px-3 sm:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-slate-200 tracking-wider">
                  NEXIIVA OTS // LIVE DCS CONSOLE
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 text-[10px]">
                  RIGOROUS EOS (Δt=100ms)
                </span>
              </div>

              {/* 3 Clickable Mode Buttons */}
              <div className="grid grid-cols-3 gap-1.5 bg-[#0B1124] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => handleSelectStep('NORMAL')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    activeStep === 'NORMAL'
                      ? 'bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3 h-3 text-cyan-300" />
                  <span className="truncate">1. Normal (CDU Live)</span>
                </button>

                <button
                  onClick={() => handleSelectStep('FAULT')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    activeStep === 'FAULT'
                      ? 'bg-rose-600 text-white shadow-sm font-bold animate-pulse'
                      : 'text-slate-400 hover:text-rose-300'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 text-rose-300" />
                  <span className="truncate">2. Inject Fault (Trip)</span>
                </button>

                <button
                  onClick={() => handleSelectStep('CERT')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    activeStep === 'CERT'
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-emerald-300'
                  }`}
                >
                  <Award className="w-3 h-3 text-emerald-300" />
                  <span className="truncate">3. Certification</span>
                </button>
              </div>
            </div>

            {/* Console Body Depending on Active Step */}
            {activeStep !== 'CERT' ? (
              <div className="p-4 sm:p-6 space-y-6">
                {/* Live Process Telemetry Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 font-mono text-xs">
                  <div className={`p-3 rounded-xl border transition-all ${
                    alarmActive ? 'bg-rose-950/40 border-rose-500/60' : 'bg-[#0B1124] border-white/10'
                  }`}>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">TI-101 (Overhead Temp)</div>
                    <div className={`text-base sm:text-xl font-bold mt-1 ${
                      alarmActive ? 'text-rose-400 animate-pulse' : 'text-cyan-400'
                    }`}>
                      {telemetry.temp} °C
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">SP: 114.5 °C (Alarm: &gt;120°C)</div>
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${
                    alarmActive ? 'bg-rose-950/40 border-rose-500/60' : 'bg-[#0B1124] border-white/10'
                  }`}>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">PI-102 (Column Top)</div>
                    <div className="text-base sm:text-xl font-bold text-white mt-1">
                      {telemetry.pressure} bar
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Operating: 1.45–1.50 bar</div>
                  </div>

                  <div className={`p-3 rounded-xl border transition-all ${
                    telemetry.flow === 0 ? 'bg-rose-950/40 border-rose-500/60' : 'bg-[#0B1124] border-white/10'
                  }`}>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">FIC-102 (Reflux Flow)</div>
                    <div className={`text-base sm:text-xl font-bold mt-1 ${
                      telemetry.flow === 0 ? 'text-rose-400 font-extrabold' : 'text-emerald-400'
                    }`}>
                      {telemetry.flow} m³/h
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Duty: P-1007A / Standby: 7B</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B1124] border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">TI-201 (Furnace F-101 COT)</div>
                    <div className="text-base sm:text-xl font-bold text-amber-400 mt-1">
                      {telemetry.furnaceCOT} °C
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">32 Fuel Gas Burners Fired</div>
                  </div>
                </div>

                {/* Alarm Banner & Interactive Action in Fault Mode */}
                {activeStep === 'FAULT' && (
                  <div className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
                    faultResolved
                      ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200'
                      : 'bg-rose-950/70 border-rose-500 text-rose-200 animate-pulse'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${faultResolved ? 'text-emerald-400' : 'text-rose-400'}`} />
                      <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-wider">
                          {faultResolved
                            ? 'FAULT CLEARED: STANDBY PUMP P-1007B ACTIVE // REFLUX RESTORED'
                            : 'CRITICAL ALARM: P-1007A MOTOR OVERLOAD TRIP // LOSS OF REFLUX FLOW'}
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          {faultResolved
                            ? 'Column top temperature cooling down to 114.5 °C. Trainee response time: 3.8s (Zero Penalty).'
                            : 'Overhead temperature rising rapidly. Risk of heavy liquid carryover to flare.'}
                        </div>
                      </div>
                    </div>

                    {!faultResolved ? (
                      <button
                        onClick={handleStartPumpB}
                        className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-500/40 transition-all cursor-pointer flex items-center space-x-1.5 flex-shrink-0"
                      >
                        <Zap className="w-4 h-4 text-amber-300" />
                        <span>⚡ Start Standby Pump P-1007B</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSelectStep('CERT')}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer flex items-center space-x-1.5"
                      >
                        <span>View Official Certificate</span>
                        <span>→</span>
                      </button>
                    )}
                  </div>
                )}

                {/* The Authentic CDU/VDU Animated SVG Process Flow Diagram */}
                <div className="relative rounded-xl bg-[#030611] border border-white/10 p-4 overflow-hidden">
                  <svg
                    viewBox="0 0 920 380"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto select-none"
                  >
                    <defs>
                      {/* Fluid Gradients */}
                      <linearGradient id="crudeFeedFlow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#8E42FE" />
                      </linearGradient>

                      <linearGradient id="vaporOverhead" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#38BDF8" />
                      </linearGradient>

                      <linearGradient id="columnBodyGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1E293B" />
                        <stop offset="50%" stopColor="#0F172A" />
                        <stop offset="100%" stopColor="#1E293B" />
                      </linearGradient>
                    </defs>

                    {/* 1. CRUDE FEED STREAM (Left into Furnace F-101) */}
                    <path
                      d="M20 220 L110 220"
                      stroke="url(#crudeFeedFlow)"
                      strokeWidth="3.5"
                      className="animate-flow-dash"
                    />
                    <text x="25" y="210" fill="#94A3B8" fontSize="10" fontFamily="monospace">CRUDE CHARGE 100 kBD</text>

                    {/* 2. FIRED HEATER F-101 */}
                    <g transform="translate(110, 160)">
                      <rect x="0" y="20" width="80" height="110" rx="4" fill="url(#columnBodyGrad)" stroke="#475569" strokeWidth="1.5" />
                      {/* Chimney Stack */}
                      <path d="M25 20 L25 0 L55 0 L55 20" stroke="#475569" strokeWidth="1.5" fill="#0F172A" />
                      {/* Burner Flame */}
                      <path d="M20 115 Q30 90 40 115 Q50 90 60 115" stroke="#F59E0B" strokeWidth="2.5" fill="none" className="animate-pulse" />
                      <text x="14" y="65" fill="#F8FAFC" fontSize="12" fontWeight="bold" fontFamily="monospace">F-101</text>
                      <text x="10" y="80" fill="#F59E0B" fontSize="9" fontFamily="monospace">COT: {telemetry.furnaceCOT}°C</text>
                    </g>

                    {/* Transfer Line from Furnace to Atmospheric Column T-22 */}
                    <path
                      d="M190 230 L300 230"
                      stroke="#EF4444"
                      strokeWidth="4"
                      className="animate-flow-dash"
                    />
                    <text x="210" y="222" fill="#EF4444" fontSize="10" fontFamily="monospace">365°C FLASH STREAM</text>

                    {/* 3. ATMOSPHERIC CRUDE DISTILLATION COLUMN T-22 */}
                    <g transform="translate(300, 30)">
                      {/* Column Shell */}
                      <rect x="0" y="20" width="100" height="300" rx="14" fill="url(#columnBodyGrad)" stroke="#64748B" strokeWidth="2" />
                      {/* Sieve Trays */}
                      {[60, 90, 120, 150, 180, 210, 240, 270].map((y, idx) => (
                        <line key={idx} x1="10" y1={y} x2="90" y2={y} stroke="#475569" strokeDasharray="3 3" strokeWidth="1.5" />
                      ))}
                      <text x="24" y="45" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace">T-22</text>
                      <text x="12" y="60" fill="#94A3B8" fontSize="9" fontFamily="monospace">CDU 48 TRAYS</text>

                      {/* Tag TI-101 badge at top */}
                      <rect x="8" y="70" width="84" height="22" rx="4" fill={alarmActive ? '#7F1D1D' : '#0B1124'} stroke={alarmActive ? '#EF4444' : '#38BDF8'} strokeWidth="1" />
                      <text x="14" y="85" fill={alarmActive ? '#FECACA' : '#38BDF8'} fontSize="10" fontWeight="bold" fontFamily="monospace">
                        TI-101: {telemetry.temp}°C
                      </text>
                    </g>

                    {/* 4. OVERHEAD VAPOR LINE & AIR CONDENSER E-101 */}
                    <path
                      d="M350 30 L350 15 L520 15 L520 60"
                      stroke="url(#vaporOverhead)"
                      strokeWidth="3.5"
                      className="animate-flow-dash"
                    />
                    <g transform="translate(480, 60)">
                      <rect x="0" y="0" width="80" height="40" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                      <text x="14" y="24" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">E-101</text>
                      <text x="10" y="34" fill="#94A3B8" fontSize="8" fontFamily="monospace">CONDENSER</text>
                    </g>

                    {/* Line into Reflux Drum D-101 */}
                    <path d="M520 100 L520 130" stroke="#38BDF8" strokeWidth="3" />
                    <g transform="translate(470, 130)">
                      <rect x="0" y="0" width="100" height="45" rx="10" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                      <text x="24" y="26" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">D-101</text>
                      <text x="14" y="38" fill="#94A3B8" fontSize="8" fontFamily="monospace">REFLUX DRUM</text>
                    </g>

                    {/* Line from Drum to Reflux Pumps P-1007A/B */}
                    <path d="M520 175 L520 220 L570 220" stroke="#38BDF8" strokeWidth="2.5" />

                    {/* 5. DUAL REFLUX PUMPS P-1007A and P-1007B */}
                    {/* Pump A (Duty) */}
                    <g transform="translate(570, 200)">
                      <circle cx="20" cy="20" r="18" fill={telemetry.pumpAOnline ? '#065F46' : '#7F1D1D'} stroke={telemetry.pumpAOnline ? '#10B981' : '#EF4444'} strokeWidth="2" />
                      <path d="M12 20 L28 12 L28 28 Z" fill="#FFFFFF" />
                      <text x="44" y="18" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">P-1007A</text>
                      <text x="44" y="30" fill={telemetry.pumpAOnline ? '#34D399' : '#F87171'} fontSize="9" fontFamily="monospace">
                        {telemetry.pumpAOnline ? '[ONLINE]' : '[TRIPPED]'}
                      </text>
                    </g>

                    {/* Pump B (Standby) */}
                    <g transform="translate(570, 255)">
                      <circle cx="20" cy="20" r="18" fill={telemetry.pumpBOnline ? '#065F46' : '#1E293B'} stroke={telemetry.pumpBOnline ? '#10B981' : '#64748B'} strokeWidth="2" />
                      <path d="M12 20 L28 12 L28 28 Z" fill="#FFFFFF" />
                      <text x="44" y="18" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">P-1007B</text>
                      <text x="44" y="30" fill={telemetry.pumpBOnline ? '#34D399' : '#94A3B8'} fontSize="9" fontFamily="monospace">
                        {telemetry.pumpBOnline ? '[ONLINE]' : '[STANDBY]'}
                      </text>
                    </g>

                    {/* Reflux Return Flow to Column Top Tray */}
                    <path
                      d="M660 220 L730 220 L730 65 L400 65"
                      stroke={telemetry.flow > 0 ? '#38BDF8' : '#64748B'}
                      strokeWidth={telemetry.flow > 0 ? '3' : '1.5'}
                      strokeDasharray={telemetry.flow > 0 ? '6 3' : 'none'}
                      className={telemetry.flow > 0 ? 'animate-flow-dash' : ''}
                    />
                    <text x="610" y="80" fill="#38BDF8" fontSize="10" fontFamily="monospace">
                      REFLUX FIC-102: {telemetry.flow} m³/h
                    </text>

                    {/* 6. VACUUM COLUMN T-60 (Right Side Connection) */}
                    <g transform="translate(770, 70)">
                      <rect x="0" y="20" width="90" height="260" rx="16" fill="url(#columnBodyGrad)" stroke="#6366F1" strokeWidth="2" />
                      <text x="22" y="45" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">T-60</text>
                      <text x="12" y="60" fill="#818CF8" fontSize="9" fontFamily="monospace">VACUUM (VDU)</text>
                      <text x="14" y="80" fill="#94A3B8" fontSize="8" fontFamily="monospace">15 mmHg ABS</text>
                    </g>

                    {/* Atmospheric Residue to Vacuum Column */}
                    <path
                      d="M350 330 L350 355 L750 355 L750 290 L770 290"
                      stroke="#475569"
                      strokeWidth="3.5"
                    />
                    <text x="450" y="350" fill="#94A3B8" fontSize="9" fontFamily="monospace">ATMOSPHERIC RESIDUE FEED TO VDU</text>
                  </svg>
                </div>

                {/* Console Footer Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 border-t border-white/10 pt-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>DCS Engine: NEXIIVA Core v3.2 · Precision Peng-Robinson EOS</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
                    >
                      {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                      <span>{soundEnabled ? 'Audio ON' : 'Audio OFF'}</span>
                    </button>
                    <span>|</span>
                    <button
                      onClick={() => handleSelectStep('NORMAL')}
                      className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer text-cyan-400"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset State</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Step 3: Accredited Official NEXIIVA Certificate of Achievement */
              <div className="p-6 sm:p-10 space-y-6">
                <div className="max-w-3xl mx-auto rounded-2xl bg-[#030612] border-2 border-amber-500/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6">
                  {/* Watermark / Stamp */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-emerald-400/40 flex flex-col items-center justify-center rotate-12 text-emerald-300 font-mono text-[9px] uppercase tracking-wider bg-emerald-950/20 backdrop-blur-xs">
                      <span className="font-bold text-sm">GRADE A</span>
                      <span>100% SCORE</span>
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                      NEXIIVA ACCREDITED REFINERY OPERATIONS CERTIFICATE
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Certificate of Dynamic Emergency Mastery
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                      This verifies successful execution of the Atmospheric Distillation (CDU) emergency drill: Overhead Reflux Loss & Overpressure Interlock Recovery.
                    </p>
                  </div>

                  {/* Trainee Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left font-mono text-xs max-w-2xl mx-auto">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-slate-400">TRAINEE SCORE</div>
                      <div className="text-base font-bold text-emerald-400 mt-0.5">100 / 100</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-slate-400">RESPONSE TIME</div>
                      <div className="text-base font-bold text-cyan-400 mt-0.5">3.8 Seconds</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-slate-400">SAFETY PENALTY</div>
                      <div className="text-base font-bold text-emerald-400 mt-0.5">0.0 (Zero Flare)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-slate-400">VERIFICATION</div>
                      <div className="text-base font-bold text-amber-300 mt-0.5">API 520 / ISA</div>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
                    <div className="text-left">
                      <div className="font-bold text-white">Eng. Mostafa Adel</div>
                      <div className="text-[10px]">Founder & CEO, Former MIDOR / Sanmar Operations Lead</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSelectStep('NORMAL')}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all cursor-pointer"
                      >
                        Re-run Console
                      </button>
                      <button
                        onClick={() => setPilotDrawerOpen(true)}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white font-mono font-bold text-xs shadow-md cursor-pointer"
                      >
                        Book Plant Pilot
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
