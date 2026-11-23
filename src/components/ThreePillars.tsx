import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  Cpu, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Zap,
  Info,
  Network,
  FileEdit
} from 'lucide-react';
import { THREE_PILLARS } from '../data/presentationData';
import { sfx } from '../utils/audio';
import { BlockMath } from './MathView';

export const ThreePillars: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>('transformer');

  const handleSelectPillar = (id: string) => {
    sfx.playClick(900);
    setActivePillarId(id);
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'generative':
        return (
          <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-cyan-950/40 light:bg-cyan-100 border border-cyan-500/30 text-cyan-400 light:text-cyan-700 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <FileEdit className="w-8 h-8" />
            <Sparkles className="w-4 h-4 text-cyan-300 light:text-cyan-600 absolute -top-1 -right-1 animate-pulse" />
          </div>
        );
      case 'pre-trained':
        return (
          <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-cyan-950/40 light:bg-cyan-100 border border-cyan-500/30 text-cyan-400 light:text-cyan-700 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Database className="w-8 h-8" />
            <Layers className="w-4 h-4 text-cyan-300 light:text-cyan-600 absolute -bottom-1 -right-1" />
          </div>
        );
      case 'transformer':
        return (
          <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-cyan-950/40 light:bg-cyan-100 border border-cyan-500/30 text-cyan-400 light:text-cyan-700 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Cpu className="w-8 h-8" />
            <Network className="w-4 h-4 text-cyan-300 light:text-cyan-600 absolute -top-1 -right-1 animate-pulse" />
          </div>
        );
      default:
        return <Cpu className="w-12 h-12 text-cyan-400 light:text-cyan-700" />;
    }
  };

  return (
    <section id="pillars" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [SLIDE 03 // THE THREE FOUNDATIONAL PILLARS]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            DECODING THE ARCHITECTURE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-600">
            The acronym "GPT" represents three foundational machine learning paradigms unified into a single coherent system.
          </p>
        </div>

        {/* 3 Pillars Blueprint Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THREE_PILLARS.map((pillar, index) => {
            const isSelected = pillar.id === activePillarId;
            return (
              <div
                key={pillar.id}
                onClick={() => handleSelectPillar(pillar.id)}
                className={`cursor-pointer rounded-xl p-6 sm:p-8 transition-all border-2 relative flex flex-col justify-between blueprint-corner ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900/90 light:bg-cyan-50/90 shadow-[0_0_25px_rgba(0,240,255,0.25)] scale-[1.02]'
                    : 'border-cyan-500/20 bg-slate-950/60 light:bg-white light:border-slate-300 hover:border-cyan-500/50 hover:bg-slate-900/50'
                }`}
              >
                {/* Column Drafting Header */}
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-6 text-[10px] font-mono text-cyan-400 light:text-cyan-700">
                  <span>PILLAR 0{index + 1}</span>
                  <span>[SPEC // {pillar.id.toUpperCase()}]</span>
                </div>

                {/* Visual Diagram matching Slide 3 */}
                <div className="flex justify-center mb-6 py-4 rounded-lg bg-slate-950/40 light:bg-slate-100 border border-cyan-500/10">
                  {getPillarIcon(pillar.id)}
                </div>

                {/* Pillar Title & Concept */}
                <div className="space-y-3">
                  <h3 className="font-display font-black text-xl text-slate-100 light:text-slate-900 tracking-wide text-center">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-300 light:text-cyan-800 font-semibold text-center">
                    {pillar.subtitle}
                  </div>
                  <p className="text-sm text-slate-300 light:text-slate-700 text-center leading-relaxed">
                    {pillar.concept}
                  </p>
                </div>

                {/* Click indicator */}
                <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                    {isSelected ? '● ACTIVE INSPECTION' : 'Click to inspect'}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-slate-500'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Interactive Inspector Drawer */}
        {activePillarId && (
          <div className="mt-8 p-6 sm:p-8 rounded-xl border border-cyan-500/40 bg-slate-900/80 light:bg-slate-50 light:border-slate-300 shadow-xl backdrop-blur-md">
            {(() => {
              const currentPillar = THREE_PILLARS.find(p => p.id === activePillarId)!;
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/70 border border-cyan-800 text-cyan-400 text-xs font-mono">
                      <Info className="w-3.5 h-3.5" />
                      <span>DEEP DIVE: {currentPillar.title} ENGINE</span>
                    </div>
                    <h4 className="text-xl font-display font-bold text-slate-100 light:text-slate-900">
                      Why {currentPillar.title} Revolutionized Machine Learning
                    </h4>
                    <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                      {currentPillar.deepDive}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono text-cyan-400 light:text-cyan-700 uppercase tracking-wider block">
                        Architectural Verification Points:
                      </span>
                      {currentPillar.technicalMetrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300 light:text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Math Formula Card */}
                  <div className="lg:col-span-5 p-6 rounded-lg border border-cyan-500/30 bg-slate-950 light:bg-slate-900 text-slate-100 font-mono shadow-inner">
                    <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                      <span>Mathematical Formulation</span>
                      <span>LaTeX Notation</span>
                    </div>
                    <div className="p-4 rounded bg-slate-900 light:bg-slate-950 border border-cyan-500/20 text-cyan-300 text-center text-sm sm:text-base my-2 overflow-x-auto py-5">
                      <BlockMath math={currentPillar.formula} />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                      {currentPillar.id === 'generative' && "Joint probability modeled as product of conditional probabilities over historical tokens."}
                      {currentPillar.id === 'pre-trained' && "Log-likelihood maximization over vast unlabeled natural language corpora."}
                      {currentPillar.id === 'transformer' && "Scaled dot-product attention mapping Queries (Q), Keys (K), and Values (V) with square-root dimension scaling."}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};
