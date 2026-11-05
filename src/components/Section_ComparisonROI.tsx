import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { ArrowRight, ShieldAlert, TrendingDown, DollarSign, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const Section_ComparisonROI: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].operationalReality;
  const isRTL = language === 'AR';

  // Interactive Sliders for Boardroom Simulator
  const [numUnits, setNumUnits] = useState(2);
  const [numOperators, setNumOperators] = useState(15);

  return (
    <section id="operational-reality" className="py-24 px-6 lg:px-12 relative bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-[1240px] mx-auto space-y-16">
        <div className="max-w-3xl space-y-3 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest font-sans">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.2] font-sans">
            {t.headingMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent inline-block">
              {t.headingItalic}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 2-Column Balanced Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Story Card + Outage Cost Breakdown (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Story Card */}
            <div className="bg-gradient-to-b from-purple-500/5 via-indigo-500/5 to-blue-500/5 rounded-3xl p-8 sm:p-9 border border-purple-500/20 space-y-5 shadow-sm">
              <div className="text-xs font-mono text-[#4F46E5] uppercase tracking-widest font-bold flex items-center space-x-1.5 space-x-reverse">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>{isRTL ? 'التكلفة الحقيقية لاضطراب واحد بدون تدريب' : 'THE REAL COST OF ONE UNPRACTICED UPSET'}</span>
              </div>

              <div className="text-xl sm:text-2xl font-sans font-bold text-[#0B1120] leading-snug tracking-tight">
                {t.storyCard.title}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {t.storyCard.body}
              </p>

              <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>{isRTL ? 'الملاحظة الميدانية' : 'FIELD OBSERVATION'}</span>
                <span className="font-bold text-[#4F46E5]">
                  {t.storyCard.footerStat}
                </span>
              </div>
            </div>

            {/* Outage Breakdown Card */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  {isRTL ? 'تفصيل خسائر الحادثة الواحدة ($150,000+)' : 'TYPICAL SINGLE INCIDENT ANATOMY ($150,000+)'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-600 font-bold border border-rose-200">
                  {isRTL ? 'خسائر يمكن تفاديها' : 'PREVENTABLE'}
                </span>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="font-bold text-[#0B1120]">
                      {isRTL ? 'توقف الإنتاج وحرق النفط بالمدخنة' : 'Lost Throughput & Emergency Flaring'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isRTL ? 'فقدان معدلات تدفق البرج وتكاليف الشعلة' : 'Unit derating & flare environmental loss'}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-rose-600 text-sm">~$70,000</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="font-bold text-[#0B1120]">
                      {isRTL ? 'إصلاحات حرارية وميكانيكية للأفران' : 'Furnace Refractory & Tube Repairs'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isRTL ? 'صدمات حرارية للأنابيب وتلف الحشوات' : 'Thermal shock, coil coking & mechanical seals'}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-rose-600 text-sm">~$50,000</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="font-bold text-[#0B1120]">
                      {isRTL ? 'غرامات تأخير تسليم الشحنات' : 'Off-Spec Product & Contract Penalties'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isRTL ? 'عدم مطابقة مواصفات التقطير للعملاء' : 'Demurrage & export contract penalties'}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-rose-600 text-sm">~$30,000</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                {isRTL
                  ? '* يمكن تفادي هذه الخسائر بالكامل عبر التدريب المسبق للمشغلين على سيناريوهات الطوارئ في محاكي نكسيفا.'
                  : '* Completely avoidable through deliberate simulation rehearsal of upset recovery sequences.'}
              </p>
            </div>
          </div>

          {/* Right Column: Nexiiva vs. Legacy Alternatives + ROI Calculator (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Comparison Artifact: Desktop 4-Col Table + Mobile Responsive Cards */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-left" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  {t.comparison.title}
                </span>
                <span className="text-[11px] font-mono text-[#059669] font-bold bg-[#ecfdf5] px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {isRTL ? 'مقارنة دقيقة' : 'VERIFIED DATA'}
                </span>
              </div>

              {/* Desktop Table View (md and up) */}
              <div className="hidden md:block overflow-x-auto">
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
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
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

              {/* Mobile Card Stack View (below md): 100% legible, zero clipping */}
              <div className="md:hidden divide-y divide-slate-100 p-3 sm:p-4 space-y-3">
                {t.comparison.rows.map((row, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-2.5">
                    <div className="text-xs font-bold font-sans text-slate-900 flex items-center justify-between">
                      <span>{row.criteria}</span>
                      <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                    </div>

                    {/* Nexiiva Winner Card */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80 space-y-1 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#4F46E5] flex items-center space-x-1 space-x-reverse">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                          <span>{t.comparison.headers[3]}</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          {isRTL ? 'الأمثل' : 'OPTIMAL'}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-sans leading-snug">
                        {row.nexiiva}
                      </div>
                    </div>

                    {/* Legacy Alternatives Subdued */}
                    <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-600 pt-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 gap-0.5 sm:gap-2">
                        <span className="text-slate-500 font-medium">{t.comparison.headers[1]}:</span>
                        <span className="font-semibold text-slate-700">{row.largeVendors}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 gap-0.5 sm:gap-2">
                        <span className="text-slate-500 font-medium">{t.comparison.headers[2]}:</span>
                        <span className="font-semibold text-slate-700">{row.specialists}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive ROI Calculator Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1120] tracking-tight font-sans">
                    {isRTL ? 'نموذج محاكاة الكفاءة والجاهزية لمجلس الإدارة' : 'Refinery Boardroom Readiness & Value Model'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isRTL ? 'حدد سعة منشأتك وطاقم المشغلين لعرض مؤشرات الجاهزية والوفر الاستثماري' : 'Adjust your unit capacity and operator fleet to evaluate shift readiness and capital efficiency.'}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] font-bold border border-[#a7f3d0] shrink-0 self-start sm:self-auto">
                  {isRTL ? 'وفر رأسمالي >90%' : '>90% CAPEX EFFICIENCY'}
                </span>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-4.5 space-y-2.5 border border-slate-200/80">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#0B1120] font-medium">
                      {isRTL ? 'عدد وحدات التكرير (CDU, VDU, إلخ):' : 'Number of Process Units (CDU, VDU, etc.):'}
                    </span>
                    <span className="font-mono text-[#4F46E5] font-bold">
                      {numUnits} {isRTL ? 'وحدات' : 'Units'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={numUnits}
                    onChange={(e) => setNumUnits(parseInt(e.target.value))}
                    className="w-full accent-[#4F46E5] bg-slate-300 h-2 cursor-pointer rounded-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>{isRTL ? '1 وحدة' : '1 Unit'}</span>
                    <span>{isRTL ? '5 وحدات' : '5 Units'}</span>
                    <span>{isRTL ? '10 وحدات' : '10 Units'}</span>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-4.5 space-y-2.5 border border-slate-200/80">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#0B1120] font-medium">
                      {isRTL ? 'عدد مشغلي الورديات المستهدف تدريبهم:' : 'Number of Frontline Shift Operators to Train:'}
                    </span>
                    <span className="font-mono text-[#4F46E5] font-bold">
                      {numOperators} {isRTL ? 'مشغلاً' : 'Operators'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={numOperators}
                    onChange={(e) => setNumOperators(parseInt(e.target.value))}
                    className="w-full accent-[#4F46E5] bg-slate-300 h-2 cursor-pointer rounded-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>{isRTL ? '4 ورديات' : '4 Shifts'}</span>
                    <span>{isRTL ? '25 مشغلاً' : '25 Operators'}</span>
                    <span>{isRTL ? '50 مشغلاً' : '50 Operators'}</span>
                  </div>
                </div>
              </div>

              {/* Readout Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 bg-[#F8FAFC] p-4 sm:p-4.5 rounded-2xl text-center font-sans border border-slate-200/80">
                <div className="p-2 sm:p-0">
                  <div className="text-[11px] text-slate-500 uppercase">
                    {isRTL ? 'زمن النشر والجاهزية:' : 'TARGET READINESS:'}
                  </div>
                  <div className="text-xl font-extrabold text-[#0B1120] mt-0.5 font-mono">
                    {isRTL ? '~1 أسبوع' : '~1 Week'}
                  </div>
                </div>

                <div className="p-2 sm:p-0 border-t sm:border-t-0 sm:border-x border-slate-200/80">
                  <div className="text-[11px] text-[#059669] uppercase font-bold">
                    {isRTL ? 'كفاءة الاستثمار المقدرة:' : 'ESTIMATED EFFICIENCY:'}
                  </div>
                  <div className="text-2xl font-black text-[#059669] mt-0.5 font-mono">
                    &gt;90%
                  </div>
                </div>

                <div className="p-2 sm:p-0 border-t sm:border-t-0 border-slate-200/80">
                  <div className="text-[11px] text-[#4F46E5] uppercase font-bold">
                    {isRTL ? 'المرونة التشغيلية:' : 'SHIFT RESILIENCE:'}
                  </div>
                  <div className="text-xl font-bold text-[#4F46E5] mt-0.5 font-mono">
                    {isRTL ? 'جاهزية 100%' : '100% Ready'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPilotDrawerOpen(true)}
                className="w-full min-h-[50px] py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 active:scale-[0.99] text-white font-semibold text-sm sm:text-[15px] shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>{isRTL ? 'طلب مقترح التجربة الميدانية للمنشأة' : 'Request Boardroom Pilot Proposal'}</span>
                <span className={isRTL ? 'rotate-180 inline-block' : 'inline-block'}>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
