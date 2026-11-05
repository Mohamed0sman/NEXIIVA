import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dispatchFormSubmission, RECIPIENT_EMAIL, RECIPIENT_DISPLAY_PHONE, RECIPIENT_INTL_PHONE } from '../utils/contactDispatcher';
import { Mail, Phone, Building, User, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

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
      fullName: name || 'Operations Engineer',
      company: company || 'Refinery / Plant Facility',
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
    <div className={`fixed inset-0 z-50 flex ${isRTL ? 'justify-start' : 'justify-end'} bg-black/40 backdrop-blur-sm`}>
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`w-full max-w-lg bg-white ${isRTL ? 'border-r' : 'border-l'} border-[#ececec] h-full overflow-y-auto flex flex-col justify-between p-4.5 sm:p-8 text-xs font-sans text-[#17191c] shadow-2xl`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#ececec] pb-5">
            <div>
              <div className="text-[11px] font-mono text-[#4F46E5] font-semibold uppercase tracking-wider">
                {isRTL ? 'برنامج التحقق التجريبي (90 يوماً)' : '90-DAY REFINERY PILOT PROGRAM'}
              </div>
              <div className="text-2xl font-bold font-sans text-[#0B1120] mt-1 tracking-tight">
                {isRTL ? 'تهيئة برنامج التحقق للمنشأة' : 'Configure Plant Validation'}
              </div>
            </div>
            <button
              onClick={() => setPilotDrawerOpen(false)}
              aria-label="Close Pilot Drawer"
              className="w-11 h-11 flex items-center justify-center text-[#64748B] hover:text-[#0B1120] text-lg rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="py-12 sm:py-16 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white text-3xl flex items-center justify-center mx-auto font-bold shadow-lg">
                ✓
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-sans font-bold text-[#0B1120]">
                  {isRTL ? 'تم توجيه طلب البايلوت بنجاح' : 'Pilot Request Routed'}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                  <a
                    href={submissionResult?.whatsappUrl || `https://wa.me/201004131154`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 space-x-reverse px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-medium transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>واتساب: {RECIPIENT_DISPLAY_PHONE}</span>
                  </a>
                  <div className="inline-flex items-center space-x-1.5 space-x-reverse px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-[11px] font-mono font-medium">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{RECIPIENT_EMAIL}</span>
                  </div>
                </div>
              </div>

              <p className="text-[#64748B] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                {isRTL
                  ? `شكراً لك! تم توجيه كافة تفاصيل الوحدة (${pilotUnit}) مباشرة إلى واتساب م. مصطفى عادل (${RECIPIENT_DISPLAY_PHONE}) وبريده الإلكتروني (${RECIPIENT_EMAIL}). سيتواصل معكم خلال 24 ساعة لتنسيق تسليم مخططات P&ID وتوقيع اتفاقية السرية NDA.`
                  : `Thank you! All pilot specs for (${pilotUnit}) have been dispatched directly to Eng. Mostafa Adel's WhatsApp (${RECIPIENT_INTL_PHONE}) and inbox (${RECIPIENT_EMAIL}). He will follow up within 24 hours to coordinate P&ID intake and mutual NDA.`}
              </p>

              {/* Instant Direct Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-2 max-w-xs mx-auto">
                {submissionResult?.whatsappUrl && (
                  <a
                    href={submissionResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[48px] py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center space-x-2 space-x-reverse shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>{isRTL ? `مراسلة م. مصطفى عبر واتساب (${RECIPIENT_DISPLAY_PHONE})` : `Message on WhatsApp (${RECIPIENT_INTL_PHONE})`}</span>
                  </a>
                )}

                <a
                  href={submissionResult?.mailtoUrl || `mailto:${RECIPIENT_EMAIL}`}
                  className="w-full min-h-[46px] py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center space-x-2 space-x-reverse shadow-sm transition-all cursor-pointer"
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
                  className="w-full min-h-[44px] py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer mt-1"
                >
                  {isRTL ? 'إغلاق النافذة' : 'Close Drawer'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePilotSubmit} className="py-5 sm:py-6 space-y-4 sm:space-y-5">
              {/* Pilot Summary Box (Cool Indigo Tint) */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-blue-500/5 border border-purple-500/20 text-[#0B1120] space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-xs text-[#4F46E5]">
                    {isRTL ? 'نطاق البرنامج التجريبي:' : 'Engagement Scope:'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-sans text-[#0B1120]">
                    {isRTL ? 'برنامج تجريبي مخصص (3 أشهر)' : 'Custom 3-Month Pilot'}
                  </span>
                </div>
                <div className="text-[11px] text-[#64748B] leading-relaxed">
                  {isRTL
                    ? 'يشمل 3 أشهر وصول كامل ومخصص، بناء وحدة تكرير خاصة وفق مخططاتكم، وحزمة السيناريوهات الأولى (الاضطرابات والأعطال)، مع مراجعة مهندس العمليات.'
                    : 'Includes 3 full months of dedicated access, 1 custom refinery unit build, first scenario pack (upsets & trips), and process SME validation.'}
                </div>
              </div>

              {/* Step 1: Unit Selection */}
              <div className="space-y-1.5">
                <label className="text-[#0B1120] font-semibold text-xs">
                  {isRTL ? '1. وحدة التكرير والعمليات المستهدفة' : '1. TARGET REFINERY PROCESS UNIT'}
                </label>
                <select
                  value={pilotUnit}
                  onChange={(e) => setPilotUnit(e.target.value)}
                  className="w-full min-h-[44px] p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0B1120] text-base sm:text-xs outline-none focus:border-[#4F46E5] transition-colors"
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
                <label className="text-[#0B1120] font-semibold text-xs">
                  {isRTL ? '2. نموذج وبيئة النشر والتشغيل' : '2. PILOT DEPLOYMENT TOPOLOGY'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setDeployment('100% Air-Gapped On-Premise')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deployment.includes('Air-Gapped')
                        ? 'border-[#4F46E5] bg-purple-50/50 text-[#4F46E5] font-semibold ring-1 ring-[#4F46E5]'
                        : 'border-slate-200 bg-[#F8FAFC] text-[#64748B] hover:border-slate-300'
                    }`}
                  >
                    <div className="font-sans text-xs">
                      {isRTL ? 'تشغيل معزول On-Prem' : 'Air-Gapped On-Prem'}
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">
                      {isRTL ? '100% أوفلاين داخل شبكة المنشأة' : '100% Offline inside plant LAN'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeployment('Private Cloud SaaS')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deployment.includes('Private Cloud')
                        ? 'border-[#4F46E5] bg-purple-50/50 text-[#4F46E5] font-semibold ring-1 ring-[#4F46E5]'
                        : 'border-slate-200 bg-[#F8FAFC] text-[#64748B] hover:border-slate-300'
                    }`}
                  >
                    <div className="font-sans text-xs">
                      {isRTL ? 'سحابة خاصة Private Cloud' : 'Private Cloud SaaS'}
                    </div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">
                      {isRTL ? 'جاهز للمتصفحات ومراكز التدريب' : 'Instant browser multi-seat'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 3: Stations Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-[#0B1120] font-semibold">
                    {isRTL ? '3. عدد شاشات المشغلين المطلوبة' : '3. OPERATOR STATIONS REQUIRED'}
                  </label>
                  <span className="font-mono font-bold text-[#4F46E5]">
                    {extraStations} {isRTL ? 'محطات مشغلين' : 'Stations'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={extraStations}
                  onChange={(e) => setExtraStations(parseInt(e.target.value))}
                  className="w-full accent-[#4F46E5] bg-slate-200 h-2 rounded cursor-pointer"
                />
              </div>

              {/* Step 4: Contact Info */}
              <div className="space-y-3 pt-2 sm:pt-3 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#64748B] text-xs font-medium flex items-center space-x-1 space-x-reverse">
                      <User className="w-3 h-3 text-[#4F46E5]" />
                      <span>{isRTL ? 'الاسم والمنصب' : 'NAME & TITLE'}</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isRTL ? 'م. مصطفى عادل' : 'Eng. Mostafa Adel'}
                      className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0B1120] text-base sm:text-xs outline-none focus:border-[#4F46E5] transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#64748B] text-xs font-medium flex items-center space-x-1 space-x-reverse">
                      <Building className="w-3 h-3 text-[#4F46E5]" />
                      <span>{isRTL ? 'اسم المصفاة / المنشأة' : 'REFINERY / PLANT'}</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={isRTL ? 'ميدور / أرامكو' : 'MIDOR / Plant'}
                      className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0B1120] text-base sm:text-xs outline-none focus:border-[#4F46E5] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[#64748B] text-xs font-medium flex items-center space-x-1 space-x-reverse">
                    <Mail className="w-3 h-3 text-[#4F46E5]" />
                    <span>{isRTL ? 'البريد الإلكتروني للعمل' : 'WORK EMAIL'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="operations@refinery.com"
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0B1120] text-base sm:text-xs outline-none focus:border-[#4F46E5] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#64748B] text-xs font-medium flex items-center space-x-1 space-x-reverse">
                    <Phone className="w-3 h-3 text-[#4F46E5]" />
                    <span>{isRTL ? 'الهاتف / واتساب' : 'PHONE / WHATSAPP'}</span>
                  </label>
                  <input
                    type="tel"
                    value={workPhone}
                    onChange={(e) => setWorkPhone(e.target.value)}
                    placeholder="+20 100 000 0000"
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#0B1120] text-base sm:text-xs outline-none focus:border-[#4F46E5] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white text-xs font-semibold uppercase tracking-wider shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(79,70,229,0.6)] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <span>{isSubmitting ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : (isRTL ? 'تأكيد طلب البرنامج التجريبي للمنشأة ←' : 'Confirm 90-Day Pilot Request →')}</span>
                </button>
                <div className="text-[10px] text-center text-[#979799] mt-2">
                  {isRTL ? (
                    <>
                      * يتم توجيه الطلب مباشرة إلى بريد المهندس مصطفى عادل (
                      <span className="font-mono text-[#4F46E5] font-semibold">{RECIPIENT_EMAIL}</span>)
                    </>
                  ) : (
                    <>
                      * Request routed directly to Eng. Mostafa Adel (
                      <span className="font-mono text-[#4F46E5] font-semibold">{RECIPIENT_EMAIL}</span>)
                    </>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
