import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { TrendingDown, Zap, Database, ArrowUpRight } from 'lucide-react';

export const Section_Metrics: React.FC = () => {
  const { language } = useSimulationJourney();
  const t = translations[language].metrics;
  const isRTL = language === 'AR';

  return (
    <section id="metrics" className="py-20 px-4 sm:px-6 lg:px-12 relative bg-[#04060E] border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Architectural Section Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-purple-500/15 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-metallic tracking-tight">
              {t.title}
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Executive High-Density Telemetry Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 90% Lower Cost */}
          <div className="rounded-2xl bg-[#070A1A] border border-purple-500/25 p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  {t.m1High}
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black font-mono text-brand-gradient tracking-tight">
                  {t.m1Stat}
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {t.m1Title}
                </div>
                <div className="text-xs font-mono text-purple-300 font-semibold mt-0.5">
                  {t.m1Comp}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {t.m1Desc}
              </p>
            </div>

            <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{isRTL ? 'مقارنة مع UniSim / HYSYS' : 'vs. Legacy UniSim / HYSYS'}</span>
              <span className="text-emerald-400 font-bold">$104K+ Saved / Unit</span>
            </div>
          </div>

          {/* Card 2: ~1 Week Build */}
          <div className="rounded-2xl bg-[#070A1A] border border-purple-500/25 p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  {t.m2High}
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black font-mono text-brand-gradient tracking-tight">
                  {t.m2Stat}
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {t.m2Title}
                </div>
                <div className="text-xs font-mono text-blue-300 font-semibold mt-0.5">
                  {t.m2Comp}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {t.m2Desc}
              </p>
            </div>

            <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{isRTL ? 'السرعة القياسية' : 'Automated P&ID Ingestion'}</span>
              <span className="text-cyan-400 font-bold">95% Faster Delivery</span>
            </div>
          </div>

          {/* Card 3: 387 Equipment Types */}
          <div className="rounded-2xl bg-[#070A1A] border border-purple-500/25 p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300 shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  {t.m3High}
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black font-mono text-brand-gradient tracking-tight">
                  {t.m3Stat}
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {t.m3Title}
                </div>
                <div className="text-xs font-mono text-purple-300 font-semibold mt-0.5">
                  {t.m3Comp}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {t.m3Desc}
              </p>
            </div>

            <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{isRTL ? 'معايير الصناعة' : 'API 520 / ISA-5.1 Certified'}</span>
              <span className="text-purple-300 font-bold">SIL-3 Dynamic Solvers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
