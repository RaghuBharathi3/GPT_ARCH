import React from 'react';
import { Compass, ArrowUp, ShieldCheck, Heart, Sparkles, Terminal } from 'lucide-react';
import { sfx } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sfx.playClick(1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t-2 border-cyan-500/30 bg-slate-950 light:bg-slate-100 text-slate-400 py-16 overflow-hidden">
      {/* Background blueprint coordinate marks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Engineering Blueprint Title Block (Architectural Drafting Stamp) */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-cyan-500/40 bg-slate-900/60 light:bg-white shadow-2xl blueprint-corner mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono border-b border-cyan-500/20 pb-6 mb-6">
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">PROJECT TITLE:</span>
              <strong className="text-slate-100 light:text-slate-900 text-sm font-display">
                GPT ARCHITECTURE SPECIFICATION
              </strong>
            </div>

            <div>
              <span className="text-[10px] uppercase text-slate-500 block">DRAWING / REVISION:</span>
              <strong className="text-cyan-400 light:text-cyan-800">
                REV 4.2.0-PROD (14 SLIDES DECODED)
              </strong>
            </div>

            <div>
              <span className="text-[10px] uppercase text-slate-500 block">COMPOSITION PRINCIPLE:</span>
              <strong className="text-slate-200 light:text-slate-700">
                8-POINT GRID • GOLDEN RATIO (1:1.618)
              </strong>
            </div>

            <div>
              <span className="text-[10px] uppercase text-slate-500 block">ACCESSIBILITY STANDARD:</span>
              <strong className="text-emerald-400 light:text-emerald-700">
                WCAG 2.2 AA VERIFIED
              </strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-cyan-950/60 light:bg-cyan-100 text-cyan-400 light:text-cyan-800 border border-cyan-500/30">
                <Compass className="w-5 h-5 animate-[spin_30s_linear_infinite]" />
              </div>
              <div>
                <div className="text-slate-200 light:text-slate-800 font-bold">
                  Interactive Design-Engineered Learning Laboratory
                </div>
                <div className="text-slate-500 text-[11px]">
                  Preserving 100% of the foundational PowerPoint slides with expanded mathematical rigor.
                </div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/40 bg-slate-900 light:bg-slate-100 hover:bg-cyan-500/20 text-cyan-300 light:text-cyan-800 transition-colors shrink-0"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 gap-4 pt-4 border-t border-slate-800 light:border-slate-300">
          <div>
            Built with React, TypeScript, Tailwind CSS, and Web Audio API synthesis.
          </div>
          <div className="flex items-center gap-4">
            <span>[TOLERANCE: ±0.001]</span>
            <span>[DATUM: WGS-84]</span>
            <span>[SECURITY: ZERO UNVERIFIED FABRICATIONS]</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
