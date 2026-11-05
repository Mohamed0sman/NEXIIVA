import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { RECIPIENT_WHATSAPP_PHONE, RECIPIENT_DISPLAY_PHONE } from '../utils/contactDispatcher';

export const FloatingWhatsAppButton: React.FC = () => {
  const { language } = useSimulationJourney();
  const isRTL = language === 'AR';
  const [isHovered, setIsHovered] = useState(false);

  const defaultMessage = isRTL
    ? 'مرحباً م. مصطفى عادل، أود الاستفسار عن منصة نكسيفا (NEXIIVA) لمحاكاة مشغلي المصافي ومصانع البتروكيماويات.'
    : 'Hello Eng. Mostafa Adel, I would like to inquire about NEXIIVA Refinery & Petrochemical Operator Training Simulators.';

  const whatsappHref = `https://wa.me/${RECIPIENT_WHATSAPP_PHONE}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className={`fixed bottom-5 sm:bottom-6 z-40 ${isRTL ? 'left-5 sm:left-6' : 'right-5 sm:right-6'} flex items-center`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Chat on WhatsApp with Eng. Mostafa Adel at ${RECIPIENT_DISPLAY_PHONE}`}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_8px_25px_-4px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_32px_-4px_rgba(37,211,102,0.65)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 border border-white/25 group"
      >
        {/* Authentic Official WhatsApp Icon with Online Pulse */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-white fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-100 border-2 border-[#25D366] animate-pulse" />
        </div>

        {/* Text Label (Visible on desktop) */}
        <div className="hidden sm:flex flex-col text-left rtl:text-right leading-none pr-1 rtl:pr-0 rtl:pl-1">
          <span className="text-[10px] font-sans font-medium text-emerald-100 uppercase tracking-wider">
            {isRTL ? 'واتساب الإدارة' : 'WhatsApp Desk'}
          </span>
          <span className="text-xs font-bold font-mono text-white mt-0.5 tracking-wide">
            {RECIPIENT_DISPLAY_PHONE}
          </span>
        </div>
      </a>
    </aside>
  );
};
