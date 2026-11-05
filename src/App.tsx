import React from 'react';
import { SimulationJourneyProvider, useSimulationJourney } from './context/SimulationJourneyContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Section_AboutCompany } from './components/Section_AboutCompany';
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
      className="min-h-screen bg-white text-[#0B1120] flex flex-col selection:bg-purple-100 selection:text-indigo-900 relative overflow-x-hidden w-full max-w-full"
    >
      {/* 1. Sticky Navbar sitting cleanly at top-0 */}
      <Navbar />

      {/* 2. SECTION 1: Hero Section with Clean Product Showcase */}
      <HeroSection />

      {/* 3. SECTION 2: About NEXIIVA, Industrial Mission & Metrics */}
      <Section_AboutCompany />

      {/* 4. SECTION 3: The Operational Reality & Outage Economics */}
      <Section_ComparisonROI />

      {/* 5. SECTION 4: P&ID Ingestion Studio & 387 Equipment Codex */}
      <Section_PIDScanner />

      {/* 6. SECTION 5: Platform Capabilities (Practice, Instruct, Certify) */}
      <Section_InteractiveJourney />

      {/* 7. SECTION 6: Industrial Cyber-Security & Air-Gapped OT */}
      <Section_EnterpriseDeployment />

      {/* 8. SECTION 7: How to Subscribe (4-Step Onboarding & Licensing) */}
      <Section_PricingLeadership />

      {/* 9. Minimal Editorial Footer */}
      <Footer />

      {/* Clean Modals & Drawers */}
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
