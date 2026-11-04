import React from 'react';
import { SimulationJourneyProvider, useSimulationJourney } from './context/SimulationJourneyContext';
import { TelemetryBar } from './components/TelemetryBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Section_ComparisonROI } from './components/Section_ComparisonROI';
import { Section_PIDScanner } from './components/Section_PIDScanner';
import { Section_InteractiveJourney } from './components/Section_InteractiveJourney';
import { Section_EnterpriseDeployment } from './components/Section_EnterpriseDeployment';
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
      className="min-h-screen bg-white text-[#17191c] flex flex-col selection:bg-[#fbe1d1] selection:text-[#5d2a1a] relative"
    >
      {/* 1. Whisper-Quiet Telemetry Bar */}
      <TelemetryBar />

      {/* 2. Editorial Transparent Navbar */}
      <Navbar />

      {/* 3. SECTION 1: Editorial Serif Hero + Floating DCS Simulator Artifact */}
      <HeroSection />

      {/* 4. SECTION 2: Boardroom Business Case & Refinery Outage Economics */}
      <Section_ComparisonROI />

      {/* 5. SECTION 3: P&ID Blueprint Ingestion Studio & 387 Equipment Codex */}
      <Section_PIDScanner />

      {/* 6. SECTION 4: The 3-Stage Training Lifecycle ("Build. Instruct. Certify.") */}
      <Section_InteractiveJourney />

      {/* 7. SECTION 5: Purdue Model Industrial Cyber-Security & Air-Gapped OT */}
      <Section_EnterpriseDeployment />

      {/* 8. SECTION 6: Commercial Licensing, Founder Dossier & Fast-Track Pilot */}
      <Section_PricingLeadership />

      {/* 9. Minimal Editorial Footer */}
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
