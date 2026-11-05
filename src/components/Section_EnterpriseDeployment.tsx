import React, { useState } from 'react';
import { useSimulationJourney } from '../context/SimulationJourneyContext';
import {
  ShieldCheck,
  Server,
  Cloud,
  Lock,
  CheckCircle2,
  Cpu,
  Database,
  Users,
  Terminal,
  ArrowRight,
  HardDrive,
} from 'lucide-react';

export const Section_EnterpriseDeployment: React.FC = () => {
  const { setPilotDrawerOpen, language } = useSimulationJourney();
  const isRTL = language === 'AR';

  return (
    <section
      id="deployment"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative bg-[#040714] border-t border-white/10"
    >
      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(142,66,254,0.09),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 right-1/3 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(51,97,252,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 text-left" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="inline-flex items-center space-x-2 space-x-reverse text-xs font-mono font-bold text-purple-400 tracking-widest uppercase">
            <span>[STAGE 04 // OT/IT CYBERSECURITY & DEPLOYMENT]</span>
            <span className="text-slate-600">|</span>
            <span>{isRTL ? 'معايير الأمان والنشر' : 'ENTERPRISE ARCHITECTURE'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]">
            <span className="heading-metallic block">
              {isRTL
                ? 'نشر معزول فيزيائياً داخل المصفاة'
                : '100% Air-Gapped Refinery On-Premise'}
            </span>
            <span className="bg-gradient-to-r from-[#A855F7] via-[#8E42FE] to-[#38BDF8] bg-clip-text text-transparent block mt-1">
              {isRTL
                ? 'أو سحابة خاصة معزولة للمؤسسات.'
                : 'or Dedicated Enterprise Private Cloud.'}
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
            {isRTL
              ? 'صُمم NEXIIVA ليتوافق مع أعلى اشتراطات الأمن السيبراني البترولي (IEC 62443 SL-3/4). مخططات P&ID وقواعد البيانات لا تغادر محيط مصفاتكم أبداً.'
              : 'Engineered strictly for critical industrial infrastructure. Choose complete physical air-gap for absolute data sovereignty or rapid browser access for distributed engineering teams.'}
          </p>
        </div>

        {/* 2 Deep, Spacious Glassmorphic Architectural Cards Side by Side (gap-10) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Card 1: 100% Air-Gapped On-Premise (Refinery Control Room) */}
          <div
            className="p-8 sm:p-10 rounded-2xl bg-[#0A0F24]/85 border-2 border-purple-500/30 hover:border-purple-500/60 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-6 transition-all group"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-700/60 text-purple-300">
                    <Server className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                      PRIMARY REFINERY OPTION
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                      {isRTL ? 'النشر المحلي المعزول (Air-Gapped)' : '100% Air-Gapped On-Premise'}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  ZERO INTERNET
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {isRTL
                  ? 'يتم تثبيت محرك المحاكاة كاملاً على خوادم محلية داخل مركز بيانات المصفاة أو غرفة التحكم. يعمل بدون أي اتصال خارجي بالإنترنت لحماية أسرار التشغيل.'
                  : 'Installed locally on physical or virtual plant servers within the refinery control perimeter. Operates 100% offline with zero outbound internet traffic.'}
              </p>

              {/* Specs & Architecture List */}
              <div className="space-y-3.5 font-sans text-xs">
                <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isRTL ? 'محطات تشغيل المشغلين والمدرب' : '3+ Operator Stations + Instructor Console'}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {isRTL
                        ? 'توصيل شاشات المشغلين الميدانيين مع كونسول تحكم مركزي للمدرب لإطلاق الأعطال ومراقبة ردود الأفعال.'
                        : 'Connect multi-monitor trainee workstations with master instructor station to inject scenarios and grade drills.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isRTL ? 'حماية تامة للبيانات والـ P&IDs' : 'Absolute Data Sovereignty'}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {isRTL
                        ? 'مخططات التدفق P&ID وقواعد بيانات العلامات Tag Databases لا تغادر أسوار منشأتكم أبداً.'
                        : 'Proprietary plant flowsheets, instrument tag lists, and operating envelopes never leave the plant perimeter.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isRTL ? 'مطابقة معايير IEC 62443 SL-3/4' : 'IEC 62443 Security Level 3/4 Verified'}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {isRTL
                        ? 'عزل كلفاني كامل يمنع أي تأثير راجع على غرف التحكم الميدانية الحقيقية أو صمامات الطوارئ SIS.'
                        : 'Total unidirectional segregation with zero control feedback loops into live DCS / SIS emergency valves.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-purple-400 font-bold">Refinery Control Room Ready</span>
              <button
                onClick={() => setPilotDrawerOpen(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8E42FE] to-[#3361FC] text-white font-bold cursor-pointer transition-all hover:shadow-lg"
              >
                {isRTL ? 'طلب التثبيت الميداني' : 'Request On-Premise Pilot'}
              </button>
            </div>
          </div>

          {/* Card 2: Dedicated Private Cloud (Rapid Multi-User SaaS) */}
          <div
            className="p-8 sm:p-10 rounded-2xl bg-[#0A0F24]/85 border-2 border-cyan-500/30 hover:border-cyan-500/60 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-6 transition-all group"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-300">
                    <Cloud className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      RAPID ENTERPRISE ACCESSIBILITY
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                      {isRTL ? 'السحابة الخاصة المعزولة (Private Cloud)' : 'Dedicated Private Cloud'}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  RAPID WEB ACCESS
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {isRTL
                  ? 'يتم النشر خلال ساعات عبر بيئة سحابية خاصة معزولة كلياً (Single-Tenant). تمكّن مهندسي العمليات والمشغلين من التدريب الفوري عبر متصفح الويب الآمن.'
                  : 'Deployed in hours via dedicated single-tenant containerized instances. Perfect for training multi-site engineering cohorts via secure WebGL browsers.'}
              </p>

              {/* Specs & Architecture List */}
              <div className="space-y-3.5 font-sans text-xs">
                <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isRTL ? 'وصول آمن عبر المتصفح (Zero Install)' : 'Browser-Based Real-Time Simulation'}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {isRTL
                        ? 'يعمل مباشرة عبر Chrome / Edge دون الحاجة لتثبيت برمجيات ثقيلة على أجهزة المتدربين.'
                        : 'High-performance WebGL and WebSockets rendering realistic multi-loop faceplates with zero local installations.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isRTL ? 'عزل كامل للمستأجر وتشفير AES-256' : 'Isolated Single-Tenant Database'}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {isRTL
                        ? 'تشفير كامل للبيانات أثناء النقل والتخزين، مع نسخ احتياطية مؤتمتة وإدارة صلاحيات دقيقة RBAC.'
                        : 'AES-256 encryption at rest, TLS 1.3 in transit, automated daily snapshots, and role-based access control.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 space-x-reverse p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">
                      {isRTL ? 'إدارة أفواج التدريب وتقارير الامتثال' : 'Cohort Management & Compliance Reports'}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {isRTL
                        ? 'لوحة تحكم مركزية لمديري التدريب تتابع تقدم المشغلين وتُصدر شهادات الاعتماد المؤتمتة.'
                        : 'Centralized admin portal to schedule emergency drills, review trainee reaction times, and export PDF certificates.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-cyan-400 font-bold">Fast-Track Pilot Deployment</span>
              <button
                onClick={() => setPilotDrawerOpen(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#38BDF8] to-[#3361FC] text-white font-bold cursor-pointer transition-all hover:shadow-lg"
              >
                {isRTL ? 'بدء تجربة السحابة' : 'Launch Cloud Sandbox'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
