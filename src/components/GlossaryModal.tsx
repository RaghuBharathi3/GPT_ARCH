import React, { useState } from 'react';
import { X, Search, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/presentationData';
import { sfx } from '../utils/audio';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Architecture', 'Training', 'Inference', 'Safety', 'General'];

  const filteredItems = GLOSSARY_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl border-2 border-cyan-500/40 bg-slate-950 light:bg-white text-slate-100 light:text-slate-900 shadow-2xl blueprint-corner overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-cyan-950/60 light:bg-cyan-100 text-cyan-400 light:text-cyan-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-100 light:text-slate-900">
                Technical Blueprint Glossary
              </h3>
              <span className="text-xs font-mono text-cyan-400 light:text-cyan-700">
                20+ Transformer & AI Terms
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.playClick(600);
              onClose();
            }}
            className="p-1.5 rounded border border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 border-b border-slate-800 light:border-slate-200 bg-slate-900/50 light:bg-slate-50 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search terminology, concepts, formulas..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 light:bg-white border border-cyan-500/30 text-xs font-mono text-slate-100 light:text-slate-900 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sfx.playClick(850);
                  setSelectedCategory(cat);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                  selectedCategory === cat
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:bg-cyan-100 light:text-cyan-800 font-bold'
                    : 'border-slate-800 light:border-slate-300 text-slate-400 hover:text-cyan-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              No matching terminology found.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-slate-800 light:border-slate-200 bg-slate-900/60 light:bg-slate-50 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-cyan-300 light:text-cyan-800">
                    {item.term}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 light:bg-slate-200 text-slate-400 light:text-slate-700">
                      {item.relatedSlide}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 light:bg-cyan-100 text-cyan-400 light:text-cyan-800 border border-cyan-800/40">
                      {item.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 light:text-slate-700 leading-relaxed font-sans">
                  {item.definition}
                </p>

                {item.example && (
                  <div className="text-[11px] font-mono text-slate-400 light:text-slate-600 pt-1">
                    <span className="text-cyan-400 light:text-cyan-700 font-semibold">Example: </span>
                    {item.example}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
