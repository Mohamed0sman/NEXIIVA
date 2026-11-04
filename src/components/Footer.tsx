import React from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

export const Footer: React.FC = () => {
  const { setPilotDrawerOpen } = useSimulationJourney();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04060E] border-t border-purple-500/10 py-16 px-6 lg:px-12 text-slate-400 font-sans text-xs">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <NexiivaLogo height={30} />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Industrial Process Operator Training Simulator (OTS). Built to make plant-specific simulation accessible to every refinery, gas plant, and chemical facility in Egypt, the Gulf, and Africa.
            </p>
            <div className="text-purple-300 font-mono text-[11px] font-semibold">
              Entrepreneurs Investment Program (EIP) · GEF 2026 Cairo Official Showcase
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              NAVIGATION
            </div>
            <div className="flex flex-col space-y-2 text-slate-400">
              <button onClick={() => scrollTo('simulator-stage')} className="text-left hover:text-white transition-colors cursor-pointer">
                Simulator Workstation
              </button>
              <button onClick={() => scrollTo('pid-scanner')} className="text-left hover:text-purple-300 transition-colors cursor-pointer text-purple-300">
                ⚡ AI P&ID Engine
              </button>
              <button onClick={() => scrollTo('equipment-codex')} className="text-left hover:text-cyan-300 transition-colors cursor-pointer">
                387 Equipment Codex
              </button>
              <button onClick={() => scrollTo('metrics')} className="text-left hover:text-white transition-colors cursor-pointer">
                Performance & Economics
              </button>
              <button onClick={() => scrollTo('journey')} className="text-left hover:text-white transition-colors cursor-pointer">
                3-Step Lifecycle
              </button>
              <button onClick={() => scrollTo('deployment')} className="text-left hover:text-white transition-colors cursor-pointer">
                Air-Gapped & Cloud
              </button>
              <button onClick={() => scrollTo('comparison')} className="text-left hover:text-white transition-colors cursor-pointer">
                TCO & ROI Calculator
              </button>
              <button onClick={() => scrollTo('pricing')} className="text-left hover:text-white transition-colors cursor-pointer">
                Commercial Tracks
              </button>
            </div>
          </div>

          {/* Leadership & Contact (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              FOUNDER & TECHNICAL OFFICE
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="font-semibold text-white">Eng. Mostafa Adel</div>
              <div className="text-slate-400 text-xs">Founder & Lead Process Architect</div>
              <div className="text-slate-500 text-[11px]">
                Ex-MIDOR Refinery, Sanmar Chemicals, Agiba Petroleum, Port Harcourt
              </div>
              <div className="pt-3">
                <button
                  onClick={() => setPilotDrawerOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-brand-gradient text-white text-xs font-semibold shadow-brand-glow hover:opacity-95 transition-all cursor-pointer"
                >
                  Request 90-Day Pilot ($800) →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Security Notice */}
        <div className="border-t border-purple-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © 2026 NEXIIVA SIMULATION TECHNOLOGIES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-3 font-mono">
            <span>100% AIR-GAPPED COMPLIANT</span>
            <span>·</span>
            <span>ISA-88 / ISA-106 EMULATION</span>
            <span>·</span>
            <span className="text-purple-400">CAIRO, EGYPT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
