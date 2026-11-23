import React, { useState, useEffect } from 'react';
import { Theme } from './types';
import { Navbar } from './components/Navbar';
import { HeroBlueprint } from './components/HeroBlueprint';
import { ThreePillars } from './components/ThreePillars';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { TechnicalComponents } from './components/TechnicalComponents';
import { WorkflowSimulator } from './components/WorkflowSimulator';
import { EvolutionTimeline } from './components/EvolutionTimeline';
import { TrainingPipeline } from './components/TrainingPipeline';
import { RealWorldApplications } from './components/RealWorldApplications';
import { StrengthsAndLimitations } from './components/StrengthsAndLimitations';
import { ParadigmShift } from './components/ParadigmShift';
import { FutureTrajectory } from './components/FutureTrajectory';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { AcademicReferences } from './components/AcademicReferences';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { GlossaryModal } from './components/GlossaryModal';
import { CustomCursor } from './components/CustomCursor';

export function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNavigateTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    } ${showGrid ? (theme === 'dark' ? 'blueprint-grid-dark' : 'blueprint-grid-light') : ''}`}>
      {/* Precision Blueprint Custom Cursor */}
      <CustomCursor />

      {/* Top Sticky Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Main Educational Flow */}
      <main className="relative">
        {/* Slide 1 & 2: Overview & 6 Capabilities Hub */}
        <HeroBlueprint />

        {/* Slide 3: The 3 Pillars (Generative, Pre-trained, Transformer) */}
        <ThreePillars />

        {/* Slide 5: 5-Layer Decoder-Only Architecture & Causal Mask */}
        <ArchitectureExplorer />

        {/* Slide 6: Core Components & Interactive Tokenizer Sandbox */}
        <TechnicalComponents />

        {/* Slide 7: End-to-End Workflow & Autoregressive Next-Token Simulator */}
        <WorkflowSimulator />

        {/* Slide 4: Evolution Timeline & GPT vs ChatGPT Distinction */}
        <EvolutionTimeline />

        {/* Slide 8: The 4-Stage Training Pipeline & Model Comparison */}
        <TrainingPipeline />

        {/* Slide 9: Real-World Applications & Interactive Code Sandbox */}
        <RealWorldApplications />

        {/* Slide 10 & 11: Core Advantages & The Hallucination Problem */}
        <StrengthsAndLimitations />

        {/* Slide 12: Paradigm Shift: Traditional Search vs. GPT */}
        <ParadigmShift />

        {/* Slide 13: Future Trajectory of Large Language Models */}
        <FutureTrajectory />

        {/* Interactive Assessment: Knowledge Verification Quiz */}
        <KnowledgeQuiz />

        {/* Slide 14: Conclusion & Academic References */}
        <AcademicReferences />
      </main>

      {/* Architectural Blueprint Footer */}
      <Footer />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateTo={handleNavigateTo}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}

export default App;
