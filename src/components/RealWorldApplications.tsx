import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code2, 
  Stethoscope, 
  Building2, 
  Briefcase, 
  FlaskConical, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { APPLICATION_DOMAINS } from '../data/presentationData';
import { sfx } from '../utils/audio';

export const RealWorldApplications: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('software-dev');
  const [copied, setCopied] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const selectedDomain = APPLICATION_DOMAINS.find(d => d.id === selectedDomainId) || APPLICATION_DOMAINS[0];

  const handleSelectDomain = (id: string) => {
    sfx.playClick(900);
    setSelectedDomainId(id);
    setExecutionOutput(null);
  };

  const handleRunCode = () => {
    sfx.playBlip(1200);
    setIsRunning(true);
    setExecutionOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      sfx.playSuccess();
      if (selectedDomainId === 'software-dev') {
        setExecutionOutput(`>>> Executing Python 3.12 Runtime...\n>>> calc_average([10, 20, 30, 40, 50])\nSample: [10, 20, 30, 40, 50]\nCalculated Mean: 30.0\n[Process completed with exit code 0]`);
      } else if (selectedDomainId === 'healthcare') {
        setExecutionOutput(`>>> Medical Verification Passed.\n>>> Patient Checklist Formatted (Grade 6 Reading Level achieved).\n>>> 0 Contraindications detected.`);
      } else if (selectedDomainId === 'banking') {
        setExecutionOutput(`>>> Financial Ledger Parsed.\n>>> EBIT Margin YoY Growth: +3.00% (+300 bps).\n>>> Verified against GAAP ledger tables.`);
      } else {
        setExecutionOutput(`>>> Synthetic Execution Stream Completed.\n>>> Tokens generated: 142 | Latency: 184ms | Precision: High`);
      }
    }, 600);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    sfx.playClick(1100);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'education': return <GraduationCap className="w-5 h-5 text-cyan-400 light:text-cyan-700" />;
      case 'software-dev': return <Code2 className="w-5 h-5 text-indigo-400 light:text-indigo-700" />;
      case 'healthcare': return <Stethoscope className="w-5 h-5 text-rose-400 light:text-rose-700" />;
      case 'banking': return <Building2 className="w-5 h-5 text-emerald-400 light:text-emerald-700" />;
      case 'business': return <Briefcase className="w-5 h-5 text-amber-400 light:text-amber-700" />;
      case 'research': return <FlaskConical className="w-5 h-5 text-teal-400 light:text-teal-700" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400 light:text-cyan-700" />;
    }
  };

  return (
    <section id="applications" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [SLIDE 09 // PRODUCTION DEPLOYMENTS & UTILITY]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            REAL-WORLD APPLICATIONS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-600">
            How foundational autoregressive models deploy across core industry verticals to automate complex reasoning and knowledge synthesis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 6 Industry Domains (Slide 9 Grid) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/70 light:text-cyan-700 mb-2 border-b border-dashed border-cyan-500/20 pb-2">
              <span>VERTICALS: 6 SECTORS</span>
              <span>SELECT TO PREVIEW SANDBOX</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {APPLICATION_DOMAINS.map((domain) => {
                const isSelected = domain.id === selectedDomainId;
                return (
                  <button
                    key={domain.id}
                    onClick={() => handleSelectDomain(domain.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all border-2 flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/70 light:bg-cyan-50 light:border-cyan-600 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-[1.01]'
                        : 'border-cyan-500/20 bg-slate-950/60 light:bg-white light:border-slate-300 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-900 light:bg-slate-100 border border-cyan-500/20 shrink-0">
                      {getDomainIcon(domain.id)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm sm:text-base text-slate-100 light:text-slate-900">
                          {domain.name}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                      </div>
                      <p className="text-xs text-slate-300 light:text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {domain.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Terminal Sandbox (Slide 9 Code Terminal) */}
          <div className="lg:col-span-7 rounded-xl border-2 border-cyan-500/30 bg-slate-950 light:bg-slate-900 text-slate-100 shadow-2xl overflow-hidden font-mono text-xs blueprint-corner">
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-slate-900 light:bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-400 text-[11px]">
                  terminal // {selectedDomain.id}.{selectedDomain.language === 'python' ? 'py' : 'md'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(selectedDomain.codeOutput)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors text-[10px]"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold flex items-center gap-1.5 transition-colors text-[10px] disabled:opacity-50"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isRunning ? 'Running...' : 'Execute'}</span>
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-5 space-y-4">
              {/* Slide 9 Typo Correction Notice */}
              <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-800 text-[11px] text-cyan-300 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>
                  <strong>Editorial Note:</strong> Original PPT slide 9 typography typographical error <em>"GPT Outcupt"</em> has been automatically verified and corrected to <strong>"GPT Output"</strong>.
                </span>
              </div>

              {/* User Prompt */}
              <div>
                <span className="text-slate-500 uppercase tracking-widest text-[10px] block mb-1">
                  User Prompt:
                </span>
                <div className="p-3 rounded bg-slate-900 border border-slate-800 text-cyan-200 italic">
                  "{selectedDomain.prompt}"
                </div>
              </div>

              {/* GPT Output */}
              <div>
                <span className="text-slate-500 uppercase tracking-widest text-[10px] block mb-1">
                  GPT Output:
                </span>
                <pre className="p-4 rounded bg-slate-900/90 border border-cyan-500/20 text-slate-200 overflow-x-auto leading-relaxed max-h-[220px]">
                  <code>{selectedDomain.codeOutput}</code>
                </pre>
              </div>

              {/* Execution Console Output */}
              {executionOutput && (
                <div className="mt-4 p-3 rounded bg-black border border-emerald-500/40 text-emerald-400 font-mono text-[11px] whitespace-pre-wrap animate-fadeIn">
                  {executionOutput}
                </div>
              )}

              {/* Production Impact Metric */}
              <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-slate-400 text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Real-World Impact:</strong> {selectedDomain.impactMetrics}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
