import React, { useEffect, useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';

export const TelemetryBar: React.FC = () => {
  const { language, setLanguage, simState, telemetry } = useSimulationJourney();
  const [liveJitter, setLiveJitter] = useState({
    bpd: 52410,
    cot: 364.4,
    reflux: 284.2,
    topPress: 1.38,
  });

  // Subtle real-time DCS fluctuations (1Hz)
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveJitter({
        bpd: Math.round(52400 + (Math.random() * 20 - 10)),
        cot: +(364.2 + (Math.random() * 0.4 - 0.2)).toFixed(1),
        reflux: +(284.0 + (Math.random() * 0.6 - 0.3)).toFixed(1),
        topPress: +(1.38 + (Math.random() * 0.02 - 0.01)).toFixed(2),
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const isRTL = language === 'AR';

  return (
    <div className="h-9 bg-[#03050C] border-b border-purple-500/15 px-4 sm:px-6 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none z-50 relative overflow-hidden">
      {/* Soft animated background line */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-transparent pointer-events-none" />

      {/* Left: Operational Engine Telemetry */}
      <div className="flex items-center space-x-3 overflow-x-auto whitespace-nowrap scrollbar-none py-1 relative z-10">
        <div className="flex items-center space-x-1.5 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-slate-200 tracking-wider">
            {isRTL ? 'محرك نكسيفا الصناعي OTS v2.4' : 'NEXIIVA OTS ENGINE v2.4'}
          </span>
        </div>

        <span className="text-slate-700">/</span>

        <div className="flex items-center space-x-1.5">
          <span className="text-slate-500">{isRTL ? 'الوحدة:' : 'UNIT:'}</span>
          <span className="text-purple-300 font-medium">CDU-100 (ATM T-22 / VAC T-60)</span>
        </div>

        <span className="text-slate-700 hidden md:inline">/</span>

        <div className="hidden md:flex items-center space-x-1.5">
          <span className="text-slate-500">{isRTL ? 'التغذية:' : 'CHARGE:'}</span>
          <span className="text-slate-200">{liveJitter.bpd.toLocaleString()} BPD</span>
        </div>

        <span className="text-slate-700 hidden lg:inline">/</span>

        <div className="hidden lg:flex items-center space-x-1.5">
          <span className="text-slate-500">F-101 COT:</span>
          <span className="text-cyan-400">{liveJitter.cot}°C</span>
        </div>

        <span className="text-slate-700 hidden lg:inline">/</span>

        <div className="hidden lg:flex items-center space-x-1.5">
          <span className="text-slate-500">TOP P:</span>
          <span className="text-cyan-400">{liveJitter.topPress} bar</span>
        </div>

        <span className="text-slate-700 hidden sm:inline">/</span>

        <div className="hidden sm:flex items-center space-x-1.5">
          <span className="text-slate-500">{isRTL ? 'الأمان:' : 'SAFETY:'}</span>
          <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.2 rounded text-[10px]">
            SIL-3 VERIFIED
          </span>
        </div>

        {simState === 'FAULT_INJECTED' && (
          <>
            <span className="text-slate-700">/</span>
            <div className="text-rose-400 font-bold animate-pulse flex items-center space-x-1 bg-rose-950/50 border border-rose-500/40 px-2 py-0.2 rounded">
              <span>⚠️ TAH-101 OVERPRESSURE ({telemetry.overheadTemp}°C)</span>
            </div>
          </>
        )}
      </div>

      {/* Right: Cairo Showcase & Language Switcher */}
      <div className="flex items-center space-x-3 shrink-0 pl-3 relative z-10">
        <div className="hidden xl:flex items-center space-x-1.5 border border-purple-500/30 px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">
          <span className="text-[9px] uppercase tracking-wider font-bold">GEF 2026</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-200">CAIRO OFFICIAL SHOWCASE</span>
        </div>

        {/* Audio Mute/Unmute */}
        <button
          onClick={() => {
            dcsAudio.toggleMute();
            dcsAudio.playClick();
          }}
          title="Toggle DCS Audio"
          className="text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded border border-slate-800 hover:border-slate-700 transition-colors"
        >
          🔊 DCS AUDIO
        </button>

        {/* Language Switcher */}
        <div className="flex items-center border border-purple-500/30 bg-[#0B0F24] rounded text-[10px] p-0.5">
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('EN');
            }}
            className={`px-2 py-0.5 rounded transition-all ${
              language === 'EN'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('AR');
            }}
            className={`px-2 py-0.5 rounded transition-all font-sans ${
              language === 'AR'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            العربية
          </button>
        </div>
      </div>
    </div>
  );
};
