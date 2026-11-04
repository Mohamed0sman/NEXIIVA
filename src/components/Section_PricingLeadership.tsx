import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';

export const Section_PricingLeadership: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const t = translations[language].pricing;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [unit, setUnit] = useState('CDU/VDU (Crude & Vacuum Distillation)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dcsAudio.playSuccess();
    setSubmitted(true);
  };

  const pricingTiers = [
    {
      name: '90-Day Refinery Pilot',
      badge: 'ENTRY POINT',
      price: '$800',
      period: 'for 3 months',
      desc: 'Risk-free 3-month validation on your plant data. Test custom flowsheet and first scenario pack with your senior process team.',
      features: [
        '1 Custom Unit Flowsheet Model',
        'First Scenario Pack (Upsets & Trips)',
        'Up to 8 Trainee Accounts',
        'Frontline Process SME Tuning',
        '100% credited toward annual license',
      ],
      popular: true,
      action: 'Start 90-Day Pilot ($800)',
    },
    {
      name: 'Cloud OTS Enterprise',
      badge: 'SAAS',
      price: '$5,180',
      period: 'Year-1 launch ($7.4K list)',
      desc: 'Private cloud simulator for multi-operator continuous training with zero local hardware maintenance.',
      features: [
        '$1,000 setup + $1,000 unit build',
        '$600 2-day instructor training',
        '$800/yr renewal (up to 8 users)',
        '$10 per trainee hour',
        'Automatic cloud scorecards',
      ],
      popular: false,
      action: 'Select Cloud Track',
    },
    {
      name: 'On-Premise Control Room',
      badge: 'AIR-GAPPED',
      price: '$5,320',
      period: 'Year-1 launch ($7.6K list)',
      desc: 'Perpetual license running completely offline inside your plant training academy (1 Server + 3 Stations).',
      features: [
        '$4,000 perpetual unit build',
        '3 Local stations installed ($1K/stn)',
        '$600 2-day on-site training',
        'Zero outbound internet connection',
        '100% P&ID confidentiality',
      ],
      popular: false,
      action: 'Select On-Prem Track',
    },
    {
      name: 'Training Academies',
      badge: 'EDUCATION',
      price: '$100–$500',
      period: 'per trainee',
      desc: '5-day intensive operator certification course packs with automatic rubric grading and signed certificates.',
      features: [
        '$100/trainee on Generic CDU/VDU',
        '$500/trainee on Custom Units',
        'Minimum 5 trainees per cohort',
        'Tamper-evident verification stamp',
        'Academic partner revenue share',
      ],
      popular: false,
      action: 'Inquire for Academies',
    },
  ];

  return (
    <section id="pricing" className="py-28 px-6 lg:px-12 relative border-t border-purple-500/10">
      <div className="max-w-6xl mx-auto space-y-20">
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

        {/* 1. 4 Clean Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-2xl bg-[#0B0F22]/70 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden ${
                tier.popular
                  ? 'border-purple-500/60 shadow-brand-glow bg-[#0D132D]/90'
                  : 'border-purple-500/20 hover:border-blue-500/40'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-brand-gradient text-white text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl tracking-wider">
                  RECOMMENDED
                </div>
              )}

              <div className="space-y-4">
                <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider">
                  {tier.badge}
                </span>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{tier.name}</h3>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                    {tier.price}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{tier.period}</div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed">
                  {tier.desc}
                </p>

                <div className="space-y-2 pt-4 border-t border-purple-500/10 text-xs text-slate-300">
                  {tier.features.map((f, fi) => (
                    <div key={fi} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className={`w-full py-3 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  tier.popular
                    ? 'bg-brand-gradient text-white shadow-brand-glow hover:opacity-95'
                    : 'bg-white/5 hover:bg-white/10 border border-purple-500/30 text-white'
                }`}
              >
                {tier.action}
              </button>
            </div>
          ))}
        </div>

        {/* 2. Sleek Leadership Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0F22]/70 backdrop-blur-xl border border-purple-500/20 shadow-stage-glow">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-2xl text-white shadow-brand-glow shrink-0">
              MA
            </div>

            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                <span>{t.founderBadge}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{t.founderName}</h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                {t.founderBio}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Minimal 4-Field Pilot Request Form */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0B0F22]/90 backdrop-blur-2xl border-2 border-purple-500/40 shadow-stage-glow max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">{t.formTitle}</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              {t.formSub}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-3">
              <div className="text-4xl text-emerald-400">✓</div>
              <div className="text-lg font-bold text-white">Pilot Request Received</div>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Eng. Mostafa Adel's office will reach out within 24 hours to coordinate P&ID intake and NDA signing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-slate-400 font-semibold">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eng. Ahmed Hassan — Operations Lead"
                    className="w-full p-3.5 rounded-xl bg-[#04060E] border border-purple-500/20 focus:border-purple-500 text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-slate-400 font-semibold">{t.companyLabel}</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="MIDOR Refinery / EGPC Affiliate"
                    className="w-full p-3.5 rounded-xl bg-[#04060E] border border-purple-500/20 focus:border-purple-500 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-slate-400 font-semibold">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="a.hassan@midor.com.eg"
                    className="w-full p-3.5 rounded-xl bg-[#04060E] border border-purple-500/20 focus:border-purple-500 text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-slate-400 font-semibold">{t.unitLabel}</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#04060E] border border-purple-500/20 focus:border-purple-500 text-white outline-none"
                  >
                    <option>CDU/VDU (Crude & Vacuum Distillation)</option>
                    <option>Hydrocracker Unit (HCU)</option>
                    <option>Delayed Coking Unit (DCU)</option>
                    <option>Naphtha Hydrotreater & CCR</option>
                    <option>Amine Gas Sweetening & Claus SRU</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-brand-gradient text-white text-xs font-bold uppercase tracking-wider shadow-brand-glow hover:opacity-95 transition-all cursor-pointer mt-2"
              >
                {t.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
