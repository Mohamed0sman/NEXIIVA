export const translations = {
  EN: {
    nav: {
      brandTag: 'Process Operator Training Simulator',
      simulator: 'Simulator',
      otsBuilder: 'OTS Builder',
      whyNexiiva: 'Why Nexiiva',
      deployment: 'Deployment',
      pricing: 'Pricing',
      startPilot: 'Start a Paid Pilot',
      walkthrough: 'Watch Live CDU/VDU Demo',
    },
    hero: {
      headlineMain: 'Rehearse startups, upsets, and emergency shutdowns',
      headlineItalic: 'before touching the live plant.',
      subheadline:
        'Nexiiva delivers plant-specific Operator Training Simulators (OTS) for refineries, gas processors, petrochemical plants, and training centers. Practice on realistic DCS screens, inject faults from the instructor console, and certify operators automatically—at a fraction of legacy simulator costs.',
      ctaPrimary: 'Book a 3-Month Pilot ($800)',
      ctaSecondary: 'Watch Live CDU/VDU Demo',
      pills: [
        {
          title: 'CDU/VDU Unit Live Today',
          desc: 'Full atmospheric & vacuum distillation simulation running now.',
        },
        {
          title: '387-Type Equipment Library',
          desc: 'Custom unit assembly via OTS Builder in ~1 week target.',
        },
        {
          title: 'Automated Scoring & Certification',
          desc: 'Instant trainee evaluation after every fault scenario.',
        },
      ],
    },
    operationalReality: {
      eyebrow: 'THE OPERATIONAL REALITY',
      headingMain: 'Operators cannot rehearse the moments',
      headingItalic: 'that matter most.',
      subheading:
        'Startups, process upsets, and emergency shutdowns cannot be practiced on a live unit without real safety and production risk—yet commercial simulators remain out of reach for most plants.',
      storyCard: {
        title: '"One unfamiliar fault on a single shift can cost a plant $150,000+ in downtime and damage."',
        body: 'Most junior operators learn by sitting next to a senior operator and reading static SOP binders. When an unfamiliar upset hits and the operator has to flip through manual pages under alarm floods, a slow response can escalate into a unit trip, equipment damage, and a week of lost production ($70K downtime + $50K repairs + $30K delivery penalties).',
        footerStat: '10+ Years of Field Observation — MIDOR, Sanmar, Agiba & Port Harcourt',
      },
      comparison: {
        title: 'Nexiiva vs. Legacy Alternatives',
        headers: ['Criteria', 'Large Vendors', 'Specialist Firms', 'NEXIIVA'],
        rows: [
          {
            criteria: 'First-Year Cost per Unit',
            largeVendors: '~$110,000 / unit',
            specialists: '$52,000 – $73,000',
            nexiiva: '~$5,180 – $5,320 (Launch Price)',
          },
          {
            criteria: 'Unit Customization',
            largeVendors: 'Long vendor delivery cycles',
            specialists: 'Custom project per quote',
            nexiiva: 'Rapid build via OTS Builder (~1 week target)',
          },
          {
            criteria: 'Plant Specificity',
            largeVendors: 'Often rigid or high-CapEx',
            specialists: 'Tailored at high cost',
            nexiiva: 'Built to your P&IDs, tag names & control philosophy',
          },
          {
            criteria: 'Deployment Options',
            largeVendors: 'Vendor-dependent',
            specialists: 'Project-specific',
            nexiiva: 'Cloud or On-Premise (100% Offline capable)',
          },
        ],
      },
    },
    otsBuilder: {
      eyebrow: 'OTS BUILDER — THE JEWEL OF NEXIIVA',
      headingMain: 'From plant P&IDs to a custom training unit',
      headingItalic: 'at record speed.',
      subheading:
        'Our internal OTS Builder platform assembles plant-specific training units from a 387-type industrial equipment library—operating online via AI agent (in Arabic and English) or completely offline with no internet required.',
      features: [
        {
          title: 'AI & Offline Builder Modes',
          desc: 'Describe your process unit in Arabic or English using the online AI agent, or build deterministically in 100% offline mode for strict plant security.',
        },
        {
          title: '387-Type Equipment Library',
          desc: "Columns, fired heaters, heat exchangers, compressors, pumps, and control valves mapped to your plant's actual tag names and control loops.",
        },
        {
          title: 'Ready-to-Run Training Project',
          desc: 'Generates trainee DCS screens, instructor fault-injection panels, live trends, and scoring rubrics—targeting ~1 week per unit build.',
        },
      ],
    },
    experience: {
      eyebrow: 'LIVE CDU/VDU SIMULATOR',
      headingMain: 'Practice. Instruct.',
      headingItalic: 'Certify.',
      subheading:
        'Built for both daily operator readiness at plants and structured 5-day hands-on courses at industrial training centers.',
      pillars: [
        {
          title: 'Practice (Trainee DCS Console)',
          desc: 'Realistic DCS-style process flow diagrams (PFD), control valve faceplates, pump & furnace controls, 12-channel live trend charts, and dynamic alarm handling.',
        },
        {
          title: 'Instruct (Instructor Console)',
          desc: 'Mirror any trainee session live, inject realistic process faults (reflux loss, vacuum loss, feed pump trip, heater burner trip), and reset conditions instantly.',
        },
        {
          title: 'Certify (Automated Evaluation)',
          desc: 'Every trainee action is logged and scored automatically against safety and stability targets, generating a detailed Certificate of Achievement after each scenario.',
        },
      ],
    },
    deployment: {
      eyebrow: 'FLEXIBLE DEPLOYMENT & FIELD VALIDATION',
      headingMain: 'Cloud or On-Premise deployment,',
      headingItalic: 'including full offline operation.',
      subheading:
        'Whether you run a national refinery requiring air-gapped on-premise workstations or a training center running multi-trainee cloud sessions, Nexiiva adapts to your infrastructure.',
      cards: [
        {
          title: '3-Month Paid Pilot (Validation Included)',
          desc: 'Start with a low-commitment 3-month pilot ($800). Every pilot includes unit validation against real plant operating data and structured operator feedback.',
        },
        {
          title: 'Managed Cloud OTS',
          desc: 'Fast setup with up to 8 user accounts, centralized instructor console, and flexible trainee-hour packs—ideal for immediate rollout.',
        },
        {
          title: 'Air-Gapped On-Premise OTS',
          desc: "Installed directly on your plant's local servers and operator stations with zero internet dependency and perpetual unit licensing.",
        },
      ],
    },
    pricing: {
      eyebrow: 'TRANSPARENT PRICING (USD, BEFORE VAT)',
      headingMain: 'Accessible pricing built for',
      headingItalic: 'every industrial unit.',
      subheading:
        '30% launch discount applied on Year 1 company contracts (Cloud and On-Premise). Hardware and travel are covered by the client.',
      cards: [
        {
          name: 'Paid Pilot',
          badge: 'RECOMMENDED ENTRY POINT',
          price: '$800',
          period: '/ 3 months',
          desc: 'Test Nexiiva on your operations team and validate unit behavior before signing a full contract.',
          bullets: [
            '3-month active pilot access',
            'Validation on real unit data',
            'Instructor & trainee console access',
            'Structured performance feedback',
          ],
          cta: 'Start $800 Pilot',
          featured: true,
        },
        {
          name: 'Cloud OTS (Companies)',
          badge: 'MANAGED PRIVATE CLOUD',
          price: '$5,180',
          period: 'First year at 30% launch discount · $7,400 list',
          desc: 'Calculated for 1 unit, 4 trainees, and 100 hours/trainee/year.',
          bullets: [
            'One-time: $1,000 setup + $1,000/unit build + $600 training (2 days)',
            'Recurring: $800/yr renewal (up to 8 users) + $10/trainee hour',
            '30% Year-1 launch discount applied',
            'Following years: ~$3,360 (at discount) / $4,800 (list)',
          ],
          cta: 'Select Cloud Plan',
          featured: false,
        },
        {
          name: 'On-Premise OTS (Perpetual)',
          badge: 'AIR-GAPPED PERPETUAL',
          price: '$5,320',
          period: 'First year at 30% launch discount · $7,600 list',
          desc: 'Calculated for 1 unit installed across 3 local operator stations on client hardware.',
          bullets: [
            'One-time: $4,000/unit build + $1,000/station install + $600 training',
            '100% offline operation on client servers',
            'Annual support (from Year 2): $500/station/year',
            '30% Year-1 launch discount applied',
          ],
          cta: 'Select On-Premise',
          featured: false,
        },
        {
          name: 'Training Centers & Courses',
          badge: 'ACCREDITED CERTIFICATION',
          price: '$100 – $500',
          period: 'per trainee · 5-day course',
          desc: 'For training centers and individual engineers/operators (minimum 5 trainees per course).',
          bullets: [
            '$100 / trainee on Generic standard units',
            '$500 / trainee on a Specific custom-built unit',
            '5-day intensive hands-on simulator course',
            'Automated scoring breakdown & certificate',
          ],
          cta: 'Book a Training Course',
          featured: false,
        },
      ],
    },
    founder: {
      badge: 'BUILT BY AN OPERATIONS ENGINEER, NOT A GENERIC SOFTWARE AGENCY',
      title: 'Mostafa Adel — Founder & CEO (10 Years in Refining, Gas & Petrochemicals)',
      body: 'After ten years operating units across MIDOR Refinery, TCI Sanmar Petrochemicals, Agiba Gas Processing Plant (Western Desert), and Port Harcourt Refinery (Nigeria), I saw firsthand how high simulator prices left operators relying on classroom theory and paper manuals. Nexiiva was built to put realistic, customized OTS training within reach of every plant and engineer.',
      verified: ['MIDOR Refinery', 'TCI Sanmar Petrochemicals', 'Agiba Gas Processing Plant', 'Port Harcourt Refinery'],
    },
    bottomForm: {
      headingMain: 'Start your first',
      headingItalic: '3-month paid pilot.',
      subheading:
        'Tell us about your plant or training center, and we will schedule a live walkthrough of the running CDU/VDU unit.',
      button: 'Request Live Demo & Pilot Details',
    },
  },
  AR: {
    nav: {
      brandTag: 'محاكي تدريب مشغلي العمليات',
      simulator: 'المحاكي',
      otsBuilder: 'منشئ OTS',
      whyNexiiva: 'لماذا نكسيفا',
      deployment: 'طرق النشر',
      pricing: 'التسعير',
      startPilot: 'بدء برنامج تجريبي',
      walkthrough: 'مشاهدة العرض الحي لوحدة CDU/VDU',
    },
    hero: {
      headlineMain: 'تدرّب على بدء التشغيل، اضطرابات العمليات، والإغلاق الاضطراري',
      headlineItalic: 'قبل لمس المنشأة الحية.',
      subheadline:
        'تقدّم نكسيفا محاكيات تدريب مشغلي العمليات (OTS) المخصصة لمصافي التكرير، ومعالجة الغاز، ومصانع البتروكيماويات، ومراكز التدريب. تدرّب على شاشات DCS واقعية، واحقن الأعطال من لوحة تحكم المدرب، واعتمد المشغلين آلياً—بجزء ضئيل من تكلفة المحاكيات التقليدية.',
      ctaPrimary: 'حجز تجربة 3 أشهر (800$)',
      ctaSecondary: 'مشاهدة العرض الحي لوحدة CDU/VDU',
      pills: [
        {
          title: 'وحدة CDU/VDU تعمل اليوم مباشرة',
          desc: 'محاكاة كاملة للتقطير الجوي والمفرغ قيد التشغيل التفاعلي الآن.',
        },
        {
          title: 'مكتبة تضم 387 نوعاً من المعدات',
          desc: 'تجميع وبناء الوحدات المخصصة عبر OTS Builder في هدف زمني قرابة أسبوع.',
        },
        {
          title: 'تقييم واعتماد فوري للمشغلين',
          desc: 'تقييم آلي متكامل لكفاءة المشغل بعد كل سيناريو عطل وطوارئ.',
        },
      ],
    },
    operationalReality: {
      eyebrow: 'الواقع التشغيلي الميداني',
      headingMain: 'لا يمكن للمشغلين التدرب على اللحظات',
      headingItalic: 'الأكثر حساسية وخطورة.',
      subheading:
        'بدء التشغيل، واضطرابات العمليات، والإغلاق الاضطراري لا يمكن التدرب عليها على وحدة حية دون مخاطر حقيقية على السلامة والإنتاج—ومع ذلك تظل المحاكيات التجارية بعيدة المنال لمعظم المنشآت.',
      storyCard: {
        title: '"عطل واحد غير مألوف في وردية واحدة يمكن أن يكلّف المنشأة أكثر من 150,000$ بين توقف وأضرار."',
        body: 'يتعلم معظم المشغلين الجدد بالجلوس بجوار مشغل قديم وقراءة مجلدات إجراءات التشغيل القياسية (SOP). عندما يحدث اضطراب غير مألوف ويضطر المشغل لتصفح المجلدات تحت طوفان الإنذارات، يمكن أن يتصاعد التأخر في الاستجابة إلى إغلاق الوحدة وتلف المعدات وأسبوع من الإنتاج المفقود (70 ألف$ توقف + 50 ألف$ إصلاحات + 30 ألف$ غرامات تسليم).',
        footerStat: 'أكثر من 10 سنوات من الملاحظة الميدانية — ميدور، سانمار، عجيبة، وبورت هاركورت',
      },
      comparison: {
        title: 'نكسيفا مقابل البدائل التقليدية القديمة',
        headers: ['المعيار', 'الشركات الكبرى الاحتكارية', 'المكاتب الاستشارية المتخصصة', 'نكسيفا (NEXIIVA)'],
        rows: [
          {
            criteria: 'تكلفة السنة الأولى للوحدة',
            largeVendors: '~$110,000 / للوحدة',
            specialists: '$52,000 – $73,000',
            nexiiva: '~$5,180 – $5,320 (سعر الإطلاق)',
          },
          {
            criteria: 'تخصيص وبناء الوحدة',
            largeVendors: 'دورات تسليم طويلة مرهونة بالبائع',
            specialists: 'مشروع خاص بكل عرض سعر',
            nexiiva: 'بناء سريع عبر منشئ OTS (~أسبوع واحد)',
          },
          {
            criteria: 'مطابقة خصوصية المنشأة',
            largeVendors: 'غالباً نماذج جامدة أو باستثمار هائل',
            specialists: 'مخصصة بتكلفة مرتفعة',
            nexiiva: 'مبنية تماماً وفق مخططات P&ID ووسوم وفلسفة تحكم منشأتك',
          },
          {
            criteria: 'خيارات النشر والتشغيل',
            largeVendors: 'مرهونة ببنية البائع',
            specialists: 'حسب متطلبات كل مشروع',
            nexiiva: 'سحابي أو أون-بريميس محلي (يعمل 100% بدون إنترنت)',
          },
        ],
      },
    },
    otsBuilder: {
      eyebrow: 'منشئ OTS — درة تاج نكسيفا',
      headingMain: 'من مخططات P&ID الخاصة بمنشأتك إلى وحدة تدريب مخصصة',
      headingItalic: 'بسرعة قياسية.',
      subheading:
        'تقوم منصة منشئ OTS بتجميع وحدات تدريب مخصصة لمنشأتك من مكتبة معدات صناعية تضم 387 نوعاً—تعمل إما سحابياً عبر وكيل الذكاء الاصطناعي (بالعربية والإنجليزية) أو بشكل محلي معزول بالكامل دون الحاجة للإنترنت.',
      features: [
        {
          title: 'أوضاع البناء بالذكاء الاصطناعي والأوفلاين',
          desc: 'صف وحدة العمليات بالعربية أو الإنجليزية باستخدام الوكيل الذكي، أو ابنِ النموذج رياضياً في الوضع المعزول 100% لأعلى درجات الأمان لمنشأتك.',
        },
        {
          title: 'مكتبة تضم 387 نوعاً من المعدات',
          desc: 'أبراج التقطير، الأفران الحرارية، المبادلات، الضواغط، المضخات، وصمامات التحكم مطابقة لوسوم منشأتك وحلقات التحكم الفعلية.',
        },
        {
          title: 'مشروع تدريبي جاهز للتشغيل الفوري',
          desc: 'يولد شاشات DCS للمتدرب، ولوحات حقن الأعطال للمدرب، والرسوم البيانية المباشرة، ومعايير التقييم—بهدف زمني قرابة أسبوع لكل وحدة.',
        },
      ],
    },
    experience: {
      eyebrow: 'محاكي وحدة CDU/VDU المباشر',
      headingMain: 'تدرّب. درّب.',
      headingItalic: 'اعتمد الكفاءات.',
      subheading:
        'صُمم لدعم الجاهزية التشغيلية اليومية للمشغلين داخل المنشآت، ولتنفيذ دورات عملية مكثفة لمدة 5 أيام داخل مراكز التدريب البترولية والصناعية.',
      pillars: [
        {
          title: 'التدرب (شاشة تحكم المشغل DCS)',
          desc: 'مخططات تدفق العمليات (PFD) بأسلوب أنظمة التحكم الموزعة، واجهات تحكم الصمامات، مضخات وأفران، رسام بياني بـ 12 مساراً، وإدارة حية للإنذارات.',
        },
        {
          title: 'التدريب (لوحة تحكم المدرب)',
          desc: 'مراقبة جلسات المتدربين لحظياً، حقن أعطال واقعية (فقدان الراجع، هبوط التفريغ، توقف مضخة التغذية، انطفاء شعلة الفرن)، وإعادة ضبط الظروف فورياً.',
        },
        {
          title: 'الاعتماد (التقييم الآلي المعتمد)',
          desc: 'تسجيل وتقييم كل إجراء يتخذه المتدرب آلياً وفق معايير السلامة واستقرار الوحدة، وإصدار شهادة إنجاز تفصيلية بعد كل سيناريو.',
        },
      ],
    },
    deployment: {
      eyebrow: 'مرونة النشر والتحقق الميداني',
      headingMain: 'نشر سحابي أو محلي (On-Premise)،',
      headingItalic: 'بما في ذلك التشغيل المعزول تماماً عن الإنترنت.',
      subheading:
        'سواء كنت تدير مصفاة وطنية تشترط محطات عمل محلية معزولة تماماً (Air-Gapped) أو مركز تدريب يدير جلسات سحابية لعدة متدربين، تتكيف نكسيفا مع بنيتك التحتية.',
      cards: [
        {
          title: 'برنامج تجريبي مدفوع لـ 3 أشهر (يشمل التحقق الميداني)',
          desc: 'ابدأ بتجربة مرنة وميسرة لمدة 3 أشهر (800$). يشمل كل برنامج تجريبي التحقق من دقة النموذج بمقارنته ببيانات التشغيل الفعلية لمصفاتك وملاحظات المشغلين.',
        },
        {
          title: 'المحاكي السحابي المدار (Cloud OTS)',
          desc: 'إعداد فوري مع ما يصل إلى 8 حسابات مستخدمين، لوحة تحكم مركزية للمدرب، وباقات ساعات تدريب مرنة—مثالي للإطلاق السريع.',
        },
        {
          title: 'المحاكي المحلي المعزول (Air-Gapped On-Premise)',
          desc: 'يُثبت مباشرة على خوادم ومحطات تشغيل المنشأة دون أي اتصال خارجي بالإنترنت، مع ترخيص دائم للوحدة.',
        },
      ],
    },
    pricing: {
      eyebrow: 'تسعير شفاف وواضح (بالدولار الأمريكي، قبل ضريبة القيمة المضافة)',
      headingMain: 'تسعير في المتناول مصمم لدعم',
      headingItalic: 'كل وحدة صناعية.',
      subheading:
        'يُطبق خصم إطلاق بنسبة 30% على عقود الشركات للسنة الأولى (السحابي والأون-بريميس). الأجهزة ومصاريف السفر يغطيها العميل.',
      cards: [
        {
          name: 'البرنامج التجريبي المدفوع',
          badge: 'نقطة الانطلاق الموصى بها',
          price: '$800',
          period: '/ لمدة 3 أشهر',
          desc: 'اختبر نكسيفا مع فريق العمليات لديك وتحقق من سلوك الوحدة قبل توقيع العقد الكامل.',
          bullets: [
            'صلاحية استخدام كاملة لمدة 3 أشهر',
            'تحقق من دقة النموذج على بيانات منشأتك الفعلية',
            'وصول كامل للوحة المشغل ولوحة المدرب',
            'تقرير أداء وملاحظات تشغيلية منظمة',
          ],
          cta: 'بدء التجربة ($800)',
          featured: true,
        },
        {
          name: 'نكسيفا كلاود للشركات',
          badge: 'سحابة خاصة مدارة',
          price: '$5,180',
          period: 'السنة الأولى بخصم 30% لإطلاق المنصة · $7,400 القائمة الرسمية',
          desc: 'محسوبة لوحدة واحدة، و4 متدربين، و100 ساعة/متدرب/سنة.',
          bullets: [
            'تدفع مرة واحدة: $1,000 إعداد + $1,000 بناء الوحدة + $600 تدريب (يومان)',
            'متكرر: $800/سنة تجديد (حتى 8 مستخدمين) + $10/ساعة متدرب',
            'خصم إطلاق بنسبة 30% للسنة الأولى مطبق',
            'السنوات اللاحقة: ~$3,360 (بالخصم) / $4,800 (الرسمية)',
          ],
          cta: 'اختيار الخطة السحابية',
          featured: false,
        },
        {
          name: 'المنظومة المحلية المفصولة (On-Premise دائم)',
          badge: 'ترخيص محلي دائم 100% أوفلاين',
          price: '$5,320',
          period: 'السنة الأولى بخصم 30% لإطلاق المنصة · $7,600 القائمة الرسمية',
          desc: 'محسوبة لوحدة واحدة مثبتة عبر 3 محطات مشغلين محلية على أجهزة العميل.',
          bullets: [
            'تدفع مرة واحدة: $4,000 بناء الوحدة + $1,000 تثبيت المحطة + $600 تدريب',
            'تشغيل 100% أوفلاين على خوادم العميل دون إنترنت',
            'دعم فني سنوي (بدءاً من السنة الثانية): $500/محطة/سنة',
            'خصم إطلاق بنسبة 30% للسنة الأولى مطبق',
          ],
          cta: 'اختيار المنظومة المحلية',
          featured: false,
        },
        {
          name: 'مراكز التدريب والدورات المعتمدة',
          badge: 'شهادات واعتماد رسمي',
          price: '$100 – $500',
          period: 'لكل متدرب · دورة 5 أيام',
          desc: 'لمراكز التدريب والمهندسين/المشغلين الأفراد (حد أدنى 5 متدربين للدورة).',
          bullets: [
            '$100 / متدرب على الوحدات القياسية العامة',
            '$500 / متدرب على وحدة مخصصة مبنية لمصنع بعينه',
            'دورة عملية مكثفة لمدة 5 أيام على المحاكي',
            'تفصيل درجات آلي وشهادة كفاءة معتمدة',
          ],
          cta: 'حجز دورة تدريبية',
          featured: false,
        },
      ],
    },
    founder: {
      badge: 'صُمم بأيدي مهندس تشغيل، وليس وكالة برمجيات عامة',
      title: 'م. مصطفى عادل — المؤسس والمدير التنفيذي (10 سنوات في التكرير والغاز والبتروكيماويات)',
      body: 'بعد عشر سنوات من تشغيل الوحدات في مصفاة ميدور، وشركة TCI Sanmar للبتروكيماويات، ومجمع عجيبة لمعالجة الغاز (الصحراء الغربية)، ومصفاة بورت هاركورت (نيجيريا)، رأيت بنفسي كيف أن أسعار المحاكيات الاحتكارية تركت المشغلين يعتمدون على النظريات الورقية والكتالوجات. بنيت نكسيفا لتضع تدريب الـ OTS الواقعي والمخصص في متناول كل منشأة ومهندس.',
      verified: ['مصفاة ميدور (MIDOR)', 'شركة TCI Sanmar للبتروكيماويات', 'مجمع عجيبة لمعالجة الغاز', 'مصفاة بورت هاركورت الدولية'],
    },
    bottomForm: {
      headingMain: 'ابدأ برنامجك التجريبي المدفوع',
      headingItalic: 'لمدة 3 أشهر.',
      subheading:
        'أخبرنا عن منشأتك أو مركز التدريب لديك، وسنرتب عرضاً حياً تفاعلياً لوحدة CDU/VDU قيد التشغيل.',
      button: 'طلب العرض الحي وتفاصيل التجربة',
    },
  },
};
