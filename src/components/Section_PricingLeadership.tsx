import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Check, Shield, Award, Terminal, ArrowRight, Building, Mail, User, Sliders } from 'lucide-react';

export const Section_PricingLeadership: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

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

  const pricingTiers = [
    {
      name: isRTL ? 'البرنامج التجريبي (90 يوماً)' : '90-Day Refinery Pilot',
      badge: isRTL ? 'نقطة الانطلاق الموصى بها' : 'RECOMMENDED ENTRY POINT',
      price: '$800',
      period: isRTL ? 'لمدة 3 أشهر كاملة' : 'flat for 3 months',
      desc: isRTL
        ? 'تحقق من دقة النموذج مع مهندسي العمليات في مصفاتك بدون مخاطرة. بناء نموذج وحدة مخصص وأول حزمة سيناريوهات طوارئ.'
        : 'Risk-free 3-month validation on your plant data. Test custom flowsheet and first emergency scenario pack with your operations team.',
      features: [
        isRTL ? 'بناء نموذج وحدة مخصص من مخططات P&ID' : '1 Custom Unit Flowsheet Model from P&ID',
        isRTL ? 'حزمة سيناريوهات الطوارئ الأولى' : 'First Critical Emergency Scenario Pack',
        isRTL ? 'حسابات تدريب حتى 8 مشغلين' : 'Up to 8 Trainee Accounts with Telemetry',
        isRTL ? 'معايرة ديناميكية مع مهندسي المصفاة' : 'Process SME Tuning & Fidelity Calibration',
        isRTL ? 'يُخصم 100% من قيمة العقد السنوي عند الترقية' : '100% credited toward annual license',
      ],
      featured: true,
      action: isRTL ? 'بدء تجربة الـ 90 يوماً ($800)' : 'Start 90-Day Pilot ($800)',
    },
    {
      name: isRTL ? 'نكسيفا كلاود للمؤسسات' : 'Cloud OTS Enterprise',
      badge: isRTL ? 'سحابة خاصة' : 'PRIVATE CLOUD',
      price: '$5,180',
      period: isRTL ? 'للسنة الأولى ($7,400 الرسمية)' : 'Year-1 launch ($7.4K list)',
      desc: isRTL
        ? 'محاكي سحابي خاص وآمن لتدريب المشغلين والمهندسين دون الحاجة لصيانة أجهزة محلية.'
        : 'Dedicated private cloud simulator for continuous training with zero local hardware maintenance.',
      features: [
        isRTL ? '$1,000 إعداد + $1,000 بناء الوحدة' : '$1,000 setup + $1,000 custom unit build',
        isRTL ? '$600 تدريب المدربين لمدة يومين' : '$600 2-day on-site instructor training',
        isRTL ? '$800 تجديد سنوي (حتى 8 مستخدمين)' : '$800/yr renewal (up to 8 users)',
        isRTL ? '$10 لكل ساعة تدريب فعلية' : '$10 per trainee hour metered billing',
        isRTL ? 'بطاقات تقييم آلية وشهادات فورية' : 'Automatic rubric grading scorecards',
      ],
      featured: false,
      action: isRTL ? 'اختيار المسار السحابي' : 'Select Cloud Track',
    },
    {
      name: isRTL ? 'غرفة التحكم المعزولة (On-Prem)' : 'On-Premise Control Room',
      badge: isRTL ? 'معزول 100%' : 'AIR-GAPPED PERPETUAL',
      price: '$5,320',
      period: isRTL ? 'للسنة الأولى ($7,600 الرسمية)' : 'Year-1 launch ($7.6K list)',
      desc: isRTL
        ? 'ترخيص دائم يعمل دون اتصال بالإنترنت تماماً داخل مركز تدريب المصفاة (مخدم محلي + 3 محطات).'
        : 'Perpetual license running completely offline inside your plant training center (1 Server + 3 Stations).',
      features: [
        isRTL ? '$4,000 بناء نموذج الوحدة الدائم' : '$4,000 perpetual unit model build',
        isRTL ? '3 محطات تشغيل محلية ($1,000/محطة)' : '3 Local operator consoles ($1K/station)',
        isRTL ? '$600 تدريب المدربين داخل المصفاة' : '$600 2-day on-site plant training',
        isRTL ? 'صفر اتصال بالإنترنت (أمان تام)' : 'Zero outbound internet connectivity',
        isRTL ? 'سرية تامة لمخططات P&ID وبيانات الإنتاج' : '100% P&ID & telemetry confidentiality',
      ],
      featured: false,
      action: isRTL ? 'اختيار مسار الأون-بريميس' : 'Select On-Prem Track',
    },
    {
      name: isRTL ? 'أكاديميات ومعاهد البترول' : 'Training Academies',
      badge: isRTL ? 'تعليم وتأهيل' : 'EDUCATION & CERTIFICATION',
      price: '$100–$500',
      period: isRTL ? 'لكل متدرب معتمد' : 'per certified trainee',
      desc: isRTL
        ? 'دورات تدريبية مكثفة للمشغلين الجدد والطلاب مع اختبارات آلية وشهادات معتمدة ضد التزوير.'
        : '5-day intensive operator certification course packs with automatic rubric grading and certified credentials.',
      features: [
        isRTL ? '$100/متدرب على وحدة CDU القياسية' : '$100/trainee on Standard CDU/VDU',
        isRTL ? '$500/متدرب على الوحدات المعقدة' : '$500/trainee on Custom Refinery Units',
        isRTL ? 'حد أدنى 5 متدربين لكل دفعة' : 'Minimum 5 trainees per training cohort',
        isRTL ? 'ختم رقمي مقاوم للتزوير برمز QR' : 'Tamper-evident verification stamp with QR',
        isRTL ? 'مشاركة أرباح للمراكز الأكاديمية الشريكة' : 'Academic partner revenue share model',
      ],
      featured: false,
      action: isRTL ? 'استفسار الأكاديميات' : 'Inquire for Academies',
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 lg:px-12 relative border-t border-slate-800/80 bg-[#04060E]">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>{isRTL ? 'التسعير المؤسسي والبرامج المعتمدة' : 'SEC_05 // COMMERCIAL LICENSING & PILOT VALIDATION'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              {isRTL ? 'مسارات تجارية واضحة. بدون احتكار أو تكاليف خفية.' : 'Predictable Commercial Tracks. Fraction of Legacy CapEx.'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {isRTL
                ? 'قارن بين استثمار 5 آلاف دولار مع نكسيفا مقابل 110 آلاف دولار من المحتكرين القدامى، مع جاهزية تشغيل في أسبوع واحد.'
                : 'From an agile $800 90-day plant validation pilot to full on-premise air-gapped academy deployments.'}
            </p>
          </div>
          <div className="text-right text-xs font-mono text-slate-500">
            <div>CONTRACT CODE: B2B-OTS-2026</div>
            <div>STATUS: PILOTS ACTIVE</div>
          </div>
        </div>

        {/* 1. 4 Architectural Commercial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative ${
                tier.featured
                  ? 'bg-[#0E1326] border-purple-500/80 shadow-[0_0_50px_rgba(123,60,252,0.25)] ring-1 ring-purple-500/50'
                  : 'bg-[#080B16] border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-4">
                {!tier.featured && (
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    {tier.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{tier.name}</h3>
                  <div className="text-3xl font-black font-mono text-white mt-1.5 flex items-baseline gap-1">
                    <span>{tier.price}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{tier.period}</div>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed border-t border-slate-800/80 pt-3">
                  {tier.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800/60 text-xs text-slate-300">
                  {tier.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-tight text-[11px] text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className={`w-full py-3 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  tier.featured
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg hover:shadow-purple-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.action}
              </button>
            </div>
          ))}
        </div>

        {/* 2. The Founder Dossier (Human Industrial Pedigree) */}
        <div className="rounded-2xl bg-[#080B16] border border-slate-800 p-8 lg:p-10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Founder Avatar & Badge */}
            <div className="lg:col-span-3 text-center space-y-4">
              <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-0.5 shadow-[0_0_40px_rgba(123,60,252,0.3)]">
                <div className="w-full h-full rounded-2xl bg-[#0B0F1C] flex flex-col items-center justify-center text-white">
                  <span className="text-3xl font-black font-mono">MA</span>
                  <span className="text-[10px] font-mono text-purple-400 font-bold mt-1">FOUNDER & CEO</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Eng. Mostafa Adel</h4>
                <p className="text-xs font-mono text-slate-400">Chief Process Simulation Architect</p>
              </div>
            </div>

            {/* Field Pedigree Narrative */}
            <div className="lg:col-span-9 space-y-4 text-left border-l border-slate-800/80 pl-0 lg:pl-8">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold">
                <Shield className="w-4 h-4" />
                <span>10+ YEARS ON REFINERY CONSOLES & PETROCHEMICAL COMPLEXES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {isRTL
                  ? 'صُمم بواسطة مهندس عمليات من داخل غرف التحكم، وليس مبرمجين خلف مكاتب مكيفة.'
                  : 'Engineered by a frontline refinery DCS specialist, not detached enterprise software coders.'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isRTL
                  ? 'قضى م. مصطفى عادل أكثر من عقد في تشغيل ومحاكاة أعقد وحدات التكرير في مصفاة الشرق الأوسط لتكرير البترول (ميدور - الإسكندرية)، وشركة سانمار للكيماويات (بورسعيد)، وعجيبة للبترول، ومصفاة بورت هاركورت الدولية. تم تطوير نكسيفا لإنهاء الاحتكار الاستغلالي لشركات المحاكاة القديمة التي تطلب ملايين الدولارات وتستغرق عاماً كاملاً لتسليم نموذج بطيء.'
                  : 'Over a decade leading console commissioning and complex upsets across Middle East Oil Refinery (MIDOR Alexandria), TCI Sanmar Chemicals (Port Said), Agiba Petroleum Company, and Port Harcourt Refining Company. NEXIIVA was architected out of visceral frustration with obsolete legacy simulator cartels that charge $110,000+ and take 9 to 14 months to deliver closed-box proprietary models.'}
              </p>

              {/* Verified Plants Ribbon */}
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded bg-[#0D1222] border border-slate-800 text-slate-200">
                  MIDOR (Alexandria)
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0D1222] border border-slate-800 text-slate-200">
                  TCI Sanmar Chemicals
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0D1222] border border-slate-800 text-slate-200">
                  Agiba Petroleum Co.
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0D1222] border border-slate-800 text-slate-200">
                  Port Harcourt Refinery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Streamlined Fast-Track Pilot Request */}
        <div className="rounded-2xl bg-[#080B16] border border-slate-800 p-8 lg:p-12 relative overflow-hidden shadow-2xl max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest block">
              {isRTL ? 'حجز اختبار تجريبي خلال 24 ساعة' : '24-HOUR PILOT INTAKE'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isRTL ? 'اختبر نموذج مصفاتك الحقيقي مع مهندسيك' : 'Commission Your Plant Flowsheet with Eng. Mostafa Adel'}
            </h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              {isRTL
                ? 'أرسل مخطط P&ID لوحدة واحدة، وسنقوم بتسليم محاكي تفاعلي كامل خلال 7 أيام عمل.'
                : 'Submit a single unit P&ID under standard mutual NDA. Receive a running high-fidelity simulation model in ~7 business days.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-2xl">
                ✓
              </div>
              <h4 className="text-xl font-bold text-white">
                {isRTL ? 'تم استلام طلب التجربة بنجاح' : 'Refinery Pilot Intake Confirmed'}
              </h4>
              <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                {isRTL
                  ? 'سيتواصل مكتب م. مصطفى عادل معك مباشرة عبر البريد الإلكتروني خلال 24 ساعة لإرسال اتفاقية عدم الإفصاح (NDA) ورابط رفع المخططات.'
                  : 'Eng. Mostafa Adel’s technical desk has received your plant parameters. You will receive the Mutual NDA and P&ID intake guidelines within 24 business hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isRTL ? 'الاسم الكامل والمنصب الفني' : 'Full Name & Operational Title'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eng. Tarek Mansour — Lead DCS Supervisor"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1C] border border-slate-800 focus:border-purple-500 text-white text-xs font-mono outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                    <Building className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isRTL ? 'اسم المصفاة أو الشركة' : 'Refinery / Operating Entity'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Middle East Oil Refinery (MIDOR) / EGPC"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1C] border border-slate-800 focus:border-purple-500 text-white text-xs font-mono outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isRTL ? 'البريد الإلكتروني للعمل' : 'Corporate / Plant Work Email'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tarek.mansour@refinery.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1C] border border-slate-800 focus:border-purple-500 text-white text-xs font-mono outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isRTL ? 'الوحدة المستهدفة للاختبار' : 'Target Refinery Unit for Pilot'}</span>
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1C] border border-slate-800 focus:border-purple-500 text-white text-xs font-mono outline-none transition-all"
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
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-xs font-bold font-mono uppercase tracking-wider shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer mt-3"
              >
                {isRTL ? 'إرسال طلب التحقق الهندسي وتوقيع NDA' : 'Submit Pilot Intake & Request Mutual NDA'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
