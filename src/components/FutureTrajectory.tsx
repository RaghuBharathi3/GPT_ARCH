import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Headphones, 
  BrainCircuit, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Zap,
  TrendingUp,
  Compass
} from 'lucide-react';
import { FUTURE_TRAJECTORY } from '../data/presentationData';
import { sfx } from '../utils/audio';

export const FutureTrajectory: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('agentic-ai');

  const selectedPillar = FUTURE_TRAJECTORY.find(p => p.id === selectedPillarId) || FUTURE_TRAJECTORY[3];

  const handleSelect = (id: string) => {
    sfx.playClick(900);
    setSelectedPillarId(id);
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'multimodality': return <Headphones className="w-5 h-5 text-cyan-400" />;
      case 'improved-reasoning': return <BrainCircuit className="w-5 h-5 text-indigo-400" />;
      case 'enhanced-reliability': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'agentic-ai': return <Wrench className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="future" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [SLIDE 13 // FRONTIER RESEARCH & NEXT-GEN SYSTEMS]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            FUTURE TRAJECTORY OF LARGE LANGUAGE MODELS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-600">
            How foundational text transformers evolve into multimodal, verifiable, reasoning-centric autonomous agent architectures.
          </p>
        </div>

        {/* Tree Fork Schematic matching Slide 13 */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-cyan-500/30 bg-slate-900/60 light:bg-slate-50/80 backdrop-blur-md shadow-2xl blueprint-corner mb-12">
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/70 light:text-cyan-700 mb-6 border-b border-dashed border-cyan-500/20 pb-2">
            <span>CURRENT STATE: ISOLATED TEXT</span>
            <span>FORK DIVERGENCE: 4 REVOLUTIONARY VECTORS</span>
            <span>TARGET: AUTONOMOUS AGI INFRASTRUCTURE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Origin Node: Current Language Models (Slide 13 left box) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-full p-6 rounded-xl border-2 border-cyan-500/60 bg-slate-950 light:bg-white shadow-xl relative">
                <div className="w-12 h-12 rounded-full border border-cyan-500/40 bg-cyan-950/40 light:bg-cyan-100 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-lg text-slate-100 light:text-slate-900">
                  CURRENT LANGUAGE MODELS
                </h3>
                <span className="text-xs font-mono text-cyan-400 light:text-cyan-700 font-semibold block mt-1">
                  (Text-heavy, standalone)
                </span>
                <p className="text-xs text-slate-400 light:text-slate-600 mt-2">
                  Primarily unimodal, bounded by static pre-training weights, lacking autonomous actuation.
                </p>

                {/* Right branch connector indicator */}
                <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-4 h-0.5 bg-cyan-400" />
              </div>
            </div>

            {/* 4 Forward Branches (Slide 13 right cards) */}
            <div className="lg:col-span-8 space-y-3.5 relative">
              {/* Vertical connector line for tree */}
              <div className="hidden lg:block absolute left-0 top-6 bottom-6 w-0.5 bg-cyan-500/40" />

              {FUTURE_TRAJECTORY.map((pillar) => {
                const isSelected = pillar.id === selectedPillarId;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => handleSelect(pillar.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all border-2 relative flex items-start gap-4 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/70 light:bg-cyan-100 light:border-cyan-600 shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-[1.01]'
                        : 'border-cyan-500/20 bg-slate-950/60 light:bg-white light:border-slate-300 hover:border-cyan-500/50'
                    }`}
                  >
                    {/* Horizontal fork connector tick */}
                    <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-cyan-500/40" />

                    <div className="p-2 rounded-lg bg-slate-900 light:bg-slate-100 border border-cyan-500/30 shrink-0">
                      {getPillarIcon(pillar.id)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-display font-bold text-base text-slate-100 light:text-slate-900">
                          {pillar.title}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 light:text-cyan-800">
                          {pillar.timeline}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 light:text-slate-600 mt-1">
                        {pillar.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Frontier Pillar Deep Dive */}
        <div className="p-6 sm:p-8 rounded-xl border border-cyan-500/40 bg-slate-950 light:bg-white text-slate-100 light:text-slate-900 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 light:text-cyan-700 uppercase tracking-widest">
                RESEARCH DEEP DIVE // {selectedPillar.title.toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400 light:text-slate-600">
              Expected Horizon: {selectedPillar.timeline}
            </span>
          </div>

          <h3 className="text-2xl font-display font-bold text-slate-100 light:text-slate-900">
            {selectedPillar.title}
          </h3>

          <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
            {selectedPillar.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
            <div className="p-4 rounded-lg bg-slate-900 light:bg-slate-100 border border-cyan-500/20 space-y-1">
              <span className="text-[10px] text-cyan-400 light:text-cyan-800 uppercase font-bold block">
                Breakthrough Technologies:
              </span>
              <p className="text-slate-200 light:text-slate-800">
                {selectedPillar.breakthroughTech}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 light:bg-slate-100 border border-cyan-500/20 space-y-1">
              <span className="text-[10px] text-emerald-400 light:text-emerald-800 uppercase font-bold block">
                Anticipated Real-World Impact:
              </span>
              <p className="text-slate-200 light:text-slate-800">
                {selectedPillar.realWorldImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
