import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { dcsAudio } from '../utils/audio';
import { Check, Shield, User, Building, Mail, Sliders } from 'lucide-react';

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
    <section id="pricing" className="py-24 px-6 lg:px-12 relative border-t border-[#ececec] bg-[#fafafb]">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ececec] pb-8 text-left">
          <div className="space-y-3 max-w-2xl" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="text-xs font-sans text-[#979799] uppercase tracking-wider">
              {isRTL ? 'التسعير المؤسسي والبرامج المعتمدة' : 'SEC_05 // COMMERCIAL LICENSING & PILOT VALIDATION'}
            </div>
            <h2
              className={`text-4xl sm:text-5xl font-normal text-[#17191c] tracking-[-0.02em] leading-[1.2] ${
                isRTL ? 'font-serif-ar' : 'font-serif'
              }`}
            >
              {isRTL ? (
                <>
                  مسارات تجارية واضحة.{' '}
                  <span className="italic text-[#5d2a1a]">بدون احتكار أو تكاليف خفية.</span>
                </>
              ) : (
                <>
                  Predictable Commercial Tracks.{' '}
                  <span className="italic text-[#5d2a1a]">Fraction of Legacy CapEx.</span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg text-[#777b86] font-sans font-normal leading-[1.45]">
              {isRTL
                ? 'قارن بين استثمار 5 آلاف دولار مع نكسيفا مقابل 110 آلاف دولار من المحتكرين القدامى، مع جاهزية تشغيل في أسبوع واحد.'
                : 'From an agile $800 90-day plant validation pilot to full on-premise air-gapped academy deployments.'}
            </p>
          </div>
          <div className="text-right text-xs font-mono text-[#979799]">
            <div>CONTRACT CODE: B2B-OTS-2026</div>
            <div>STATUS: PILOTS ACTIVE</div>
          </div>
        </div>

        {/* 1. 4 Steep Editorial Commercial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-[24px] border transition-all duration-200 flex flex-col justify-between space-y-6 relative text-left ${
                tier.featured
                  ? 'bg-white border-2 border-[#17191c] shadow-artifact'
                  : 'bg-white border-[#ececec] shadow-subtle hover:border-[#17191c]/40'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-6 bg-[#17191c] text-white text-[10px] font-sans font-medium px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-4">
                {!tier.featured && (
                  <span className="text-[10px] font-sans text-[#979799] uppercase tracking-widest block font-medium">
                    {tier.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-normal text-[#17191c] tracking-tight font-sans">{tier.name}</h3>
                  <div className="text-3xl font-normal font-sans text-[#17191c] mt-2 flex items-baseline gap-1">
                    <span>{tier.price}</span>
                  </div>
                  <div className="text-xs text-[#777b86] font-sans mt-0.5">{tier.period}</div>
                </div>

                <p className="text-xs text-[#777b86] leading-relaxed border-t border-[#f2f2f3] pt-3 font-sans">
                  {tier.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#f2f2f3] text-xs text-[#17191c]">
                  {tier.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                      <span className="leading-tight text-[11px] text-[#777b86]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  dcsAudio.playClick();
                  setPilotDrawerOpen(true);
                }}
                className={`w-full py-2.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                  tier.featured
                    ? 'btn-pill-filled'
                    : 'btn-pill-ghost'
                }`}
              >
                {tier.action}
              </button>
            </div>
          ))}
        </div>

        {/* 2. The Founder Dossier (Steep Editorial Style) */}
        <div className="rounded-[24px] bg-white border border-[#ececec] shadow-artifact p-8 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Founder Avatar & Badge */}
            <div className="lg:col-span-3 text-center space-y-3">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#f2f2f3] border border-[#ececec] flex flex-col items-center justify-center text-[#17191c]">
                <span className="text-2xl font-normal font-sans">MA</span>
                <span className="text-[9px] font-sans text-[#777b86] uppercase tracking-wider font-medium">FOUNDER</span>
              </div>
              <div>
                <h4 className="text-lg font-normal text-[#17191c] font-sans">Eng. Mostafa Adel</h4>
                <p className="text-xs text-[#777b86] font-sans">Chief Process Simulation Architect</p>
              </div>
            </div>

            {/* Field Pedigree Narrative */}
            <div className="lg:col-span-9 space-y-4 text-left border-l border-[#f2f2f3] pl-0 lg:pl-8">
              <div className="flex items-center space-x-2 text-xs font-sans text-[#059669] font-medium">
                <Shield className="w-4 h-4" />
                <span>10+ YEARS ON REFINERY CONSOLES & PETROCHEMICAL COMPLEXES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-[#17191c] tracking-tight font-sans">
                {isRTL
                  ? 'صُمم بواسطة مهندس عمليات من داخل غرف التحكم، وليس مبرمجين خلف مكاتب مكيفة.'
                  : 'Engineered by a frontline refinery DCS specialist, not detached enterprise software coders.'}
              </h3>
              <p className="text-sm text-[#777b86] leading-relaxed font-sans">
                {isRTL
                  ? 'قضى م. مصطفى عادل أكثر من عقد في تشغيل ومحاكاة أعقد وحدات التكرير في مصفاة الشرق الأوسط لتكرير البترول (ميدور - الإسكندرية)، وشركة سانمار للكيماويات (بورسعيد)، وعجيبة للبترول، ومصفاة بورت هاركورت الدولية. تم تطوير نكسيفا لإنهاء الاحتكار الاستغلالي لشركات المحاكاة القديمة التي تطلب ملايين الدولارات وتستغرق عاماً كاملاً لتسليم نموذج بطيء.'
                  : 'Over a decade leading console commissioning and complex upsets across Middle East Oil Refinery (MIDOR Alexandria), TCI Sanmar Chemicals (Port Said), Agiba Petroleum Company, and Port Harcourt Refining Company. NEXIIVA was architected out of visceral frustration with obsolete legacy simulator cartels that charge $110,000+ and take 9 to 14 months to deliver closed-box proprietary models.'}
              </p>

              {/* Verified Plants Ribbon */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans text-[#777b86]">
                <span className="px-3 py-1 rounded-full bg-[#f2f2f3] text-[#17191c]">
                  MIDOR (Alexandria)
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f2f2f3] text-[#17191c]">
                  TCI Sanmar Chemicals
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f2f2f3] text-[#17191c]">
                  Agiba Petroleum Co.
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f2f2f3] text-[#17191c]">
                  Port Harcourt Refinery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Streamlined Fast-Track Pilot Request (Input / Composer in Steep Style) */}
        <div className="rounded-[24px] bg-white border border-[#ececec] shadow-artifact p-8 sm:p-12 relative overflow-hidden max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-sans text-[#979799] uppercase tracking-widest block font-medium">
              {isRTL ? 'حجز اختبار تجريبي خلال 24 ساعة' : '24-HOUR PILOT INTAKE'}
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-normal text-[#17191c] tracking-[-0.02em] ${
                isRTL ? 'font-serif-ar' : 'font-serif'
              }`}
            >
              {isRTL ? (
                <>
                  اختبر نموذج مصفاتك الحقيقي{' '}
                  <span className="italic text-[#5d2a1a]">مع مهندسي العمليات.</span>
                </>
              ) : (
                <>
                  Commission Your Plant Flowsheet{' '}
                  <span className="italic text-[#5d2a1a]">with Eng. Mostafa Adel.</span>
                </>
              )}
            </h3>
            <p className="text-sm text-[#777b86] max-w-xl mx-auto font-sans">
              {isRTL
                ? 'أرسل مخطط P&ID لوحدة واحدة، وسنقوم بتسليم محاكي تفاعلي كامل خلال 7 أيام عمل.'
                : 'Submit a single unit P&ID under standard mutual NDA. Receive a running high-fidelity simulation model in ~7 business days.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-[20px] bg-[#ecfdf5] border border-[#a7f3d0] text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-2xl">
                ✓
              </div>
              <h4 className="text-xl font-normal text-[#17191c] font-sans">
                {isRTL ? 'تم استلام طلب التجربة بنجاح' : 'Refinery Pilot Intake Confirmed'}
              </h4>
              <p className="text-xs text-[#777b86] max-w-md mx-auto font-sans leading-relaxed">
                {isRTL
                  ? 'سيتواصل مكتب م. مصطفى عادل معك مباشرة عبر البريد الإلكتروني خلال 24 ساعة لإرسال اتفاقية عدم الإفصاح (NDA) ورابط رفع المخططات.'
                  : 'Eng. Mostafa Adel’s technical desk has received your plant parameters. You will receive the Mutual NDA and P&ID intake guidelines within 24 business hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#777b86] flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-[#17191c]" />
                    <span>{isRTL ? 'الاسم الكامل والمنصب الفني' : 'Full Name & Operational Title'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eng. Tarek Mansour — Lead DCS Supervisor"
                    className="w-full px-4 py-3 rounded-[16px] bg-[#f8fafc] border border-[#ececec] focus:border-[#17191c] text-[#17191c] text-sm outline-none transition-all placeholder:text-[#a3a6af]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#777b86] flex items-center space-x-1.5">
                    <Building className="w-3.5 h-3.5 text-[#17191c]" />
                    <span>{isRTL ? 'اسم المصفاة أو الشركة' : 'Refinery / Operating Entity'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Middle East Oil Refinery (MIDOR) / EGPC"
                    className="w-full px-4 py-3 rounded-[16px] bg-[#f8fafc] border border-[#ececec] focus:border-[#17191c] text-[#17191c] text-sm outline-none transition-all placeholder:text-[#a3a6af]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#777b86] flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#17191c]" />
                    <span>{isRTL ? 'البريد الإلكتروني للعمل' : 'Corporate / Plant Work Email'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tarek.mansour@refinery.com"
                    className="w-full px-4 py-3 rounded-[16px] bg-[#f8fafc] border border-[#ececec] focus:border-[#17191c] text-[#17191c] text-sm outline-none transition-all placeholder:text-[#a3a6af]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#777b86] flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#17191c]" />
                    <span>{isRTL ? 'الوحدة المستهدفة للاختبار' : 'Target Refinery Unit for Pilot'}</span>
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3 rounded-[16px] bg-[#f8fafc] border border-[#ececec] focus:border-[#17191c] text-[#17191c] text-sm outline-none transition-all cursor-pointer"
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
                className="btn-pill-filled w-full py-4 text-sm mt-3 shadow-sm cursor-pointer"
              >
                <span>{isRTL ? 'إرسال طلب التحقق الهندسي وتوقيع NDA' : 'Submit Pilot Intake & Request Mutual NDA'}</span>
                <span className="ml-2">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
