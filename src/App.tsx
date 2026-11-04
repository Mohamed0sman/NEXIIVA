import React from 'react';
import { SimulationJourneyProvider, useSimulationJourney } from './context/SimulationJourneyContext';
import { TelemetryBar } from './components/TelemetryBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Section_PIDScanner } from './components/Section_PIDScanner';
import { Section_EquipmentCodex } from './components/Section_EquipmentCodex';
import { Section_Metrics } from './components/Section_Metrics';
import { Section_InteractiveJourney } from './components/Section_InteractiveJourney';
import { Section_EnterpriseDeployment } from './components/Section_EnterpriseDeployment';
import { Section_ComparisonROI } from './components/Section_ComparisonROI';
import { Section_PricingLeadership } from './components/Section_PricingLeadership';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { PilotDrawer } from './components/PilotDrawer';

const AppContent: React.FC = () => {
  const { language } = useSimulationJourney();
  const isRTL = language === 'AR';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#04060E] text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-white relative ${
        isRTL ? 'font-sans' : 'font-sans'
      }`}
    >
      {/* Soft Ambient Radial Background Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* 1. Real-Time Refinery Operational Telemetry Bar */}
      <TelemetryBar />

      {/* 2. Architectural Linear.app / Apple Pro Style Navbar */}
      <Navbar />

      {/* 3. SECTION 1: Centered Cinematic Hero + Master Dual-Screen Workstation */}
      <HeroSection />

      {/* 4. INVENTIVE MODULE: AI P&ID Ingestion Engine (How Nexiiva builds in ~1 week) */}
      <Section_PIDScanner />

      {/* 5. INVENTIVE MODULE: 387 Equipment Types Interactive Library */}
      <Section_EquipmentCodex />

      {/* 6. Executive Performance Telemetry Array */}
      <Section_Metrics />

      {/* 7. SECTION 3: 3-Stage Control Room Suite ("Build. Instruct. Certify.") */}
      <Section_InteractiveJourney />

      {/* 8. SECTION 4: Enterprise Deployment (Purdue Model Air-Gapped & Isolated Cloud) */}
      <Section_EnterpriseDeployment />

      {/* 9. SECTION 5: Boardroom Financial War Room & Refinery ROI Simulator */}
      <Section_ComparisonROI />

      {/* 10. SECTION 6: Commercial Packages + Eng. Mostafa Adel Frontline Dossier */}
      <Section_PricingLeadership />

      {/* 11. Sleek Modern Industrial Footer */}
      <Footer />

      {/* Modals & Interactive Drawers */}
      <VideoModal />
      <PilotDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SimulationJourneyProvider>
      <AppContent />
    </SimulationJourneyProvider>
  );
};

export default App;
