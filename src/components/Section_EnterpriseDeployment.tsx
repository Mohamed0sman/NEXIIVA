import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';

export const Section_EnterpriseDeployment: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].deployment;

  return (
    <section id="deployment" className="py-28 px-6 lg:px-12 relative border-t border-purple-500/10">
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

        {/* 2 Spacious Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: 100% Air-Gapped On-Premise */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0F22]/70 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-500/60 shadow-stage-glow transition-all duration-300 flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">
                  {t.card1Badge}
                </span>
                <span className="text-xs font-mono text-slate-500">{t.card1Status}</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {t.card1Title}
                </h3>
                <div className="text-xs font-mono text-purple-300/90 mt-1">
                  {t.card1Sub}
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {t.card1Desc}
              </p>

              {/* Technical Security Guarantees */}
              <div className="space-y-3 pt-4 border-t border-purple-500/10 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Zero outbound internet connection or API telemetry</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% confidentiality: P&IDs and tag names stay on-site</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Perpetual license model ($5,320 launch price for 3 stations)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Strict ISA/IEC 62443 industrial network compliance</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                dcsAudio.playClick();
                setPilotDrawerOpen(true);
              }}
              className="w-full py-3.5 rounded-full bg-brand-gradient text-white text-xs font-bold font-mono uppercase tracking-wider shadow-brand-glow hover:opacity-95 transition-all cursor-pointer"
            >
              {t.card1Btn}
            </button>
          </div>

          {/* Card 2: Isolated Private Cloud */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0F22]/70 backdrop-blur-xl border border-purple-500/20 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40">
                  {t.card2Badge}
                </span>
                <span className="text-xs font-mono text-slate-500">{t.card2Status}</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {t.card2Title}
                </h3>
                <div className="text-xs font-mono text-blue-300/90 mt-1">
                  {t.card2Sub}
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {t.card2Desc}
              </p>

              {/* Technical Cloud Specs */}
              <div className="space-y-3 pt-4 border-t border-purple-500/10 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Instant access without local server procurement</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>TLS 1.3 encrypted sessions & multi-operator role control</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Enterprise SaaS: $5,180 Year-1 launch ($800 for 90-day pilot)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>Automated cloud backups of student scores and certificates</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                dcsAudio.playClick();
                setPilotDrawerOpen(true);
              }}
              className="w-full py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/30 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              {t.card2Btn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
