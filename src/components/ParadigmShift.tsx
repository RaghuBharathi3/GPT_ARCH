import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  Check, 
  Globe, 
  Cpu, 
  Database,
  Layers,
  HelpCircle,
  Copy
} from 'lucide-react';
import { PARADIGM_SHIFT } from '../data/presentationData';
import { sfx } from '../utils/audio';

export const ParadigmShift: React.FC = () => {
  const [selectedQueryIdx, setSelectedQueryIdx] = useState<number>(1);

  const sampleQueries = [
    {
      query: "Find the official Python 3.12 release notes and documentation.",
      type: "Factual / Source Verification",
      searchOutput: {
        title: "Python 3.12.0 Documentation - Python.org",
        url: "https://docs.python.org/3/whatsnew/3.12.html",
        snippet: "This article explains the new features in Python 3.12 compared to 3.11. Python 3.12 is the newest major release of the Python programming language...",
        verdict: "Search wins: Direct link to canonical, authentic, author-verified documentation."
      },
      gptOutput: {
        answer: "Python 3.12 introduces more isolated subinterpreters with separate GILs (PEP 684), improved error messages, a new low-overhead profiling and debugging API (PEP 669), and syntactically cleaner f-strings (PEP 701)...",
        verdict: "GPT synthesizes key highlights, but cannot replace verifying primary software source downloads."
      }
    },
    {
      query: "Write a Python script to calculate the moving average of five numbers.",
      type: "Code Synthesis / Problem Solving",
      searchOutput: {
        title: "How to calculate moving average in Python - Stack Overflow",
        url: "https://stackoverflow.com/questions/13728392/moving-average",
        snippet: "I am trying to calculate a moving average in Python with numpy.convolve. You can use pandas rolling or numpy convolution...",
        verdict: "Search requires opening 3 tabs, scrolling past ads, and adapting generic code."
      },
      gptOutput: {
        answer: "def calc_average(nums: list[float]) -> float:\n    return sum(nums) / len(nums)\n\n# Test execution:\nprint(calc_average([10, 20, 30, 40, 50])) # Output: 30.0",
        verdict: "GPT wins: Zero-click immediate customized code tailored exactly to user requirements."
      }
    },
    {
      query: "When is the next total solar eclipse visible in North America?",
      type: "Real-Time / Time-Sensitive Fact",
      searchOutput: {
        title: "NASA Eclipse Schedule - Solar Eclipse Dates",
        url: "https://science.nasa.gov/eclipses/future-eclipses/",
        snippet: "The next total solar eclipse visible from contiguous United States will occur on August 23, 2044. Alaska will witness one on March 30, 2033...",
        verdict: "Search wins: Live calendar retrieval with official astronomical ephemeris."
      },
      gptOutput: {
        answer: "Following the April 8, 2024 total solar eclipse, the next total solar eclipse traversing the contiguous United States will occur on August 23, 2044 (touching Montana and the Dakotas), followed by an extensive coast-to-coast eclipse on August 12, 2045.",
        verdict: "Accurate if training cutoff is recent or augmented with RAG search retrieval."
      }
    }
  ];

  const activeQuery = sampleQueries[selectedQueryIdx];

  return (
    <section id="paradigm" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [SLIDE 12 // ARCHITECTURAL PARADIGM SHIFT]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            Paradigm Shift: GPT vs. Traditional Search
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-600">
            Contrast the fundamental divergence between deterministic document retrieval and statistical autoregressive neural synthesis.
          </p>
        </div>

        {/* Side-by-Side Comparison Table (Slide 12 Exact Specifications) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Traditional Search Engine (Retrieval-based) */}
          <div className="p-6 sm:p-8 rounded-xl border-2 border-slate-700 light:border-slate-300 bg-slate-900/60 light:bg-slate-50/80 backdrop-blur-md shadow-xl blueprint-corner space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 light:border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-100 light:text-slate-900">
                    Traditional Search Engine
                  </h3>
                  <span className="text-xs font-mono text-slate-400 light:text-slate-600">
                    (Retrieval-based Architecture)
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                INDEX & RANK
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {/* Mechanism */}
              <div className="p-4 rounded-lg bg-slate-950 light:bg-white border border-slate-800 light:border-slate-200">
                <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">
                  Mechanism (Slide 12):
                </span>
                <p className="text-slate-200 light:text-slate-800 font-sans text-sm">
                  Indexes and ranks existing web pages via web crawlers and inverted keyword indices.
                </p>
              </div>

              {/* Output */}
              <div className="p-4 rounded-lg bg-slate-950 light:bg-white border border-slate-800 light:border-slate-200">
                <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">
                  Output (Slide 12):
                </span>
                <p className="text-slate-200 light:text-slate-800 font-sans text-sm">
                  Provides hyperlinks, site snippets, and pointers to original external resources.
                </p>
              </div>

              {/* Best For */}
              <div className="p-4 rounded-lg bg-slate-950 light:bg-white border border-slate-800 light:border-slate-200">
                <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1">
                  Best For (Slide 12):
                </span>
                <p className="text-slate-200 light:text-slate-800 font-sans text-sm">
                  Locating original primary sources, downloading binaries, and verifying live real-time facts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: GPT Architecture (Generation-based) */}
          <div className="p-6 sm:p-8 rounded-xl border-2 border-cyan-400 bg-cyan-950/40 light:bg-cyan-50/80 backdrop-blur-md shadow-2xl blueprint-corner space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-cyan-500/20 text-cyan-400 light:bg-cyan-200 light:text-cyan-800">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-100 light:text-slate-900">
                    GPT Architecture
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 light:text-cyan-800">
                    (Generation-based Architecture)
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-900 text-cyan-300 text-[10px] font-mono">
                AUTOREGRESSIVE
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {/* Mechanism */}
              <div className="p-4 rounded-lg bg-slate-950 light:bg-white border border-cyan-500/30 light:border-slate-200">
                <span className="text-[10px] uppercase text-cyan-400 light:text-cyan-700 font-bold block mb-1">
                  Mechanism (Slide 12):
                </span>
                <p className="text-slate-200 light:text-slate-800 font-sans text-sm">
                  Predicts text conditioned on input context based on neural network training patterns.
                </p>
              </div>

              {/* Output */}
              <div className="p-4 rounded-lg bg-slate-950 light:bg-white border border-cyan-500/30 light:border-slate-200">
                <span className="text-[10px] uppercase text-cyan-400 light:text-cyan-700 font-bold block mb-1">
                  Output (Slide 12):
                </span>
                <p className="text-slate-200 light:text-slate-800 font-sans text-sm">
                  Synthesizes novel, customized textual answers, explanations, and formatted code.
                </p>
              </div>

              {/* Best For */}
              <div className="p-4 rounded-lg bg-slate-950 light:bg-white border border-cyan-500/30 light:border-slate-200">
                <span className="text-[10px] uppercase text-cyan-400 light:text-cyan-700 font-bold block mb-1">
                  Best For (Slide 12):
                </span>
                <p className="text-slate-200 light:text-slate-800 font-sans text-sm">
                  Drafting, explaining intricate concepts, summarising dense documents, and ideation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 12 Signature Epigram Banner */}
        <div className="p-6 rounded-xl border border-cyan-400/60 bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-cyan-950/80 light:from-cyan-100 light:to-blue-100 text-center shadow-xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-800 block mb-1">
            THE ARCHITECTURAL AXIOM (SLIDE 12)
          </span>
          <div className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-slate-100 light:text-slate-900 tracking-tight">
            "Search engines retrieve the past; <span className="text-cyan-400 light:text-cyan-800 underline decoration-cyan-400/40">GPT synthesizes the prompt.</span>"
          </div>
        </div>

        {/* Interactive Query Duel Simulator */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-cyan-500/30 bg-slate-950 light:bg-white shadow-2xl blueprint-corner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-500/20 mb-6 gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
                INTERACTIVE COMPARATOR // THE QUERY DUEL
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-100 light:text-slate-900">
                Live Query Response Comparison
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 light:text-slate-600">
              Select a real-world query to see how Search vs GPT handle it
            </span>
          </div>

          {/* Sample Query Selectors */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sfx.playClick(950);
                  setSelectedQueryIdx(idx);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  selectedQueryIdx === idx
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:bg-cyan-100 light:text-cyan-800 font-bold'
                    : 'border-slate-800 light:border-slate-300 text-slate-400 light:text-slate-600 hover:border-cyan-500/40'
                }`}
              >
                {q.type}
              </button>
            ))}
          </div>

          {/* Current Query Bar */}
          <div className="p-4 rounded-lg bg-slate-900 light:bg-slate-100 border border-cyan-500/30 mb-6 flex items-center gap-3">
            <Search className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-sm font-mono text-cyan-200 light:text-cyan-900 font-semibold">
              "{activeQuery.query}"
            </span>
          </div>

          {/* Side-by-Side Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            {/* Search Engine SERP Simulator */}
            <div className="p-4 rounded-lg bg-slate-900/80 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-3">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-bold flex items-center gap-1.5 text-slate-300 light:text-slate-700">
                  <Search className="w-3.5 h-3.5" />
                  Search Engine Results (SERP)
                </span>
                <span className="text-[10px]">Indexed URLs</span>
              </div>

              <div>
                <a href="#search" className="text-sky-400 hover:underline font-bold text-sm block">
                  {activeQuery.searchOutput.title}
                </a>
                <span className="text-emerald-400 text-[10px] block">
                  {activeQuery.searchOutput.url}
                </span>
                <p className="text-slate-300 light:text-slate-600 mt-1 font-sans text-xs leading-relaxed">
                  {activeQuery.searchOutput.snippet}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400 light:text-amber-700">
                {activeQuery.searchOutput.verdict}
              </div>
            </div>

            {/* GPT Synthesized Simulator */}
            <div className="p-4 rounded-lg bg-cyan-950/40 light:bg-cyan-50/50 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between text-cyan-400 pb-2 border-b border-cyan-500/30">
                <span className="font-bold flex items-center gap-1.5 text-cyan-300 light:text-cyan-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  GPT Synthesized Output
                </span>
                <span className="text-[10px] text-cyan-400">Direct Synthesis</span>
              </div>

              <pre className="text-slate-200 light:text-slate-800 font-mono whitespace-pre-wrap leading-relaxed max-h-[140px] overflow-y-auto">
                <code>{activeQuery.gptOutput.answer}</code>
              </pre>

              <div className="pt-2 border-t border-cyan-500/20 text-[11px] text-cyan-300 light:text-cyan-800">
                {activeQuery.gptOutput.verdict}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
