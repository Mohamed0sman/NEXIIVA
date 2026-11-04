import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';

export const Section_InteractiveJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const { telemetry, injectFault, startStandbyPump, acknowledgeAlarm, adjustValve, language } = useSimulationJourney();

  const t = translations[language].journey;

  // Step 1 local state
  const [hasDesalter, setHasDesalter] = useState(true);
  const [hasStrippers, setHasStrippers] = useState(true);

  // Step 2 local state
  const [activeFaultName, setActiveFaultName] = useState<string | null>(null);

  const steps = [
    {
      num: t.s1Num,
      id: 1,
      title: t.s1Title,
      subtitle: t.s1Sub,
      desc: t.s1Desc,
    },
    {
      num: t.s2Num,
      id: 2,
      title: t.s2Title,
      subtitle: t.s2Sub,
      desc: t.s2Desc,
    },
    {
      num: t.s3Num,
      id: 3,
      title: t.s3Title,
      subtitle: t.s3Sub,
      desc: t.s3Desc,
    },
  ];

  const handleStepClick = (id: 1 | 2 | 3) => {
    setActiveStep(id);
    dcsAudio.playClick();
  };

  return (
    <section id="journey" className="py-28 px-6 lg:px-12 relative border-t border-purple-500/10">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-metallic tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Spacious Layout: Left Step Tabs (5 Cols) / Right Interactive Visual Card (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3 Large Clickable Step Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((st) => {
              const isActive = activeStep === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => handleStepClick(st.id as 1 | 2 | 3)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden ${
                    isActive
                      ? 'bg-[#0B0F22]/90 border-purple-500/50 shadow-brand-glow'
                      : 'bg-[#0B0F22]/40 border-purple-500/10 hover:border-purple-500/30'
                  }`}
                >
                  {/* Active Gradient Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-gradient" />
                  )}

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-brand-gradient">
                      {st.num}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {isActive ? '● VIEWING' : 'CLICK TO VIEW'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-1.5">{st.title}</h3>
                  <div className="text-xs text-purple-300/80 font-medium mt-0.5">{st.subtitle}</div>
                  <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Renders ONLY ONE clean, uncluttered interactive card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0F22]/80 backdrop-blur-2xl border border-purple-500/30 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
              {/* CARD 1: OTS BUILDER INTERACTIVE DEMO */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                    <div>
                      <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
                        OTS BUILDER // WORKSPACE DEMO
                      </span>
                      <h4 className="text-lg font-bold text-white mt-0.5">Custom Refinery Unit Assembly</h4>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      387 Equipment Types
                    </span>
                  </div>

                  {/* Flowsheet Interactive Toggles */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-slate-400">Interactive Unit Configuration:</div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          dcsAudio.playClick();
                          setHasDesalter(!hasDesalter);
                        }}
                        className={`p-3 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                          hasDesalter
                            ? 'bg-purple-600/20 border-purple-500 text-white font-bold'
                            : 'bg-white/5 border-purple-500/20 text-slate-400'
                        }`}
                      >
                        <span>Electrostatic Desalter V-101</span>
                        <span>{hasDesalter ? '✓ ON' : '✕ OFF'}</span>
                      </button>

                      <button
                        onClick={() => {
                          dcsAudio.playClick();
                          setHasStrippers(!hasStrippers);
                        }}
                        className={`p-3 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                          hasStrippers
                            ? 'bg-purple-600/20 border-purple-500 text-white font-bold'
                            : 'bg-white/5 border-purple-500/20 text-slate-400'
                        }`}
                      >
                        <span>Side Strippers (T-23 / T-24)</span>
                        <span>{hasStrippers ? '✓ ON' : '✕ OFF'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Flowsheet Graphic Preview */}
                  <div className="p-4 rounded-xl bg-[#04060E]/70 border border-purple-500/20 h-44 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 500 120" fill="none">
                      {/* Feed */}
                      <path d="M 10 60 L 60 60" stroke="#3361FC" strokeWidth="2.5" className="animate-flow-dash" />
                      <text x="12" y="50" fill="#94A3B8" fontSize="8" fontFamily="monospace">FEED</text>

                      {/* Desalter */}
                      {hasDesalter ? (
                        <>
                          <rect x="60" y="40" width="50" height="40" rx="6" fill="#0D132D" stroke="#8E42FE" strokeWidth="1.5" />
                          <text x="68" y="64" fill="#FFFFFF" fontSize="9" fontFamily="monospace">V-101</text>
                          <path d="M 110 60 L 150 60" stroke="#3361FC" strokeWidth="2.5" className="animate-flow-dash" />
                        </>
                      ) : (
                        <path d="M 60 60 L 150 60" stroke="#3361FC" strokeWidth="2.5" className="animate-flow-dash" />
                      )}

                      {/* Furnace */}
                      <rect x="150" y="35" width="50" height="50" rx="6" fill="#0D132D" stroke="#6838F8" strokeWidth="1.5" />
                      <text x="158" y="64" fill="#FFFFFF" fontSize="9" fontFamily="monospace">F-101</text>

                      {/* Column */}
                      <path d="M 200 60 L 250 60" stroke="#8E42FE" strokeWidth="3" className="animate-flow-dash" />
                      <rect x="250" y="10" width="55" height="100" rx="8" fill="#0D132D" stroke="#8E42FE" strokeWidth="2" />
                      <text x="262" y="40" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">T-22</text>

                      {/* Side Strippers */}
                      {hasStrippers && (
                        <>
                          <path d="M 305 45 L 340 45" stroke="#3361FC" strokeWidth="2" />
                          <rect x="340" y="35" width="35" height="30" rx="4" fill="#0D132D" stroke="#3361FC" strokeWidth="1" />
                          <text x="345" y="52" fill="#38BDF8" fontSize="7" fontFamily="monospace">T-23</text>

                          <path d="M 305 75 L 340 75" stroke="#3361FC" strokeWidth="2" />
                          <rect x="340" y="65" width="35" height="30" rx="4" fill="#0D132D" stroke="#3361FC" strokeWidth="1" />
                          <text x="345" y="82" fill="#38BDF8" fontSize="7" fontFamily="monospace">T-24</text>
                        </>
                      )}

                      {/* Overhead */}
                      <path d="M 277 10 L 277 5 L 420 5 L 420 30" stroke="#3361FC" strokeWidth="2" />
                      <rect x="400" y="30" width="40" height="30" rx="4" fill="#0D132D" stroke="#8E42FE" strokeWidth="1" />
                      <text x="408" y="48" fill="#FFFFFF" fontSize="8" fontFamily="monospace">V-102</text>
                    </svg>
                  </div>

                  <div className="pt-2 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>STATUS: <strong className="text-emerald-400">UNIT COMPILED & READY</strong></span>
                    <span className="text-purple-300">ESTIMATED BUILD TIME: ~1 WEEK</span>
                  </div>
                </div>
              )}

              {/* CARD 2: INSTRUCTOR CONSOLE INTERACTIVE FAULT INJECTION */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                    <div>
                      <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
                        INSTRUCTOR CONSOLE // UPSET INJECTOR
                      </span>
                      <h4 className="text-lg font-bold text-white mt-0.5">Trigger Real Plant Emergencies</h4>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400">
                      Live Telemetry
                    </span>
                  </div>

                  {/* 3 Fault Triggers */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        dcsAudio.playAlarm();
                        injectFault('S1');
                        setActiveFaultName('Scenario S1: Reflux Pump P-1007A Motor Trip');
                      }}
                      className="w-full p-4 rounded-xl bg-white/5 hover:bg-rose-950/30 border border-purple-500/20 hover:border-rose-500/60 text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-mono font-bold text-rose-400">⚡ SCENARIO S1</div>
                        <div className="text-sm font-semibold text-white mt-0.5">Reflux Pump P-1007A Motor Trip</div>
                        <div className="text-xs text-slate-400 mt-1">Causes overhead column temp to spike above 120 °C</div>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                        Trigger
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        dcsAudio.playAlarm();
                        injectFault('S2');
                        setActiveFaultName('Scenario S2: Fired Heater Fuel Gas Pressure Drop');
                      }}
                      className="w-full p-4 rounded-xl bg-white/5 hover:bg-amber-950/30 border border-purple-500/20 hover:border-amber-500/60 text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-mono font-bold text-amber-400">⚡ SCENARIO S2</div>
                        <div className="text-sm font-semibold text-white mt-0.5">Crude Charge Heater F-101 Fuel Drop</div>
                        <div className="text-xs text-slate-400 mt-1">Fuel pressure drops 40%, threatening coil vaporization</div>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-600/20 text-amber-300 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        Trigger
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        dcsAudio.playAlarm();
                        injectFault('S3');
                        setActiveFaultName('Scenario S3: Vacuum Column Ejector Steam Loss');
                      }}
                      className="w-full p-4 rounded-xl bg-white/5 hover:bg-blue-950/30 border border-purple-500/20 hover:border-blue-500/60 text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-mono font-bold text-blue-400">⚡ SCENARIO S3</div>
                        <div className="text-sm font-semibold text-white mt-0.5">Vacuum Ejector Steam Loss</div>
                        <div className="text-xs text-slate-400 mt-1">Motive steam drops, degrading tower vacuum to 140 mmHg</div>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Trigger
                      </span>
                    </button>
                  </div>

                  {activeFaultName && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs font-mono text-rose-300 flex items-center justify-between">
                      <span>⚠️ ACTIVE UPSET: {activeFaultName}</span>
                      <span className="text-white font-bold">MONITORING TRAINEE REACTION</span>
                    </div>
                  )}
                </div>
              )}

              {/* CARD 3: TRAINEE DCS & AUTO-CERTIFICATION */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                    <div>
                      <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
                        TRAINEE DCS STATION // AUDIT & RECOVERY
                      </span>
                      <h4 className="text-lg font-bold text-white mt-0.5">Interactive Alarm & Controller Recovery</h4>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      Grade A (100.0%)
                    </span>
                  </div>

                  {/* Operator Recovery Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Action 1: Acknowledge Alarm */}
                    <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20 space-y-3">
                      <div className="text-xs font-mono text-slate-400">ALARM ANNUNCIATOR:</div>
                      <div className="text-sm font-bold text-white">TAH-101 Over-Temp</div>
                      <button
                        onClick={() => {
                          dcsAudio.playSuccess();
                          acknowledgeAlarm();
                        }}
                        className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono transition-all cursor-pointer"
                      >
                        [ACK ALARM — 14s (PASSED)]
                      </button>
                    </div>

                    {/* Action 2: Start Standby Pump */}
                    <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20 space-y-3">
                      <div className="text-xs font-mono text-slate-400">STANDBY MOTOR LINEUP:</div>
                      <div className="text-sm font-bold text-white">Pump P-1007B</div>
                      <button
                        onClick={() => {
                          dcsAudio.playSuccess();
                          startStandbyPump();
                        }}
                        className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-all cursor-pointer"
                      >
                        [START STANDBY PUMP — 42s]
                      </button>
                    </div>
                  </div>

                  {/* Flow Control Slider */}
                  <div className="p-4 rounded-xl bg-[#04060E]/70 border border-purple-500/20 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">REFLUX VALVE FV-102 (OP %):</span>
                      <span className="text-purple-300 font-bold">{telemetry.refluxControlValvePct}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={telemetry.refluxControlValvePct}
                      onChange={(e) => adjustValve(parseFloat(e.target.value))}
                      className="w-full accent-purple-500 bg-slate-800 h-1.5 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>0% (Closed)</span>
                      <span>Flow: {telemetry.refluxFlow} m³/h</span>
                      <span>100% (Full)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-purple-500/20">
                    <span>FINAL AUDIT: <strong className="text-emerald-400">100.0% GRADE A</strong></span>
                    <button
                      onClick={() => window.print()}
                      className="text-purple-300 hover:text-white underline cursor-pointer"
                    >
                      Print Audit Certificate ↗
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Quick Switch */}
              <div className="pt-4 border-t border-purple-500/10 flex justify-between items-center text-xs font-mono text-slate-500">
                <span>NEXIIVA INTERACTIVE WORKSTATION v2.4</span>
                <span className="text-slate-400">STEP {activeStep} OF 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
