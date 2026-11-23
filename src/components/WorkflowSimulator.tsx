import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/presentationData';
import { sfx } from '../utils/audio';
import { InlineMath, BlockMath } from './MathView';

interface CandidateToken {
  word: string;
  baseProb: number;
}

export const WorkflowSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(5);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [sequenceTokens, setSequenceTokens] = useState<string[]>([
    "Artificial",
    "Intelligence",
    "is"
  ]);
  const [isAutoGenerating, setIsAutoGenerating] = useState<boolean>(false);
  const [stepCounter, setStepCounter] = useState<number>(0);

  // Candidate distribution for the current token (Slide 7 exact tokens)
  const baseCandidates: CandidateToken[] = [
    { word: "transforming", baseProb: 0.60 },
    { word: "changing", baseProb: 0.30 },
    { word: "developing", baseProb: 0.10 }
  ];

  // Additional follow-up words for subsequent generation steps
  const continuationVocabulary: Record<string, CandidateToken[]> = {
    "is": [
      { word: "transforming", baseProb: 0.60 },
      { word: "changing", baseProb: 0.30 },
      { word: "developing", baseProb: 0.10 }
    ],
    "transforming": [
      { word: "our", baseProb: 0.55 },
      { word: "global", baseProb: 0.28 },
      { word: "modern", baseProb: 0.17 }
    ],
    "changing": [
      { word: "the", baseProb: 0.65 },
      { word: "how", baseProb: 0.22 },
      { word: "every", baseProb: 0.13 }
    ],
    "developing": [
      { word: "rapidly", baseProb: 0.58 },
      { word: "new", baseProb: 0.27 },
      { word: "solutions", baseProb: 0.15 }
    ],
    "our": [
      { word: "world", baseProb: 0.62 },
      { word: "society", baseProb: 0.26 },
      { word: "economy", baseProb: 0.12 }
    ],
    "global": [
      { word: "industries", baseProb: 0.50 },
      { word: "markets", baseProb: 0.32 },
      { word: "workflows", baseProb: 0.18 }
    ],
    "world": [
      { word: "at", baseProb: 0.45 },
      { word: "with", baseProb: 0.35 },
      { word: ".", baseProb: 0.20 }
    ],
    "society": [
      { word: "in", baseProb: 0.52 },
      { word: "through", baseProb: 0.30 },
      { word: ".", baseProb: 0.18 }
    ]
  };

  const lastToken = sequenceTokens[sequenceTokens.length - 1] || "is";
  const currentCandidates = continuationVocabulary[lastToken] || [
    { word: "rapidly", baseProb: 0.50 },
    { word: "further", baseProb: 0.30 },
    { word: ".", baseProb: 0.20 }
  ];

  // Adjust probabilities by temperature using softmax simulation
  const computeAdjustedProbabilities = () => {
    const temp = Math.max(0.1, temperature);
    // logits approximation: log(p)
    const logits = currentCandidates.map(c => Math.log(c.baseProb) / temp);
    const maxLogit = Math.max(...logits);
    const exps = logits.map(l => Math.exp(l - maxLogit));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    return currentCandidates.map((c, i) => ({
      word: c.word,
      prob: exps[i] / sumExps
    }));
  };

  const adjustedCandidates = computeAdjustedProbabilities();

  const handleStepNextToken = (chosenWord?: string) => {
    sfx.playClick(1050);
    const wordToAdd = chosenWord || adjustedCandidates[0].word;
    
    setSequenceTokens(prev => [...prev, wordToAdd]);
    setActiveStep(6);
    setStepCounter(prev => prev + 1);

    setTimeout(() => {
      setActiveStep(5);
    }, 400);
  };

  const handleReset = () => {
    sfx.playClick(700);
    setIsAutoGenerating(false);
    setSequenceTokens(["Artificial", "Intelligence", "is"]);
    setActiveStep(5);
    setStepCounter(0);
  };

  // Autogeneration timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isAutoGenerating) {
      timer = setInterval(() => {
        if (sequenceTokens.length >= 10 || sequenceTokens[sequenceTokens.length - 1] === ".") {
          setIsAutoGenerating(false);
          sfx.playSuccess();
        } else {
          handleStepNextToken();
        }
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isAutoGenerating, sequenceTokens, temperature]);

  return (
    <section id="workflow" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-cyan-500/20 mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
              [SLIDE 07 // STEP-BY-STEP GENERATION ENGINE]
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
              END-TO-END WORKFLOW: HOW GPT WORKS
            </h2>
            <p className="mt-2 text-sm text-slate-300 light:text-slate-600 max-w-2xl">
              From raw user input to tokenisation, deep vector projections, probability distributions, and the cyclical autoregressive loop.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sfx.playBlip(1200);
                setIsAutoGenerating(!isAutoGenerating);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all border ${
                isAutoGenerating
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold border-cyan-400'
              }`}
            >
              {isAutoGenerating ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Auto-Loop</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Auto-Generate Loop</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              title="Reset Sequence"
              className="p-2 rounded-lg border border-slate-700 light:border-slate-300 bg-slate-900 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7 Chevron Step Navigation (Slide 7 exact 7 stages) */}
        <div className="mb-12 relative">
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/70 light:text-cyan-700 mb-2 border-b border-dashed border-cyan-500/20 pb-1">
            <span>|← t (INPUT PHASE) →|</span>
            <span>END-TO-END LATENCY: ~20ms PER TOKEN</span>
            <span>|← L (AUTOREGRESSIVE LOOP) →|</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {WORKFLOW_STEPS.map((step) => {
              const isActive = activeStep === step.step;
              return (
                <button
                  key={step.step}
                  onClick={() => {
                    sfx.playClick(900);
                    setActiveStep(step.step);
                  }}
                  className={`relative p-3 rounded-lg text-left transition-all border ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-950/70 light:bg-cyan-100 light:border-cyan-600 shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-[1.02]'
                      : 'border-cyan-500/20 bg-slate-950/60 light:bg-white light:border-slate-300 text-slate-400 light:text-slate-600 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 light:text-cyan-800">
                      STEP 0{step.step}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                  </div>
                  <div className="font-display font-bold text-xs sm:text-sm text-slate-100 light:text-slate-900 leading-tight">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Autoregressive Next-Token Predictor Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Active Step Deep Dive & Context State */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl border-2 border-cyan-500/30 bg-slate-900/70 light:bg-slate-50/80 backdrop-blur-md shadow-2xl blueprint-corner space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
                  CURRENT ACCUMULATED CONTEXT // {sequenceTokens.length} TOKENS
                </span>
                <span className="text-[10px] font-mono text-slate-400 light:text-slate-600">
                  Step Cycles: {stepCounter}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-slate-100 light:text-slate-900">
                Working Context Sequence:
              </h3>
            </div>

            {/* Live Context Prompt String */}
            <div className="p-4 rounded-lg bg-slate-950 light:bg-white border border-cyan-500/30 light:border-slate-300">
              <div className="text-xs font-mono text-slate-400 mb-2">Decoded Context Window:</div>
              <div className="flex flex-wrap gap-1.5 items-center font-mono text-sm sm:text-base">
                {sequenceTokens.map((tok, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 rounded border transition-all ${
                      i === sequenceTokens.length - 1
                        ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 light:bg-cyan-100 light:text-cyan-900 font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)] animate-pulse'
                        : 'bg-slate-900 light:bg-slate-100 border-slate-700 text-slate-300 light:text-slate-800'
                    }`}
                  >
                    {tok}
                  </span>
                ))}
                <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-1 align-middle" />
              </div>
            </div>

            {/* Slide 7 Loopback Callout Box */}
            <div className="p-4 rounded-lg border border-cyan-500/40 bg-cyan-950/40 light:bg-cyan-50 light:border-cyan-400 text-xs font-mono text-cyan-200 light:text-cyan-900 flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-cyan-300 light:text-cyan-800 uppercase font-bold mb-1">
                  Sequential Generation Law (Slide 7):
                </strong>
                "Model selects the highest probability token (or samples from distribution) and loops back, appending it to the input sequence until terminal condition is met."
              </div>
            </div>

            {/* Detailed Explanation of Currently Active Stage */}
            <div className="p-4 rounded-lg bg-slate-950/50 light:bg-white border border-slate-800 light:border-slate-200 text-xs font-mono space-y-2">
              <div className="text-cyan-400 light:text-cyan-700 font-bold">
                STAGE 0{WORKFLOW_STEPS[activeStep - 1].step}: {WORKFLOW_STEPS[activeStep - 1].title}
              </div>
              <p className="text-slate-300 light:text-slate-700 leading-relaxed">
                {WORKFLOW_STEPS[activeStep - 1].details}
              </p>
              <div className="text-[10px] text-slate-500 pt-1">
                Tensor State: <code className="text-cyan-300 light:text-cyan-800">{WORKFLOW_STEPS[activeStep - 1].tensorState}</code>
              </div>
            </div>
          </div>

          {/* Right: Next-Token Probability Distribution & Interactive Sampler */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl border border-cyan-500/40 bg-slate-950 light:bg-white text-slate-100 light:text-slate-900 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 light:text-cyan-700 uppercase tracking-widest">
                  STAGE 05 // LOGITS & SOFTMAX DISTRIBUTION
                </span>
                <h3 className="text-lg font-display font-bold text-slate-100 light:text-slate-900">
                  Next-Token Probability Calculations
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px]">
                <InlineMath math="P(w_{t+1} \mid w_{\le t})" />
              </span>
            </div>

            {/* Temperature Slider */}
            <div className="p-4 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-300 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-300 light:text-slate-700">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sampling Temperature (T)</span>
                </span>
                <span className="font-bold text-cyan-300 light:text-cyan-800">
                  {temperature.toFixed(2)} {temperature <= 0.2 ? '(Greedy/Deterministic)' : temperature >= 1.0 ? '(Creative/High Entropy)' : '(Balanced)'}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0.1 (Argmax)</span>
                <span>0.7 (Default)</span>
                <span>1.5 (High Randomness)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300 light:text-cyan-800 text-center">
                <InlineMath math="P(w_i) = \frac{\exp(z_i / T)}{\sum_j \exp(z_j / T)}" />
              </div>
            </div>

            {/* Probability Bars (Directly reflecting Slide 7: transforming 60%, changing 30%, developing 10%) */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400 light:text-slate-600 flex items-center justify-between">
                <span>Candidate Tokens:</span>
                <span>Softmax Probability</span>
              </div>

              {adjustedCandidates.map((cand, idx) => {
                const percentage = (cand.prob * 100).toFixed(1);
                return (
                  <div
                    key={cand.word}
                    onClick={() => handleStepNextToken(cand.word)}
                    className="group cursor-pointer p-3 rounded-lg border border-cyan-500/20 bg-slate-900/60 light:bg-slate-50 hover:border-cyan-400 transition-all hover:bg-slate-900"
                  >
                    <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-slate-800 light:bg-slate-200 text-cyan-400 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-100 light:text-slate-900 group-hover:text-cyan-300 text-sm">
                          "{cand.word}"
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-bold text-cyan-300 light:text-cyan-800">
                        <span>{percentage}%</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800 light:bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          idx === 0
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-400'
                            : idx === 1
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-400'
                            : 'bg-gradient-to-r from-slate-500 to-slate-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Button: Step Next Token */}
            <button
              onClick={() => handleStepNextToken()}
              className="w-full py-3 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-display font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Step Autoregressive Prediction & Loop Back</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
