import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { X, ExternalLink } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { videoModalOpen, setVideoModalOpen, language } = useSimulationJourney();

  if (!videoModalOpen) return null;

  const isRTL = language === 'AR';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#080D1F] border border-white/15 rounded-2xl shadow-2xl flex flex-col font-sans overflow-hidden text-white">
        {/* Header */}
        <div className="bg-[#050814] px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-200 tracking-wider uppercase">
              NEXIIVA CDU/VDU SIMULATOR // 15-MIN OPERATOR WALKTHROUGH
            </span>
          </div>
          <button
            onClick={() => setVideoModalOpen(false)}
            aria-label="Close Modal"
            className="text-slate-400 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>{isRTL ? 'إغلاق' : 'Close'}</span>
          </button>
        </div>

        {/* Video Player - YouTube Embed */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <iframe
            src="https://www.youtube.com/embed/hYILfbdodzQ?autoplay=1&rel=0"
            title="NEXIIVA CDU/VDU Simulator Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer Notes */}
        <div className="p-4 bg-[#050814] border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>
              {isRTL
                ? 'استعراض تشغيل وحدة التقطير الجوي والمفرغ (CDU/VDU) · محاكاة هبوط مضخات الارتجاع (Reflux Trip) · واجهة التحكم DCS'
                : 'Demonstration covers: CDU/VDU Steady-State Mass Balance · Reflux Pump Trip · Strip Chart Diagnostics.'}
            </span>
          </div>
          <a
            href="https://youtu.be/hYILfbdodzQ?si=kNXibypwh73je_Th"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1"
          >
            <span>{isRTL ? 'مشاهدة مباشرة على YouTube' : 'Watch on YouTube'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
