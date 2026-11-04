import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';

export const VideoModal: React.FC = () => {
  const { videoModalOpen, setVideoModalOpen, language } = useSimulationJourney();

  if (!videoModalOpen) return null;

  const isRTL = language === 'AR';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#070A18] border border-purple-500/40 rounded-2xl shadow-stage-glow flex flex-col font-sans overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B0F24] px-6 py-4 border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-white tracking-wide font-mono">
              NEXIIVA CDU/VDU SIMULATOR // 15-MIN OPERATOR WALKTHROUGH
            </span>
          </div>
          <button
            onClick={() => setVideoModalOpen(false)}
            className="text-slate-400 hover:text-white text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            ✕ {isRTL ? 'إغلاق' : 'Close'}
          </button>
        </div>

        {/* Video Player - Native MP4 with YouTube Mirror */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            src="/assets/nexiiva_demo_walkthrough.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Footer Notes */}
        <div className="p-4 bg-[#04060E] border-t border-purple-500/10 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>
              {isRTL
                ? 'استعراض تشغيل وحدة التقطير الجوي والمفرغ (CDU/VDU) · محاكاة هبوط مضخات الارتجاع (Reflux Trip) · واجهة التحكم DCS'
                : 'Demonstration covers: CDU/VDU Steady-State Mass Balance · Reflux Pump Trip · Strip Chart Diagnostics.'}
            </span>
          </div>
          <a
            href="https://www.youtube.com/watch?v=hYILfbdodzQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 hover:underline font-mono"
          >
            YouTube Mirror ↗
          </a>
        </div>
      </div>
    </div>
  );
};
