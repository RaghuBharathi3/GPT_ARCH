import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  ArrowUp, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Cpu, 
  Compass, 
  Play, 
  Pause,
  Grid
} from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../data/presentationData';
import { sfx } from '../utils/audio';
import { InlineMath, BlockMath } from './MathView';

export const ArchitectureExplorer: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('masked-attention');
  const [isSimulatingDataflow, setIsSimulatingDataflow] = useState(false);
  const [activePulseLayer, setActivePulseLayer] = useState<number | null>(null);

  const selectedLayer = ARCHITECTURE_LAYERS.find(l => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[2];

  const handleSelectLayer = (id: string) => {
    sfx.playClick(950);
    setSelectedLayerId(id);
  };

  const handleToggleSimulation = () => {
    sfx.playBlip(1200);
    if (isSimulatingDataflow) {
      setIsSimulatingDataflow(false);
      setActivePulseLayer(null);
      return;
    }

    setIsSimulatingDataflow(true);
    let step = 1;
    const interval = setInterval(() => {
      setActivePulseLayer(step);
      sfx.playClick(600 + step * 150);
      step++;
      if (step > 5) {
        step = 1;
      }
    }, 1000);

    // Save interval ID to stop later
    (window as unknown as { _archInterval?: number })._archInterval = interval as unknown as number;
  };

  // Sample tokens for causal mask visualizer
  const sampleTokens = ["GPT", "generates", "text", "step", "by"];

  return (
    <section id="architecture" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-cyan-500/20 mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
              [SLIDE 05 // CORE SCHEMATIC]
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
              DECODER-ONLY TRANSFORMER ARCHITECTURE
            </h2>
            <p className="mt-2 text-sm text-slate-300 light:text-slate-600 max-w-2xl">
              A deep-learning stack engineered specifically for unidirectional causal language modeling. Click each layer to inspect its tensor operations and internal mathematics.
            </p>
          </div>

          {/* Pulse Dataflow Simulation Control */}
          <button
            onClick={handleToggleSimulation}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all border ${
              isSimulatingDataflow
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-900 light:bg-slate-100 text-cyan-300 light:text-cyan-800 border-cyan-500/40 hover:border-cyan-400'
            }`}
          >
            {isSimulatingDataflow ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Signal Pulse</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Signal Pulse (Bottom → Top)</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: The Exact 5-Layer Stack Diagram from Slide 5 */}
          <div className="lg:col-span-6 relative p-6 sm:p-8 rounded-xl border-2 border-cyan-500/30 bg-slate-900/60 light:bg-slate-50/80 backdrop-blur-md shadow-2xl blueprint-corner">
            {/* Architectural Calipers & Dimension Marks */}
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/70 light:text-cyan-700 mb-6 border-b border-dashed border-cyan-500/20 pb-2">
              <span>|← t (SEQUENCE) →|</span>
              <span>STACK DEPTH: N × REPEATING BLOCKS</span>
              <span>|← H (d_model) →|</span>
            </div>

            {/* Vertical Flow of Layers (Descending order 5 down to 1) */}
            <div className="space-y-3 relative">
              {/* Vertical flow arrow track */}
              <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-dashed border-l border-cyan-500/20 pointer-events-none" />

              {ARCHITECTURE_LAYERS.map((layer) => {
                const isSelected = layer.id === selectedLayerId;
                const isPulsing = activePulseLayer === layer.level;

                return (
                  <div key={layer.id} className="relative">
                    {/* Layer Bar styled exactly like the hatched blueprint boxes in Slide 5 */}
                    <button
                      onClick={() => handleSelectLayer(layer.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all border-2 relative overflow-hidden group ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/70 light:bg-cyan-100 light:border-cyan-600 shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-[1.01]'
                          : 'border-cyan-500/30 bg-slate-950/70 light:bg-white light:border-slate-300 hover:border-cyan-500/70 hover:bg-slate-900/90'
                      } ${isPulsing ? 'ring-2 ring-cyan-300 ring-offset-2 ring-offset-slate-950' : ''}`}
                    >
                      {/* Hatch Pattern Accent on the edges matching Slide 5 */}
                      <div 
                        className="absolute inset-y-0 left-0 w-3 bg-cyan-500/20 light:bg-cyan-200 border-r border-cyan-500/30"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(14,165,233,0.3) 3px, rgba(14,165,233,0.3) 6px)'
                        }}
                      />
                      <div 
                        className="absolute inset-y-0 right-0 w-3 bg-cyan-500/20 light:bg-cyan-200 border-l border-cyan-500/30"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(14,165,233,0.3) 3px, rgba(14,165,233,0.3) 6px)'
                        }}
                      />

                      <div className="pl-4 pr-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 light:text-cyan-800 uppercase tracking-widest flex items-center gap-1.5">
                            <span>LAYER 0{layer.level}</span>
                            {layer.id === 'masked-attention' && (
                              <span className="px-1.5 py-0.2 rounded bg-cyan-400 text-slate-950 text-[9px] font-black">
                                CAUSAL CORE
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 light:text-slate-600">
                            {layer.tensorShape.split(',')[0] + '...]'}
                          </span>
                        </div>

                        <div className="font-display font-bold text-base sm:text-lg text-slate-100 light:text-slate-900">
                          {layer.name}
                        </div>
                        <div className="text-xs text-slate-300 light:text-slate-600 mt-0.5 line-clamp-1">
                          {layer.shortDesc}
                        </div>
                      </div>
                    </button>

                    {/* Upward flow connection arrow between layers */}
                    {layer.level > 1 && (
                      <div className="flex justify-center my-1 text-cyan-400/60 light:text-cyan-600">
                        <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Slide 5 Highlight Callout Note */}
            <div className="mt-6 p-3 rounded-lg border border-cyan-500/40 bg-cyan-950/30 light:bg-cyan-50 text-xs font-mono text-cyan-300 light:text-cyan-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Slide 5 Note:</strong> "Masked" self-attention is strictly required to prevent the model from looking at future tokens during autoregressive language generation.
              </span>
            </div>
          </div>

          {/* Right: Layer Inspector & Causal Mask Visualizer */}
          <div className="lg:col-span-6 space-y-6">
            {/* Detailed Inspector Panel */}
            <div className="p-6 rounded-xl border border-cyan-500/40 bg-slate-950 light:bg-white text-slate-100 light:text-slate-900 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 light:text-cyan-700 uppercase tracking-wider">
                    SPECIFICATION BREAKDOWN // LAYER 0{selectedLayer.level}
                  </span>
                  <h3 className="text-xl font-display font-bold text-slate-100 light:text-slate-900 mt-0.5">
                    {selectedLayer.name}
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded bg-slate-900 light:bg-slate-100 border border-cyan-500/30 font-mono text-[11px] text-cyan-300 light:text-cyan-800">
                  {selectedLayer.tensorShape}
                </div>
              </div>

              {/* Math Formula */}
              {selectedLayer.mathFormula && (
                <div className="my-4 p-4 rounded-lg bg-slate-900/90 light:bg-slate-100 border border-cyan-500/20 text-xs sm:text-sm text-cyan-300 light:text-cyan-800 overflow-x-auto text-center py-4">
                  <BlockMath math={selectedLayer.mathFormula} />
                </div>
              )}

              {/* Full Explanation */}
              <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed mb-4">
                {selectedLayer.fullExplanation}
              </p>

              {/* Key Functions */}
              <div className="space-y-2 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 light:text-cyan-700 block font-bold">
                  Key Computational Operations:
                </span>
                {selectedLayer.keyFunctions.map((fn, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-slate-300 light:text-slate-700">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{fn}</span>
                  </div>
                ))}
              </div>

              {/* Engineering Note */}
              {selectedLayer.note && (
                <div className="p-3 rounded bg-slate-900 light:bg-slate-50 border border-slate-800 light:border-slate-200 text-xs font-mono text-slate-400 light:text-slate-600">
                  <strong className="text-cyan-400 light:text-cyan-700">Engineering Note:</strong> {selectedLayer.note}
                </div>
              )}
            </div>

            {/* Interactive Causal Attention Mask Matrix Visualization */}
            <div className="p-6 rounded-xl border border-cyan-500/30 bg-slate-900/80 light:bg-slate-50 text-slate-100 light:text-slate-900 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 light:text-cyan-700 uppercase tracking-wider">
                    DEEP DIVE: THE CAUSAL TRIANGULAR MASK
                  </span>
                  <h4 className="text-base font-display font-bold flex items-center gap-2">
                    <span>Interactive Attention Mask Matrix</span>
                    <InlineMath math="M_{ij}" />
                  </h4>
                </div>
                <div className="text-[11px] font-mono text-slate-400 light:text-slate-600">
                  <InlineMath math="\text{Softmax}\left(\frac{QK^T}{\sqrt{d_k}} + M\right)" />
                </div>
              </div>

              <p className="text-xs text-slate-300 light:text-slate-600 mb-4">
                Hover or inspect each cell: tokens can attend to preceding tokens (green), but future tokens are strictly masked out with <InlineMath math="-\infty" /> (red/forbidden).
              </p>

              {/* 5x5 Token Attention Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse text-xs font-mono">
                  <thead>
                    <tr>
                      <th className="p-1.5 text-slate-500 text-[10px]">Q \ K</th>
                      {sampleTokens.map((tok, j) => (
                        <th key={j} className="p-1.5 text-cyan-400 light:text-cyan-800 font-bold border-b border-cyan-500/30 text-[11px]">
                          [{tok}]
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleTokens.map((rowTok, i) => (
                      <tr key={i}>
                        <td className="p-1.5 font-bold text-cyan-300 light:text-cyan-800 border-r border-cyan-500/30 text-[11px]">
                          [{rowTok}]
                        </td>
                        {sampleTokens.map((colTok, j) => {
                          const isAllowed = j <= i;
                          return (
                            <td
                              key={j}
                              className={`p-2 border border-slate-800 light:border-slate-200 transition-colors ${
                                isAllowed
                                  ? 'bg-emerald-950/40 text-emerald-300 light:bg-emerald-50 light:text-emerald-800 font-semibold hover:bg-emerald-900/50'
                                  : 'bg-rose-950/30 text-rose-400 light:bg-rose-50 light:text-rose-800 font-mono text-[10px]'
                              }`}
                              title={
                                isAllowed
                                  ? `Token "${rowTok}" attends to past token "${colTok}"`
                                  : `MASKED: Token "${rowTok}" CANNOT look ahead at future token "${colTok}"`
                              }
                            >
                              {isAllowed ? `✓ attn` : <InlineMath math="-\infty" />}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono mt-4 pt-3 border-t border-slate-800 light:border-slate-200">
                <span className="flex items-center gap-1.5 text-emerald-400 light:text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40 border border-emerald-400" />
                  Allowed (Past Context)
                </span>
                <span className="flex items-center gap-1.5 text-rose-400 light:text-rose-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/40 border border-rose-400" />
                  <span><InlineMath math="-\infty" /> Masked (Future Leakage Prevented)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
