import React, { useState } from 'react';
import { 
  Square, 
  Circle, 
  Triangle, 
  Settings, 
  Eye, 
  ArrowRightCircle, 
  Target, 
  Scissors, 
  Sparkles, 
  Check, 
  HelpCircle,
  Copy,
  Info,
  DollarSign,
  Binary,
  RotateCw,
  BookOpen
} from 'lucide-react';
import { TECHNICAL_COMPONENTS } from '../data/presentationData';
import { sfx } from '../utils/audio';
import { FormattedMathText } from './MathView';

export const TechnicalComponents: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>('token');
  const [inputText, setInputText] = useState<string>('GPT generates text.');
  const [copied, setCopied] = useState(false);
  const [inspectTokenIdx, setInspectTokenIdx] = useState<number | null>(0);
  const [isFlashcardMode, setIsFlashcardMode] = useState<boolean>(false);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  const selectedComp = TECHNICAL_COMPONENTS.find(c => c.id === selectedCompId) || TECHNICAL_COMPONENTS[0];

  const handleSelectComp = (id: string) => {
    sfx.playClick(900);
    setSelectedCompId(id);
    setIsCardFlipped(false);
  };

  // Realistic subword tokenization approximation for educational playground
  const tokenizeText = (text: string) => {
    if (!text.trim()) return [];

    // Common words, punctuation and subwords regex pattern matching BPE style
    const tokens: { 
      text: string; 
      id: number; 
      colorIndex: number;
      bytes: string[];
      hex: string;
      length: number;
    }[] = [];
    const regex = /[A-Z]+(?![a-z])|[A-Z]?[a-z]+|[0-9]+|[^\s\w]|\s+/g;
    let match;
    let index = 0;

    while ((match = regex.exec(text)) !== null) {
      const piece = match[0];
      // Generate a deterministic hash for token ID
      let hash = 0;
      const bytes: string[] = [];
      for (let i = 0; i < piece.length; i++) {
        const code = piece.charCodeAt(i);
        hash = (hash << 5) - hash + code;
        hash |= 0;
        bytes.push('0x' + code.toString(16).toUpperCase().padStart(2, '0'));
      }
      tokens.push({
        text: piece,
        id: Math.abs(hash % 90000) + 10000,
        colorIndex: index % 6,
        bytes,
        hex: bytes.join(' '),
        length: piece.length
      });
      index++;
    }
    return tokens;
  };

  const tokenList = tokenizeText(inputText);
  const activeInspectedToken = inspectTokenIdx !== null && tokenList[inspectTokenIdx] 
    ? tokenList[inspectTokenIdx] 
    : tokenList[0] || null;

  const presets = [
    "GPT generates text.",
    "Attention Is All You Need (Vaswani et al., 2017)",
    "Artificial intelligence transforms modern science.",
    "def calc_average(nums): return sum(nums) / len(nums)",
    "Autoregressive generation predicts the next token."
  ];

  const tokenColors = [
    'bg-cyan-500/20 text-cyan-200 border-cyan-400 light:bg-cyan-100 light:text-cyan-800 light:border-cyan-500',
    'bg-indigo-500/20 text-indigo-200 border-indigo-400 light:bg-indigo-100 light:text-indigo-800 light:border-indigo-500',
    'bg-teal-500/20 text-teal-200 border-teal-400 light:bg-teal-100 light:text-teal-800 light:border-teal-500',
    'bg-sky-500/20 text-sky-200 border-sky-400 light:bg-sky-100 light:text-sky-800 light:border-sky-500',
    'bg-emerald-500/20 text-emerald-200 border-emerald-400 light:bg-emerald-100 light:text-emerald-800 light:border-emerald-500',
    'bg-blue-500/20 text-blue-200 border-blue-400 light:bg-blue-100 light:text-blue-800 light:border-blue-500'
  ];

  const getSymbolIcon = (id: string) => {
    switch (id) {
      case 'token': return <Square className="w-5 h-5 text-cyan-400" />;
      case 'embedding': return <Circle className="w-5 h-5 text-indigo-400" />;
      case 'parameter': return <Triangle className="w-5 h-5 text-sky-400" />;
      case 'context-window': return <Settings className="w-5 h-5 text-teal-400" />;
      case 'attention': return <Eye className="w-5 h-5 text-cyan-300" />;
      case 'inference': return <ArrowRightCircle className="w-5 h-5 text-blue-400" />;
      case 'fine-tuning': return <Target className="w-5 h-5 text-emerald-400" />;
      case 'tokenization': return <Scissors className="w-5 h-5 text-amber-400" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  // Pricing calculations ($2.50 per 1M input tokens for GPT-4o reference standard)
  const estimatedCost = ((tokenList.length / 1000000) * 2.50).toFixed(7);
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const tokenToWordRatio = wordCount > 0 ? (tokenList.length / wordCount).toFixed(2) : '0';

  return (
    <section id="components" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-cyan-500/20 mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
              [SLIDE 06 // SYSTEM TERMINOLOGY & PRIMITIVES]
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
              Core Technical Components
            </h2>
            <p className="mt-2 text-sm text-slate-300 light:text-slate-600 max-w-2xl">
              The eight fundamental mathematical and algorithmic building blocks that enable large language models to process, learn, and generate text.
            </p>
          </div>

          {/* Toggle Flashcard Mode vs Grid Inspector Mode */}
          <button
            onClick={() => {
              sfx.playClick(1000);
              setIsFlashcardMode(!isFlashcardMode);
              setIsCardFlipped(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all border ${
              isFlashcardMode
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-slate-900 light:bg-slate-100 text-slate-300 light:text-slate-800 border-slate-700 hover:border-cyan-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isFlashcardMode ? 'Exit Flashcard Mode' : 'Self-Study Flashcards Mode'}</span>
          </button>
        </div>

        {/* Conditional View: Flashcard Study Mode vs Slide 6 Grid */}
        {isFlashcardMode ? (
          <div className="max-w-2xl mx-auto mb-16">
            <div className="text-center mb-4 text-xs font-mono text-cyan-400">
              Click the card to flip between Symbol/Concept and Architectural Definition
            </div>

            <div
              onClick={() => {
                sfx.playClick(1100);
                setIsCardFlipped(!isCardFlipped);
              }}
              className="cursor-pointer min-h-[300px] p-8 rounded-2xl border-2 border-cyan-400 bg-slate-900/90 light:bg-white shadow-2xl flex flex-col justify-between relative transition-all transform hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span>COMPONENT 0{TECHNICAL_COMPONENTS.findIndex(c => c.id === selectedComp.id) + 1} OF 08</span>
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip Card</span>
                </span>
              </div>

              {!isCardFlipped ? (
                /* Card Front */
                <div className="text-center py-8 space-y-4">
                  <div className="text-4xl font-mono text-cyan-400 font-bold">
                    {selectedComp.symbol}
                  </div>
                  <h3 className="text-3xl font-display font-black text-slate-100 light:text-slate-900">
                    {selectedComp.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    What does this primitive do in a decoder transformer?
                  </p>
                </div>
              ) : (
                /* Card Back */
                <div className="py-4 space-y-4 animate-fadeIn">
                  <div className="text-sm font-semibold text-cyan-300 light:text-cyan-800">
                    {selectedComp.definition}
                  </div>
                  <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed">
                    {selectedComp.extendedExplanation}
                  </p>
                  <div className="p-3 rounded bg-slate-950 light:bg-slate-100 text-[11px] font-mono text-slate-300 light:text-slate-700 border border-slate-800">
                    <strong>Analogy:</strong> {selectedComp.analogousConcept}
                  </div>
                </div>
              )}

              {/* Selector Pills in Flashcard Mode */}
              <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t border-slate-800">
                {TECHNICAL_COMPONENTS.map((c) => (
                  <button
                    key={c.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectComp(c.id);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      selectedComp.id === c.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 light:bg-slate-200 text-slate-400 hover:text-cyan-300'
                    }`}
                  >
                    {c.symbol} {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Standard 8-Card Grid matching Slide 6 */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {TECHNICAL_COMPONENTS.map((comp) => {
              const isSelected = comp.id === selectedCompId;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelectComp(comp.id)}
                  className={`p-4 rounded-xl text-left border-2 transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/60 light:bg-cyan-50 light:border-cyan-600 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-[1.02]'
                      : 'border-cyan-500/20 bg-slate-950/60 light:bg-white light:border-slate-300 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1 rounded bg-slate-900/80 light:bg-slate-100 border border-cyan-500/30">
                        {getSymbolIcon(comp.id)}
                      </div>
                      <span className="font-mono text-sm text-cyan-400 font-bold">{comp.symbol}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-100 light:text-slate-900">
                      {comp.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 light:text-slate-600 line-clamp-3 leading-relaxed">
                      {comp.definition}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                      {isSelected ? 'SELECTED' : 'Inspect'}
                    </span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Component Deep Dive Inspector */}
        {!isFlashcardMode && (
          <div className="p-6 rounded-xl border border-cyan-500/40 bg-slate-900/70 light:bg-slate-50 light:border-slate-300 mb-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
                    COMPONENT SPEC // {selectedComp.name.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px] font-mono text-cyan-300">
                    Symbol: {selectedComp.symbol}
                  </span>
                </div>
                <h4 className="text-xl font-display font-bold text-slate-100 light:text-slate-900">
                  <FormattedMathText text={selectedComp.definition} />
                </h4>
                <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
                  <FormattedMathText text={selectedComp.extendedExplanation} />
                </p>
                <div className="p-3 rounded bg-slate-950/80 light:bg-white border border-cyan-500/20 text-xs font-mono text-cyan-200 light:text-cyan-900">
                  <strong className="text-cyan-400 light:text-cyan-700">Real-World Analogy: </strong>
                  <FormattedMathText text={selectedComp.analogousConcept} />
                </div>
              </div>

              <div className="md:col-span-4 p-4 rounded-lg border border-slate-800 light:border-slate-300 bg-slate-950 light:bg-slate-100 text-xs font-mono">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Concrete Architectural Example</div>
                <div className="p-3 rounded bg-slate-900 light:bg-white text-slate-200 light:text-slate-800 border border-slate-800 light:border-slate-200 break-words leading-relaxed">
                  {selectedComp.example}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Tokenizer Sandbox (Slide 6 Visual Example) */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-cyan-500/40 bg-slate-950 light:bg-white shadow-2xl blueprint-corner">
          {/* Blueprint Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-500/30 mb-6 gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
                [SLIDE 06 BOTTOM PANEL // INTERACTIVE DEMONSTRATOR]
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-100 light:text-slate-900">
                Visual Example: Real-Time Tokenization Sandbox
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 light:text-slate-600">
              Byte-Pair Encoding (BPE) Subword Parser
            </span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="mb-4">
            <span className="text-xs font-mono text-slate-400 light:text-slate-600 block mb-2">
              Select Sample Input String:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sfx.playClick(1000);
                    setInputText(preset);
                    setInspectTokenIdx(0);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
                    inputText === preset
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:bg-cyan-100 light:text-cyan-800'
                      : 'border-slate-800 light:border-slate-300 text-slate-400 light:text-slate-600 hover:border-cyan-500/50 hover:text-cyan-300'
                  }`}
                >
                  {preset.length > 32 ? preset.slice(0, 30) + '...' : preset}
                </button>
              ))}
            </div>
          </div>

          {/* User Input Text Area */}
          <div className="mb-6">
            <label className="block text-xs font-mono text-slate-400 light:text-slate-600 mb-1">
              Input String (Editable):
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setInspectTokenIdx(0);
              }}
              placeholder="Type any sentence to see real-time token segmentation..."
              className="w-full px-4 py-3 rounded-lg bg-slate-900 light:bg-slate-50 border border-cyan-500/30 light:border-slate-300 text-slate-100 light:text-slate-900 font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Output Tokens Display (The Box from Slide 6) */}
          <div className="p-5 rounded-lg border border-cyan-500/30 bg-slate-900/80 light:bg-cyan-50/50">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-cyan-400 light:text-cyan-700 font-bold uppercase tracking-wider">
                Output Tokens Breakdown (Click any token to inspect bytes):
              </span>
              <div className="flex items-center gap-3 text-slate-400 light:text-slate-600">
                <span>Tokens: <strong className="text-cyan-300 light:text-cyan-800">{tokenList.length}</strong></span>
                <span>Characters: <strong className="text-slate-200 light:text-slate-800">{inputText.length}</strong></span>
                <span>Ratio: <strong className="text-slate-200 light:text-slate-800">{tokenToWordRatio} tok/word</strong></span>
              </div>
            </div>

            {/* Token Chips Array */}
            <div className="flex flex-wrap gap-2 min-h-[60px] items-center p-3 rounded bg-slate-950/80 light:bg-white border border-slate-800 light:border-slate-200">
              {tokenList.length === 0 ? (
                <span className="text-slate-500 italic text-xs font-mono">No text entered.</span>
              ) : (
                tokenList.map((token, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sfx.playClick(900);
                      setInspectTokenIdx(idx);
                    }}
                    className={`px-3 py-1.5 rounded border text-xs font-mono font-bold flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm ${
                      inspectTokenIdx === idx ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-slate-950 scale-105' : ''
                    } ${tokenColors[token.colorIndex]}`}
                  >
                    <span>[{token.text === ' ' ? '␣' : token.text}]</span>
                    <span className="text-[9px] opacity-70 font-normal">#{token.id}</span>
                  </button>
                ))
              )}
            </div>

            {/* Token Byte & Hex Inspector Panel */}
            {activeInspectedToken && (
              <div className="mt-4 p-4 rounded-lg bg-slate-950 light:bg-white border border-cyan-500/20 text-xs font-mono grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <Binary className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">UTF-8 Hex Bytes:</span>
                    <span className="text-cyan-300 light:text-cyan-800 font-bold">{activeInspectedToken.hex}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Character Byte Width:</span>
                  <span className="text-slate-200 light:text-slate-800">{activeInspectedToken.length} bytes ({activeInspectedToken.length * 8} bits)</span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Estimated API Cost:</span>
                    <span className="text-emerald-400 light:text-emerald-700 font-bold">${estimatedCost}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Exact Slide 6 Visual Note */}
            <div className="mt-4 text-xs font-mono text-slate-400 light:text-slate-600 flex items-center justify-between">
              <span>
                Slide 6 Exact Spec: Input String: <em>"GPT generates text."</em> → Output Tokens: <strong className="text-cyan-400 light:text-cyan-700">[GPT] [generates] [text] [.]</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
