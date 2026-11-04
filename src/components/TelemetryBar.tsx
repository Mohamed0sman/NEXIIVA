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

  // Real-time DCS fluctuations (1Hz)
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
    <div className="h-9 bg-[#fafafb] border-b border-[#ececec] px-4 sm:px-6 flex items-center justify-between text-[11px] font-mono text-[#777b86] select-none z-50 relative">
      {/* Left: Operational Engine Telemetry */}
      <div className="flex items-center space-x-3 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
        <div className="flex items-center space-x-1.5 text-[#059669]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
          <span className="font-medium text-[#17191c] tracking-tight">
            {isRTL ? 'نظام المحاكاة نكسيفا v2.4' : 'NEXIIVA OTS v2.4'}
          </span>
        </div>

        <span className="text-[#e2e2e4]">/</span>

        <div className="flex items-center space-x-1.5">
          <span className="text-[#979799]">{isRTL ? 'الوحدة:' : 'UNIT:'}</span>
          <span className="text-[#17191c] font-medium">CDU-100 (ATM T-22)</span>
        </div>

        <span className="text-[#e2e2e4] hidden md:inline">/</span>

        <div className="hidden md:flex items-center space-x-1.5">
          <span className="text-[#979799]">{isRTL ? 'التغذية:' : 'FEED:'}</span>
          <span className="text-[#17191c]">{liveJitter.bpd.toLocaleString()} BPD</span>
        </div>

        <span className="text-[#e2e2e4] hidden lg:inline">/</span>

        <div className="hidden lg:flex items-center space-x-1.5">
          <span className="text-[#979799]">F-101 COT:</span>
          <span className="text-[#5d2a1a] font-medium">{liveJitter.cot}°C</span>
        </div>

        <span className="text-[#e2e2e4] hidden lg:inline">/</span>

        <div className="hidden lg:flex items-center space-x-1.5">
          <span className="text-[#979799]">TOP P:</span>
          <span className="text-[#17191c] font-medium">{liveJitter.topPress} bar</span>
        </div>

        <span className="text-[#e2e2e4] hidden sm:inline">/</span>

        <div className="hidden sm:flex items-center space-x-1.5">
          <span className="text-[#979799]">{isRTL ? 'الأمان:' : 'SAFETY:'}</span>
          <span className="text-[#059669] bg-[#ecfdf5] border border-[#a7f3d0] px-1.5 py-0.2 rounded text-[10px] font-medium">
            SIL-3 VERIFIED
          </span>
        </div>

        {simState === 'FAULT_INJECTED' && (
          <>
            <span className="text-[#e2e2e4]">/</span>
            <div className="text-[#dc2626] font-bold animate-pulse flex items-center space-x-1 bg-[#fef2f2] border border-[#fecaca] px-2 py-0.5 rounded text-[10px]">
              <span>⚠️ TAH-101 OVERPRESSURE ({telemetry.overheadTemp}°C)</span>
            </div>
          </>
        )}
      </div>

      {/* Right: Audio & Language */}
      <div className="flex items-center space-x-3 shrink-0 pl-3">
        <div className="hidden xl:flex items-center space-x-1 text-[#979799] text-[10px]">
          <span className="text-[#17191c] font-medium">GEF 2026 CAIRO</span>
          <span>·</span>
          <span>EIP PROGRAM</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            dcsAudio.toggleMute();
            dcsAudio.playClick();
          }}
          className="text-[#777b86] hover:text-[#17191c] px-2 py-0.5 rounded bg-white border border-[#ececec] text-[10px] transition-colors cursor-pointer"
        >
          DCS AUDIO
        </button>

        {/* Language Switcher */}
        <div className="flex items-center bg-[#f2f2f3] rounded-full p-0.5 text-[10px]">
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('EN');
            }}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-[#17191c] text-white font-medium shadow-sm'
                : 'text-[#777b86] hover:text-[#17191c]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => {
              dcsAudio.playClick();
              setLanguage('AR');
            }}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer font-sans ${
              language === 'AR'
                ? 'bg-[#17191c] text-white font-medium shadow-sm'
                : 'text-[#777b86] hover:text-[#17191c]'
            }`}
          >
            عربي
          </button>
        </div>
      </div>
    </div>
  );
};
