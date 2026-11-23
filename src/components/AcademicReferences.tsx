import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  BookOpen, 
  Quote, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import { KEY_TAKEAWAYS, CORE_PHILOSOPHICAL_AXIOM, ACADEMIC_REFERENCES } from '../data/presentationData';
import { sfx } from '../utils/audio';

export const AcademicReferences: React.FC = () => {
  const [checkedTakeaways, setCheckedTakeaways] = useState<number[]>([1, 2, 3]);
  const [copiedBibId, setCopiedBibId] = useState<string | null>(null);

  const toggleTakeaway = (num: number) => {
    sfx.playClick(900);
    setCheckedTakeaways(prev => 
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const copyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibId(id);
    sfx.playClick(1100);
    setTimeout(() => setCopiedBibId(null), 2000);
  };

  return (
    <section id="references" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [SLIDE 14 // SYNTHESIS & PRIMARY LITERATURE]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            Conclusion and Academic References
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-600">
            Synthesizing core architectural paradigms, ethical axioms, and canonical peer-reviewed foundational literature.
          </p>
        </div>

        {/* Slide 14 Layout: Key Takeaways (Left) vs Academic References (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Key Takeaways (1, 2, 3) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl border-2 border-cyan-500/30 bg-slate-900/60 light:bg-slate-50/80 backdrop-blur-md shadow-2xl blueprint-corner space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <span className="text-xs font-mono font-bold text-cyan-400 light:text-cyan-700 uppercase tracking-widest">
                SLIDE 14 // KEY TAKEAWAYS
              </span>
              <span className="text-xs font-mono text-slate-400">
                {checkedTakeaways.length}/3 Validated
              </span>
            </div>

            <div className="space-y-4">
              {KEY_TAKEAWAYS.map((takeaway) => {
                const isChecked = checkedTakeaways.includes(takeaway.number);
                return (
                  <div
                    key={takeaway.number}
                    onClick={() => toggleTakeaway(takeaway.number)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                      isChecked
                        ? 'border-cyan-400 bg-cyan-950/40 light:bg-cyan-100 light:border-cyan-600'
                        : 'border-slate-800 light:border-slate-300 bg-slate-950/60 light:bg-white'
                    }`}
                  >
                    {/* Number Badge */}
                    <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors ${
                      isChecked
                        ? 'border-cyan-400 bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                        : 'border-slate-700 text-slate-400'
                    }`}>
                      {takeaway.number}
                    </div>

                    <div className="flex-1">
                      <div className="font-display font-bold text-base text-slate-100 light:text-slate-900">
                        {takeaway.title}
                      </div>
                      <p className="text-xs text-slate-300 light:text-slate-600 mt-1 leading-relaxed">
                        {takeaway.summary}
                      </p>
                    </div>

                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className={`w-5 h-5 transition-colors ${isChecked ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide 14 Core Philosophical Axiom Callout Box */}
            <div className="p-6 rounded-xl border-2 border-cyan-400 bg-gradient-to-br from-cyan-950/80 to-blue-950/80 light:from-cyan-100 light:to-blue-100 shadow-[0_0_25px_rgba(0,240,255,0.2)] relative">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 light:text-cyan-800" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 light:text-cyan-800 font-bold">
                  Core Architectural Axiom
                </span>
              </div>
              <p className="text-base sm:text-lg font-display font-black text-slate-100 light:text-slate-900 leading-snug">
                "{CORE_PHILOSOPHICAL_AXIOM}"
              </p>
            </div>
          </div>

          {/* Right Column: Academic References */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl border-2 border-cyan-500/30 bg-slate-950 light:bg-white text-slate-100 light:text-slate-900 shadow-2xl blueprint-corner space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <span className="text-xs font-mono font-bold text-cyan-400 light:text-cyan-700 uppercase tracking-widest">
                SLIDE 14 // ACADEMIC CITATIONS & DOI
              </span>
              <span className="text-xs font-mono text-slate-400">
                Primary Literature
              </span>
            </div>

            <div className="space-y-3.5">
              {ACADEMIC_REFERENCES.map((ref) => {
                const isCopied = copiedBibId === ref.id;
                return (
                  <div
                    key={ref.id}
                    className="p-4 rounded-xl border border-slate-800 light:border-slate-300 bg-slate-900/70 light:bg-slate-50 space-y-2 text-xs font-mono"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-sans font-bold text-sm text-cyan-300 light:text-cyan-800">
                        {ref.title}
                      </div>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-cyan-400 shrink-0"
                        title="Open Source Paper Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="text-slate-400 light:text-slate-600 text-[11px]">
                      {ref.authors} ({ref.year}). <em>{ref.publication}</em>
                    </div>

                    <p className="text-slate-300 light:text-slate-700 text-xs font-sans leading-relaxed">
                      {ref.significance}
                    </p>

                    <div className="flex items-center justify-end pt-2 border-t border-slate-800 light:border-slate-200">
                      <button
                        onClick={() => copyBibtex(ref.id, ref.bibtex)}
                        className="flex items-center gap-1.5 text-[10px] text-cyan-400 light:text-cyan-700 hover:text-cyan-300"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'BibTeX Copied!' : 'Copy BibTeX'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
