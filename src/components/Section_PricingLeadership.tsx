import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Check, Shield, User, Building, Mail, Sliders } from 'lucide-react';

export const Section_PricingLeadership: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';
  const tPricing = translations[language].pricing;
  const tFounder = translations[language].founder;
  const tForm = translations[language].bottomForm;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [unit, setUnit] = useState('CDU/VDU (Crude & Vacuum Distillation)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dcsAudio.playVictory();
    setSubmitted(true);
  };

  return (
    <section id="pricing" className="py-24 px-6 lg:px-12 relative border-t border-slate-200 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-sans text-[#4F46E5] font-bold uppercase tracking-wider">
              {tPricing.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.18] font-sans">
              {tPricing.headingMain}{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                {tPricing.headingItalic}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] font-sans font-normal leading-relaxed">
              {tPricing.subheading}
            </p>
          </div>
          <div className="text-right text-xs font-mono text-[#64748B] shrink-0" dir="ltr">
            <div>CONTRACT CODE: B2B-OTS-2026</div>
            <div>STATUS: 30% LAUNCH DISCOUNT ACTIVE</div>
          </div>
        </div>

        {/* 1. 4 Commercial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" dir={isRTL ? 'rtl' : 'ltr'}>
          {tPricing.cards.map((card, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-6 relative text-left ${
                card.featured
                  ? 'bg-white border-2 border-[#4F46E5] shadow-[0_20px_45px_-15px_rgba(79,70,229,0.2)]'
                  : 'bg-white border-slate-200 shadow-sm hover:border-[#4F46E5]/40'
              }`}
            >
              {card.featured && (
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                  {card.badge}
                </div>
              )}

              <div className="space-y-4">
                {!card.featured && (
                  <span className="text-[10px] font-sans text-[#64748B] uppercase tracking-widest block font-medium">
                    {card.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-[#0B1120] tracking-tight font-sans">{card.name}</h3>
                  <div className="text-3xl font-extrabold font-sans text-[#0B1120] mt-2 flex items-baseline gap-1">
                    <span>{card.price}</span>
                  </div>
                  <div className="text-xs text-[#64748B] font-sans mt-0.5 leading-snug">{card.period}</div>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed border-t border-slate-100 pt-3 font-sans">
                  {card.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-[#0B1120]">
                  {card.bullets.map((bullet, bi) => (
                    <div key={bi} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                      <span className="leading-tight text-[11px] text-[#64748B]">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className={`w-full py-2.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                  card.featured
                    ? 'bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)]'
                    : 'bg-white text-[#0B1120] border border-slate-300 hover:border-[#4F46E5] hover:text-[#4F46E5]'
                }`}
              >
                {card.cta}
              </button>
            </div>
          ))}
        </div>

        {/* 2. The Founder Dossier */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8 sm:p-10 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Founder Avatar & Badge */}
            <div className="lg:col-span-3 text-center space-y-3">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 flex flex-col items-center justify-center text-[#4F46E5]">
                <span className="text-2xl font-bold font-sans">MA</span>
                <span className="text-[9px] font-sans text-[#4F46E5] uppercase tracking-wider font-semibold">FOUNDER</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0B1120] font-sans">Eng. Mostafa Adel</h4>
                <p className="text-xs text-[#64748B] font-sans">Founder & CEO — Lead Process OTS Architect</p>
              </div>
            </div>

            {/* Field Pedigree Narrative */}
            <div className={`lg:col-span-9 space-y-4 text-left ${isRTL ? 'lg:border-r border-slate-100 lg:pr-8' : 'lg:border-l border-slate-100 lg:pl-8'}`}>
              <div className="flex items-center space-x-2 text-xs font-sans text-[#059669] font-semibold">
                <Shield className="w-4 h-4" />
                <span>{tFounder.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1120] tracking-tight font-sans">
                {tFounder.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed font-sans">
                {tFounder.body}
              </p>

              {/* Verified Plants Ribbon */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans text-[#64748B]">
                {tFounder.verified.map((plant, pi) => (
                  <span
                    key={pi}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                  >
                    {plant}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Streamlined Fast-Track Pilot Request */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8 sm:p-12 relative overflow-hidden max-w-3xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-sans text-[#4F46E5] uppercase tracking-widest block font-semibold">
              {isRTL ? 'حجز اختبار تجريبي خلال 24 ساعة' : '24-HOUR PILOT INTAKE'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1120] tracking-tight font-sans">
              {tForm.headingMain}{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                {tForm.headingItalic}
              </span>
            </h3>
            <p className="text-sm text-[#64748B] max-w-xl mx-auto font-sans leading-relaxed">
              {tForm.subheading}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-2xl">
                ✓
              </div>
              <h4 className="text-xl font-bold text-[#0B1120] font-sans">
                {isRTL ? 'تم استلام طلبك بنجاح' : 'Demo & Pilot Request Received'}
              </h4>
              <p className="text-xs text-[#64748B] max-w-md mx-auto font-sans leading-relaxed">
                {isRTL
                  ? 'سيتواصل معك م. مصطفى عادل أو الفريق الفني خلال 24 ساعة عبر البريد الإلكتروني لتنسيق العرض الحي ومناقشة تفاصيل الوحدة.'
                  : 'Eng. Mostafa Adel or our technical team will reach out within 24 hours to schedule the live CDU/VDU walkthrough and discuss your unit specifications.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#64748B] flex items-center space-x-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'الاسم الكامل والمنصب الفني' : 'Full Name & Operational Title'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRTL ? 'م. طارق منصور — مشرف غرفة التحكم' : 'Eng. Tarek Mansour — Lead DCS Supervisor'}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#64748B] flex items-center space-x-1.5 font-medium">
                    <Building className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'اسم المصفاة أو الشركة' : 'Refinery / Operating Entity'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={isRTL ? 'مصفاة الشرق الأوسط (ميدور) / الهيئة العامة للبترول' : 'Middle East Oil Refinery (MIDOR) / EGPC'}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#64748B] flex items-center space-x-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'البريد الإلكتروني للعمل' : 'Corporate / Plant Work Email'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tarek.mansour@refinery.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#64748B] flex items-center space-x-1.5 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'الوحدة المستهدفة للاختبار' : 'Target Refinery Unit for Pilot'}</span>
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all cursor-pointer"
                  >
                    <option>CDU/VDU (Crude & Vacuum Distillation)</option>
                    <option>Hydrocracker Unit (HCU)</option>
                    <option>Delayed Coker Unit (DCU)</option>
                    <option>Continuous Catalytic Reformer (CCR)</option>
                    <option>Amine Gas Sweetening & Claus SRU</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-sm font-semibold mt-3 cursor-pointer bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] transition-all flex items-center justify-center space-x-2"
              >
                <span>{tForm.button}</span>
                <span className="ml-2">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
