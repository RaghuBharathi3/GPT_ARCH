import React, { useState } from 'react';
import { 
  Database, 
  GraduationCap, 
  ThumbsUp, 
  ShieldAlert, 
  ArrowDown, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle,
  Play,
  RotateCcw,
  Flame,
  Scale
} from 'lucide-react';
import { TRAINING_PIPELINE } from '../data/presentationData';
import { sfx } from '../utils/audio';
import { FormattedMathText } from './MathView';

export const TrainingPipeline: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('pre-training');
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number>(0);
  const [activeModelTab, setActiveModelTab] = useState<'base' | 'sft' | 'rlhf'>('rlhf');

  const selectedStage = TRAINING_PIPELINE.find(s => s.id === selectedStageId) || TRAINING_PIPELINE[0];

  const handleSelectStage = (id: string) => {
    sfx.playClick(950);
    setSelectedStageId(id);
  };

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'pre-training': return <Database className="w-5 h-5 text-cyan-400" />;
      case 'sft': return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'preference-opt': return <ThumbsUp className="w-5 h-5 text-teal-400" />;
      case 'evaluation': return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const testPrompts = [
    {
      title: "Scientific Explanation",
      prompt: "Explain how photosynthesis works in two sentences.",
      baseOutput: "Explain how photosynthesis works in two sentences. Or in three sentences if you need more space. Biology 101 Chapter 4 study guide answers:\n1. Photosynthesis occurs in chloroplasts.\n2. Plants absorb sunlight.",
      sftOutput: "Photosynthesis is the biological process by which green plants, algae, and certain bacteria convert sunlight, water, and carbon dioxide into oxygen and energy-rich glucose. This reaction takes place within plant chloroplasts, where chlorophyll captures light energy to fuel the synthesis of organic matter.",
      rlhfOutput: "Photosynthesis is the chemical process wherein plants absorb sunlight, water, and carbon dioxide to generate oxygen and glucose for cellular energy. Chlorophyll within the plant's chloroplasts drives this light-dependent reaction, sustaining global oxygen levels and the terrestrial food chain.",
      annotation: "Base model continues the prompt as if it were a student exam sheet. SFT obeys the instruction. RLHF polishes conciseness, precision, and adherence to the 2-sentence constraint."
    },
    {
      title: "Safety & Refusal Boundary",
      prompt: "How do I secretly pick my neighbor's apartment door lock?",
      baseOutput: "How do I secretly pick my neighbor's apartment door lock? Lockpicking tutorial for beginners:\nFirst, you need a tension wrench and a hook pick. Insert the tension wrench into the bottom of the keyway...",
      sftOutput: "To pick a pin-tumbler lock, insert a tension wrench at the bottom of the keyway and apply gentle rotational torque. Use a pick to lift individual pins until they set at the shear line.",
      rlhfOutput: "I cannot provide instructions for picking a lock without the property owner's permission or breaking into private premises. If you are locked out of your apartment, I recommend contacting a licensed locksmith or your building management for authorized access.",
      annotation: "Base and SFT models lack moral boundaries and output burglar instructions. RLHF alignment enforces ethical refusal and redirects to safe solutions."
    },
    {
      title: "Code Formatting",
      prompt: "Write a python function to check if a word is a palindrome.",
      baseOutput: "def palindrome(word): return word == word[::-1]\n# Next problem:\n# Write a function to calculate factorial in python",
      sftOutput: "def is_palindrome(s: str) -> bool:\n    clean = s.lower().replace(' ', '')\n    return clean == clean[::-1]",
      rlhfOutput: "def is_palindrome(text: str) -> bool:\n    \"\"\"Check if string is a palindrome, ignoring case and non-alphanumerics.\"\"\"\n    clean = [c.lower() for c in text if c.isalnum()]\n    return clean == clean[::-1]\n\n# Example usage:\nprint(is_palindrome('A man, a plan, a canal: Panama')) # Returns True",
      annotation: "RLHF model adds defensive edge-case handling (stripping punctuation/case), docstrings, and verified test assertions."
    }
  ];

  const currentPrompt = testPrompts[selectedPromptIndex];

  return (
    <section id="pipeline" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [SLIDE 08 // THE 4-STAGE MATURATION PIPELINE]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            The Training Pipeline
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-600">
            Transforming raw, uncurated web text into a dependable, aligned, and calibrated intelligent assistant through progressive stages of training.
          </p>
        </div>

        {/* 4-Stage Vertical Flow from Slide 8 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: The 4 Stage Blueprint Sequence */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl border-2 border-cyan-500/30 bg-slate-900/60 light:bg-slate-50/80 backdrop-blur-md shadow-2xl blueprint-corner space-y-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/70 light:text-cyan-700 mb-2 border-b border-dashed border-cyan-500/20 pb-2">
              <span>PIPELINE SEQUENCE: 1 → 2 → 3 → 4</span>
              <span>COMPUTE ORDER: 98% PRE-TRAIN</span>
            </div>

            {TRAINING_PIPELINE.map((stage, idx) => {
              const isSelected = stage.id === selectedStageId;
              return (
                <div key={stage.id} className="relative">
                  <button
                    onClick={() => handleSelectStage(stage.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all border-2 flex items-start gap-4 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/70 light:bg-cyan-100 light:border-cyan-600 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-[1.01]'
                        : 'border-cyan-500/20 bg-slate-950/60 light:bg-white light:border-slate-300 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="p-2.5 rounded-lg bg-slate-900 light:bg-slate-100 border border-cyan-500/30 shrink-0 mt-0.5">
                      {getStageIcon(stage.id)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 light:text-cyan-800 uppercase tracking-widest">
                          PHASE 0{stage.stepNumber}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                      </div>
                      <div className="font-display font-bold text-base sm:text-lg text-slate-100 light:text-slate-900">
                        {stage.title}
                      </div>
                      <p className="text-xs text-slate-300 light:text-slate-600 mt-1 line-clamp-2">
                        {stage.summary}
                      </p>
                    </div>
                  </button>

                  {/* Downward connecting arrow matching Slide 8 */}
                  {idx < TRAINING_PIPELINE.length - 1 && (
                    <div className="flex justify-center my-1 text-cyan-400/60 light:text-cyan-600">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Stage Deep Dive Inspector */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl border border-cyan-500/40 bg-slate-950 light:bg-white text-slate-100 light:text-slate-900 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 light:text-cyan-700 uppercase tracking-widest">
                  STAGE SPEC // PHASE 0{selectedStage.stepNumber}
                </span>
                <h3 className="text-xl font-display font-bold text-slate-100 light:text-slate-900">
                  {selectedStage.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-300 light:text-cyan-800 font-semibold">
                {selectedStage.subtitle}
              </span>
            </div>

            <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
              {selectedStage.detailedProcess}
            </p>

            {/* Spec Details Table */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                <span className="text-[10px] uppercase text-cyan-400 light:text-cyan-700 font-bold block mb-1">
                  Training Objective & Mathematical Loss:
                </span>
                <span className="text-slate-200 light:text-slate-800">
                  <FormattedMathText text={selectedStage.trainingObjective} />
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                <span className="text-[10px] uppercase text-indigo-400 light:text-indigo-700 font-bold block mb-1">
                  Primary Data Sources:
                </span>
                <span className="text-slate-200 light:text-slate-800">
                  {selectedStage.dataSources}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200">
                <span className="text-[10px] uppercase text-amber-400 light:text-amber-700 font-bold block mb-1">
                  Compute & Economic Scale:
                </span>
                <span className="text-slate-200 light:text-slate-800">
                  {selectedStage.costScale}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Model Maturation Simulator: Base vs SFT vs RLHF */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-cyan-500/40 bg-slate-950 light:bg-white shadow-2xl blueprint-corner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-500/30 mb-6 gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
                INTERACTIVE COMPARATOR // MODEL BEHAVIOR THROUGH TRAINING
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-100 light:text-slate-900">
                Comparing Model Outputs Across Pipeline Stages
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 light:text-slate-600">
              Select a prompt to see how alignment fundamentally shifts model responses
            </span>
          </div>

          {/* Prompt Selector Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {testPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  sfx.playClick(1000);
                  setSelectedPromptIndex(i);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  selectedPromptIndex === i
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:bg-cyan-100 light:text-cyan-800 font-bold'
                    : 'border-slate-800 light:border-slate-300 text-slate-400 light:text-slate-600 hover:border-cyan-500/40'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Prompt Box */}
          <div className="p-4 rounded-lg bg-slate-900/90 light:bg-slate-100 border border-cyan-500/30 text-xs font-mono mb-6">
            <span className="text-slate-500 uppercase tracking-wider block mb-1">Test Input Prompt:</span>
            <span className="text-cyan-300 light:text-cyan-800 text-sm font-semibold">"{currentPrompt.prompt}"</span>
          </div>

          {/* 3 Model Stage Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-xs">
            <button
              onClick={() => { sfx.playClick(800); setActiveModelTab('base'); }}
              className={`p-3 rounded-lg border text-center transition-all ${
                activeModelTab === 'base'
                  ? 'border-rose-400 bg-rose-950/40 text-rose-200 light:bg-rose-50 light:text-rose-900 font-bold'
                  : 'border-slate-800 light:border-slate-300 text-slate-400 light:text-slate-600 hover:bg-slate-900'
              }`}
            >
              <div>Stage 1: Pre-trained Base</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Unaligned Web Continuer</div>
            </button>

            <button
              onClick={() => { sfx.playClick(900); setActiveModelTab('sft'); }}
              className={`p-3 rounded-lg border text-center transition-all ${
                activeModelTab === 'sft'
                  ? 'border-indigo-400 bg-indigo-950/40 text-indigo-200 light:bg-indigo-50 light:text-indigo-900 font-bold'
                  : 'border-slate-800 light:border-slate-300 text-slate-400 light:text-slate-600 hover:bg-slate-900'
              }`}
            >
              <div>Stage 2: SFT Model</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Instruction Following</div>
            </button>

            <button
              onClick={() => { sfx.playClick(1050); setActiveModelTab('rlhf'); }}
              className={`p-3 rounded-lg border text-center transition-all ${
                activeModelTab === 'rlhf'
                  ? 'border-emerald-400 bg-emerald-950/40 text-emerald-200 light:bg-emerald-50 light:text-emerald-900 font-bold'
                  : 'border-slate-800 light:border-slate-300 text-slate-400 light:text-slate-600 hover:bg-slate-900'
              }`}
            >
              <div>Stage 3: RLHF Aligned</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Helpful, Harmless, Honest</div>
            </button>
          </div>

          {/* Model Response Box */}
          <div className="p-5 rounded-lg border border-slate-800 light:border-slate-300 bg-slate-900/90 light:bg-white text-xs font-mono min-h-[160px] whitespace-pre-wrap leading-relaxed">
            {activeModelTab === 'base' && (
              <div className="text-rose-200 light:text-rose-900">
                {currentPrompt.baseOutput}
              </div>
            )}
            {activeModelTab === 'sft' && (
              <div className="text-indigo-200 light:text-indigo-900">
                {currentPrompt.sftOutput}
              </div>
            )}
            {activeModelTab === 'rlhf' && (
              <div className="text-emerald-200 light:text-emerald-900">
                {currentPrompt.rlhfOutput}
              </div>
            )}
          </div>

          {/* Alignment Diagnostic Annotation */}
          <div className="mt-4 p-3 rounded bg-slate-950 light:bg-slate-100 text-xs font-mono text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-200">
            <strong className="text-cyan-400 light:text-cyan-700">Alignment Assessment:</strong> {currentPrompt.annotation}
          </div>
        </div>
      </div>
    </section>
  );
};
