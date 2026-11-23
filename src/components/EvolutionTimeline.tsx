import React, { useState } from 'react';
import { 
  Calendar, 
  Cpu, 
  Maximize2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { TIMELINE_MILESTONES, CORE_DEFINITION } from '../data/presentationData';
import { sfx } from '../utils/audio';

export const EvolutionTimeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  const selectedMilestone = TIMELINE_MILESTONES.find(m => m.year === selectedYear) || TIMELINE_MILESTONES[5];

  const handleSelect = (year: string) => {
    sfx.playClick(900);
    setSelectedYear(year);
  };

  return (
    <section id="evolution" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [SLIDE 04 // HISTORICAL TRAJECTORY & SCALING]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            Evolution of GPT
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 light:text-slate-600">
            Tracing the exponential trajectory from proof-of-concept generative pre-training in 2018 to native multimodal reasoning architectures.
          </p>
        </div>

        {/* Slide 4 Timeline Track (Responsive horizontal scroll / interactive track) */}
        <div className="relative mb-12 p-6 rounded-xl border border-cyan-500/30 bg-slate-950/70 light:bg-slate-50/80 backdrop-blur-md shadow-2xl blueprint-corner overflow-x-auto">
          {/* Timeline Center Axis Line */}
          <div className="min-w-[700px] relative py-8">
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-cyan-600/50 light:bg-cyan-500/60 z-0" />

            <div className="relative z-10 flex items-center justify-between px-2">
              {TIMELINE_MILESTONES.map((milestone) => {
                const isSelected = milestone.year === selectedYear;
                return (
                  <button
                    key={milestone.year}
                    onClick={() => handleSelect(milestone.year)}
                    className="flex flex-col items-center group transition-transform focus:outline-none"
                  >
                    {/* Top Headline Tag */}
                    <div className="h-10 flex items-end justify-center mb-2">
                      <span className={`text-[10px] font-mono text-center max-w-[90px] line-clamp-2 transition-colors ${
                        isSelected ? 'text-cyan-300 light:text-cyan-800 font-bold' : 'text-slate-400 light:text-slate-500'
                      }`}>
                        {milestone.headline}
                      </span>
                    </div>

                    {/* Timeline Node Point */}
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.8)] scale-125'
                        : 'border-cyan-500/40 bg-slate-900 light:bg-white text-slate-400 group-hover:border-cyan-400 group-hover:scale-110'
                    }`}>
                      <span className="w-2.5 h-2.5 rounded-full bg-current" />
                    </div>

                    {/* Bottom Year & Model */}
                    <div className="mt-3 text-center">
                      <div className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-cyan-300 light:text-cyan-800' : 'text-slate-200 light:text-slate-700'
                      }`}>
                        {milestone.year}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 light:text-slate-600">
                        ({milestone.model})
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Milestone Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Detailed Milestone Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-cyan-500/40 bg-slate-900/80 light:bg-white text-slate-100 light:text-slate-900 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
                  {selectedMilestone.year}
                </span>
                <h3 className="text-2xl font-display font-extrabold text-slate-100 light:text-slate-900">
                  {selectedMilestone.model}
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 light:text-cyan-700 font-semibold">
                {selectedMilestone.headline}
              </span>
            </div>

            <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
              {selectedMilestone.description}
            </p>

            <div className="p-4 rounded-lg bg-slate-950/80 light:bg-cyan-50/50 border border-cyan-500/20 text-xs font-mono space-y-2">
              <div className="text-cyan-400 light:text-cyan-800 font-bold uppercase tracking-wider">
                Key Architectural Breakthrough:
              </div>
              <div className="text-slate-200 light:text-slate-800">
                {selectedMilestone.breakthrough}
              </div>
            </div>

            {selectedMilestone.paperRef && (
              <div className="text-xs font-mono text-slate-400 light:text-slate-600 flex items-center gap-2 pt-2">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reference: <em>{selectedMilestone.paperRef}</em></span>
              </div>
            )}
          </div>

          {/* Scale Comparison Telemetry */}
          <div className="lg:col-span-5 p-6 rounded-xl border border-cyan-500/30 bg-slate-950 light:bg-slate-50 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 light:text-cyan-700 uppercase tracking-widest pb-2 border-b border-cyan-500/20">
                Hardware & Scale Telemetry
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Parameters</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-cyan-300 light:text-cyan-800">
                    {selectedMilestone.parameters}
                  </div>
                </div>

                <div className="p-3.5 rounded bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                    <Maximize2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Context Window</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-teal-300 light:text-teal-800">
                    {selectedMilestone.contextWindow}
                  </div>
                </div>
              </div>

              {/* Relative Scale Bar */}
              <div className="p-3.5 rounded bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>Parameter Growth Order:</span>
                  <span className="text-cyan-400 font-bold">Exponential</span>
                </div>
                <div className="w-full h-2 rounded bg-slate-800 light:bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500"
                    style={{
                      width: 
                        selectedMilestone.year === '2018' ? '2%' :
                        selectedMilestone.year === '2019' ? '8%' :
                        selectedMilestone.year === '2020' ? '40%' :
                        selectedMilestone.year === '2022' ? '50%' :
                        selectedMilestone.year === '2023' ? '85%' :
                        selectedMilestone.year === '2024' ? '92%' : '100%'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-500 light:text-slate-600 mt-4 pt-3 border-t border-slate-800 light:border-slate-200">
              *Architectural scale governed by Kaplan & Chinchilla neural scaling laws.
            </div>
          </div>
        </div>

        {/* Slide 4 Crucial Distinction Banner (Exact Text from Slide 4) */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-cyan-400 bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-blue-950/80 light:from-cyan-50 light:to-blue-50 light:border-cyan-600 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 light:text-cyan-800 text-xs font-mono font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SLIDE 04 // CRITICAL TECHNICAL DISTINCTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-slate-100 light:text-slate-900">
                GPT vs. ChatGPT: Do Not Conflate Model & Product
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 font-mono text-xs">
            {/* Box 1: GPT */}
            <div className="p-4 rounded-lg border border-cyan-500/40 bg-slate-950/80 light:bg-white space-y-1.5">
              <div className="text-cyan-400 light:text-cyan-700 font-bold text-sm">
                GPT = The Underlying AI Model Family
              </div>
              <p className="text-slate-300 light:text-slate-700 leading-relaxed">
                {CORE_DEFINITION.criticalDistinction.gpt}
              </p>
            </div>

            {/* Box 2: ChatGPT */}
            <div className="p-4 rounded-lg border border-cyan-500/40 bg-slate-950/80 light:bg-white space-y-1.5">
              <div className="text-sky-400 light:text-sky-700 font-bold text-sm">
                ChatGPT = The Product and User Interface
              </div>
              <p className="text-slate-300 light:text-slate-700 leading-relaxed">
                {CORE_DEFINITION.criticalDistinction.chatgpt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
