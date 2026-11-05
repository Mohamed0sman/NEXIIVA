import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { RECIPIENT_WHATSAPP_PHONE, RECIPIENT_DISPLAY_PHONE } from '../utils/contactDispatcher';

export const FloatingWhatsAppButton: React.FC = () => {
  const { language } = useSimulationJourney();
  const isRTL = language === 'AR';

  const defaultMessage = isRTL
    ? 'مرحباً م. مصطفى عادل، أود الاستفسار عن منصة محاكاة مشغلي المصافي ومصانع البتروكيماويات نكسيفا (NEXIIVA).'
    : 'Hello Eng. Mostafa Adel, I would like to inquire about NEXIIVA Refinery & Petrochemical Operator Training Simulator.';

  const whatsappHref = `https://wa.me/${RECIPIENT_WHATSAPP_PHONE}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className={`fixed bottom-5 z-40 ${isRTL ? 'left-5' : 'right-5'} flex items-center group`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp with Eng. Mostafa Adel at ${RECIPIENT_DISPLAY_PHONE}`}
        className="flex items-center space-x-2.5 space-x-reverse bg-emerald-600 hover:bg-emerald-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-[0_10px_30px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(16,185,129,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-emerald-400/40"
      >
        {/* Pulsing Green Dot & WhatsApp Icon */}
        <div className="relative flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5 text-white fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping pointer-events-none" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white border border-emerald-600" />
        </div>

        {/* Text Label */}
        <div className="flex flex-col text-left rtl:text-right leading-none">
          <span className="text-[10px] font-mono text-emerald-100 uppercase tracking-wider">
            {isRTL ? 'تواصل واتساب مباشر' : 'Direct WhatsApp'}
          </span>
          <span className="text-xs font-bold font-mono text-white mt-0.5">
            {RECIPIENT_DISPLAY_PHONE}
          </span>
        </div>
      </a>
    </aside>
  );
};
