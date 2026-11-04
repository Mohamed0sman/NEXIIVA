import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

export const VideoModal: React.FC = () => {
  const { videoModalOpen, setVideoModalOpen, language } = useSimulationJourney();

  if (!videoModalOpen) return null;

  const isRTL = language === 'AR';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-[#ececec] rounded-[24px] shadow-2xl flex flex-col font-sans overflow-hidden text-[#17191c]">
        {/* Header */}
        <div className="bg-[#fafafb] px-6 py-4 border-b border-[#ececec] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#10b981] rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-[#17191c] tracking-wide font-mono uppercase">
              NEXIIVA CDU/VDU SIMULATOR // 15-MIN OPERATOR WALKTHROUGH
            </span>
          </div>
          <button
            onClick={() => setVideoModalOpen(false)}
            className="text-[#777b86] hover:text-[#17191c] text-xs px-3 py-1.5 rounded-full bg-[#f2f2f3] hover:bg-[#e5e5e5] transition-colors cursor-pointer"
          >
            ✕ {isRTL ? 'إغلاق' : 'Close'}
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
        <div className="p-4 bg-[#fafafb] border-t border-[#ececec] flex flex-wrap items-center justify-between text-xs text-[#777b86] gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
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
            className="text-[#4F46E5] font-semibold hover:underline font-mono text-xs flex items-center space-x-1"
          >
            <span>{isRTL ? 'مشاهدة مباشرة على YouTube' : 'Watch on YouTube'} ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
