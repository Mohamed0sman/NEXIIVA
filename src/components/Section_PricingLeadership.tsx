import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Check, Shield, User, Building, Mail, Phone, Sliders, ArrowRight, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export const Section_PricingLeadership: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';
  const tSub = translations[language].howToSubscribe;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState('CDU/VDU (Crude & Vacuum Distillation)');
  const [deployment, setDeployment] = useState('Air-Gapped On-Premise');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="subscribe" className="py-24 px-6 lg:px-12 relative border-t border-slate-200 bg-white">
      <div className="max-w-[1240px] mx-auto space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider">
            {tSub.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.18] font-sans">
            {tSub.headingMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
              {tSub.headingItalic}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-sans font-normal leading-relaxed">
            {tSub.subheading}
          </p>
        </div>

        {/* 1. The 4-Step Onboarding Roadmap */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
              {isRTL ? 'مراحل الانضمام من اليوم الأول حتى التشغيل الفعلي' : 'ENTERPRISE ONBOARDING PHASES // DAY 1 TO RUNTIME'}
            </span>
            <span className="text-xs font-mono text-[#4F46E5] font-semibold">
              {isRTL ? 'منهجية معتمدة ومجرّبة' : 'STANDARDIZED WORKFLOW'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {tSub.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#4F46E5]/40 transition-colors text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#4F46E5] border border-indigo-100 font-semibold">
                      {step.timeline}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1120] font-sans leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center space-x-1.5 space-x-reverse text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{isRTL ? 'مخرجات هندسية واضحة' : 'Documented Deliverable'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Commercial Subscription & Licensing Tracks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3" dir={isRTL ? 'rtl' : 'ltr'}>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
              {isRTL ? 'مسارات الترخيص والاشتراك المرنة' : 'ENTERPRISE LICENSING & SUBSCRIPTION TRACKS'}
            </span>
            <span className="text-xs font-mono text-slate-500">
              {isRTL ? 'خيارات سحابية ومحلية معزولة' : 'CLOUD & AIR-GAPPED ON-PREM'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" dir={isRTL ? 'rtl' : 'ltr'}>
            {tSub.tracks.map((card, idx) => (
              <div
                key={idx}
                className={`p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-6 relative text-left ${
                  card.featured
                    ? 'bg-white border-2 border-[#4F46E5] shadow-[0_20px_45px_-15px_rgba(79,70,229,0.2)]'
                    : 'bg-[#F8FAFC] border-slate-200 shadow-xs hover:border-[#4F46E5]/40 hover:bg-white'
                }`}
              >
                {card.featured && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                    {card.badge}
                  </div>
                )}

                <div className="space-y-4">
                  {!card.featured && (
                    <span className="text-[10px] font-sans text-slate-500 uppercase tracking-widest block font-medium">
                      {card.badge}
                    </span>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-[#0B1120] tracking-tight font-sans">{card.name}</h3>
                    <div className="text-xl font-extrabold font-sans text-[#0B1120] mt-2 flex items-baseline gap-1">
                      <span>{card.price}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-sans mt-0.5 leading-snug">{card.period}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/70 pt-3 font-sans">
                    {card.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200/70 text-xs text-[#0B1120]">
                    {card.bullets.map((bullet, bi) => (
                      <div key={bi} className="flex items-start space-x-2 space-x-reverse">
                        <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                        <span className="leading-tight text-[11px] text-slate-600">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setPilotDrawerOpen(true)}
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
        </div>

        {/* 3. Direct Enterprise Subscription Request Form */}
        <div className="rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm p-8 sm:p-12 relative overflow-hidden max-w-3xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono text-[#4F46E5] uppercase tracking-widest block font-bold">
              {isRTL ? 'طلب الاشتراك وحجز الاستشارة الفنية' : 'DIRECT ENTERPRISE SUBSCRIPTION INTAKE'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1120] tracking-tight font-sans">
              {tSub.form.headingMain}{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                {tSub.form.headingItalic}
              </span>
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto font-sans leading-relaxed">
              {tSub.form.subheading}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-white border border-emerald-300 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                ✓
              </div>
              <h4 className="text-2xl font-bold text-[#0B1120] font-sans">
                {isRTL ? 'تم استلام طلب الاشتراك بنجاح' : 'Subscription Request Received'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-sans leading-relaxed">
                {isRTL
                  ? `شكراً لك ${name || 'باشمهندس'}! تم تسجيل طلب مصفاة/شركة (${company || 'منشأتكم'}). سيتواصل معك م. مصطفى عادل ومكتبنا الهندسي خلال 24 ساعة لتنسيق جلسة استكشاف النطاق وإرسال مسودة اتفاقية السرية NDA.`
                  : `Thank you ${name || 'Engineer'}! Your subscription inquiry for (${company || 'your facility'}) has been received. Eng. Mostafa Adel and our simulation desk will contact you within 24 hours to coordinate your technical scoping session and provide the mutual NDA.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setCompany('');
                  setEmail('');
                  setPhone('');
                }}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                {isRTL ? 'إرسال طلب لمنشأة أو وحدة أخرى' : 'Submit Another Request'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 flex items-center space-x-1.5 space-x-reverse font-medium">
                    <User className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'الاسم الكامل والمنصب الفني' : 'Full Name & Operational Title'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRTL ? 'م. طارق منصور — مدير العمليات' : 'Eng. Tarek Mansour — Operations Superintendent'}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 flex items-center space-x-1.5 space-x-reverse font-medium">
                    <Building className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'اسم المصفاة أو الشركة' : 'Refinery / Operating Entity'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={isRTL ? 'مصفاة الشرق الأوسط (ميدور) / أرامكو / سابك' : 'Middle East Oil Refinery (MIDOR) / Aramco / SABIC'}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 flex items-center space-x-1.5 space-x-reverse font-medium">
                    <Mail className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'البريد الإلكتروني للعمل' : 'Corporate / Plant Work Email'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tarek.mansour@refinery.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 flex items-center space-x-1.5 space-x-reverse font-medium">
                    <Phone className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 100 000 0000"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 flex items-center space-x-1.5 space-x-reverse font-medium">
                    <Sliders className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'الوحدة المستهدفة للاشتراك' : 'Target Process Unit'}</span>
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all cursor-pointer"
                  >
                    <option>CDU/VDU (Crude & Vacuum Distillation)</option>
                    <option>Hydrocracker Unit (HCU)</option>
                    <option>Delayed Coker Unit (DCU)</option>
                    <option>Continuous Catalytic Reformer (CCR)</option>
                    <option>Amine Gas Sweetening & Claus SRU</option>
                    <option>Ethylene / Petrochemical Unit</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 flex items-center space-x-1.5 space-x-reverse font-medium">
                    <Shield className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>{isRTL ? 'نموذج النشر المفضل' : 'Deployment Preference'}</span>
                  </label>
                  <select
                    value={deployment}
                    onChange={(e) => setDeployment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] text-[#0B1120] text-sm outline-none transition-all cursor-pointer"
                  >
                    <option>Air-Gapped On-Premise (100% Offline)</option>
                    <option>Managed Private Cloud</option>
                    <option>Hybrid On-Prem / Cloud</option>
                    <option>Training Academy / Multi-Seat</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-sm font-semibold mt-4 cursor-pointer bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] transition-all flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>{tSub.form.button}</span>
                <span>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
