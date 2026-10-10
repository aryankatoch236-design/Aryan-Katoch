import React, { useState, useEffect } from 'react';
import { SceneContainer } from './components/canvas/SceneContainer';
import { CustomCursor } from './components/ui/CustomCursor';
import { FloatingNav } from './components/ui/FloatingNav';
import { IntroSequence } from './components/ui/IntroSequence';
import { EasterEggModal } from './components/ui/EasterEggModal';
import { LivePreviewModal } from './components/ui/LivePreviewModal';
import { WhatsAppFloatingButton } from './components/ui/WhatsAppFloatingButton';

import { HeroSection } from './components/sections/HeroSection';
import { ProfileSection } from './components/sections/ProfileSection';
import { StrategySection } from './components/sections/StrategySection';
import { ResponsibilitySection } from './components/sections/ResponsibilitySection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { CaseStudySection } from './components/sections/CaseStudySection';
import { ClientRelationshipSection } from './components/sections/ClientRelationshipSection';
import { ImpactSection } from './components/sections/ImpactSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { PersonalSection } from './components/sections/PersonalSection';
import { VisionSection } from './components/sections/VisionSection';
import { FaqSection } from './components/sections/FaqSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedStrategyNode, setSelectedStrategyNode] = useState<string>('maps');
  const [cursorText, setCursorText] = useState('');
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [easterEggModalOpen, setEasterEggModalOpen] = useState(false);

  // Live Project Preview Modal State
  const [livePreviewState, setLivePreviewState] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    client: string;
  }>({
    isOpen: false,
    title: '',
    url: '',
    client: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      setScrollProgress(progress);

      const sections = ['hero', 'profile', 'strategy', 'responsibilities', 'capabilities', 'work', 'about', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEasterEgg = () => {
    setEasterEggActive(true);
    setEasterEggModalOpen(true);
  };

  const handleOpenLivePreview = (title: string, url: string, client: string) => {
    setLivePreviewState({
      isOpen: true,
      title,
      url,
      client
    });
  };

  const handleCloseLivePreview = () => {
    setLivePreviewState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative min-h-screen bg-[#060504] text-white selection:bg-[#FF5A1F] selection:text-white">
      {!introFinished && <IntroSequence onComplete={() => setIntroFinished(true)} />}

      <SceneContainer
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        hoveredStrategyNode={selectedStrategyNode}
        onHoverStrategyNode={setSelectedStrategyNode}
        easterEggActive={easterEggActive}
      />

      <CustomCursor cursorText={cursorText} />

      <FloatingNav
        activeSection={activeSection}
        onEasterEggTrigger={handleEasterEgg}
      />

      <EasterEggModal
        isOpen={easterEggModalOpen}
        onClose={() => setEasterEggModalOpen(false)}
      />

      {/* Interactive In-App Live Project Preview Modal */}
      <LivePreviewModal
        isOpen={livePreviewState.isOpen}
        onClose={handleCloseLivePreview}
        title={livePreviewState.title}
        url={livePreviewState.url}
        client={livePreviewState.client}
      />

      {/* Floating 1-Click WhatsApp Action */}
      <WhatsAppFloatingButton />

      <main className="relative z-10">
        <HeroSection onHoverStateChange={setCursorText} />
        <ProfileSection onHoverStateChange={setCursorText} />
        <StrategySection
          selectedNodeId={selectedStrategyNode}
          onSelectNode={setSelectedStrategyNode}
          onHoverStateChange={setCursorText}
        />
        <ResponsibilitySection onHoverStateChange={setCursorText} />
        <CapabilitiesSection onHoverStateChange={setCursorText} />
        <CaseStudySection
          onOpenLivePreview={handleOpenLivePreview}
          onHoverStateChange={setCursorText}
        />
        <ClientRelationshipSection onHoverStateChange={setCursorText} />
        <ImpactSection onHoverStateChange={setCursorText} />
        <PhilosophySection onHoverStateChange={setCursorText} />
        <PersonalSection onHoverStateChange={setCursorText} />
        <VisionSection onHoverStateChange={setCursorText} />
        <FaqSection />
        <ContactSection onHoverStateChange={setCursorText} />
        <Footer />
      </main>
    </div>
  );
};
