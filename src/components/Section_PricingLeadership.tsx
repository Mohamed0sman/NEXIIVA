import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import {
  Check,
  ShieldCheck,
  User,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Award,
  Send,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { dispatchFormSubmission, RECIPIENT_EMAIL, RECIPIENT_DISPLAY_PHONE, RECIPIENT_INTL_PHONE } from '../utils/contactDispatcher';

export const Section_PricingLeadership: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
      targetUnit: 'CDU/VDU Custom Plant Pilot',
      deploymentPreference: '100% Air-Gapped / Cloud',
      source: 'Subscription Form',
    });
    setSubmissionResult(res);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const pricingCards = [
    {
      id: 'pilot',
      badge: isRTL ? 'التحقق السريع' : 'FAST-TRACK VALIDATION',
      name: isRTL ? 'تجربة الـ 90 يوماً' : '90-Day Validation Pilot',
      price: '$800',
      period: isRTL ? 'دفعة لمرة واحدة / 3 أشهر' : 'One-Time / 3 Months Full Access',
      desc: isRTL
        ? 'تحقق ميداني واقعي على وحدة مصفاتكم الحقيقية مع تدريب طاقمك وإصدار تقارير الاستجابة.'
        : 'Full 3 months plant access, real-unit validation, scenario pack & trainee reports.',
      bullets: [
        isRTL ? 'وصول كامل لمنظومة محاكاة CDU/VDU' : 'Full access to CDU/VDU simulation engine',
        isRTL ? 'حزمة سيناريوهات طوارئ متقدمة' : 'Advanced emergency drill scenario pack',
        isRTL ? 'تقارير تقييم استجابة المشغلين الفردية' : 'Individual operator reaction time audits',
        isRTL ? 'دعم فني واستشاري هندسي مباشر' : 'Direct refinery engineering advisory',
      ],
      cta: isRTL ? 'ابدأ تجربة الـ 90 يوم' : 'Start 90-Day Pilot',
      featured: false,
      borderTop: 'border-t-[#A855F7]',
    },
    {
      id: 'cloud',
      badge: isRTL ? 'الأكثر طلباً للمؤسسات' : 'MOST POPULAR · 30% LAUNCH DISCOUNT',
      name: isRTL ? 'سحابة المؤسسات السنوية' : 'Cloud Enterprise',
      price: '$5,180',
      period: isRTL ? 'السنة الأولى (بدلاً من $7,400)' : 'Year 1 (Special Launch Pricing)',
      desc: isRTL
        ? 'بيئة سحابية خاصة معزولة بالكامل، بناء نموذج مخصص للمصفاة، وتدريب حتى 8 مشغلين.'
        : 'Setup, custom unit build matching your P&IDs, training, up to 8 concurrent users.',
      bullets: [
        isRTL ? 'بناء وحدة مخصصة مطابقة لـ P&ID مصفاتكم' : 'Custom unit synthesized from plant P&IDs',
        isRTL ? 'سحابة مخصصة معزولة وتشفير AES-256' : 'Dedicated single-tenant cloud instance',
        isRTL ? 'حتى 8 حسابات مشغلين وكونسول مدرب' : 'Up to 8 operator seats + instructor console',
        isRTL ? 'تحديثات شهرية لقاعدة الـ 387 معدة' : 'Monthly library updates & support SLA',
      ],
      cta: isRTL ? 'طلب اشتراك السحابة' : 'Subscribe to Cloud OTS',
      featured: true,
      borderTop: 'border-t-[#8E42FE]',
    },
    {
      id: 'onprem',
      badge: isRTL ? 'الأمان المطلق للغرف' : 'AIR-GAPPED · CONTROL ROOM',
      name: isRTL ? 'الترخيص الدائم المعزول' : 'On-Premise Perpetual',
      price: '$5,320',
      period: isRTL ? 'السنة الأولى (تثبيت محلي دائم)' : 'Year 1 (Local Control Room Deployment)',
      desc: isRTL
        ? 'تثبيت محلي كامل داخل غرفة تحكم المصفاة، 3 محطات مشغلين، بدون أي إنترنت.'
        : 'Custom unit build, 3 local stations installed, 100% offline air-gapped runtime.',
      bullets: [
        isRTL ? 'تثبيت محلي كامل على خوادم المصفاة' : '100% local plant server installation',
        isRTL ? '3 محطات تشغيل مشغلين + محطة مدرب' : '3 operator stations + instructor console',
        isRTL ? 'صفر إنترنت: سرية تامة للمخططات' : 'Zero internet: absolute data sovereignty',
        isRTL ? 'ترخيص دائم مع صيانة وتحديثات سنوية' : 'Perpetual runtime license + annual support',
      ],
      cta: isRTL ? 'طلب التثبيت الميداني' : 'Request On-Premise License',
      featured: false,
      borderTop: 'border-t-[#38BDF8]',
    },
    {
      id: 'centers',
      badge: isRTL ? 'لمراكز التدريب والجامعات' : 'TRAINING ACADEMIES',
      name: isRTL ? 'برنامج مراكز التدريب' : 'Training Centers Program',
      price: '$100–$500',
      period: isRTL ? 'لكل متدرب / معسكر تدريبي' : 'Per Trainee / 5-Day Intensive Bootcamp',
      desc: isRTL
        ? 'معسكرات تدريبية عملية مكثفة لـ 5 أيام على وحدات نموذجية أو مخصصة مع شهادات معتمدة.'
        : '5-day certified operator bootcamps on generic or custom units with verified certificates.',
      bullets: [
        isRTL ? 'شهادات كفاءة تشغيلية معتمدة برقم تحقق' : 'Accredited certificate with QR verification',
        isRTL ? 'مكتبة كاملة تضم 19 مجالاً بترولياً' : 'Access to full 19 process domain library',
        isRTL ? 'محاكاة أكثر من 50 سيناريو طوارئ وحوادث' : '50+ emergency upset scenarios',
        isRTL ? 'تراخيص مرنة حسب أعداد الطلاب والمتدربين' : 'Flexible volume licensing per cohort',
      ],
      cta: isRTL ? 'طلب برنامج الأكاديميات' : 'Enroll Academy Cohort',
      featured: false,
      borderTop: 'border-t-[#10B981]',
    },
  ];

  return (
    <section
      id="pricing-leadership"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative bg-[#03050C] border-t border-white/10"
    >
      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(142,66,254,0.10),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(51,97,252,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-[1240px] mx-auto space-y-16 sm:space-y-20 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
            <span>[STAGE 05 // COMMERCIAL TRACKS & LEADERSHIP]</span>
            <span className="text-slate-600">|</span>
            <span>{isRTL ? 'الاشتراك والقيادة' : 'PLANT PILOT & PRICING'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]">
            <span className="heading-metallic block">
              {isRTL
                ? 'مسارات تجارية شفافة وموثوقة.'
                : 'Transparent B2B Commercial Tracks.'}
            </span>
            <span className="bg-gradient-to-r from-[#A855F7] via-[#8E42FE] to-[#38BDF8] bg-clip-text text-transparent block mt-1">
              {isRTL
                ? 'استثمر في سلامة منشأتك بـ 90% تكلفة أقل.'
                : 'Invest in Refinery Safety at 90% Lower Cost.'}
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
            {isRTL
              ? 'اختر بين التجربة الميدانية لـ 90 يوماً، أو الاشتراك السحابي، أو التثبيت المحلي الدائم بغرفة التحكم. كل مسار يشمل التخصيص الهندسي الكامل.'
              : 'Choose between a 90-day pilot, cloud subscription, or perpetual air-gapped on-premise license. Every track includes custom P&ID calibration.'}
          </p>
        </div>

        {/* 4 Clean Pricing Cards (1 Row on Desktop, Navy Glassmorphic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" dir={isRTL ? 'rtl' : 'ltr'}>
          {pricingCards.map((card) => (
            <div
              key={card.id}
              className={`p-6 sm:p-7 rounded-2xl bg-[#0A0F24]/85 border-t-2 ${card.borderTop} border-x border-b border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6 transition-all duration-300 relative group hover:border-white/20 hover:-translate-y-1 ${
                card.featured ? 'ring-1 ring-purple-500/50 shadow-[0_0_40px_rgba(123,60,252,0.25)]' : ''
              }`}
            >
              {card.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                  {card.badge}
                </div>
              )}

              <div className="space-y-4">
                {!card.featured && (
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">
                    {card.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white font-sans">{card.name}</h3>
                  <div className="text-3xl font-extrabold text-white font-mono mt-2 flex items-baseline gap-1">
                    <span>{card.price}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">{card.period}</div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans border-t border-white/10 pt-3">
                  {card.desc}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                  {card.bullets.map((b, bi) => (
                    <div key={bi} className="flex items-start space-x-2 space-x-reverse">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-[11px] font-sans leading-tight">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setPilotDrawerOpen(true)}
                className={`w-full py-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  card.featured
                    ? 'btn-cta-primary'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                {card.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Executive Leadership Spotlight */}
        <div className="rounded-2xl bg-[#080D1F]/90 border border-white/10 p-8 sm:p-10 backdrop-blur-2xl space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              LEADERSHIP & ENGINEERING PEDIGREE
            </span>
            <h3 className="text-xl sm:text-3xl font-bold text-white font-sans">
              {isRTL ? 'قيادة متمرسة من كبرى مصافي التكرير' : 'Built by Refinery Operations Veterans'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              {isRTL
                ? 'خبرات تشغيلية وميدانية عميقة في تشغيل وحدات التكرير المعقدة والبنية التحتية السحابية الصناعية.'
                : '10+ years of frontline refinery operations combined with enterprise cloud systems and cyber-physical modeling.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Eng. Mostafa Adel */}
            <div className="p-6 rounded-xl bg-white/5 border border-purple-500/20 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8E42FE] to-[#3361FC] flex items-center justify-center text-white font-bold text-lg font-mono">
                    MA
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                      {isRTL ? 'م. مصطفى عادل إسماعيل' : 'Eng. Mostafa Adel'}
                    </h4>
                    <span className="text-xs font-mono text-purple-400 font-semibold block">
                      Founder & Chief Executive Officer (CEO)
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {isRTL
                    ? '10 سنوات من الخبرة التشغيلية الميدانية في كبرى مصافي التكرير ومجمعات البتروكيماويات: مصفاة ميدور (MIDOR Refinery)، سنمار للكيماويات (TCI Sanmar)، عجيبة للبترول (Agiba Petroleum)، ومصفاة بورت هاركورت (Port Harcourt Refinery Nigeria). خبير تشغيل غرف تحكم DCS ووحدات CDU/VDU والإصلاح الحراري.'
                    : '10 years of frontline refinery and gas processing experience across MIDOR Refinery, TCI Sanmar Petrochemicals, Agiba Petroleum, and Port Harcourt Refinery (Nigeria). Master DCS operator and commissioning specialist for complex CDU/VDU distillation complexes.'}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">MIDOR Refinery</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Sanmar Petrochem</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Agiba Petroleum</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Port Harcourt (Nigeria)</span>
              </div>
            </div>

            {/* Eng. Mohamed Osman */}
            <div className="p-6 rounded-xl bg-white/5 border border-cyan-500/20 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#3361FC] flex items-center justify-center text-white font-bold text-lg font-mono">
                    MO
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                      {isRTL ? 'م. محمد عثمان' : 'Eng. Mohamed Osman'}
                    </h4>
                    <span className="text-xs font-mono text-cyan-400 font-semibold block">
                      Co-Founder & Chief Technology Officer (CTO)
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {isRTL
                    ? 'مهندس نظم وسحابية متخصص في البنى التحتية للمؤسسات، الحاويات المعزولة محلياً On-Premise، الأمن السيبراني للشبكات التشغيلية OT/IT، وهندسة خوارزميات محاكاة العمليات الديناميكية الفورية وربط نماذج الذكاء الاصطناعي.'
                    : 'Systems & cloud architect specializing in enterprise containerization, OT/IT industrial cybersecurity (IEC 62443), real-time simulation algorithms, and distributed engineering platforms.'}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Enterprise Cloud</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">IEC 62443 OT/IT</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Dynamic OTS Engine</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Air-Gapped Ops</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal 4-Field Pilot Request Form (Navy Glassmorphic) */}
        <div
          id="subscribe"
          className="rounded-2xl sm:rounded-3xl bg-[#080D1F]/90 border border-purple-500/30 shadow-2xl p-6 sm:p-10 max-w-2xl mx-auto backdrop-blur-2xl relative overflow-hidden"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="text-center space-y-2 mb-6 sm:mb-8">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              {isRTL ? 'طلب تجربة المصفاة (90 يوماً)' : 'START A 90-DAY PLANT PILOT ($800)'}
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-sans">
              {isRTL ? 'احجز استشارة فنية وتجربة المنظومة' : 'Book Plant Consultation & Pilot'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              {isRTL
                ? 'أدخل بيانات المصفاة ليتواصل معك المهندس مصطفى عادل مباشرة لتنسيق نموذج الـ P&ID المطلوب.'
                : 'Direct intake handled immediately by Eng. Mostafa Adel via WhatsApp and email.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/60 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white font-sans">
                  {isRTL ? 'تم إرسال طلب التجربة بنجاح!' : 'Pilot Request Dispatched Successfully!'}
                </h4>
                <p className="text-xs text-slate-300 font-sans max-w-md mx-auto">
                  {isRTL
                    ? 'تم إرسال الطلب إلى م. مصطفى عادل عبر الإيميل والواتساب. يمكنك المتابعة المباشرة الآن عبر الزر أدناه:'
                    : 'Your request has been routed to Eng. Mostafa Adel. Connect instantly on WhatsApp below:'}
                </p>
              </div>

              {submissionResult && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={submissionResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 space-x-reverse transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isRTL ? 'فتح واتساب فوراً (01004131154)' : 'Open WhatsApp (+201004131154)'}</span>
                  </a>

                  <a
                    href={submissionResult.mailtoUrl}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isRTL ? 'إرسال بريد إلكتروني' : 'Open Email Client'}</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                  {isRTL ? 'الاسم والصفة الوظيفية *' : 'Full Name & Job Title *'}
                </label>
                <div className="relative">
                  <User className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRTL ? 'مثال: م. أحمد سامي - مدير تشغيل العمليات' : 'e.g. Eng. Ahmed Sami - Operations Manager'}
                    className={`w-full bg-[#030612] border border-white/15 rounded-xl ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors`}
                  />
                </div>
              </div>

              {/* Field 2: Company / Refinery */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                  {isRTL ? 'اسم المصفاة أو الشركة *' : 'Refinery / Operating Company *'}
                </label>
                <div className="relative">
                  <Building className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={isRTL ? 'مثال: شركة النصر للبترول / مصفاة أسيوط' : 'e.g. Alexandria Petroleum / Middle East Oil Refinery'}
                    className={`w-full bg-[#030612] border border-white/15 rounded-xl ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors`}
                  />
                </div>
              </div>

              {/* Field 3: Corporate Email */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                  {isRTL ? 'البريد الإلكتروني المهني *' : 'Corporate Email Address *'}
                </label>
                <div className="relative">
                  <Mail className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@refinery-domain.com"
                    className={`w-full bg-[#030612] border border-white/15 rounded-xl ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors`}
                  />
                </div>
              </div>

              {/* Field 4: WhatsApp Direct Phone */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                  {isRTL ? 'رقم الهاتف المباشر / واتساب *' : 'Direct Phone / WhatsApp Number *'}
                </label>
                <div className="relative">
                  <Phone className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 100 000 0000"
                    className={`w-full bg-[#030612] border border-white/15 rounded-xl ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors`}
                  />
                </div>
              </div>

              {/* Full-Width Violet-to-Cobalt Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-cta-primary min-h-[50px] text-xs sm:text-sm font-mono font-bold tracking-wider uppercase mt-2 group"
              >
                {isSubmitting ? (
                  <span>DISPATCHING PILOT INTAKE...</span>
                ) : (
                  <span className="flex items-center justify-center space-x-2 space-x-reverse">
                    <span>{isRTL ? 'إرسال طلب تجربة المصفاة ($800)' : 'SUBMIT PILOT REQUEST ($800)'}</span>
                    <span className={`group-hover:translate-x-1 transition-transform inline-block ${isRTL ? 'rotate-180' : ''}`}>→</span>
                  </span>
                )}
              </button>

              <div className="pt-2 text-center text-[10px] font-mono text-slate-500 flex items-center justify-center space-x-2 space-x-reverse">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Direct WhatsApp: +201004131154 · Email: Mostafa.adel.esmaiel@gmail.com</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
