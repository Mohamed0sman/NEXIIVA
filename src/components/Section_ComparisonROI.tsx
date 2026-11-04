import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { ArrowRight, ShieldAlert, TrendingDown } from 'lucide-react';

export const Section_ComparisonROI: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].operationalReality;
  const isRTL = language === 'AR';

  // Interactive Sliders for Boardroom Simulator
  const [numUnits, setNumUnits] = useState(2);
  const [numOperators, setNumOperators] = useState(15);

  // Financial Calculations from real Nexiiva business model
  const legacyUnitCost = 110000;
  const totalLegacy = numUnits * legacyUnitCost;

  const nexiivaUnitCost = 5320;
  const totalNexiiva = numUnits * nexiivaUnitCost;
  const capexSaved = totalLegacy - totalNexiiva;
  const percentSaved = Math.round((capexSaved / totalLegacy) * 100);

  // Downtime avoidance value (1 unplanned shutdown avoided per unit per year = $35,000/hr * 12 hrs = $420,000)
  const downtimeAverted = numUnits * 420000;

  return (
    <section id="operational-reality" className="py-24 px-6 lg:px-12 relative bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Section Header: The Operational Reality */}
        <div className="max-w-3xl space-y-4 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="text-xs font-mono font-bold text-[#4F46E5] tracking-wider uppercase">
            {t.eyebrow}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.2] font-sans">
            {t.headingMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
              {t.headingItalic}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Story Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="bg-gradient-to-b from-purple-500/5 via-indigo-500/5 to-blue-500/5 rounded-2xl p-8 sm:p-10 border border-purple-500/20 space-y-6 shadow-sm">
              <div className="text-xs font-mono text-[#4F46E5] uppercase tracking-widest font-bold">
                {isRTL ? 'التكلفة الحقيقية لاضطراب واحد بدون تدريب' : 'THE REAL COST OF ONE UNPRACTICED UPSET'}
              </div>

              <div className="text-2xl sm:text-[24px] font-sans font-bold text-[#0B1120] leading-tight tracking-tight">
                {t.storyCard.title}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                {t.storyCard.body}
              </p>

              <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>{isRTL ? 'الملاحظة الميدانية' : 'FIELD OBSERVATION'}</span>
                <span className="font-bold text-[#4F46E5]">
                  {t.storyCard.footerStat}
                </span>
              </div>
            </div>

            {/* Quick Fact Callout */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs text-slate-500 font-mono block uppercase">
                {isRTL ? 'أثر الاستثمار السريع' : 'CAPEX DISRUPTION'}
              </span>
              <div className="text-2xl font-bold text-[#0B1120]">
                {isRTL ? 'وفر مالي يتجاوز 90%' : '90% Capital Saved'}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isRTL
                  ? 'يسترد استثمار نكسيفا قيمته بالكامل من أول حادثة تشغيلية طارئة ينجح مشغلو العمليات في تفاديها دون إغلاق الوحدة.'
                  : 'NEXIIVA pays for itself tenfold on the very first emergency trip your operators successfully manage.'}
              </p>
            </div>
          </div>

          {/* Right Column: Nexiiva vs. Legacy Alternatives (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Table Artifact: 4 Columns as per spec */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-left" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  {t.comparison.title}
                </span>
                <span className="text-[11px] font-mono text-[#059669] font-bold bg-[#ecfdf5] px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {isRTL ? 'مقارنة دقيقة' : 'VERIFIED DATA'}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full font-sans text-xs border-collapse min-w-[540px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 text-[11px]">
                      <th className="p-4 font-semibold">{t.comparison.headers[0]}</th>
                      <th className="p-4 font-semibold">{t.comparison.headers[1]}</th>
                      <th className="p-4 font-semibold">{t.comparison.headers[2]}</th>
                      <th className="p-4 font-bold text-[#4F46E5] bg-purple-500/5">
                        {t.comparison.headers[3]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[#0B1120] text-xs">
                    {t.comparison.rows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-4 font-semibold text-[#0B1120]">{row.criteria}</td>
                        <td className="p-4 text-slate-500">{row.largeVendors}</td>
                        <td className="p-4 text-slate-500">{row.specialists}</td>
                        <td className="p-4 font-bold text-[#4F46E5] bg-purple-500/5">
                          {row.nexiiva}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive ROI Calculator Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B1120] tracking-tight font-sans">
                    {isRTL ? 'حاسبة العائد الاستثماري لمجلس إدارة المصفاة' : 'Refinery Boardroom ROI Calculator'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isRTL ? 'حدد عدد وحدات التكرير وطاقم المشغلين لحساب الوفر المالي المباشر' : 'Adjust your refinery capacity and operator fleet to see immediate capital and operational savings.'}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] font-bold border border-[#a7f3d0] shrink-0">
                  {percentSaved}% CAPEX SAVED
                </span>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#F1F5F9] rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#0B1120] font-medium">
                      {isRTL ? 'عدد وحدات التكرير (CDU, VDU, إلخ):' : 'Number of Process Units (CDU, VDU, etc.):'}
                    </span>
                    <span className="font-mono text-[#4F46E5] font-bold">{numUnits} Units</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={numUnits}
                    onChange={(e) => {
                      setNumUnits(parseInt(e.target.value));
                      dcsAudio.playClick();
                    }}
                    className="w-full accent-[#4F46E5] bg-slate-300 h-1.5 cursor-pointer rounded-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1 Unit</span>
                    <span>5 Units</span>
                    <span>10 Units</span>
                  </div>
                </div>

                <div className="bg-[#F1F5F9] rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#0B1120] font-medium">
                      {isRTL ? 'عدد مشغلي الورديات المستهدف تدريبهم:' : 'Number of Frontline Shift Operators to Train:'}
                    </span>
                    <span className="font-mono text-[#4F46E5] font-bold">{numOperators} Operators</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={numOperators}
                    onChange={(e) => {
                      setNumOperators(parseInt(e.target.value));
                      dcsAudio.playClick();
                    }}
                    className="w-full accent-[#4F46E5] bg-slate-300 h-1.5 cursor-pointer rounded-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>4 Shifts</span>
                    <span>25 Operators</span>
                    <span>50 Operators</span>
                  </div>
                </div>
              </div>

              {/* Readout Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F1F5F9] p-4 rounded-xl text-center font-sans">
                <div>
                  <div className="text-[11px] text-slate-500 uppercase">
                    {isRTL ? 'تكلفة البائع التقليدي الكبرى:' : 'LEGACY VENDOR CAPEX:'}
                  </div>
                  <div className="text-lg font-bold text-slate-400 line-through mt-0.5 font-mono">
                    ${totalLegacy.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-[#059669] uppercase font-bold">
                    {isRTL ? 'الوفر الرأسمالي المباشر:' : 'DIRECT CAPITAL SAVED:'}
                  </div>
                  <div className="text-2xl font-black text-[#059669] mt-0.5 font-mono">
                    ${capexSaved.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-[#4F46E5] uppercase font-bold">
                    {isRTL ? 'خطر التوقف المتفادى:' : 'DOWNTIME RISK AVERTED:'}
                  </div>
                  <div className="text-lg font-bold text-[#4F46E5] mt-0.5 font-mono">
                    ${downtimeAverted.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-semibold text-[15px] shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{isRTL ? 'طلب مقترح التجربة الميدانية (800$)' : 'Request Boardroom Pilot Proposal ($800)'}</span>
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
