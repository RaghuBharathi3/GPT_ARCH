import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Grid, 
  Menu, 
  X, 
  BookOpen, 
  Cpu, 
  Compass
} from 'lucide-react';
import { Theme } from '../types';
import { sfx } from '../utils/audio';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  showGrid: boolean;
  setShowGrid: (val: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenSearch: () => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  showGrid,
  setShowGrid,
  soundEnabled,
  setSoundEnabled,
  onOpenSearch,
  onOpenGlossary,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Track active section
      const sections = [
        'hero',
        'capabilities',
        'pillars',
        'architecture',
        'components',
        'workflow',
        'evolution',
        'pipeline',
        'applications',
        'strengths',
        'paradigm',
        'future',
        'quiz',
        'references'
      ];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sfx.playClick(900);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { id: 'capabilities', label: 'Overview' },
    { id: 'pillars', label: '3 Pillars' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'components', label: 'Tokenizer' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'evolution', label: 'Evolution' },
    { id: 'pipeline', label: 'Training' },
    { id: 'applications', label: 'Applications' },
    { id: 'strengths', label: 'Strengths & Limits' },
    { id: 'paradigm', label: 'Search vs GPT' },
    { id: 'future', label: 'Trajectory' },
    { id: 'quiz', label: 'Assessment' },
    { id: 'references', label: 'References' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 dark:bg-slate-950/90 light:bg-slate-50/90 backdrop-blur-md border-b border-cyan-500/20 light:border-cyan-700/20 transition-colors">
      {/* Top Reading Progress Bar with Millimeter Blueprint Calipers */}
      <div className="relative w-full h-1 bg-slate-800/50 light:bg-slate-200">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-400 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(0,240,255,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
        {/* Subtle caliper tick marks */}
        <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none flex justify-between px-2 opacity-30 text-[6px] font-mono select-none">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo / Blueprint Spec Code */}
        <div 
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="relative p-1.5 rounded border border-cyan-500/40 bg-cyan-950/30 text-cyan-400 light:border-cyan-700/40 light:bg-cyan-100 light:text-cyan-800 group-hover:border-cyan-400 transition-colors">
            <Compass className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-display text-sm font-bold tracking-wider text-slate-100 light:text-slate-900">
              <span>GPT</span>
              <span className="text-cyan-400 light:text-cyan-600">//</span>
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-300 light:text-cyan-700">SPEC_BLUEPRINT</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 light:text-slate-600 tracking-tight">
              DECODER-TRANSFORMER LAB v4.2
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-mono">
          {navLinks.slice(0, 8).map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeSection === link.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 light:bg-cyan-100 light:text-cyan-800 light:border-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-cyan-300 light:text-slate-600 light:hover:text-cyan-700'
              }`}
            >
              {link.label}
            </button>
          ))}
          {/* Dropdown / Overflow */}
          <div className="relative group">
            <button className="px-2 py-1 rounded text-slate-400 hover:text-cyan-300 light:text-slate-600 light:hover:text-cyan-700 flex items-center gap-1">
              <span>More</span>
              <span className="text-[9px]">▼</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col w-44 bg-slate-900/95 light:bg-white border border-cyan-500/30 light:border-slate-300 rounded shadow-xl py-1 backdrop-blur-md z-50">
              {navLinks.slice(8).map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-3 py-1.5 text-left text-xs font-mono text-slate-300 light:text-slate-700 hover:bg-cyan-500/20 hover:text-cyan-300 light:hover:bg-cyan-50"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Action Controls: Search, Glossary, Grid, Audio, Theme */}
        <div className="flex items-center gap-1.5">
          {/* Quick Search */}
          <button
            onClick={() => {
              sfx.playClick(1000);
              onOpenSearch();
            }}
            title="Search Blueprint (Ctrl+K)"
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono rounded border border-cyan-500/30 bg-slate-900/60 light:bg-slate-100 light:border-slate-300 text-slate-300 light:text-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.2 bg-slate-800 light:bg-slate-200 border border-slate-700 light:border-slate-300 rounded text-[9px] text-slate-400 light:text-slate-600">
              ⌘K
            </kbd>
          </button>

          {/* Glossary Button */}
          <button
            onClick={() => {
              sfx.playClick(900);
              onOpenGlossary();
            }}
            title="Open Technical Glossary"
            className="p-1.5 rounded border border-slate-700/60 light:border-slate-300 hover:border-cyan-400 text-slate-300 light:text-slate-700 hover:text-cyan-300 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Grid Toggle */}
          <button
            onClick={() => {
              sfx.playClick(750);
              setShowGrid(prev => !prev);
            }}
            title={showGrid ? "Hide Blueprint Drafting Grid" : "Show Blueprint Drafting Grid"}
            className={`p-1.5 rounded border transition-colors ${
              showGrid
                ? 'border-cyan-500 bg-cyan-950/40 text-cyan-400 light:bg-cyan-100 light:text-cyan-800'
                : 'border-slate-700/60 light:border-slate-300 text-slate-400 light:text-slate-600'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const nextState = !soundEnabled;
              setSoundEnabled(nextState);
              sfx.enabled = nextState;
              if (nextState) sfx.playSuccess();
            }}
            title={soundEnabled ? "Mute Interface Audio Ticks" : "Enable Precision Sound Feedback"}
            className={`p-1.5 rounded border transition-colors ${
              soundEnabled
                ? 'border-teal-500 bg-teal-950/40 text-teal-400 light:bg-teal-100 light:text-teal-800'
                : 'border-slate-700/60 light:border-slate-300 text-slate-400 light:text-slate-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sfx.playClick(600);
              toggleTheme();
            }}
            title={theme === 'dark' ? "Switch to Architectural Daylight Mode" : "Switch to Midnight Engineering Mode"}
            className="p-1.5 rounded border border-slate-700/60 light:border-slate-300 text-slate-300 light:text-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-700" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              sfx.playClick(850);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden p-1.5 rounded border border-slate-700/60 light:border-slate-300 text-slate-300 light:text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-cyan-500/20 bg-slate-950/95 light:bg-white px-4 py-3 space-y-1">
          <div className="text-[11px] font-mono text-cyan-400 light:text-cyan-700 uppercase tracking-widest px-2 py-1">
            Table of Contents
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs font-mono">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-3 py-1.5 rounded hover:bg-cyan-500/20 text-slate-300 light:text-slate-800 hover:text-cyan-300"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
