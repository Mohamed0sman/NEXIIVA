import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';

type CategoryKey = 'COLUMNS' | 'HEATERS' | 'ROTATING' | 'CONTROLS' | 'SAFETY';

interface EquipmentItem {
  tag: string;
  name: string;
  nameAr: string;
  symbol: string;
  equation: string;
  failureModes: string[];
  failureModesAr: string[];
}

export const Section_EquipmentCodex: React.FC = () => {
  const { language } = useSimulationJourney();
  const [selectedCat, setSelectedCat] = useState<CategoryKey>('COLUMNS');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem>({
    tag: 'T-22',
    name: 'Atmospheric Distillation Column',
    nameAr: 'برج التقطير الجوي متعدد الصواني',
    symbol: 'COLUMN-FRACTIONATOR',
    equation: 'dM_i/dt = L_{i-1} + V_{i+1} - L_i - V_i + F_i',
    failureModes: ['Tray Flooding / Entrainment', 'Weeping / Dumping', 'Reflux Subcooling Thermal Shock'],
    failureModesAr: ['طوفان السائل وتجاوز الصواني', 'تسريب وتفريغ السائل السفلي', 'صدمة حرارية لفرط برودة الارتجاع'],
  });

  const isRTL = language === 'AR';

  const categories: Record<CategoryKey, { label: string; labelAr: string; count: number; items: EquipmentItem[] }> = {
    COLUMNS: {
      label: 'Fractionation & Separation',
      labelAr: 'أبراج التقطير والفصل',
      count: 42,
      items: [
        {
          tag: 'T-22',
          name: 'Atmospheric Distillation Column',
          nameAr: 'برج التقطير الجوي متعدد الصواني',
          symbol: 'COLUMN-FRACTIONATOR',
          equation: 'dM_i/dt = L_{i-1} + V_{i+1} - L_i - V_i + F_i',
          failureModes: ['Tray Flooding / Entrainment', 'Weeping / Dumping', 'Reflux Subcooling Thermal Shock'],
          failureModesAr: ['طوفان السائل وتجاوز الصواني', 'تسريب وتفريغ السائل السفلي', 'صدمة حرارية لفرط برودة الارتجاع'],
        },
        {
          tag: 'T-60',
          name: 'Deep Vacuum Distillation Tower',
          nameAr: 'برج التقطير المفرغ العميق',
          symbol: 'COLUMN-VACUUM',
          equation: 'P_{vac} = P_{ejector} - \\Delta P_{packing} - \\rho g h',
          failureModes: ['Vacuum Loss via Barometric Ejector Choke', 'Bottom Residue Overheating & Coking', 'Wash Bed Dryout'],
          failureModesAr: ['فقدان التفريغ بسبب انسداد طارد البخار', 'تفحم واحتراق المتبقي السفلي', 'جفاف طبقات الغسيل السفلية'],
        },
        {
          tag: 'C-104',
          name: 'Debutanizer Stabilizer Column',
          nameAr: 'برج استقرار ونزع غاز البيوتان',
          symbol: 'COLUMN-DEBUTANIZER',
          equation: 'y_i = K_i \\cdot x_i \\quad [K_i = f(T, P, z)]',
          failureModes: ['Off-Spec LPG C4 Contamination', 'Reboiler Siphon Vapor Lock', 'Condenser Flooding'],
          failureModesAr: ['تلوث غاز البوتاجاز بمركبات ثقيلة', 'حبس بخاري في السيفون الحراري', 'طوفان مكثف القمة'],
        },
      ],
    },
    HEATERS: {
      label: 'Fired Heaters & Furnaces',
      labelAr: 'الأفران والمبادلات الحرارية',
      count: 58,
      items: [
        {
          tag: 'F-101',
          name: 'Crude Charge Fired Heater',
          nameAr: 'فرن تسخين النفط الخام الرئيسي',
          symbol: 'FURNACE-CABIN',
          equation: 'Q = \\eta \\cdot m_{fuel} \\cdot LHV = m_{crude} C_p \\Delta T',
          failureModes: ['Tube Rupture / Firebox Explosion', 'Fuel Gas Pressure Loss / Flameout', 'Localized Tube Skin Coking Hotspot'],
          failureModesAr: ['انفجار وتمزق أنبوب داخل بيت النار', 'انخفاض ضغط غاز الوقود وانطفاء الشعلات', 'تفحم وتكلس موضعي وارتفاع حرارة الأنبوب'],
        },
        {
          tag: 'E-101 A-D',
          name: 'Crude Preheat Exchanger Train',
          nameAr: 'مصفوفة مبادلات التسخين المسبق',
          symbol: 'HEAT-EXCHANGER-ST',
          equation: 'Q = U \\cdot A \\cdot LMTD \\cdot F_t',
          failureModes: ['Tube Bundle Fouling / Delta-P Surge', 'Gasket Blowout / Hydrocarbon Cross-Leak'],
          failureModesAr: ['ترسبات وتكلس الحزمة الأنبوبية وارتفاع فرق الضغط', 'تلف الحشوة وتسرب الهيدروكربون الداخلي'],
        },
        {
          tag: 'E-104',
          name: 'Thermosiphon Bottoms Reboiler',
          nameAr: 'غلاية القاع بالسيفون الحراري',
          symbol: 'REBOILER-THERMOSIPHON',
          equation: '\\Delta P_{static} = \\Delta P_{two-phase} + \\Delta P_{fric}',
          failureModes: ['Vapor Binding / Stagnant Circulation', 'Steam Condensate Backup'],
          failureModesAr: ['حبس البخار وتوقف الدورة الطبيعية', 'تراكم متكثف البخار وانخفاض الكفاءة'],
        },
      ],
    },
    ROTATING: {
      label: 'Rotating Pumps & Compressors',
      labelAr: 'المضخات والضواغط التوربينية',
      count: 86,
      items: [
        {
          tag: 'P-1007 A/B',
          name: 'Overhead Reflux Centrifugal Pump',
          nameAr: 'مضخة الارتجاع المزدوجة للطرد المركزي',
          symbol: 'PUMP-CENTRIFUGAL',
          equation: 'H = H_0 - A \\cdot Q^2 \\quad (NPSH_a > NPSH_r)',
          failureModes: ['Motor Electrical Thermal Trip', 'NPSH Cavitation Vapor Bubble Implosion', 'Mechanical Seal Blowout / Volatile Leak'],
          failureModesAr: ['هبوط حراري للمحرك الكهربائي', 'تكوه البخار داخل المضخة (Cavitation)', 'تلف مانع التسرب الميكانيكي وتسرب السائل'],
        },
        {
          tag: 'K-201',
          name: 'Centrifugal Wet Gas Compressor',
          nameAr: 'ضاغط الغازات الهيدروكربونية الرطبة',
          symbol: 'COMPRESSOR-CENTRIFUGAL',
          equation: 'W = \\frac{k}{k-1} Z R T_1 \\left[ \\left(\\frac{P_2}{P_1}\\right)^{\\frac{k-1}{k}} - 1 \\right]',
          failureModes: ['Severe Dynamic Compressor Surge', 'Lube Oil Low Pressure Interlock Trip', 'Liquid Slug Impeller Destruction'],
          failureModesAr: ['ظاهرة الارتجاف العنيف (Compressor Surge)', 'انخفاض ضغط زيت التزييت وهبوط الأمان', 'دخول قطرات سائلة وكسر ريش التوربين'],
        },
      ],
    },
    CONTROLS: {
      label: 'Instrumentation & PID Loops',
      labelAr: 'أجهزة القياس وحلقات التحكم الآلي',
      count: 114,
      items: [
        {
          tag: 'TIC-101',
          name: 'Column Top Temperature Cascade Loop',
          nameAr: 'حلقة التحكم التتابعي بحرارة القمة',
          symbol: 'CONTROLLER-PID',
          equation: 'u(t) = K_p e(t) + K_i \\int e(\\tau) d\\tau + K_d \\frac{de}{dt}',
          failureModes: ['Thermocouple Drift / Broken Wire Fail-Low', 'Transmitter Freezing on Last Good Value', 'Tuning Oscillation Hunting'],
          failureModesAr: ['انقطاع سلك الحساس الحراري والقراءة الوهمية', 'تجمد جهاز الإرسال على آخر قيمة', 'تذبذب مفرط في حلقة التحكم بسبب الضبط الخاطئ'],
        },
        {
          tag: 'PIC-104',
          name: 'Split-Range Column Pressure Controller',
          nameAr: 'متحكم الضغط ثنائي النطاق (التكثيف والتفريغ)',
          symbol: 'SPLIT-RANGE-PID',
          equation: 'Output \\in [0-50\\% \\to Condenser, 50-100\\% \\to Flare]',
          failureModes: ['Split-Range Gap Deadband Overlap', 'Rapid Flare Blowdown Valve Chattering'],
          failureModesAr: ['تداخل نطاق الفتح بين التكثيف والشعلة', 'اهتزاز متكرر لصمام الشعلة وهدر الغاز'],
        },
      ],
    },
    SAFETY: {
      label: 'Safety, Interlocks & Flare',
      labelAr: 'أنظمة السلامة والشعلة وESD',
      count: 87,
      items: [
        {
          tag: 'ESD-01',
          name: 'Emergency Shutdown Matrix (SIL-3)',
          nameAr: 'نظام الإغلاق الاضطراري للمصفاة (SIL-3)',
          symbol: 'SAFETY-INTERLOCK',
          equation: 'PFD_{avg} < 10^{-3} \\quad \\text{IEC 61508 / 61511 Standards}',
          failureModes: ['Spurious Trip Causing Unplanned Blackout', 'Stuck Solenoid Valve on Critical ESD Isolation'],
          failureModesAr: ['هبوط كاذب يتسبب في توقف المصفاة بالكامل', 'انحشار صمام الملف اللولبي عند الطوارئ'],
        },
        {
          tag: 'PSV-102',
          name: 'Overpressure Relief Valve to Flare',
          nameAr: 'صمام تخفيف الضغط الزائد إلى الشعلة',
          symbol: 'VALVE-RELIEF',
          equation: 'A = \\frac{W}{C K_d P_1 K_b} \\sqrt{\\frac{T Z}{M}}',
          failureModes: ['Valve Chatter & Seat Damage', 'Failure to Reseat after Pressure Transient'],
          failureModesAr: ['تلف مقعد الصمام وتسريب مستمر للشعلة', 'عدم انغلاق الصمام بعد انتهاء موجة الضغط'],
        },
      ],
    },
  };

  const handleSelectCategory = (cat: CategoryKey) => {
    setSelectedCat(cat);
    const firstItem = categories[cat].items[0];
    if (firstItem) setSelectedEquipment(firstItem);
    dcsAudio.playClick();
  };

  const handleSelectEquipment = (item: EquipmentItem) => {
    setSelectedEquipment(item);
    dcsAudio.playClick();
  };

  return (
    <section id="equipment-codex" className="py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#03050C] border-t border-purple-500/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-purple-500/15 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>{isRTL ? 'موسوعة المعدات الهندسية' : '387 INDUSTRIAL EQUIPMENT TYPES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-metallic tracking-tight">
              {isRTL ? 'مكتبة نمذجة فيزيائية كاملة.' : 'Rigorous Thermodynamic Models.'}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isRTL
                ? 'لا نستخدم محاكاة سطحية أو رسوم متحركة تجريدية. كل صمام ومضخة وبرج تقطير مبني على معادلات نافييه-ستوكس وبينج-روبنسون الحقيقية مع محاكاة أكثر من 50 سيناريو عطل ميكانيكي وكهربائي.'
                : 'Not a simplified toy simulator. Every vessel, tray, and compressor runs on rigorous Navier-Stokes and Peng-Robinson equations with over 50 unannounced mechanical and electrical failure modes.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#080B1C] p-1.5 rounded-xl border border-purple-500/20">
            {(Object.keys(categories) as CategoryKey[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                  selectedCat === cat
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{isRTL ? categories[cat].labelAr : categories[cat].label}</span>
                <span className="text-[10px] opacity-75 font-normal">({categories[cat].count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* The Equipment Codex Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Equipment List for Selected Category (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#060918] border border-purple-500/25 p-4 flex flex-col space-y-3 shadow-xl">
            <div className="text-xs font-mono text-slate-400 pb-2 border-b border-purple-500/15 flex justify-between">
              <span>{isRTL ? 'المعدات المتاحة بالوحدة' : 'EQUIPMENT ROSTER'}</span>
              <span className="text-purple-300">{categories[selectedCat].count} TOTAL</span>
            </div>

            <div className="space-y-2 flex-1">
              {categories[selectedCat].items.map((item) => (
                <div
                  key={item.tag}
                  onClick={() => handleSelectEquipment(item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedEquipment.tag === item.tag
                      ? 'bg-purple-950/40 border-purple-500/60 shadow-lg text-white'
                      : 'bg-[#090D22]/60 border-purple-500/10 hover:border-blue-500/30 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400">{item.tag}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-purple-300">
                      {item.symbol}
                    </span>
                  </div>
                  <div className="font-bold text-sm mt-1">
                    {isRTL ? item.nameAr : item.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-purple-500/15 text-[11px] font-mono text-slate-400">
              {isRTL
                ? '+ 300 معدة إضافية متاحة في مكتبة نكسيفا الصناعية'
                : '+ 300 additional models available in full catalog'}
            </div>
          </div>

          {/* Right: Detailed Engineering Dossier (8 Cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#070A1A] border border-purple-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/15 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-mono font-black text-cyan-400">
                    {selectedEquipment.tag}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {isRTL ? selectedEquipment.nameAr : selectedEquipment.name}
                    </h3>
                    <span className="text-xs font-mono text-purple-300">
                      ISA-5.1 STANDARD TAG: {selectedEquipment.symbol}
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>100% RIGOROUS CALCULATION</span>
                </div>
              </div>

              {/* Mathematical Equation Box */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {isRTL ? 'المعادلة الفيزيائية الحاكمة (Governing Physical Law):' : 'GOVERNING PHYSICAL LAW & FLUID EQUATION:'}
                </span>
                <div className="p-4 rounded-xl bg-[#03050C] border border-purple-500/30 font-mono text-emerald-300 text-sm sm:text-base overflow-x-auto shadow-inner">
                  <code>{selectedEquipment.equation}</code>
                </div>
              </div>

              {/* Injected Fault Scenarios (Instructor Capability) */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-rose-300 uppercase tracking-wider flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{isRTL ? 'سيناريوهات الأعطال القابلة للحقن أثناء التدريب (Fault Injection):' : 'SUPPORTED INSTRUCTOR FAULT INJECTIONS:'}</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(isRTL ? selectedEquipment.failureModesAr : selectedEquipment.failureModes).map((fault, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200 text-xs font-mono flex items-start space-x-2"
                    >
                      <span className="text-rose-400 font-bold shrink-0">#{idx + 1}</span>
                      <span>{fault}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Proof Note */}
            <div className="mt-8 pt-4 border-t border-purple-500/15 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-3">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>
                  {isRTL
                    ? 'متوافق مع معايير ASME Section VIII ومعايير API 521 للسلامة والضغط'
                    : 'Compliant with ASME Sec. VIII, API 520/521, and IEC 61511 standards'}
                </span>
              </div>
              <span className="text-cyan-400 font-bold">
                {isRTL ? 'زمن الحل: 100 ميلي ثانية' : 'DYNAMIC TIME STEP: 100ms'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
