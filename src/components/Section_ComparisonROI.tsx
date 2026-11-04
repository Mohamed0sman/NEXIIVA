import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { ArrowRight, ShieldAlert, TrendingDown } from 'lucide-react';

export const Section_ComparisonROI: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].economics;
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
    <section id="economics" className="py-24 px-6 lg:px-12 relative bg-[#fafafb] border-t border-[#ececec]">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Section Header: Steep Editorial Serif Headline */}
        <div className="max-w-3xl space-y-4 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="text-xs font-sans text-[#979799] tracking-wider uppercase">
            {isRTL ? 'الجدوى الاقتصادية والوفر المالي' : 'ECONOMIC CASUALTY & BOARDROOM ANALYSIS'}
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-normal text-[#17191c] tracking-[-0.02em] leading-[1.2] ${
              isRTL ? 'font-serif-ar' : 'font-serif'
            }`}
          >
            {isRTL ? (
              <>
                لماذا تعمل 80% من مصافي النفط والغاز{' '}
                <span className="italic text-[#5d2a1a]">بدون محاكيات تشغيل؟</span>
              </>
            ) : (
              <>
                Why 80% of refinery units operate{' '}
                <span className="italic text-[#5d2a1a]">without simulators.</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-[#777b86] font-sans font-normal leading-[1.45]">
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Signature Steep Accent Peach Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* The Accent Peach Card: kraft-paper effect, exactly as in Steep reference */}
            <div className="bg-[#fbe1d1] rounded-[24px] p-8 sm:p-10 border border-[#f5cbb3] space-y-6">
              <div className="text-xs font-sans text-[#5d2a1a]/70 uppercase tracking-widest font-medium">
                {isRTL ? 'حقيقة قطاع التكرير الميدانية' : 'THE UNPLANNED OUTAGE CASUALTY'}
              </div>

              <div className="text-2xl sm:text-[26px] font-sans font-normal text-[#5d2a1a] leading-tight tracking-[-0.015em]">
                {isRTL
                  ? '«ساعة التوقف الواحدة تكلف بين 35 إلى 50 ألف دولار من الإنتاج المهدور وغرامات الشعلة.»'
                  : '"Unplanned refinery downtime costs $35,000 to $50,000 every single hour in lost throughput and flaring penalties."'}
              </div>

              <p className="text-sm text-[#5d2a1a]/85 leading-relaxed font-sans">
                {isRTL
                  ? 'شركات المحاكاة القديمة تفرض 110 ألف دولار وفترة انتظار 9 أشهر لكل وحدة. في الثالثة فجراً، عندما تتعطل مضخة خام حيوية، يضطر المشغل للتعلم عبر أخطاء كارثية تؤدي لتوقف اضطراري. استثمار نكسيفا يسترد قيمته بالكامل من أول حادثة يتم تفاديها.'
                  : 'Legacy simulation cartels force plants to choose between extreme consulting costs ($110K+) or training new operators on live, hazardous hydrocarbons. NEXIIVA pays for itself tenfold on the very first emergency trip your operators successfully manage.'}
              </p>

              <div className="pt-4 border-t border-[#5d2a1a]/20 flex items-center justify-between text-xs font-mono text-[#5d2a1a]">
                <span>PAYBACK PERIOD</span>
                <span className="font-bold underline decoration-[#5d2a1a]">
                  {isRTL ? 'من أول أزمة يتم تفاديها' : 'FIRST AVERTED UPSET'}
                </span>
              </div>
            </div>

            {/* Quiet Feature Callout */}
            <div className="bg-white rounded-[24px] p-6 border border-[#ececec] shadow-subtle space-y-2">
              <span className="text-xs text-[#979799] font-sans block uppercase">CAPEX DISRUPTION</span>
              <div className="text-2xl font-normal text-[#17191c]">90% Capital Saved</div>
              <p className="text-xs text-[#777b86] leading-relaxed">
                {isRTL
                  ? 'توليد النماذج آلياً يقضي على رسوم الاستشارات المرهقة ويوفر التدريب لكل مهندس ومشغل في المصفاة.'
                  : 'Automated flowsheet compilation eliminates months of billable manual coding.'}
              </p>
            </div>
          </div>

          {/* Right Column: Clean White Artifact Cards for Comparison & Sliders (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Table Artifact */}
            <div className="bg-white rounded-[24px] border border-[#ececec] shadow-artifact overflow-hidden">
              <div className="px-6 py-4 border-b border-[#f2f2f3] flex items-center justify-between">
                <span className="text-xs font-sans text-[#777b86] uppercase tracking-wider">
                  COMMERCIAL & TECHNICAL BENCHMARK
                </span>
                <span className="text-[11px] font-mono text-[#059669] font-medium bg-[#ecfdf5] px-2 py-0.5 rounded-full">
                  VERIFIED DATA
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse min-w-[480px]">
                  <thead>
                    <tr className="border-b border-[#ececec] text-[#777b86] text-[11px]">
                      <th className="p-4 font-normal">SPECIFICATION</th>
                      <th className="p-4 font-normal">LEGACY VENDORS</th>
                      <th className="p-4 font-medium text-[#17191c] bg-[#fafafb]">
                        NEXIIVA PLATFORM
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2f2f3] text-[#17191c] text-xs">
                    <tr>
                      <td className="p-4 font-medium text-[#17191c]">First-Year CapEx</td>
                      <td className="p-4 text-[#777b86]">~$110,000+ / unit</td>
                      <td className="p-4 font-medium text-[#059669] bg-[#fafafb]">
                        ~$5,180 total (or $800 Pilot)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-[#17191c]">Build Velocity</td>
                      <td className="p-4 text-[#777b86]">6 to 9 Months</td>
                      <td className="p-4 font-medium text-[#17191c] bg-[#fafafb]">
                        ~1 Week (7 Days)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-[#17191c]">Refinery Air-Gap</td>
                      <td className="p-4 text-[#777b86]">Complex vendor lock-in</td>
                      <td className="p-4 font-medium text-[#17191c] bg-[#fafafb]">
                        100% Offline 2U Server
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-[#17191c]">Annual Maintenance</td>
                      <td className="p-4 text-[#777b86]">$25,000+ / year</td>
                      <td className="p-4 font-medium text-[#5d2a1a] bg-[#fafafb]">
                        $800 / year flat
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive ROI Calculator Card */}
            <div className="bg-white rounded-[24px] border border-[#ececec] shadow-artifact p-6 sm:p-8 space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f2f2f3] pb-4">
                <div>
                  <h3 className="text-xl font-normal text-[#17191c] tracking-tight font-sans">
                    {t.calcTitle}
                  </h3>
                  <p className="text-xs text-[#777b86] mt-0.5">{t.calcSub}</p>
                </div>
                <span className="text-xs font-sans px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] font-medium border border-[#a7f3d0] shrink-0">
                  {percentSaved}% CAPEX SAVED
                </span>
              </div>

              {/* Sliders in Steep Clean Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#f2f2f3] rounded-[16px] p-4 space-y-2">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#17191c] font-medium">{t.sliderUnits}</span>
                    <span className="font-mono text-[#5d2a1a] font-bold">{numUnits} Units</span>
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
                    className="w-full accent-[#17191c] bg-[#e2e2e4] h-1.5 cursor-pointer rounded-full"
                  />
                  <div className="flex justify-between text-[10px] text-[#979799]">
                    <span>1 Unit</span>
                    <span>5 Units</span>
                    <span>10 Units</span>
                  </div>
                </div>

                <div className="bg-[#f2f2f3] rounded-[16px] p-4 space-y-2">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#17191c] font-medium">{t.sliderOperators}</span>
                    <span className="font-mono text-[#17191c] font-bold">{numOperators} Operators</span>
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
                    className="w-full accent-[#17191c] bg-[#e2e2e4] h-1.5 cursor-pointer rounded-full"
                  />
                  <div className="flex justify-between text-[10px] text-[#979799]">
                    <span>4 Shifts</span>
                    <span>25 Operators</span>
                    <span>50 Operators</span>
                  </div>
                </div>
              </div>

              {/* Readout Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f2f2f3] p-4 rounded-[16px] text-center font-sans">
                <div>
                  <div className="text-[11px] text-[#777b86] uppercase">{t.legacyCost}</div>
                  <div className="text-lg font-normal text-[#979799] line-through mt-0.5 font-mono">
                    ${totalLegacy.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-[#059669] uppercase font-medium">{t.capexSaved}</div>
                  <div className="text-2xl font-normal text-[#059669] mt-0.5 font-mono">
                    ${capexSaved.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-[#5d2a1a] uppercase font-medium">DOWNTIME RISK AVERTED</div>
                  <div className="text-lg font-normal text-[#5d2a1a] mt-0.5 font-mono">
                    ${downtimeAverted.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className="btn-pill-filled w-full py-3.5 text-[15px] cursor-pointer"
              >
                <span>Request Boardroom Pilot Proposal ($800)</span>
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
