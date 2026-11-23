import React, { useState } from 'react';
import { 
  FileText, 
  HelpCircle, 
  Languages, 
  Sparkles, 
  BrainCircuit, 
  Code2, 
  ArrowRight, 
  Compass, 
  Copy, 
  Check, 
  Play, 
  RefreshCw,
  Terminal,
  Activity,
  Zap
} from 'lucide-react';
import { CORE_DEFINITION, HUB_CAPABILITIES } from '../data/presentationData';
import { sfx } from '../utils/audio';
import { InlineMath, BlockMath } from './MathView';

export const HeroBlueprint: React.FC = () => {
  const [selectedCapId, setSelectedCapId] = useState<string>('code-gen');
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [streamedText, setStreamedText] = useState('');

  const selectedCap = HUB_CAPABILITIES.find(c => c.id === selectedCapId) || HUB_CAPABILITIES[1];

  const handleSelect = (id: string) => {
    sfx.playClick(850);
    setSelectedCapId(id);
    setStreamedText('');
  };

  const handleRunSimulation = () => {
    sfx.playBlip(1100);
    setIsSimulating(true);
    setStreamedText('');
    const fullText = selectedCap.exampleOutput;
    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setStreamedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setIsSimulating(false);
        sfx.playSuccess();
      }
    }, 25);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    sfx.playClick(1200);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5" />;
      case 'Languages': return <Languages className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden border-b border-cyan-500/20 light:border-slate-300">
      {/* Blueprint Schematic Framing Lines */}
      <div className="absolute top-4 left-6 text-[10px] font-mono text-cyan-500/60 light:text-cyan-700/60 flex items-center gap-2 select-none pointer-events-none">
        <span>[FIG-01 // FOUNDATION BLUEPRINT]</span>
        <span>•</span>
        <span>COORD: 37°46'N 122°24'W</span>
        <span>•</span>
        <span>REV: 4.2.0</span>
      </div>

      <div className="absolute top-4 right-6 text-[10px] font-mono text-cyan-500/60 light:text-cyan-700/60 hidden sm:flex items-center gap-2 select-none pointer-events-none">
        <span>TOLERANCE: ±0.001</span>
        <span>SCALE: 1:1</span>
        <Compass className="w-4 h-4 text-cyan-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header (Slide 1) */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/40 light:bg-cyan-100 light:border-cyan-400 text-cyan-300 light:text-cyan-800 text-xs font-mono mb-4 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>ARCHITECTURAL SPECIFICATION & INTERACTIVE LAB</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100 light:text-slate-900 leading-none">
            GENERATIVE PRE-TRAINED <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 light:from-cyan-700 light:to-blue-800">
              TRANSFORMER (GPT)
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 light:text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Deconstructing the neural mechanisms, mathematical foundations, and autoregressive engine powering modern artificial intelligence.
          </p>

          {/* Slide 1 Visual Schematic: 3-Node Progression Arrow */}
          <div className="mt-8 py-4 px-6 rounded-lg border border-cyan-500/30 bg-slate-900/60 light:bg-slate-100/90 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-cyan-600/60 light:bg-cyan-500/80 -z-0" />
              {/* Dashed Future Prediction Arrow */}
              <div className="absolute top-1/2 right-0 w-16 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-cyan-400 -z-0" />

              {/* Node 1: Generative */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-slate-950 light:bg-white flex items-center justify-center text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" />
                </div>
                <span className="mt-2 text-xs font-mono font-semibold text-slate-200 light:text-slate-800">GENERATIVE</span>
                <span className="text-[11px] text-cyan-400 light:text-cyan-700">
                  <InlineMath math="P(w_t \mid w_{<t})" />
                </span>
              </div>

              {/* Node 2: Pre-trained */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-slate-950 light:bg-white flex items-center justify-center text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" />
                </div>
                <span className="mt-2 text-xs font-mono font-semibold text-slate-200 light:text-slate-800">PRE-TRAINED</span>
                <span className="text-[10px] font-mono text-cyan-400 light:text-cyan-700">Trillions Tokens</span>
              </div>

              {/* Node 3: Transformer */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-slate-950 light:bg-white flex items-center justify-center text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" />
                </div>
                <span className="mt-2 text-xs font-mono font-semibold text-slate-200 light:text-slate-800">TRANSFORMER</span>
                <span className="text-[10px] font-mono text-cyan-400 light:text-cyan-700">Self-Attention</span>
              </div>

              {/* Dashed continuation arrow head */}
              <div className="relative z-10 flex flex-col items-center pl-4">
                <ArrowRight className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="mt-2 text-[10px] font-mono text-slate-400 light:text-slate-600">t + 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Interactive Blueprint Hub & Spoke System */}
        <div id="capabilities" className="mt-8 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-500/20 mb-8 gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">[SLIDE 02 // ARCHITECTURE OVERVIEW]</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-100 light:text-slate-900">
                Core Capability Matrix
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 light:text-slate-600">
              Interactive Hub & Spoke Topology • Click nodes to test
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: The Architectural Blueprint Hub Diagram */}
            <div className="lg:col-span-7 relative p-6 sm:p-8 rounded-xl border-2 border-cyan-500/30 bg-slate-900/70 light:bg-slate-100/80 backdrop-blur-md shadow-2xl blueprint-corner">
              {/* Watermark compass in background */}
              <div className="absolute top-3 right-3 text-cyan-500/10 light:text-cyan-700/10 pointer-events-none">
                <Compass className="w-24 h-24" />
              </div>

              {/* Blueprint Dimension Caliper Annotation */}
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/70 light:text-cyan-700 mb-6 border-b border-dashed border-cyan-500/20 pb-2">
                <span>|← 500 px →|</span>
                <span>HUB-SPOKE DIVERGENCE: 6 AXES</span>
                <span>|← DECODER ENGINE →|</span>
              </div>

              {/* Central Core Box (Slide 2 Exact Text) */}
              <div className="relative z-10 p-5 rounded-lg border-2 border-cyan-400 bg-cyan-950/60 light:bg-cyan-50 light:border-cyan-600 text-center shadow-[0_0_20px_rgba(0,240,255,0.25)] mb-8">
                <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 light:text-cyan-800 text-[11px] font-mono font-bold uppercase mb-2">
                  Central Foundation Definition
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-100 light:text-slate-900 leading-snug">
                  "A family of AI language models by OpenAI designed to process and generate human-like text."
                </h3>
                <div className="mt-2 text-xs font-mono text-cyan-300 light:text-cyan-700">
                  Model Class: Causal Autoregressive Transformer
                </div>
              </div>

              {/* 6 Spokes arranged as responsive grid cards with active connection lines */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {HUB_CAPABILITIES.map((cap) => {
                  const isSelected = cap.id === selectedCapId;
                  return (
                    <button
                      key={cap.id}
                      onClick={() => handleSelect(cap.id)}
                      className={`relative p-3.5 rounded-lg text-left transition-all border ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:bg-cyan-100 light:border-cyan-600 light:text-cyan-900 shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-[1.02]'
                          : 'border-cyan-500/20 bg-slate-950/50 light:bg-white light:border-slate-300 text-slate-300 light:text-slate-700 hover:border-cyan-500/50 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 rounded ${isSelected ? 'text-cyan-300 light:text-cyan-800' : 'text-slate-400 light:text-slate-500'}`}>
                          {getIcon(cap.iconName)}
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        )}
                      </div>
                      <div className="font-display font-semibold text-sm leading-tight">
                        {cap.title}
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-slate-400 light:text-slate-600 line-clamp-2">
                        {cap.description}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Slide 2 Bottom Banner: Autoregressive generation */}
              <div className="mt-8 p-4 rounded-lg border border-cyan-400/50 bg-slate-950/80 light:bg-cyan-50 light:border-cyan-400/60 flex items-center gap-3">
                <div className="p-2 rounded bg-cyan-500/20 text-cyan-400 light:bg-cyan-200 light:text-cyan-800 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-800 font-bold">
                    The Autoregressive Law
                  </div>
                  <p className="text-sm font-medium text-slate-200 light:text-slate-800 mt-0.5">
                    <strong className="text-cyan-300 light:text-cyan-700">Autoregressive generation:</strong> Predicts the next token based strictly on preceding context.
                  </p>
                  <div className="mt-2 pt-2 border-t border-cyan-500/20 text-xs text-cyan-300 light:text-cyan-800">
                    <InlineMath math="P(w_1, w_2, \dots, w_T) = \prod_{t=1}^T P(w_t \mid w_1, \dots, w_{t-1})" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Blueprint Terminal Inspector */}
            <div className="lg:col-span-5 rounded-xl border border-cyan-500/30 bg-slate-950 light:bg-slate-900 text-slate-100 shadow-2xl overflow-hidden font-mono text-xs">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-slate-900 light:bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400 text-[11px]">gpt_inference_engine.py</span>
                </div>
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest">[SIMULATOR_ACTIVE]</span>
              </div>

              <div className="p-5 space-y-4">
                {/* Active Capability Info */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Active Module</span>
                    <div className="text-sm font-bold text-cyan-300">{selectedCap.title}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px]">
                    {selectedCap.tag}
                  </span>
                </div>

                {/* Prompt Preview */}
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Input Prompt Context</span>
                    <span>Tokens: ~{Math.ceil(selectedCap.examplePrompt.length / 4)}</span>
                  </div>
                  <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-slate-300 italic text-[11px] leading-relaxed">
                    "{selectedCap.examplePrompt}"
                  </div>
                </div>

                {/* Simulated Generation Output */}
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Autoregressive Output Stream</span>
                    <button
                      onClick={() => copyToClipboard(selectedCap.exampleOutput)}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[10px]"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded bg-slate-900/90 border border-cyan-500/20 text-cyan-100 min-h-[140px] max-h-[220px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {isSimulating ? (
                      <>
                        {streamedText}
                        <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
                      </>
                    ) : (
                      selectedCap.exampleOutput
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all disabled:opacity-50"
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating Tokens...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Autoregressive Simulation</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Model Telemetry */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                  <div>
                    <span className="block text-slate-500">Sampling Temp</span>
                    <span className="text-slate-200">0.7 (Balanced)</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Logit Head</span>
                    <span className="text-slate-200">Softmax Top-P</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">KV Cache</span>
                    <span className="text-emerald-400">Warm (100%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
