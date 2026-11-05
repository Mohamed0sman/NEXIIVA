import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dispatchFormSubmission, RECIPIENT_EMAIL, RECIPIENT_DISPLAY_PHONE, RECIPIENT_INTL_PHONE } from '../utils/contactDispatcher';
import { Mail, Phone, Building, User, Send, MessageSquare, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export const PilotDrawer: React.FC = () => {
  const { pilotDrawerOpen, setPilotDrawerOpen, selectedUnit, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  const [pilotUnit, setPilotUnit] = useState(
    selectedUnit === 'CDU_VDU' ? 'CDU/VDU Atmospheric & Vacuum Distillation' : selectedUnit
  );
  const [deployment, setDeployment] = useState('100% Air-Gapped On-Premise');
  const [extraStations, setExtraStations] = useState(3);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    mailtoUrl: string;
    whatsappUrl: string;
    body: string;
  } | null>(null);

  if (!pilotDrawerOpen) return null;

  const handlePilotSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!workEmail && !name) {
      alert(isRTL ? 'يرجى إدخال البريد الإلكتروني أو الاسم للمتابعة' : 'Please provide your email or name to continue');
      return;
    }

    setIsSubmitting(true);
    const res = await dispatchFormSubmission({
      fullName: name || 'Refinery Engineer',
      company: company || 'Petroleum Facility',
      email: workEmail,
      phone: workPhone,
      targetUnit: `${pilotUnit} (${extraStations} Stations)`,
      deploymentPreference: deployment,
      source: 'Pilot Drawer',
    });
    setSubmissionResult(res);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className={`fixed inset-0 z-50 flex ${isRTL ? 'justify-start' : 'justify-end'} bg-black/75 backdrop-blur-md`}>
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`w-full max-w-lg bg-[#070B1A]/95 ${isRTL ? 'border-r' : 'border-l'} border-white/10 h-full overflow-y-auto flex flex-col justify-between p-5 sm:p-8 text-xs font-sans text-slate-200 shadow-2xl relative`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                {isRTL ? 'برنامج التحقق الميداني (90 يوماً · $800)' : '90-DAY REFINERY PILOT ($800)'}
              </div>
              <div className="text-xl sm:text-2xl font-bold font-sans text-white mt-1 tracking-tight">
                {isRTL ? 'تهيئة برنامج التحقق للمصفاة' : 'Configure Plant Pilot'}
              </div>
            </div>
            <button
              onClick={() => setPilotDrawerOpen(false)}
              aria-label="Close Pilot Drawer"
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="py-12 sm:py-16 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 text-3xl flex items-center justify-center mx-auto font-bold shadow-lg">
                ✓
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-sans font-bold text-white">
                  {isRTL ? 'تم توجيه طلب البايلوت بنجاح' : 'Pilot Request Dispatched'}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 font-mono text-xs">
                  <a
                    href={submissionResult?.whatsappUrl || `https://wa.me/${RECIPIENT_INTL_PHONE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 space-x-reverse px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp: {RECIPIENT_DISPLAY_PHONE}</span>
                  </a>
                  <div className="inline-flex items-center space-x-1.5 space-x-reverse px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/50 text-purple-300">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    <span>{RECIPIENT_EMAIL}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                {isRTL
                  ? `شكراً لك! تم توجيه كافة تفاصيل الوحدة (${pilotUnit}) مباشرة إلى م. مصطفى عادل. سيتواصل معكم خلال 24 ساعة لتنسيق استلام مخططات P&ID وتوقيع اتفاقية السرية NDA.`
                  : `Thank you! Your pilot specs for (${pilotUnit}) have been dispatched directly to Eng. Mostafa Adel. He will follow up promptly to coordinate P&ID intake and mutual NDA.`}
              </p>

              {/* Instant Direct Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-2 max-w-xs mx-auto">
                {submissionResult?.whatsappUrl && (
                  <a
                    href={submissionResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[48px] py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center space-x-2 space-x-reverse shadow-lg cursor-pointer transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>{isRTL ? `مراسلة م. مصطفى عبر واتساب (${RECIPIENT_DISPLAY_PHONE})` : `Message on WhatsApp (${RECIPIENT_INTL_PHONE})`}</span>
                  </a>
                )}

                <a
                  href={submissionResult?.mailtoUrl || `mailto:${RECIPIENT_EMAIL}`}
                  className="w-full min-h-[46px] py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider border border-white/20 flex items-center justify-center space-x-2 space-x-reverse transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isRTL ? 'تأكيد الإرسال عبر البريد' : 'Confirm via Email Client'}</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setPilotDrawerOpen(false);
                    setSubmissionResult(null);
                  }}
                  className="w-full min-h-[44px] py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors cursor-pointer mt-1"
                >
                  {isRTL ? 'إغلاق النافذة' : 'Close Drawer'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePilotSubmit} className="py-5 sm:py-6 space-y-4 sm:space-y-5">
              {/* Pilot Summary Box */}
              <div className="p-4 rounded-xl bg-[#0B1124] border border-purple-500/30 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs font-bold text-purple-400">
                    {isRTL ? 'نطاق برنامج التحقق:' : 'PILOT SCOPE:'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-white">
                    {isRTL ? '90 يوماً وصول كامل ($800)' : '3-Month Dedicated Access ($800)'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {isRTL
                    ? 'يشمل 3 أشهر وصول كامل ومخصص، بناء وحدة تكرير خاصة وفق مخططاتكم، وحزمة سيناريوهات الطوارئ الأولى، مع تدريب المشغلين.'
                    : 'Includes 3 full months of dedicated access, 1 custom refinery unit build from P&IDs, scenario pack, and operator reaction time audits.'}
                </div>
              </div>

              {/* Step 1: Unit Selection */}
              <div className="space-y-1.5">
                <label className="text-white font-mono font-semibold text-xs">
                  {isRTL ? '1. وحدة التكرير والعمليات المستهدفة' : '1. TARGET REFINERY PROCESS UNIT'}
                </label>
                <select
                  value={pilotUnit}
                  onChange={(e) => setPilotUnit(e.target.value)}
                  className="w-full min-h-[44px] p-3 rounded-xl bg-[#030612] border border-white/15 text-white text-xs outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="CDU/VDU Atmospheric & Vacuum Distillation">
                    {isRTL ? 'وحدة التقطير الجوي والتفريغي (CDU/VDU)' : 'CDU/VDU Atmospheric & Vacuum Distillation'}
                  </option>
                  <option value="Hydrocracker Unit (HCU)">
                    {isRTL ? 'وحدة التكسير الهيدروجيني (HCU)' : 'Hydrocracker Unit (HCU)'}
                  </option>
                  <option value="Delayed Coking Unit (DCU)">
                    {isRTL ? 'وحدة التفحيم المتأخر (DCU)' : 'Delayed Coking Unit (DCU)'}
                  </option>
                  <option value="Naphtha Hydrotreater & CCR Platformer">
                    {isRTL ? 'المعالجة الهيدروجينية للنافثا والتهذيب المستمر (CCR)' : 'Naphtha Hydrotreater & CCR Platformer'}
                  </option>
                  <option value="Amine Gas Sweetening & Claus SRU">
                    {isRTL ? 'معالجة الغاز بالأمين واسترجاع الكبريت (Claus SRU)' : 'Amine Gas Sweetening & Claus SRU'}
                  </option>
                </select>
              </div>

              {/* Step 2: Deployment Mode */}
              <div className="space-y-1.5">
                <label className="text-white font-mono font-semibold text-xs">
                  {isRTL ? '2. نموذج وبيئة النشر والتشغيل' : '2. PILOT DEPLOYMENT TOPOLOGY'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeployment('100% Air-Gapped On-Premise')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deployment.includes('Air-Gapped')
                        ? 'border-purple-500 bg-purple-950/60 text-white font-bold ring-1 ring-purple-500'
                        : 'border-white/10 bg-[#030612] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-mono text-xs text-white">
                      {isRTL ? 'تشغيل معزول On-Prem' : 'Air-Gapped On-Prem'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {isRTL ? '100% أوفلاين داخل شبكة المصفاة' : '100% Offline inside plant LAN'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeployment('Dedicated Private Cloud')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deployment.includes('Private Cloud')
                        ? 'border-cyan-500 bg-cyan-950/60 text-white font-bold ring-1 ring-cyan-500'
                        : 'border-white/10 bg-[#030612] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-mono text-xs text-white">
                      {isRTL ? 'سحابة خاصة Private Cloud' : 'Dedicated Private Cloud'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {isRTL ? 'جاهز للمتصفحات الفورية' : 'Instant secure browser access'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 3: Stations Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="text-white font-semibold">
                    {isRTL ? '3. عدد شاشات المشغلين المطلوبة' : '3. OPERATOR STATIONS REQUIRED'}
                  </label>
                  <span className="font-bold text-purple-400">
                    {extraStations} {isRTL ? 'محطات مشغلين' : 'Stations'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={extraStations}
                  onChange={(e) => setExtraStations(parseInt(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Step 4: Contact Info */}
              <div className="space-y-3 pt-3 border-t border-white/10 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 text-xs font-mono font-medium flex items-center space-x-1 space-x-reverse">
                      <User className="w-3 h-3 text-purple-400" />
                      <span>{isRTL ? 'الاسم والمنصب *' : 'NAME & TITLE *'}</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isRTL ? 'م. مصطفى كمال' : 'Eng. Lead Operator'}
                      className="w-full bg-[#030612] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 text-xs font-mono font-medium flex items-center space-x-1 space-x-reverse">
                      <Building className="w-3 h-3 text-purple-400" />
                      <span>{isRTL ? 'المصفاة / المنشأة *' : 'REFINERY / PLANT *'}</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={isRTL ? 'مصفاة القاهرة للبترول' : 'National Refining Complex'}
                      className="w-full bg-[#030612] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 text-xs font-mono font-medium flex items-center space-x-1 space-x-reverse">
                      <Mail className="w-3 h-3 text-purple-400" />
                      <span>{isRTL ? 'البريد المؤسسي *' : 'WORK EMAIL *'}</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="engineer@refinery.com"
                      className="w-full bg-[#030612] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 text-xs font-mono font-medium flex items-center space-x-1 space-x-reverse">
                      <Phone className="w-3 h-3 text-purple-400" />
                      <span>{isRTL ? 'واتساب / هاتف مباشر *' : 'WHATSAPP PHONE *'}</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={workPhone}
                      onChange={(e) => setWorkPhone(e.target.value)}
                      placeholder="+20 100 000 0000"
                      className="w-full bg-[#030612] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-cta-primary min-h-[48px] text-xs font-mono font-bold tracking-wider uppercase mt-3"
              >
                {isSubmitting ? 'DISPATCHING...' : (isRTL ? 'إرسال طلب التحقق ($800)' : 'SUBMIT PILOT SPECIFICATION ($800)')}
              </button>

              <div className="text-[10px] text-slate-500 font-mono text-center">
                Direct to Eng. Mostafa Adel: +201004131154 · Mostafa.adel.esmaiel@gmail.com
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
