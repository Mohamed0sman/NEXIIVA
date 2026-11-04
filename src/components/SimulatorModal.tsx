import React, { useEffect } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { InteractiveRefineryConsole } from './InteractiveRefineryConsole';
import { dcsAudio } from '../utils/audio';
import { X, ShieldAlert, MonitorPlay, Maximize2 } from 'lucide-react';

export const SimulatorModal: React.FC = () => {
  const { simulatorModalOpen, setSimulatorModalOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && simulatorModalOpen) {
        dcsAudio.playClick();
        setSimulatorModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [simulatorModalOpen, setSimulatorModalOpen]);

  if (!simulatorModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-7xl max-h-[96vh] bg-[#070B14] border border-slate-700/80 rounded-2xl shadow-[0_25px_80px_-10px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-left relative"
        dir="ltr"
      >
        {/* Top Control Room Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-[#090D16] text-xs font-sans text-slate-300 shrink-0">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-white tracking-wide">
                NEXIIVA // DCS MASTER WORKSTATION #01
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                LEVEL 3 AIR-GAPPED DMZ
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden md:inline-block text-[11px] font-mono text-slate-500">
              [ESC] to exit
            </span>
            <button
              onClick={() => {
                dcsAudio.playClick();
                setSimulatorModalOpen(false);
              }}
              className="px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-red-500/20 hover:text-red-300 border border-slate-700 hover:border-red-500/50 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Close Simulator"
            >
              <X className="w-4 h-4" />
              <span>{isRTL ? 'إغلاق المحاكي' : 'Close Simulator'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Simulator Body */}
        <div className="overflow-y-auto flex-1 p-2 sm:p-4 bg-[#070B14]">
          <InteractiveRefineryConsole />
        </div>
      </div>
    </div>
  );
};
