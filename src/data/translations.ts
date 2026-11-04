export const translations = {
  EN: {
    nav: {
      brandTag: 'Process Operator Training Simulator',
      simulator: 'Simulator',
      otsBuilder: 'OTS Builder',
      whyNexiiva: 'Why Nexiiva',
      deployment: 'Deployment',
      pricing: 'Licensing',
      startPilot: 'Request a Pilot',
      walkthrough: 'Watch Live CDU/VDU Demo',
    },
    hero: {
      headlineMain: 'Rehearse startups, upsets, and emergency shutdowns',
      headlineItalic: 'before touching the live plant.',
      subheadline:
        'Nexiiva delivers plant-specific Operator Training Simulators (OTS) for refineries, gas processors, petrochemical plants, and training centers. Practice on realistic DCS screens, inject faults from the instructor console, and certify operators automatically—at a fraction of legacy simulator costs.',
      ctaPrimary: 'Book a 3-Month Pilot',
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
        title: '"One unfamiliar fault on a single shift can cause catastrophic downtime and equipment damage."',
        body: 'Most junior operators learn by sitting next to a senior operator and reading static SOP binders. When an unfamiliar upset hits and the operator has to flip through manual pages under alarm floods, a slow response can escalate into an emergency unit trip, severe equipment damage, weeks of lost throughput, and steep contractual delivery penalties.',
        footerStat: '10+ Years of Field Observation — MIDOR, Sanmar, Agiba & Port Harcourt',
      },
      comparison: {
        title: 'Nexiiva vs. Legacy Alternatives',
        headers: ['Criteria', 'Large Vendors', 'Specialist Firms', 'NEXIIVA'],
        rows: [
          {
            criteria: 'Investment & Delivery Model',
            largeVendors: 'High Multi-Year CapEx',
            specialists: 'Custom Consulting per Project',
            nexiiva: 'Agile Pilot to Scalable License',
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
          title: '3-Month Pilot Program (Validation Included)',
          desc: 'Start with a structured 3-month pilot. Every pilot includes unit validation against real plant operating data and structured operator feedback.',
        },
        {
          title: 'Managed Cloud OTS',
          desc: 'Fast setup with multi-user accounts, centralized instructor console, and flexible trainee-hour packs—ideal for immediate rollout.',
        },
        {
          title: 'Air-Gapped On-Premise OTS',
          desc: "Installed directly on your plant's local servers and operator stations with zero internet dependency and perpetual unit licensing.",
        },
      ],
    },
    pricing: {
      eyebrow: 'COMMERCIAL LICENSING & ENGAGEMENT',
      headingMain: 'Flexible engagement models built for',
      headingItalic: 'every industrial facility.',
      subheading:
        'Structured proposals tailored to your unit count, shift schedule, and deployment topology. Contact our engineering desk for a custom deployment proposal.',
      cards: [
        {
          name: 'Validation Pilot',
          badge: 'RECOMMENDED ENTRY POINT',
          price: 'Custom Pilot',
          period: '3-Month Plant Validation',
          desc: 'Test Nexiiva on your operations team and validate unit behavior before signing a full contract.',
          bullets: [
            'Dedicated 3-month active pilot access',
            'Validation on real unit operating data',
            'Instructor & trainee console access',
            'Structured performance feedback report',
          ],
          cta: 'Request Pilot Proposal',
          featured: true,
        },
        {
          name: 'Cloud OTS (Enterprise)',
          badge: 'MANAGED PRIVATE CLOUD',
          price: 'Enterprise Cloud',
          period: 'Annual Subscription · Scalable Seats',
          desc: 'Dedicated private cloud simulator for continuous operations training with zero local IT maintenance overhead.',
          bullets: [
            'Full cloud environment setup & custom unit build',
            'Centralized instructor console & trainee accounts',
            'Dedicated instructor on-site onboarding & training',
            'Automatic rubric grading scorecards & certificates',
          ],
          cta: 'Inquire for Cloud License',
          featured: false,
        },
        {
          name: 'On-Premise OTS (Perpetual)',
          badge: 'AIR-GAPPED PERPETUAL',
          price: 'Perpetual License',
          period: '100% Offline · Plant Hardware',
          desc: 'Installed directly on your local servers and operator stations with zero internet dependency for strict OT confidentiality.',
          bullets: [
            'Custom unit dynamic build from plant P&IDs',
            'Multi-station local operator console deployment',
            '100% offline air-gapped security compliance',
            'On-site operator & instructor commissioning',
          ],
          cta: 'Request On-Prem Quote',
          featured: false,
        },
        {
          name: 'Training Centers & Academies',
          badge: 'ACCREDITED CERTIFICATION',
          price: 'Cohort Licensing',
          period: 'Institutional & Course Packs',
          desc: 'For petroleum training centers, universities, and individual engineers qualifying console operators.',
          bullets: [
            'Generic standard units & specific custom units',
            'Intensive 5-day hands-on simulator course packs',
            'Automated competency grading & verification stamp',
            'Academic partnership & multi-trainee scheduling',
          ],
          cta: 'Inquire for Academies',
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
      headingMain: 'Request an enterprise',
      headingItalic: '3-month pilot proposal.',
      subheading:
        'Tell us about your plant or training center, and our engineering desk will schedule a live demonstration and provide a tailored pilot outline.',
      button: 'Request Pilot Proposal & NDA',
    },
  },
  AR: {
    nav: {
      brandTag: 'محاكي تدريب مشغلي العمليات',
      simulator: 'المحاكي',
      otsBuilder: 'منشئ OTS',
      whyNexiiva: 'لماذا نكسيفا',
      deployment: 'طرق النشر',
      pricing: 'التراخيص',
      startPilot: 'طلب برنامج تجريبي',
      walkthrough: 'مشاهدة العرض الحي لوحدة CDU/VDU',
    },
    hero: {
      headlineMain: 'تدرّب على بدء التشغيل، اضطرابات العمليات، والإغلاق الاضطراري',
      headlineItalic: 'قبل لمس المنشأة الحية.',
      subheadline:
        'تقدّم نكسيفا محاكيات تدريب مشغلي العمليات (OTS) المخصصة لمصافي التكرير، ومعالجة الغاز، ومصانع البتروكيماويات، ومراكز التدريب. تدرّب على شاشات DCS واقعية، واحقن الأعطال من لوحة تحكم المدرب، واعتمد المشغلين آلياً—بجزء ضئيل من تكلفة المحاكيات التقليدية.',
      ctaPrimary: 'حجز تجربة 3 أشهر',
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
        title: '"عطل واحد غير مألوف في وردية واحدة يمكن أن يكلّف المنشأة توقفاً كارثياً وأضراراً فادحة في المعدات."',
        body: 'يتعلم معظم المشغلين الجدد بالجلوس بجوار مشغل قديم وقراءة مجلدات إجراءات التشغيل القياسية (SOP). عندما يحدث اضطراب غير مألوف ويضطر المشغل لتصفح المجلدات تحت طوفان الإنذارات، يمكن أن يتصاعد التأخر في الاستجابة إلى إغلاق اضطراري للوحدة، وتلف المعدات، وأسابيع من الإنتاج المفقود مع غرامات تأخير قاسية.',
        footerStat: 'أكثر من 10 سنوات من الملاحظة الميدانية — ميدور، سانمار، عجيبة، وبورت هاركورت',
      },
      comparison: {
        title: 'نكسيفا مقابل البدائل التقليدية القديمة',
        headers: ['المعيار', 'الشركات الكبرى الاحتكارية', 'المكاتب الاستشارية المتخصصة', 'نكسيفا (NEXIIVA)'],
        rows: [
          {
            criteria: 'نموذج الاستثمار والتسليم',
            largeVendors: 'عقود ملزمة واستثمار رأسمالي ضخم',
            specialists: 'استشارات مكلفة لكل مشروع',
            nexiiva: 'تجربة مرنة ثم ترخيص مخصص',
          },
          {
            criteria: 'تخصيص وبناء الوحدة',
            largeVendors: 'دورات تسليم طويلة مرهونة بالبائع',
            specialists: 'مشروع استشاري منفصل لكل منشأة',
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
          title: 'برنامج تجريبي لـ 3 أشهر (يشمل التحقق الميداني)',
          desc: 'ابدأ ببرنامج تجريبي منظم لمدة 3 أشهر. يشمل التحقق من دقة النموذج بمقارنته ببيانات التشغيل الفعلية لمصفاتك وملاحظات المشغلين.',
        },
        {
          title: 'المحاكي السحابي المدار (Cloud OTS)',
          desc: 'إعداد فوري مع حسابات مستخدمين متعددة، لوحة تحكم مركزية للمدرب، وباقات ساعات تدريب مرنة—مثالي للإطلاق السريع.',
        },
        {
          title: 'المحاكي المحلي المعزول (Air-Gapped On-Premise)',
          desc: 'يُثبت مباشرة على خوادم ومحطات تشغيل المنشأة دون أي اتصال خارجي بالإنترنت، مع ترخيص دائم للوحدة.',
        },
      ],
    },
    pricing: {
      eyebrow: 'نماذج التراخيص والتعاقد المؤسسي',
      headingMain: 'نماذج تعاقد مرنة مصممة لدعم',
      headingItalic: 'كل منشأة صناعية.',
      subheading:
        'مقترحات مخصصة بحسب عدد الوحدات، وجداول الورديات، وطريقة النشر المناسبة لمنشأتك. تواصل مع مكتبنا الهندسي للحصول على مقترح تشغيل متكامل.',
      cards: [
        {
          name: 'البرنامج التجريبي للمنشأة',
          badge: 'نقطة الانطلاق الموصى بها',
          price: 'برنامج تجريبي',
          period: 'مدة تحقق 3 أشهر',
          desc: 'اختبر نكسيفا مع فريق العمليات لديك وتحقق من سلوك الوحدة قبل توقيع العقد الكامل.',
          bullets: [
            'صلاحية استخدام كاملة لمدة 3 أشهر',
            'تحقق من دقة النموذج على بيانات منشأتك الفعلية',
            'وصول كامل للوحة المشغل ولوحة المدرب',
            'تقرير أداء وملاحظات تشغيلية منظمة',
          ],
          cta: 'طلب مقترح التجربة',
          featured: true,
        },
        {
          name: 'نكسيفا كلاود للشركات',
          badge: 'سحابة خاصة مدارة',
          price: 'ترخيص سحابي مؤسسي',
          period: 'اشتراك سنوي مرن حسب عدد المستخدمين',
          desc: 'محاكي سحابي خاص وآمن لتدريب مستمر للمشغلين والمهندسين دون الحاجة لصيانة أجهزة محلية.',
          bullets: [
            'إعداد كامل للبيئة وبناء نموذج الوحدة المخصص',
            'لوحة مدرب مركزية وحسابات متدربين متعددة',
            'تدريب المدربين واعتماد خطط التدريب الميدانية',
            'بطاقات تقييم آلية وشهادات كفاءة رقمية',
          ],
          cta: 'طلب عرض السحابة المؤسسية',
          featured: false,
        },
        {
          name: 'المنظومة المحلية المفصولة (On-Premise)',
          badge: 'ترخيص دائم 100% أوفلاين',
          price: 'ترخيص محلي دائم',
          period: 'تثبيت محلي على خوادم المنشأة',
          desc: 'ترخيص دائم مثبت على خوادم ومحطات المنشأة دون أي اتصال بالإنترنت لضمان أقصى سرية للمخططات.',
          bullets: [
            'بناء نموذج ديناميكي دقيق من مخططات P&ID الخاصة بك',
            'تثبيت وتشغيل محطات المشغلين داخل مركز التدريب',
            'تشغيل 100% أوفلاين بمعايير الأمان الصناعي المعزول',
            'معايرة وتدريب ميداني شامل داخل المنشأة',
          ],
          cta: 'طلب عرض المنظومة المحلية',
          featured: false,
        },
        {
          name: 'مراكز التدريب والأكاديميات',
          badge: 'اعتماد وتأهيل فني',
          price: 'ترخيص حسب الدفعات',
          period: 'دورات تأهيل معتمدة',
          desc: 'لمراكز التدريب والجامعات والمهندسين الأفراد لتأهيل واعتماد مشغلي غرف التحكم الجدد.',
          bullets: [
            'مناهج تدريب على الوحدات القياسية والوحدات المخصصة',
            'حزم دورات تدريبية عملية مكثفة لمدة 5 أيام',
            'تفصيل درجات آلي وشهادة كفاءة معتمدة',
            'مرونة في جدولة الدفعات وتراخيص الشراكة الأكاديمية',
          ],
          cta: 'استفسار مراكز التدريب',
          featured: false,
        },
      ],
    },
    founder: {
      badge: 'صُمم بأيدي مهندس تشغيل، وليس وكالة برمجيات عامة',
      title: 'م. مصطفى عادل — المؤسس والمدير التنفيذي (10 سنوات في التكرير والغاز والبتروكيماويات)',
      body: 'بعد عشر سنوات من تشغيل الوحدات في مصفاة ميدور، وشركة TCI Sanmar للبتروكيماويات، ومجمع عجيبة لمعالجة الغاز (الصحراء الغربية)، ومصفاة بورت هاركورت (نيجيريا)، رأيت بنفسي كيف أن تكاليف وتعقيدات المحاكيات الاحتكارية تركت المشغلين يعتمدون على النظريات الورقية والكتالوجات. بنيت نكسيفا لتضع تدريب الـ OTS الواقعي والمخصص في متناول كل منشأة ومهندس.',
      verified: ['مصفاة ميدور (MIDOR)', 'شركة TCI Sanmar للبتروكيماويات', 'مجمع عجيبة لمعالجة الغاز', 'مصفاة بورت هاركورت الدولية'],
    },
    bottomForm: {
      headingMain: 'اطلب مقترح برنامج تجريبي',
      headingItalic: 'لمدة 3 أشهر.',
      subheading:
        'أخبرنا عن منشأتك أو مركز التدريب لديك، وسيقوم مكتبنا الهندسي بتنسيق عرض حي وتقديم خطة تجريبية مخصصة.',
      button: 'طلب مقترح البرنامج التجريبي واتفاقية NDA',
    },
  },
};
