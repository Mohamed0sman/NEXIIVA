import React from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { MessageSquare, Mail, Shield, ExternalLink, ArrowRight } from 'lucide-react';
import { RECIPIENT_DISPLAY_PHONE, RECIPIENT_INTL_PHONE, RECIPIENT_EMAIL } from '../utils/contactDispatcher';

export const Footer: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03050C] border-t border-white/10 py-14 sm:py-16 px-5 sm:px-6 lg:px-12 text-slate-400 font-sans text-xs relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto space-y-12 relative z-10" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Brand Info (5 Cols) */}
          <div className={`md:col-span-5 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <NexiivaLogo height={28} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              {isRTL
                ? 'المنظومة الصناعية المتخصصة لمحاكاة مشغلي مصافي النفط والغاز والبتروكيماويات. تحول نكسيفا مخططات P&ID وفلسفة التحكم إلى توائم رقمية واقعية لتأهيل الكفاءات وحماية المنشآت من كوارث الإغلاق غير المخطط له.'
                : 'Industrial Process Operator Training Simulator (OTS). Built to make plant-specific high-fidelity dynamic simulation accessible to every refinery, petrochemical complex, and gas facility in Egypt, the Middle East, and worldwide.'}
            </p>
            <div className="text-purple-400 font-mono text-[11px] font-bold">
              Entrepreneurs Investment Program (EIP) · Official Selection 2026
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className={`md:col-span-3 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {isRTL ? 'أقسام المنصة' : 'Platform Navigation'}
            </div>
            <div className="flex flex-col space-y-2 text-slate-400 font-sans text-xs">
              <button
                onClick={() => scrollTo('hero')}
                className={`w-full ${isRTL ? 'text-right' : 'text-left'} hover:text-white transition-colors cursor-pointer`}
              >
                01. {isRTL ? 'المحاكي المباشر' : 'Live DCS Console'}
              </button>
              <button
                onClick={() => scrollTo('industry-dilemma')}
                className={`w-full ${isRTL ? 'text-right' : 'text-left'} hover:text-white transition-colors cursor-pointer`}
              >
                02. {isRTL ? 'معضلة الـ $110K والعائد' : 'The $110K Dilemma & ROI'}
              </button>
              <button
                onClick={() => scrollTo('ots-builder')}
                className={`w-full ${isRTL ? 'text-right' : 'text-left'} hover:text-white transition-colors cursor-pointer`}
              >
                03. {isRTL ? 'استوديو بناء الوحدات OTS' : 'OTS Builder & 387 Equipment'}
              </button>
              <button
                onClick={() => scrollTo('deployment')}
                className={`w-full ${isRTL ? 'text-right' : 'text-left'} hover:text-white transition-colors cursor-pointer`}
              >
                04. {isRTL ? 'النشر المعزول والأمان السيبراني' : 'Air-Gapped Deployment'}
              </button>
              <button
                onClick={() => scrollTo('pricing-leadership')}
                className={`w-full ${isRTL ? 'text-right' : 'text-left'} text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-bold`}
              >
                05. {isRTL ? 'مسارات الاشتراك والقيادة' : 'Commercial Tracks & Pilot'}
              </button>
            </div>
          </div>

          {/* Direct Communication Channels (4 Cols) */}
          <div className={`md:col-span-4 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {isRTL ? 'التواصل المباشر والقيادة' : 'Direct Leadership Contact'}
            </div>
            <div className="space-y-2.5 text-xs font-mono text-slate-300">
              {/* WhatsApp direct card */}
              <a
                href={`https://wa.me/${RECIPIENT_INTL_PHONE}?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%B8%D9%88%D9%85%D8%A9%20NEXIIVA%20OTS`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 space-x-reverse p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 transition-all cursor-pointer group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold">
                    {isRTL ? 'واتساب مباشر للمؤسس' : 'DIRECT WHATSAPP'}
                  </span>
                  <span className="text-white font-bold text-xs">{RECIPIENT_DISPLAY_PHONE}</span>
                </div>
              </a>

              {/* Email direct */}
              <a
                href={`mailto:${RECIPIENT_EMAIL}?subject=NEXIIVA%20Refinery%20Inquiry`}
                className="flex items-center space-x-2.5 space-x-reverse p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-purple-400 uppercase font-bold">FOUNDER EMAIL</span>
                  <span className="text-white text-xs truncate">{RECIPIENT_EMAIL}</span>
                </div>
              </a>

              <div className="pt-2 text-[10px] text-slate-500 font-sans leading-relaxed">
                {isRTL
                  ? 'م. مصطفى عادل · مؤسس ورئيس تنفيذي · خبرة تشغيل ميدانية بمصفاة ميدور وسنمار وعجيبة وبورت هاركورت.'
                  : 'Eng. Mostafa Adel · Founder & CEO · 10 yrs at MIDOR, Sanmar Petrochem, Agiba, & Port Harcourt Refinery.'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} NEXIIVA Industrial Dynamics. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 space-x-reverse text-slate-400">
            <span>ISA-88 / ISA-5.1</span>
            <span>·</span>
            <span>API 520 / 521 / 560</span>
            <span>·</span>
            <span>IEC 62443 SL-3/4 OT Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
