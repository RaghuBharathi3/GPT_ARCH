import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, BookOpen, Layers, Cpu, Compass } from 'lucide-react';
import { sfx } from '../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (sectionId: string) => void;
}

interface SearchEntry {
  title: string;
  category: string;
  snippet: string;
  targetId: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigateTo }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else sfx.playClick(1000);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const entries: SearchEntry[] = [
    { title: 'Generative Pre-trained Transformer Overview', category: 'Section', snippet: 'Foundation AI model family by OpenAI designed to generate human-like text.', targetId: 'hero' },
    { title: 'Core Capability Matrix (6 Hub & Spoke Axes)', category: 'Capabilities', snippet: 'Text Generation, Code Generation, Reasoning, Summarisation, Translation, QA.', targetId: 'capabilities' },
    { title: 'The Three Pillars: Generative, Pre-trained, Transformer', category: 'Theory', snippet: 'Autoregressive prediction, massive datasets, and self-attention mechanism.', targetId: 'pillars' },
    { title: 'Decoder-Only Transformer Architecture (5 Layers)', category: 'Architecture', snippet: 'Input Tokens, Token Embeddings + Positional Info, Masked Self-Attention, FFN, Output Layer.', targetId: 'architecture' },
    { title: 'Causal Masked Self-Attention Matrix', category: 'Mechanism', snippet: 'Prevents the model from looking ahead at future tokens during autoregression.', targetId: 'architecture' },
    { title: 'Core Technical Components & Tokenizer Sandbox', category: 'Interactive', snippet: 'Token, Embedding, Parameter, Context Window, Attention, Inference, Fine-Tuning, Tokenization.', targetId: 'components' },
    { title: 'End-to-End Workflow & Autoregressive Next-Token Predictor', category: 'Simulation', snippet: '7 stages: User Input, Tokenisation, Embedding, Transformer, Next-Token, Sequential Loop, Final Output.', targetId: 'workflow' },
    { title: 'Evolution Timeline (GPT-1 to GPT-4o & Frontier Reasoning)', category: 'History', snippet: 'From 117M parameters in 2018 to multimodal 128k context windows and o-series reasoning.', targetId: 'evolution' },
    { title: 'Important Distinction: GPT vs. ChatGPT', category: 'Distinction', snippet: 'GPT is the underlying model family; ChatGPT is the consumer product UI.', targetId: 'evolution' },
    { title: 'The 4-Stage Training Pipeline', category: 'Training', snippet: 'Pre-training, Supervised Fine-Tuning (SFT), Preference Optimisation (RLHF), Evaluation.', targetId: 'pipeline' },
    { title: 'Real-World Applications & Code Playground', category: 'Utility', snippet: 'Education, Software Dev, Healthcare, Banking, Business, Research with runnable Python scripts.', targetId: 'applications' },
    { title: 'Advantages & Strengths of GPT Architecture', category: 'Strengths', snippet: 'Natural language interaction, productivity multiplier, multilingual support, fast generation.', targetId: 'strengths' },
    { title: 'Limitations, Constraints & The Hallucination Problem', category: 'Safety', snippet: 'Epistemological bias, privacy, context limitations, and plausible fabrication mechanics.', targetId: 'strengths' },
    { title: 'Paradigm Shift: GPT vs. Traditional Search Engines', category: 'Comparison', snippet: 'Search engines retrieve the past; GPT synthesizes the prompt.', targetId: 'paradigm' },
    { title: 'Future Trajectory of Large Language Models', category: 'Future', snippet: 'Multimodality, Test-time reasoning, Verifiability, and Agentic autonomous tool integration.', targetId: 'future' },
    { title: 'Knowledge Verification Quiz & Certification', category: 'Assessment', snippet: '6 questions testing transformer understanding with instant feedback.', targetId: 'quiz' },
    { title: 'Academic References & Core Axioms', category: 'Citations', snippet: 'Vaswani et al. 2017, Radford et al. 2019, GPT-4 Technical Report, Hugging Face documentation.', targetId: 'references' }
  ];

  const results = entries.filter(e => 
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.snippet.toLowerCase().includes(query.toLowerCase()) ||
    e.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (targetId: string) => {
    sfx.playClick(900);
    onClose();
    onNavigateTo(targetId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-xl border-2 border-cyan-500/40 bg-slate-950 light:bg-white text-slate-100 light:text-slate-900 shadow-2xl blueprint-corner overflow-hidden">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-cyan-500/30 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all concepts, layers, formulas, slides... (Press Esc to exit)"
            autoFocus
            className="flex-1 bg-transparent border-none text-sm font-mono text-slate-100 light:text-slate-900 focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={() => { sfx.playClick(600); onClose(); }}
            className="p-1 rounded text-slate-400 hover:text-cyan-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1.5">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              No results found matching "{query}".
            </div>
          ) : (
            results.map((res, i) => (
              <button
                key={i}
                onClick={() => handleSelect(res.targetId)}
                className="w-full text-left p-3 rounded-lg hover:bg-cyan-500/10 light:hover:bg-cyan-50 transition-colors flex items-center justify-between group border border-transparent hover:border-cyan-500/30"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-slate-100 light:text-slate-900 group-hover:text-cyan-300">
                      {res.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 light:bg-slate-200 text-cyan-400 light:text-cyan-800">
                      {res.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 light:text-slate-600 line-clamp-1">
                    {res.snippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-900/60 light:bg-slate-100 border-t border-slate-800 light:border-slate-200 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Navigate with click • Quick jump to anchor</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
