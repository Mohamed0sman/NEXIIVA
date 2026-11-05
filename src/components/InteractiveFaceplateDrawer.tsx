import React from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import { dcsAudio } from '../utils/audio';
import { X, Sliders, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const InteractiveFaceplateDrawer: React.FC = () => {
  const {
    activeFaceplate,
    setActiveFaceplate,
    telemetry,
    acknowledgeAlarm,
    startStandbyPump,
    adjustValve,
    language,
  } = useSimulationJourney();

  if (!activeFaceplate) return null;

  const isRTL = language === 'AR';
  const isTemp = activeFaceplate === 'TIC-101';
  const isValve = activeFaceplate === 'FV-102';
  const isPumpA = activeFaceplate === 'P-1007A';
  const isPumpB = activeFaceplate === 'P-1007B';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 w-84 bg-[#070B14] border border-slate-700/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] font-mono text-xs select-none overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200`}
    >
      {/* Faceplate Header */}
      <div className="bg-[#0B1120] border-b border-slate-800 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-bold text-white tracking-wide">
            {isRTL ? `واجهة DCS: ${activeFaceplate}` : `DCS FACEPLATE: ${activeFaceplate}`}
          </span>
        </div>
        <button
          onClick={() => {
            dcsAudio.playClick();
            setActiveFaceplate(null);
          }}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Faceplate Body */}
      <div className="p-4 space-y-4 bg-[#070B14]">
        {/* Service Title */}
        <div className="text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
          {isTemp && (isRTL ? 'حرارة بخار أعلى برج التقطير الجوي T-22' : 'Atmospheric Column T-22 Overhead Vapor Temp')}
          {isValve && (isRTL ? 'صمام التحكم في سريان الراجع لبرج التقطير' : 'Column T-22 Reflux Control Valve')}
          {isPumpA && (isRTL ? 'مضخة الراجع الرئيسية للطرد المركزي (API 610)' : 'Main Reflux Centrifugal Pump (API 610)')}
          {isPumpB && (isRTL ? 'مضخة الراجع الاحتياطية للطرد المركزي (API 610)' : 'Standby Reflux Centrifugal Pump (API 610)')}
        </div>

        {/* Readouts for Temp TIC-101 */}
        {isTemp && (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-[11px]">{isRTL ? 'المتغير الفعلي (PV):' : 'PROCESS VARIABLE (PV):'}</span>
              <span className={`font-bold text-base ${telemetry.overheadTemp > 120 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {telemetry.overheadTemp} °C
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-[11px]">{isRTL ? 'القيمة المستهدفة (SP):' : 'SETPOINT (SP):'}</span>
              <span className="text-white font-bold text-sm">114.5 °C</span>
            </div>
            {telemetry.alarmActive && (
              <button
                onClick={() => {
                  dcsAudio.playClick();
                  acknowledgeAlarm();
                }}
                className="w-full py-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-[11px] rounded-lg tracking-wider cursor-pointer shadow-lg animate-pulse"
              >
                {isRTL ? '[كتم وإقرار إنذار TAH-101]' : '[ACKNOWLEDGE TAH-101 ALARM]'}
              </button>
            )}
          </div>
        )}

        {/* Readouts for Valve FV-102 */}
        {isValve && (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-[11px]">{isRTL ? 'معدل التدفق الحالي:' : 'FLOW RATE:'}</span>
              <span className="font-bold text-base text-cyan-300">
                {telemetry.refluxFlow} m³/h
              </span>
            </div>
            <div className="space-y-1.5 bg-[#0B1120] p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">{isRTL ? 'فتحة الصمام (OP):' : 'VALVE OUTPUT (OP):'}</span>
                <span className="text-[#A78BFA] font-bold">{telemetry.refluxControlValvePct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={telemetry.refluxControlValvePct}
                onChange={(e) => {
                  dcsAudio.playClick();
                  adjustValve(parseFloat(e.target.value));
                }}
                className="w-full accent-[#7C3AED] bg-slate-800 h-2 rounded-full cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Readouts for Pumps */}
        {(isPumpA || isPumpB) && (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-[11px]">{isRTL ? 'حالة المحرك:' : 'MOTOR STATUS:'}</span>
              <span className={`font-bold ${
                isPumpA
                  ? (telemetry.refluxPumpA_Running ? 'text-emerald-400' : 'text-rose-400')
                  : (telemetry.refluxPumpB_Running ? 'text-emerald-400' : 'text-slate-400')
              }`}>
                {isPumpA
                  ? (telemetry.refluxPumpA_Running ? (isRTL ? 'يعمل (أونلاين)' : 'RUNNING (ONLINE)') : (isRTL ? 'متوقف (عطل)' : 'TRIPPED'))
                  : (telemetry.refluxPumpB_Running ? (isRTL ? 'يعمل (أونلاين)' : 'RUNNING (ONLINE)') : (isRTL ? 'جاهز بالاحتياط' : 'STANDBY READY'))}
              </span>
            </div>

            {isPumpB && (
              <button
                onClick={() => {
                  dcsAudio.playClick();
                  startStandbyPump();
                }}
                disabled={telemetry.refluxPumpB_Running}
                className={`w-full py-2.5 rounded-xl font-bold text-[11px] tracking-wider transition-all cursor-pointer ${
                  telemetry.refluxPumpB_Running
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] hover:opacity-95 text-white shadow-lg animate-pulse'
                }`}
              >
                {telemetry.refluxPumpB_Running
                  ? (isRTL ? '✓ المضخة الاحتياطية تعمل' : '✓ PUMP ONLINE')
                  : (isRTL ? '▶ تشغيل المضخة الاحتياطية P-1007B' : '▶ START STANDBY PUMP P-1007B')}
              </button>
            )}
          </div>
        )}

        {/* Mode Selector */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
          <span className="text-slate-400">{isRTL ? 'نمط التحكم:' : 'CONTROL MODE:'}</span>
          <div className="flex rounded-lg overflow-hidden border border-slate-700">
            <span className="px-2 py-0.5 bg-[#4F46E5] text-white font-bold">AUTO</span>
            <span className="px-2 py-0.5 bg-slate-900 text-slate-400">MAN</span>
            <span className="px-2 py-0.5 bg-slate-900 text-slate-400">CAS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
