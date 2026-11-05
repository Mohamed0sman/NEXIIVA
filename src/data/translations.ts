export const translations = {
  EN: {
    nav: {
      brandTag: 'Process Operator Training Simulator',
      about: 'About Nexiiva',
      capabilities: 'Capabilities',
      otsBuilder: 'OTS Builder',
      whyNexiiva: 'Operational Reality',
      deployment: 'Security & Deployment',
      howToSubscribe: 'How to Subscribe',
      startPilot: 'Subscribe & Start',
      walkthrough: 'Watch CDU/VDU Demo',
    },
    hero: {
      headlineMain: 'Rehearse startups, upsets, and emergency shutdowns',
      headlineItalic: 'before touching the live plant.',
      subheadline:
        'Nexiiva delivers plant-specific Operator Training Simulators (OTS) for refineries, gas processors, petrochemical plants, and training centers. Built on real plant P&IDs and rigorous thermodynamic kinetics, our platform prepares console operators for critical process upsets without risk to live production assets.',
      ctaPrimary: 'How to Subscribe & Get Started',
      ctaSecondary: 'Watch Product Walkthrough',
      badges: {
        tag1: 'Plant-Specific P&ID Digital Twin',
        tag2: 'Rigorous Thermodynamics & Kinetics',
        tag3: '100% Air-Gapped OT Network',
      },
      pills: [
        {
          title: 'CDU/VDU Unit Live Today',
          desc: 'Full atmospheric & vacuum distillation digital twin operational.',
        },
        {
          title: '387-Type Equipment Library',
          desc: 'Custom unit assembly via OTS Builder in ~1 week target.',
        },
        {
          title: 'Automated Scoring & Certification',
          desc: 'Instant trainee evaluation after every fault and emergency scenario.',
        },
      ],
    },
    about: {
      eyebrow: 'COMPANY OVERVIEW & MISSION',
      headingMain: 'Democratizing high-fidelity simulation',
      headingItalic: 'for every industrial facility.',
      subheading:
        'Nexiiva was founded by veteran refinery operations engineers to solve a critical industry failure: 90% of industrial process units operate without dynamic simulators because legacy vendors charge millions and take 18+ months.',
      storyTitle: 'Built in the Control Room, Not in a Software Vacuum',
      storyBody:
        'Traditional Operator Training Simulators from legacy conglomerates (Honeywell, AspenTech, Yokogawa) are so prohibitively expensive and slow to deliver that only the largest greenfield megaprojects can justify them. Everyday refineries, revamps, and petrochemical units are forced to train junior operators through static binders and unpracticed on-shift exposure. Nexiiva replaces this paradigm by automating simulator generation from plant P&IDs, delivering customized, high-fidelity dynamic simulators in days rather than years.',
      metrics: [
        { value: '387+', label: 'Equipment Models', sub: 'Standardized industrial codex' },
        { value: '~1 Wk', label: 'Rapid Build Target', sub: 'From P&ID to running OTS' },
        { value: '100%', label: 'Air-Gapped Security', sub: 'ISA/IEC 62443 Level 3 compliance' },
        { value: '10+ Yrs', label: 'Field Operations', sub: 'Frontline refinery experience' },
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
        'Our proprietary OTS Builder platform assembles plant-specific training units from a 387-type industrial equipment library—operating online via AI agent or completely offline in air-gapped environments with no internet required.',
      features: [
        {
          title: 'AI & Offline Builder Modes',
          desc: 'Describe your process unit in Arabic or English using our specialized agent, or build deterministically in 100% offline mode for strict plant security.',
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
      eyebrow: 'PLATFORM CAPABILITIES',
      headingMain: 'Practice. Instruct.',
      headingItalic: 'Certify.',
      subheading:
        'Built for both daily operator readiness at plants and structured 5-day hands-on courses at industrial training centers.',
      pillars: [
        {
          title: '01. Practice (Trainee DCS Console)',
          desc: 'Realistic DCS-style process flow diagrams (PFD), control valve faceplates, pump & furnace controls, 12-channel live trend charts, and dynamic alarm handling matching Emerson DeltaV, Honeywell Experion, and Yokogawa CENTUM VP.',
        },
        {
          title: '02. Instruct (Instructor Command Suite)',
          desc: 'Mirror any trainee session live, inject 50+ realistic process faults (reflux loss, vacuum loss, feed pump trip, heater flame-out), freeze simulation, and evaluate operator response times under pressure.',
        },
        {
          title: '03. Certify (Automated Evaluation & Audit)',
          desc: 'Every trainee action is logged and scored automatically against safety and stability targets, generating a detailed Certificate of Competency with verifiable QR code for compliance and insurance audits.',
        },
      ],
    },
    deployment: {
      eyebrow: 'SECURITY ARCHITECTURE & DEPLOYMENT',
      headingMain: 'Cloud or On-Premise deployment,',
      headingItalic: 'including full offline operation.',
      subheading:
        'Whether you run a national refinery requiring air-gapped on-premise workstations or an engineering academy running multi-trainee cloud sessions, Nexiiva adapts to your infrastructure.',
      cards: [
        {
          title: '3-Month Validation Pilot',
          desc: 'Begin with a structured 3-month pilot. Every pilot includes unit model validation against real plant operating data and operator feedback.',
        },
        {
          title: 'Managed Private Cloud',
          desc: 'Fast setup with multi-user accounts, centralized instructor console, and flexible trainee-hour packs—ideal for immediate multi-site access.',
        },
        {
          title: 'Air-Gapped On-Premise (100% Offline)',
          desc: "Installed directly on your plant's local servers and operator stations with zero internet dependency and perpetual unit licensing.",
        },
      ],
    },
    howToSubscribe: {
      eyebrow: 'HOW TO SUBSCRIBE & GET STARTED',
      headingMain: 'A clear, 4-step onboarding journey from P&ID intake',
      headingItalic: 'to active control room training.',
      subheading:
        'No multi-year procurement delays or open-ended consulting fees. We follow a transparent, rapid deployment model built specifically for operations teams.',
      steps: [
        {
          number: '01',
          title: 'Technical Consultation & Unit Scoping',
          desc: 'A 30-minute discovery session with our senior simulation engineers to map target process units (CDU, VDU, HCU, Gas Plant), tag conventions, and training priorities.',
          timeline: 'Day 1',
        },
        {
          number: '02',
          title: 'Mutual NDA & Blueprint Ingestion',
          desc: 'Execution of bilateral Non-Disclosure Agreement (NDA). Secure handover of unit P&IDs, PFDs, operating heat & material balances, and control philosophy narratives.',
          timeline: 'Days 2–3',
        },
        {
          number: '03',
          title: 'Model Assembly & 90-Day Validation Pilot',
          desc: 'Our OTS Builder rapidly synthesizes the digital twin (~1 week target). Your operations superintendents and console operators validate unit behavior against actual shift data during a dedicated 90-day pilot.',
          timeline: 'Week 1 to Month 3',
        },
        {
          number: '04',
          title: 'Control Room Deployment & Operator Certification',
          desc: 'Rollout across control room training stations (Private Cloud or 100% Air-Gapped On-Premise). On-site instructor onboarding and automated ISA-106 operator competency certification.',
          timeline: 'Continuous Operations',
        },
      ],
      tracks: [
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
      form: {
        headingMain: 'Request subscription details',
        headingItalic: '& schedule scoping call.',
        subheading:
          'Tell us about your plant or training center, and our engineering desk will schedule a live technical demonstration and provide a tailored proposal.',
        button: 'Submit Subscription Request & NDA',
      },
    },
    founder: {
      badge: 'BUILT BY AN OPERATIONS ENGINEER, NOT A GENERIC SOFTWARE AGENCY',
      title: 'Mostafa Adel — Founder & CEO (10 Years in Refining, Gas & Petrochemicals)',
      body: 'After ten years operating units across MIDOR Refinery, TCI Sanmar Petrochemicals, Agiba Gas Processing Plant (Western Desert), and Port Harcourt Refinery (Nigeria), I saw firsthand how high simulator prices left operators relying on classroom theory and paper manuals. Nexiiva was built to put realistic, customized OTS training within reach of every plant and engineer.',
      verified: ['MIDOR Refinery', 'TCI Sanmar Petrochemicals', 'Agiba Gas Processing Plant', 'Port Harcourt Refinery'],
    },
  },
  AR: {
    nav: {
      brandTag: 'محاكي تدريب مشغلي العمليات',
      about: 'عن نكسيفا',
      capabilities: 'قدرات المنظومة',
      otsBuilder: 'منشئ OTS',
      whyNexiiva: 'الواقع التشغيلي',
      deployment: 'طرق النشر والأمان',
      howToSubscribe: 'طريقة الاشتراك',
      startPilot: 'الاشتراك والبدء',
      walkthrough: 'مشاهدة فيديو الشرح',
    },
    hero: {
      headlineMain: 'تدرّب على بدء التشغيل، اضطرابات العمليات، والإغلاق الاضطراري',
      headlineItalic: 'قبل لمس المنشأة الحية.',
      subheadline:
        'تقدّم نكسيفا محاكيات تدريب مشغلي العمليات (OTS) المخصصة لمصافي التكرير، ومعالجة الغاز، ومصانع البتروكيماويات، ومراكز التدريب. مبنية على مخططات P&ID الخاصة بمنشأتك وديناميكا حرارية دقيقة، لتأهيل مشغلي غرف التحكم للتعامل مع اضطرابات التشغيل الحرجة دون أي مخاطر على المنشأة الحية.',
      ctaPrimary: 'طريقة الاشتراك والبدء',
      ctaSecondary: 'مشاهدة العرض الحي (فيديو)',
      badges: {
        tag1: 'توأم رقمي مطابق لمخططات P&ID',
        tag2: 'ديناميكا حرارية وحركية دقيقة',
        tag3: 'شبكة صناعية معزولة 100% بدون إنترنت',
      },
      pills: [
        {
          title: 'وحدة CDU/VDU تعمل اليوم مباشرة',
          desc: 'توأم رقمي متكامل للتقطير الجوي والمفرغ قيد التشغيل الميداني الآن.',
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
    about: {
      eyebrow: 'نبذة عن نكسيفا ورؤيتنا',
      headingMain: 'تمكين مصافي التكرير والمنشآت البترولية',
      headingItalic: 'من امتلاك محاكيات تشغيل واقعية ومخصصة.',
      subheading:
        'تأسست نكسيفا بأيدي مهندسي تشغيل مصافي ميدانيين لحل مشكلة صناعية حرجة: 90% من وحدات العمليات في العالم العربي والشرق الأوسط تعمل دون محاكيات ديناميكية بسبب التكلفة الملايينية والتعقيد الزمني للبائعين التقليديين.',
      storyTitle: 'صُممت من داخل غرف التحكم، وليس في فراغ برمجيات تقليدي',
      storyBody:
        'محاكيات تدريب المشغلين التقليدية من الشركات الاحتكارية القديمة (Honeywell، AspenTech، Yokogawa) تكلف مبالغ باهظة وتتطلب مشاريع استشارية تمتد لأكثر من 18 شهراً، مما جعلها مقتصرة فقط على المشاريع العملاقة. ظلت معظم المصافي ووحدات الإنتاج تعتمد على تدريب المشغلين الجدد عبر مجلدات ورقية ومراقبة المشغلين الأقدم دون ممارسة حقيقية للحوادث والاضطرابات. تقدم نكسيفا بديلاً جذرياً عبر أتمتة بناء المحاكي مباشرة من مخططات P&ID، لنمنح منشأتك محاكياً دقيقاً ومطابقاً خلال أيام وبجزء ضئيل من التكلفة.',
      metrics: [
        { value: '+387', label: 'معدة صناعية قياسية', sub: 'أبراج، أفران، ضواغط، صمامات' },
        { value: '~1 أسبوع', label: 'الهدف الزمني للبناء', sub: 'من المخطط إلى محاكي يعمل' },
        { value: '100%', label: 'أمان صناعي معزول', sub: 'مطابقة لمعايير ISA/IEC 62443' },
        { value: '+10 سنوات', label: 'خبرة تشغيل ميدانية', sub: 'في كبرى مصافي ومجمعات البترول' },
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
      eyebrow: 'منشئ OTS — تقنية نكسيفا المبتكرة',
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
      eyebrow: 'قدرات منظومة نكسيفا',
      headingMain: 'تدرّب. درّب.',
      headingItalic: 'اعتمد الكفاءات.',
      subheading:
        'صُمم لدعم الجاهزية التشغيلية اليومية للمشغلين داخل المنشآت، ولتنفيذ دورات عملية مكثفة لمدة 5 أيام داخل مراكز التدريب البترولية والصناعية.',
      pillars: [
        {
          title: '01. التدرب (شاشة تحكم المشغل DCS)',
          desc: 'مخططات تدفق العمليات (PFD) بأسلوب أنظمة التحكم الموزعة (DeltaV وExperion وCentum)، واجهات تحكم الصمامات والمضخات والأفران، رسام بياني بـ 12 مساراً، وإدارة حية للإنذارات.',
        },
        {
          title: '02. التدريب (لوحة تحكم المدرب وسيناريوهات الطوارئ)',
          desc: 'مراقبة جلسات المتدربين لحظياً، حقن أكثر من 50 عطلاً واقعياً (فقدان الراجع، هبوط التفريغ، توقف مضخة التغذية، انطفاء شعلة الفرن)، وإعادة ضبط الظروف وتجميد المحاكاة فورياً.',
        },
        {
          title: '03. الاعتماد (التقييم الآلي المعتمد)',
          desc: 'تسجيل وتقييم كل إجراء يتخذه المتدرب آلياً وفق معايير ISA-106 وسلامة الوحدة، وإصدار شهادة كفاءة رقمية مع رمز QR للتحقق في تدقيقات السلامة والتأمين.',
        },
      ],
    },
    deployment: {
      eyebrow: 'الأمان الصناعي والبنية التحتية',
      headingMain: 'نشر سحابي أو محلي (On-Premise)،',
      headingItalic: 'بما في ذلك التشغيل المعزول تماماً عن الإنترنت.',
      subheading:
        'سواء كنت تدير مصفاة وطنية تشترط محطات عمل محلية معزولة تماماً (Air-Gapped) أو مركز تدريب يدير جلسات سحابية لعدة متدربين، تتكيف نكسيفا مع بنيتك التحتية.',
      cards: [
        {
          title: 'برنامج التحقق التجريبي (90 يوماً)',
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
    howToSubscribe: {
      eyebrow: 'طريقة الاشتراك ومراحل البدء',
      headingMain: 'مسار انضمام منظم من 4 خطوات واضحة',
      headingItalic: 'من تسليم المخططات إلى التدريب الفعلي بغرفة التحكم.',
      subheading:
        'دون دورات شراء معقدة تمتد لسنوات أو رسوم استشارية غامضة. نتبع نموذج نشر سريع وشفاف مصمم خصيصاً لفرق التشغيل والتدريب في المنشآت الصناعية.',
      steps: [
        {
          number: '01',
          title: 'الاستشارة الفنية وتحديد نطاق الوحدة',
          desc: 'جلسة استكشافية لمدة 30 دقيقة مع مهندسي المحاكاة لدينا لتحديد وحدات العمليات المستهدفة (تقطير، تكسير هيدروجيني، معالجة غاز)، وتسميات الوسوم، وأولويات التدريب.',
          timeline: 'اليوم 1',
        },
        {
          number: '02',
          title: 'اتفاقية السرية واستلام المخططات (P&ID)',
          desc: 'توقيع اتفاقية سرية المعلومات (NDA) المتبادلة لضمان أقصى حماية لبياناتكم. استلام مخططات P&ID، وبيانات توازن المادة والحرارة، وكتيبات فلسفة التحكم.',
          timeline: 'الأيام 2–3',
        },
        {
          number: '03',
          title: 'تجميع النموذج وبرنامج التحقق (90 يوماً)',
          desc: 'يقوم منشئ OTS بتجميع التوأم الرقمي في وقت قياسي (~أسبوع واحد). يختبر مهندسو ومشغلو المنشأة سلوك الوحدة بدقة ومقارنتها ببيانات التشغيل الفعلية ضمن برنامج تحقق ممتد لـ 90 يوماً.',
          timeline: 'الأسبوع 1 حتى الشهر 3',
        },
        {
          number: '04',
          title: 'النشر الكامل بغرفة التحكم واعتماد المشغلين',
          desc: 'تثبيت المنظومة على محطات التدريب المعتمدة (سحابياً أو محلياً معزولاً 100% أوفلاين). تدريب المدربين والبدء الفوري في اعتماد المشغلين وفق معايير ISA-106 الدولية.',
          timeline: 'تشغيل مستمر واعتماد دوري',
        },
      ],
      tracks: [
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
      form: {
        headingMain: 'اطلب تفاصيل الاشتراك',
        headingItalic: 'واحجز جلسة استشارة فنية.',
        subheading:
          'أخبرنا عن منشأتك أو مركز التدريب لديك، وسيقوم مكتبنا الهندسي بتنسيق عرض حي وتقديم مقترح اشتراك مخصص.',
        button: 'إرسال طلب الاشتراك واتفاقية NDA',
      },
    },
    founder: {
      badge: 'صُمم بأيدي مهندس تشغيل، وليس وكالة برمجيات عامة',
      title: 'م. مصطفى عادل — المؤسس والمدير التنفيذي (10 سنوات في التكرير والغاز والبتروكيماويات)',
      body: 'بعد عشر سنوات من تشغيل الوحدات في مصفاة ميدور، وشركة TCI Sanmar للبتروكيماويات، ومجمع عجيبة لمعالجة الغاز (الصحراء الغربية)، ومصفاة بورت هاركورت (نيجيريا)، رأيت بنفسي كيف أن تكاليف وتعقيدات المحاكيات الاحتكارية تركت المشغلين يعتمدون على النظريات الورقية والكتالوجات. بنيت نكسيفا لتضع تدريب الـ OTS الواقعي والمخصص في متناول كل منشأة ومهندس.',
      verified: ['مصفاة ميدور (MIDOR)', 'شركة TCI Sanmar للبتروكيماويات', 'مجمع عجيبة لمعالجة الغاز', 'مصفاة بورت هاركورت الدولية'],
    },
  },
};
