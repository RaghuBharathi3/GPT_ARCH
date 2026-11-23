import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  Minimize, 
  Minimize2,
  Calendar, 
  BatteryCharging, 
  Cpu,
  Zap, 
  Globe, 
  MessageSquare, 
  Flame, 
  Scale, 
  Layers, 
  HelpCircle,
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { CORE_STRENGTHS, LIMITATIONS_AND_CHALLENGES, HALLUCINATION_PROBLEM } from '../data/presentationData';
import { sfx } from '../utils/audio';
import { FormattedMathText } from './MathView';

export const StrengthsAndLimitations: React.FC = () => {
  const [selectedStrengthId, setSelectedStrengthId] = useState<string>('natural-lang');
  const [selectedLimitId, setSelectedLimitId] = useState<string>('hallucination');

  const selectedStrength = CORE_STRENGTHS.find(s => s.id === selectedStrengthId) || CORE_STRENGTHS[0];
  const selectedLimit = LIMITATIONS_AND_CHALLENGES.find(l => l.id === selectedLimitId);

  const getStrengthIcon = (id: string) => {
    switch (id) {
      case 'natural-lang': return <MessageSquare className="w-5 h-5 text-cyan-400 light:text-cyan-700" />;
      case 'productivity': return <Zap className="w-5 h-5 text-amber-400 light:text-amber-700" />;
      case 'multilingual': return <Globe className="w-5 h-5 text-teal-400 light:text-teal-700" />;
      case 'content-gen': return <Flame className="w-5 h-5 text-rose-400 light:text-rose-700" />;
      case 'analytical-reasoning': return <Scale className="w-5 h-5 text-indigo-400 light:text-indigo-700" />;
      case 'adaptability': return <Layers className="w-5 h-5 text-sky-400 light:text-sky-700" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400 light:text-cyan-700" />;
    }
  };

  const getLimitIcon = (id: string) => {
    switch (id) {
      case 'bias': return <AlertTriangle className="w-5 h-5 text-amber-400 light:text-amber-700" />;
      case 'privacy': return <Lock className="w-5 h-5 text-rose-400 light:text-rose-700" />;
      case 'context-limits': return <Minimize2 className="w-5 h-5 text-sky-400 light:text-sky-700" />;
      case 'knowledge-cutoff': return <Calendar className="w-5 h-5 text-indigo-400 light:text-indigo-700" />;
      case 'compute-cost': return <Cpu className="w-5 h-5 text-teal-400 light:text-teal-700" />;
      default: return <ShieldAlert className="w-5 h-5 text-rose-400 light:text-rose-700" />;
    }
  };

  return (
    <section id="strengths" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [SLIDES 10 & 11 // CAPABILITIES VS CONSTRAINTS]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            ADVANTAGES & TECHNICAL CHALLENGES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-600">
            Evaluating the transformative utility of decoder-only transformers alongside their inherent systemic limitations and the critical Hallucination Problem.
          </p>
        </div>

        {/* Part 1: Slide 10 - Advantages of the Architecture (Gear schematic with 6 spokes) */}
        <div className="mb-20">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-8">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 light:text-cyan-700 uppercase tracking-widest">
                SLIDE 10 SPECIFICATION
              </span>
              <h3 className="text-2xl font-display font-bold text-slate-100 light:text-slate-900">
                Core Strengths of GPT Architecture
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 light:text-slate-600">
              6 Architectural Force Multipliers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_STRENGTHS.map((strength) => {
              const isSelected = strength.id === selectedStrengthId;
              return (
                <div
                  key={strength.id}
                  onClick={() => {
                    sfx.playClick(900);
                    setSelectedStrengthId(strength.id);
                  }}
                  className={`cursor-pointer p-5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/70 light:bg-cyan-50 light:border-cyan-600 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-[1.02]'
                      : 'border-cyan-500/20 bg-slate-950/60 light:bg-white light:border-slate-300 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-slate-900 light:bg-slate-100 border border-cyan-500/20">
                        {getStrengthIcon(strength.id)}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 light:text-cyan-800 uppercase tracking-widest">
                        {strength.metric}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base sm:text-lg text-slate-100 light:text-slate-900">
                      {strength.title}
                    </h4>
                    <div className="text-xs font-mono text-cyan-300 light:text-cyan-800 font-semibold mt-0.5">
                      ({strength.subtitle})
                    </div>

                    <p className="mt-3 text-xs text-slate-300 light:text-slate-600 leading-relaxed">
                      {strength.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                      {isSelected ? '● ACTIVE INSPECTION' : 'Click to inspect'}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Slide 11 - Limitations & The Hallucination Problem */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-8">
            <div>
              <span className="text-[10px] font-mono text-rose-400 light:text-rose-700 uppercase tracking-widest">
                SLIDE 11 SPECIFICATION
              </span>
              <h3 className="text-2xl font-display font-bold text-slate-100 light:text-slate-900">
                Limitations & Technical Challenges
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 light:text-slate-600">
              Systemic Vulnerabilities & Epistemological Boundaries
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 5 Core Limitations Cards */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400 light:text-slate-600 block mb-2">
                Identified Boundary Constraints (Slide 11):
              </span>

              {LIMITATIONS_AND_CHALLENGES.map((limit) => {
                const isSelected = limit.id === selectedLimitId;
                return (
                  <button
                    key={limit.id}
                    onClick={() => {
                      sfx.playClick(850);
                      setSelectedLimitId(limit.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl transition-all border-2 flex items-start gap-3 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-950/40 text-amber-200 light:bg-amber-50 light:border-amber-600 light:text-amber-900 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'border-slate-800 light:border-slate-300 bg-slate-950/60 light:bg-white text-slate-300 light:text-slate-700 hover:border-slate-700'
                    }`}
                  >
                    <div className="p-1.5 rounded bg-slate-900 light:bg-slate-100 border border-slate-700 shrink-0">
                      {getLimitIcon(limit.id)}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-slate-100 light:text-slate-900">
                        {limit.title}
                      </div>
                      <div className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                        {limit.summary}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Button to view Hallucination Deep Dive */}
              <button
                onClick={() => {
                  sfx.playClick(1000);
                  setSelectedLimitId('hallucination');
                }}
                className={`w-full text-left p-4 rounded-xl transition-all border-2 flex items-start gap-3 mt-4 ${
                  selectedLimitId === 'hallucination'
                    ? 'border-rose-500 bg-rose-950/60 text-rose-200 light:bg-rose-50 light:border-rose-600 light:text-rose-900 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                    : 'border-rose-500/30 bg-slate-950/80 light:bg-white text-slate-300 light:text-slate-700 hover:border-rose-500/60'
                }`}
              >
                <div className="p-2 rounded bg-rose-950/70 light:bg-rose-100 text-rose-400 shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-rose-400 light:text-rose-700">
                    The Hallucination Problem (Focus Box)
                  </div>
                  <div className="text-xs text-slate-300 light:text-slate-600 mt-1">
                    Examine why plausible fabrication occurs and how to systematically mitigate it.
                  </div>
                </div>
              </button>
            </div>

            {/* Right: The Hallucination Problem Blueprint Schematic Box (Slide 11 Red Box) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl border-2 border-rose-500/50 bg-slate-950/90 light:bg-rose-50/70 shadow-2xl blueprint-corner space-y-6">
              {selectedLimitId === 'hallucination' ? (
                <>
                  {/* Schematic Border Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-rose-500/30">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                      <span className="text-xs font-mono font-bold text-rose-400 light:text-rose-700 uppercase tracking-widest">
                        CRITICAL SAFETY DIAGNOSTIC // SLIDE 11 FOCUS
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">STATUS: ACTIVE INVESTIGATION</span>
                  </div>

                  {/* Slide 11 Exact Definition Quote */}
                  <div className="p-5 rounded-lg border-2 border-dashed border-rose-500/60 bg-rose-950/30 light:bg-white text-center">
                    <h4 className="font-display font-black text-2xl text-rose-400 light:text-rose-700 mb-2">
                      {HALLUCINATION_PROBLEM.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-200 light:text-slate-800 leading-relaxed font-medium">
                      "Occurs when an AI generates information that <span className="text-rose-400 font-bold underline">appears credible</span> but is <span className="text-rose-400 font-bold underline">entirely fabricated</span>, unsupported, or false (e.g., inventing nonexistent citations)."
                    </p>
                  </div>

                  {/* Root Cause Analysis */}
                  <div className="space-y-2 text-xs font-mono">
                    <span className="uppercase text-slate-400 light:text-slate-600 font-bold block">
                      Mathematical Root Cause:
                    </span>
                    <p className="text-slate-300 light:text-slate-700 leading-relaxed">
                      {HALLUCINATION_PROBLEM.rootCause}
                    </p>
                  </div>

                  {/* Concrete Examples */}
                  <div className="p-4 rounded-lg bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 space-y-2 text-xs font-mono">
                    <span className="text-rose-400 light:text-rose-700 font-bold uppercase block">
                      Common Real-World Manifestations:
                    </span>
                    {HALLUCINATION_PROBLEM.classicExamples.map((ex, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-300 light:text-slate-700">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mitigations */}
                  <div className="space-y-2 text-xs font-mono">
                    <span className="uppercase text-emerald-400 light:text-emerald-700 font-bold block">
                      Proven Engineering Mitigations:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {HALLUCINATION_PROBLEM.modernMitigations.map((mit, i) => (
                        <div key={i} className="p-2.5 rounded bg-slate-900 light:bg-white border border-emerald-500/30 text-slate-300 light:text-slate-700 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-[11px]">{mit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Detail for selected other limitation */
                selectedLimit && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                      <span className="text-xs font-mono font-bold text-amber-400 light:text-amber-700 uppercase tracking-widest">
                        LIMITATION SPEC // {selectedLimit.title.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-slate-400">SLIDE 11</span>
                    </div>

                    <h4 className="text-2xl font-display font-bold text-slate-100 light:text-slate-900">
                      {selectedLimit.title}
                    </h4>

                    <p className="text-base text-slate-300 light:text-slate-700 leading-relaxed">
                      <FormattedMathText text={selectedLimit.deepDive} />
                    </p>

                    <div className="p-4 rounded-lg bg-slate-900 light:bg-white border border-slate-800 text-xs font-mono text-slate-400">
                      <strong className="text-amber-400">Presentation Summary:</strong> "{selectedLimit.summary}"
                    </div>

                    <button
                      onClick={() => setSelectedLimitId('hallucination')}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 pt-2"
                    >
                      <span>Return to The Hallucination Problem inspection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
