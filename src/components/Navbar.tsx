import React, { useState } from 'react';
import { NexiivaLogo } from './NexiivaLogo';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { translations } from '../data/translations';
import { Play, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setVideoModalOpen, setPilotDrawerOpen, language, setLanguage } = useSimulationJourney();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language].nav;
  const isRTL = language === 'AR';

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-[#ececec]/80 px-6 lg:px-12 flex items-center justify-between">
      {/* Brand Wordmark & Subtle Subtitle */}
      <div className="flex items-center space-x-4 space-x-reverse">
        <a href="#" className="flex items-center space-x-3 space-x-reverse group">
          <NexiivaLogo height={24} />
          <div className={`hidden sm:flex flex-col ${isRTL ? 'border-r pr-3 text-right' : 'border-l pl-3 text-left'} border-[#ececec]`}>
            <span className="text-[11px] font-sans tracking-wide text-slate-500 font-medium">
              {t.brandTag}
            </span>
          </div>
        </a>
      </div>

      {/* Navigation Links: Company & Product Focused */}
      <div className="hidden lg:flex items-center gap-7 text-[14px] font-sans font-medium text-slate-700">
        <button
          onClick={() => scrollTo('about')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.about}
        </button>

        <button
          onClick={() => scrollTo('capabilities')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.capabilities}
        </button>

        <button
          onClick={() => scrollTo('ots-builder')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.otsBuilder}
        </button>

        <button
          onClick={() => scrollTo('operational-reality')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.whyNexiiva}
        </button>

        <button
          onClick={() => scrollTo('deployment')}
          className="hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          {t.deployment}
        </button>

        <button
          onClick={() => scrollTo('subscribe')}
          className="text-[#4F46E5] font-semibold hover:text-[#7C3AED] transition-colors cursor-pointer flex items-center space-x-1"
        >
          <span>{t.howToSubscribe}</span>
          <span className="text-xs">↓</span>
        </button>
      </div>

      {/* Right Actions: Language + Primary CTA Button + Mobile Menu Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Switcher Pill */}
        <div className="flex items-center bg-[#F1F5F9] rounded-full p-0.5 text-xs font-sans border border-slate-200">
          <button
            onClick={() => setLanguage('EN')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-[#0B1120]'
            }`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('AR')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-sans ${
              language === 'AR'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-[#0B1120]'
            }`}
            aria-label="التغيير إلى العربية"
          >
            عربي
          </button>
        </div>

        {/* Primary CTA Button: Subscribe & Start (Visible on tablet & desktop, integrated in drawer on mobile) */}
        <button
          onClick={() => setPilotDrawerOpen(true)}
          className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white font-medium text-xs shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] transition-all cursor-pointer"
        >
          <span>{t.startPilot}</span>
        </button>

        {/* Mobile Menu Trigger (44x44px touch target) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-[#0B1120] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#4F46E5]" /> : <Menu className="w-5 h-5 text-slate-800" />}
        </button>
      </div>

      {/* Elite Mobile Overlay & Sliding Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 lg:hidden">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            dir={isRTL ? 'rtl' : 'ltr'}
            className="relative bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto px-6 py-6 flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-200"
          >
            {/* Navigation Links */}
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => scrollTo('about')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-800 transition-colors`}
              >
                <span>{t.about}</span>
                <span className="text-slate-400 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('capabilities')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-800 transition-colors`}
              >
                <span>{t.capabilities}</span>
                <span className="text-slate-400 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('ots-builder')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-800 transition-colors`}
              >
                <span>{t.otsBuilder}</span>
                <span className="text-slate-400 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('operational-reality')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-800 transition-colors`}
              >
                <span>{t.whyNexiiva}</span>
                <span className="text-slate-400 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('deployment')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-medium text-slate-800 transition-colors`}
              >
                <span>{t.deployment}</span>
                <span className="text-slate-400 text-xs">{isRTL ? '←' : '→'}</span>
              </button>

              <button
                onClick={() => scrollTo('subscribe')}
                className={`flex items-center justify-between w-full min-h-[46px] px-3.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/70 active:bg-indigo-200/50 ${
                  isRTL ? 'text-right' : 'text-left'
                } text-[15px] font-semibold text-[#4F46E5] transition-colors`}
              >
                <span>{t.howToSubscribe}</span>
                <span className="text-[#4F46E5] text-xs font-bold">↓</span>
              </button>
            </div>

            {/* Walkthrough Video Trigger Card */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setVideoModalOpen(true);
              }}
              className="w-full min-h-[48px] px-4 rounded-xl bg-slate-900 text-white flex items-center justify-center space-x-2 space-x-reverse font-medium text-xs shadow-md active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>{t.walkthrough}</span>
            </button>

            {/* Mobile Primary Action Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPilotDrawerOpen(true);
              }}
              className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] text-white font-semibold text-sm shadow-[0_8px_25px_-4px_rgba(79,70,229,0.45)] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 space-x-reverse cursor-pointer"
            >
              <span>{t.startPilot}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            {/* Direct Engineering Desk Contact Note */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-500">
                {isRTL ? 'مكتب التواصل المباشر للمهندس مصطفى عادل:' : 'Direct Desk Eng. Mostafa Adel:'}{' '}
              </span>
              <a
                href="mailto:Mostafa.adel.esmaiel@gmail.com"
                className="text-[11px] font-mono text-[#4F46E5] font-semibold hover:underline block sm:inline mt-0.5"
              >
                Mostafa.adel.esmaiel@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
