import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Check, Shield, User, Building, Mail, Phone, Sliders, ArrowRight, Calendar, FileText, CheckCircle2, Lock, Sparkles, Send, MessageSquare } from 'lucide-react';
import { dispatchFormSubmission, RECIPIENT_EMAIL } from '../utils/contactDispatcher';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ mailtoUrl: string; whatsappUrl: string; body: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await dispatchFormSubmission({
      fullName: name,
      company: company,
      email: email,
      phone: phone,
      targetUnit: unit,
      deploymentPreference: deployment,
      source: 'Subscription Form',
    });
    setSubmissionResult(res);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="subscribe" className="py-24 px-6 lg:px-12 relative border-t border-slate-200 bg-white">
      {/* Precision Background Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest font-sans">
            {tSub.eyebrow}
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight leading-[1.2] font-sans">
            {tSub.headingMain}{' '}
            <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent inline-block">
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
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
              {isRTL ? 'مراحل الانضمام من اليوم الأول حتى التشغيل الفعلي' : 'ENTERPRISE ONBOARDING PHASES // DAY 1 TO RUNTIME'}
            </span>
            <span className="text-xs font-sans text-[#4F46E5] font-semibold bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              {isRTL ? 'منهجية معتمدة ومجرّبة' : 'STANDARDIZED WORKFLOW'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {tSub.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-5 hover:border-[#4F46E5]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-left relative group"
              >
                {/* Step Top Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                      {step.number}
                    </span>
                    <span className="text-xs font-sans px-3 py-1 rounded-full bg-indigo-50/90 text-[#4F46E5] border border-indigo-100 font-semibold shadow-2xs">
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

                <div className="pt-3.5 border-t border-slate-200/60 flex items-center space-x-1.5 space-x-reverse text-[11px] font-medium text-emerald-600">
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
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
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
                className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative text-left ${
                  card.featured
                    ? 'bg-white border-2 border-[#4F46E5] shadow-[0_20px_45px_-15px_rgba(79,70,229,0.25)] hover:-translate-y-1'
                    : 'bg-[#F8FAFC] border-slate-200 shadow-xs hover:border-[#4F46E5]/40 hover:bg-white hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {card.featured && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-[10px] font-sans font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
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

                  <div className="space-y-2.5 pt-2 border-t border-slate-200/70 text-xs text-[#0B1120]">
                    {card.bullets.map((bullet, bi) => (
                      <div key={bi} className="flex items-start space-x-2 space-x-reverse">
                        <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                        <span className="leading-tight text-[11px] text-slate-600 font-sans">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setPilotDrawerOpen(true)}
                  className={`w-full py-3 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
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
        <div className="rounded-3xl bg-gradient-to-b from-[#F8FAFC] to-white border border-slate-200 shadow-md p-8 sm:p-12 relative overflow-hidden max-w-3xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB]" />

          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono text-[#4F46E5] uppercase tracking-widest block font-bold bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-200/60">
              {isRTL ? 'طلب الاشتراك وحجز الاستشارة الفنية' : 'DIRECT ENTERPRISE SUBSCRIPTION INTAKE'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1120] tracking-tight font-sans">
              {tSub.form.headingMain}{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent inline-block">
                {tSub.form.headingItalic}
              </span>
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto font-sans leading-relaxed">
              {tSub.form.subheading}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-300 shadow-lg text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-3xl shadow-lg">
                ✓
              </div>
              
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-[#0B1120] font-sans">
                  {isRTL ? 'تم استلام وتوجيه طلبك بنجاح' : 'Request Successfully Routed'}
                </h4>
                <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-medium">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{RECIPIENT_EMAIL}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-sans leading-relaxed">
                {isRTL
                  ? `شكراً لك ${name || 'باشمهندس'}! تم توجيه كافة تفاصيل الطلب لمصفاة/شركة (${company || 'منشأتكم'}) إلى البريد المباشر لم. مصطفى عادل (${RECIPIENT_EMAIL}). سيتواصل معكم مكتبنا الهندسي خلال 24 ساعة لتنسيق جلسة استكشاف النطاق وإرسال اتفاقية السرية NDA.`
                  : `Thank you ${name || 'Engineer'}! All inquiry details for (${company || 'your facility'}) have been routed directly to Eng. Mostafa Adel's inbox (${RECIPIENT_EMAIL}). Our engineering desk will contact you within 24 hours to schedule the scoping session and provide the mutual NDA.`}
              </p>

              {/* Instant Direct Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={submissionResult?.mailtoUrl || `mailto:${RECIPIENT_EMAIL}`}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white text-xs font-semibold flex items-center space-x-2 space-x-reverse shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isRTL ? 'فتح تطبيق البريد والتأكيد' : 'Open in Email Client & Confirm'}</span>
                </a>

                {submissionResult?.whatsappUrl && (
                  <a
                    href={submissionResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center space-x-2 space-x-reverse shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isRTL ? 'مراسلة عبر واتساب فوراً' : 'Message on WhatsApp'}</span>
                  </a>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setCompany('');
                    setEmail('');
                    setPhone('');
                    setSubmissionResult(null);
                  }}
                  className="px-6 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {isRTL ? 'إرسال طلب لمنشأة أو وحدة أخرى' : 'Submit Another Request'}
                </button>
              </div>
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
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400 shadow-2xs"
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
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400 shadow-2xs"
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
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400 shadow-2xs"
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
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 text-[#0B1120] text-sm outline-none transition-all placeholder:text-slate-400 shadow-2xs"
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
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 text-[#0B1120] text-sm outline-none transition-all cursor-pointer shadow-2xs"
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
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 text-[#0B1120] text-sm outline-none transition-all cursor-pointer shadow-2xs"
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
                className="w-full py-4 rounded-full text-sm font-semibold mt-4 cursor-pointer bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>{tSub.form.button}</span>
                <span>→</span>
              </button>

              <div className="pt-2 text-center flex items-center justify-center space-x-1.5 space-x-reverse text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {isRTL
                    ? 'كافة المخططات والبيانات الهندسية مشفرة ومحمية بموجب اتفاقية سرية المعلومات (NDA) الثنائية.'
                    : 'All technical data and P&IDs are strictly protected under executed mutual NDA.'}
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
