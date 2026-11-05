import React from 'react';
import { SimulationJourneyProvider, useSimulationJourney } from './context/SimulationJourneyContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Section_ComparisonROI } from './components/Section_ComparisonROI';
import { Section_PIDScanner } from './components/Section_PIDScanner';
import { Section_EnterpriseDeployment } from './components/Section_EnterpriseDeployment';
import { Section_PricingLeadership } from './components/Section_PricingLeadership';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { PilotDrawer } from './components/PilotDrawer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

const AppContent: React.FC = () => {
  const { language } = useSimulationJourney();
  const isRTL = language === 'AR';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#03050C] text-[#F1F5F9] flex flex-col selection:bg-purple-900 selection:text-white relative overflow-x-hidden w-full max-w-full"
    >
      {/* 1. Sleek Glass Navbar */}
      <Navbar />

      {/* 2. STAGE 1: Control-Room Hero + Interactive Live Refinery Digital Twin Console */}
      <HeroSection />

      {/* 3. STAGE 2: The Three Industry Bottlenecks vs The NEXIIVA Breakthrough */}
      <Section_ComparisonROI />

      {/* 4. STAGE 3: OTS Builder Workspace — AI Agent & 100% Air-Gapped Offline Modes */}
      <Section_PIDScanner />

      {/* 5. STAGE 4: Enterprise Deployment & OT/IT Cybersecurity (Air-Gapped vs Cloud) */}
      <Section_EnterpriseDeployment />

      {/* 6. STAGE 5: Transparent B2B Commercial Tracks, Leadership Spotlight & Pilot Form */}
      <Section_PricingLeadership />

      {/* 7. Minimal Dark Editorial Footer */}
      <Footer />

      {/* Global Modals, Drawers & Floating WhatsApp in Dark Theme */}
      <VideoModal />
      <PilotDrawer />
      <FloatingWhatsAppButton />
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
