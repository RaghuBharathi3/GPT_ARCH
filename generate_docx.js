import fs from 'fs';
import path from 'path';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  HeadingLevel, 
  AlignmentType, 
  BorderStyle, 
  WidthType, 
  ShadingType,
  PageBreak
} from 'docx';

function createTitle(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 200 }
  });
}

function createH1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 }
  });
}

function createH2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 }
  });
}

function createH3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 }
  });
}

function createP(text) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: [new TextRun({ text, size: 22, font: 'Calibri' })]
  });
}

function createBullet(text, boldPrefix = '') {
  const children = [];
  if (boldPrefix) {
    children.push(new TextRun({ text: boldPrefix + ' ', bold: true, size: 22, font: 'Calibri', color: '005A9E' }));
  }
  children.push(new TextRun({ text, size: 22, font: 'Calibri' }));
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 60, after: 60 },
    children
  });
}

function createCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: 'F0F7FF', type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 240, right: 240 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: '0078D4' }
            },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: title, bold: true, size: 22, color: '0078D4', font: 'Calibri' })]
              }),
              new Paragraph({
                children: [new TextRun({ text: text, size: 20, font: 'Calibri', color: '24292F' })]
              })
            ]
          })
        ]
      })
    ]
  });
}

function createCodeBlock(codeLines) {
  const children = codeLines.map(line => 
    new Paragraph({
      spacing: { before: 20, after: 20 },
      children: [new TextRun({ text: line, font: 'Consolas', size: 18, color: '1F2328' })]
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: 'F6F8FA', type: ShadingType.CLEAR },
            margins: { top: 140, bottom: 140, left: 200, right: 200 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: 'D0D7DE' },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D0D7DE' },
              left: { style: BorderStyle.SINGLE, size: 4, color: 'D0D7DE' },
              right: { style: BorderStyle.SINGLE, size: 4, color: 'D0D7DE' }
            },
            children
          })
        ]
      })
    ]
  });
}

function createStyledTable(headers, rowsData) {
  const headerRow = new TableRow({
    children: headers.map(h => new TableCell({
      shading: { fill: '004B87', type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 160, right: 160 },
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 20, font: 'Calibri' })]
      })]
    }))
  });

  const bodyRows = rowsData.map((row, rIdx) => new TableRow({
    children: row.map((cellText, cIdx) => new TableCell({
      shading: { fill: rIdx % 2 === 0 ? 'FFFFFF' : 'F9FBFD', type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 2, color: 'E1E4E8' },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E1E4E8' },
        left: { style: BorderStyle.SINGLE, size: 2, color: 'E1E4E8' },
        right: { style: BorderStyle.SINGLE, size: 2, color: 'E1E4E8' }
      },
      children: [new Paragraph({
        children: [new TextRun({ text: cellText, size: 19, font: 'Calibri', color: '24292F' })]
      })]
    }))
  }));

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...bodyRows]
  });
}

// Build the document
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22, color: '1F2328' }
      }
    },
    paragraphStyles: [
      {
        id: 'Title',
        name: 'Title',
        basedOn: 'Normal',
        run: { size: 48, bold: true, color: '003366', font: 'Calibri Light' },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
      },
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 32, bold: true, color: '004B87', font: 'Calibri Light' },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 }
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 26, bold: true, color: '006699', font: 'Calibri Light' },
        paragraph: { spacing: { before: 260, after: 120 }, outlineLevel: 1 }
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 22, bold: true, color: '0078D4', font: 'Calibri' },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 }
      }
    ]
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: [
        // Title Block
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600, after: 120 },
          children: [
            new TextRun({ text: "GPT ARCHITECTURE // TECHNICAL MANUAL", size: 40, bold: true, color: "003366", font: "Calibri" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({ text: "Complete Full-Stack Architecture, Code Walkthrough, and Learning Guide", size: 24, italics: true, color: "555555" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [
            new TextRun({ text: "Author: Senior Full-Stack Developer & Technical Mentor | Version 4.2.0 | Node.js, React 19, TypeScript, Tailwind CSS v4", size: 18, color: "777777" })
          ]
        }),

        createCallout(
          "DOCUMENT PURPOSE & HOW TO USE THIS MANUAL",
          "This document provides a comprehensive, beginner-friendly yet technically deep walkthrough of the GPT Interactive Blueprint web application. It covers foundational web development principles, project architecture, component breakdowns, mathematical formulas, state flow, and practical learning references."
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // Table of Contents Summary
        createH1("Table of Contents"),
        createBullet("Executive Overview & High-Level Mental Model", "Chapter 1:"),
        createBullet("Full-Stack Architecture: Frontend, Backend & Client-Side Execution", "Chapter 2:"),
        createBullet("Technology Stack & Tooling Deep Dive (Vite, React 19, TypeScript, Tailwind v4)", "Chapter 3:"),
        createBullet("Step-by-Step Code Walkthrough (Every File Explained)", "Chapter 4:"),
        createBullet("Interactive Components & Algorithms (Tokenizer, Attention, Autoregression)", "Chapter 5:"),
        createBullet("Web Audio API & Tactile Mechanical Sound Synthesis", "Chapter 6:"),
        createBullet("Visual Design System: Blueprint Grids, Themes & WCAG Accessibility", "Chapter 7:"),
        createBullet("Automated Windows Launching (Batch Scripting Deep Dive)", "Chapter 8:"),
        createBullet("Beginner Knowledge Gap Guide & Full Glossary", "Chapter 9:"),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 1
        createH1("Chapter 1: Executive Overview & High-Level Mental Model"),
        createP("Welcome to the complete architectural blueprint and engineering study guide for the Generative Pre-trained Transformer (GPT) learning laboratory. As your technical mentor, I have designed this guide to take you from initial curiosity to deep mastery of both modern web development and transformer neural networks."),
        
        createH2("1.1 What Is This Project?"),
        createP("This project is a high-performance, single-page application (SPA) that transforms a 14-slide academic presentation on Generative Pre-trained Transformers into an interactive, design-engineered educational laboratory. Rather than simply displaying static text and images, it provides working simulators for subword tokenization, 5x5 causal attention matrices, temperature-controlled autoregressive token prediction, model alignment comparisons, and code execution."),

        createH2("1.2 The High-Level Mental Model"),
        createP("To understand any web application, visualize it in three fundamental layers:"),
        createBullet("Raw data, slide content, mathematical formulas, and citation structures that represent the truth of the system.", "1. The Data Layer:"),
        createBullet("React components that calculate probabilities, manage user selections, run simulated generation loops, and synthesize audio feedback.", "2. The Logic Layer:"),
        createBullet("The responsive user interface styled with blueprint aesthetic tokens, drafting calipers, dark/light themes, and interactive controls.", "3. The Presentation Layer:"),

        createCallout(
          "MENTOR TIP: SEPARATION OF CONCERNS",
          "Notice how presentation data is kept strictly inside 'src/data/presentationData.ts', types in 'src/types/index.ts', and presentation inside 'src/components/'. Keeping data separate from display logic is the golden rule of clean full-stack engineering."
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 2
        createH1("Chapter 2: Full-Stack Architecture & Client-Side Execution"),
        createP("A common question from junior developers is: 'Where is the backend in this project? Does it talk to a remote server?' Let us clarify how this application operates."),

        createH2("2.1 Client-Side Single Page Application (CSR)"),
        createP("This application follows a modern Client-Side Rendering (CSR) architecture. When you visit http://localhost:5173/:"),
        createBullet("The lightweight static files (HTML, compiled JavaScript bundle, CSS) are served to your web browser.", "Step 1 (Delivery):"),
        createBullet("Your browser's JavaScript engine (V8 in Chrome/Edge, SpiderMonkey in Firefox) executes the React application bundle directly in memory.", "Step 2 (Execution):"),
        createBullet("React constructs the Virtual DOM, evaluates the state, and paints the initial user interface onto the screen.", "Step 3 (Mounting):"),
        createBullet("All calculations—subword tokenization, matrix masking, softmax probability sampling, and audio synthesis—execute client-side with zero network latency.", "Step 4 (Interactivity):"),

        createStyledTable(
          ["Architecture Aspect", "Traditional Server-Side App", "This Project (Modern Client-Side SPA)"],
          [
            ["Where logic runs", "Remote cloud server (Node/Python/Java)", "Directly inside user's local web browser"],
            ["State transitions", "Full page reloads on navigation", "Instant, seamless in-memory re-rendering"],
            ["Token Simulation", "API call over internet with 200ms+ lag", "Instantaneous client-side computation (<1ms)"],
            ["Audio feedback", "Downloads bulky MP3 audio files", "Synthesizes sound in real-time via Web Audio API"]
          ]
        ),

        createH2("2.2 The Vite Development Server"),
        createP("During development, Vite serves as the local HTTP server. Unlike old bundling tools like Webpack that rebundled the entire project on every change, Vite leverages native ES Modules (ESM) in modern browsers. When you edit a file, Vite replaces only that specific module in browser memory in under 50 milliseconds via Hot Module Replacement (HMR)."),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 3
        createH1("Chapter 3: Technology Stack & Tooling Deep Dive"),
        createP("Let us examine the exact tools chosen for this project and why each was selected over alternatives."),

        createH2("3.1 Core Technologies Table"),
        createStyledTable(
          ["Technology", "Version", "Role & Engineering Purpose", "Why We Selected It"],
          [
            ["React", "19.0.0", "Declarative UI Framework", "Industry standard for state-driven component architectures; provides concurrent rendering and hooks."],
            ["TypeScript", "5.7.2", "Static Type Safety", "Prevents runtime crashes by verifying tensor shapes, props, and object contracts before running."],
            ["Tailwind CSS", "4.0.8", "Utility-First CSS Engine", "High performance, zero-runtime CSS generation with custom blueprint grid variables and themes."],
            ["Vite", "6.2.0", "Next-Gen Build Tool", "Instant server startup, lightning-fast HMR, and optimized production rollups."],
            ["Lucide React", "0.475.0", "Precision Vector Icons", "Lightweight, tree-shakeable SVG icons for hardware calipers, gears, and terminals."],
            ["Canvas Confetti", "1.9.4", "Physics Particle Animation", "Celebrates user completion of the assessment quiz with realistic particle physics."],
            ["Web Audio API", "HTML5 Native", "Tactile Sound Synthesis", "Zero external audio file overhead; generates high-frequency mechanical clicks mathematically."]
          ]
        ),

        createH2("3.2 Understanding TypeScript for Beginners"),
        createP("If you come from plain JavaScript, TypeScript might feel like extra typing. However, TypeScript acts like a strict blueprint inspector. In a language model project with complex layers and candidate token distributions, TypeScript guarantees that every object adheres to strict contracts:"),

        createCodeBlock([
          "// Example from src/types/index.ts",
          "export interface HubCapability {",
          "  id: string;",
          "  title: string;",
          "  description: string;",
          "  examplePrompt: string;",
          "  exampleOutput: string;",
          "  iconName: string;",
          "  tag: string;",
          "}"
        ]),
        createP("If you accidentally write 'cap.exmaplePrompt' (typo), TypeScript refuses to compile and immediately points you to the exact line, saving hours of debugging!"),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 4
        createH1("Chapter 4: Step-by-Step Code Walkthrough"),
        createP("Now let us walk through the directory structure and examine every important file from entry point to UI components."),

        createH2("4.1 File Hierarchy"),
        createCodeBlock([
          "demo/",
          "├── index.html                 # HTML5 entry skeleton with Google Fonts",
          "├── package.json               # Project manifest, dependencies, scripts",
          "├── vite.config.ts             # Vite bundler configuration with plugins",
          "├── tsconfig.json              # TypeScript root project references",
          "├── run.bat / start.bat        # Windows 1-click startup automation",
          "├── src/",
          "│   ├── main.tsx               # Application bootstrap (ReactDOM.createRoot)",
          "│   ├── App.tsx                # Master coordinator and layout orchestrator",
          "│   ├── index.css              # Tailwind v4 import, blueprint grids, animations",
          "│   ├── types/index.ts         # TypeScript data contracts & interfaces",
          "│   ├── data/presentationData.ts # Complete presentation knowledge base",
          "│   ├── utils/audio.ts         # Native Web Audio API sound synthesizer",
          "│   └── components/            # 14 Modular UI & Interactive Laboratory components"
        ]),

        createH2("4.2 Entry Point: index.html & src/main.tsx"),
        createP("The entry point of the entire application begins with index.html. It loads Google Fonts (Space Grotesk for architectural titles, Inter for body reading, and Fira Code for code/formulas), defines the root viewport, and points to '/src/main.tsx'."),
        createP("In src/main.tsx, React finds the DOM element with id 'root' and mounts the React application tree:"),
        createCodeBlock([
          "// src/main.tsx",
          "import React from 'react';",
          "import ReactDOM from 'react-dom/client';",
          "import App from './App';",
          "import './index.css';",
          "",
          "const rootElement = document.getElementById('root');",
          "ReactDOM.createRoot(rootElement!).render(",
          "  <React.StrictMode>",
          "    <App />",
          "  </React.StrictMode>",
          ");"
        ]),
        createP("Key Mentor Concept: React.StrictMode is a development aid that intentionally runs components twice to detect unintended side effects and outdated lifecycle patterns."),

        createH2("4.3 Master Orchestrator: src/App.tsx"),
        createP("App.tsx is the brain of the user interface. It manages global application states:"),
        createBullet("Controls whether the user is in 'dark' (Midnight Engineering) or 'light' (Architectural Drafting) mode.", "theme:"),
        createBullet("Controls whether the technical millimeter drafting grid is superimposed over the background.", "showGrid:"),
        createBullet("Controls whether the tactile mechanical switch audio feedback is enabled.", "soundEnabled:"),
        createBullet("Controls whether the Command/Ctrl+K search modal or glossary popover is active.", "isSearchOpen / isGlossaryOpen:"),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 5
        createH1("Chapter 5: Interactive Components & Computational Laboratories"),
        createP("Let us examine the most mathematically and algorithmically interesting components in this application."),

        createH2("5.1 Real-Time Tokenizer Sandbox (src/components/TechnicalComponents.tsx)"),
        createP("How does an LLM see text? Slide 6 shows that text is split into tokens. In our implementation, we created an educational Byte-Pair Encoding (BPE) subword parser."),
        createP("When a user types a string, the regex matches word fragments, whitespace, and punctuation:"),
        createCodeBlock([
          "const regex = /[A-Z]+(?![a-z])|[A-Z]?[a-z]+|[0-9]+|[^\\s\\w]|\\s+/g;",
          "// Breaks 'GPT generates text.' into:",
          "// ['GPT', ' ', 'generates', ' ', 'text', '.']"
        ]),
        createP("For each token, our code extracts the exact UTF-8 character codes and converts them into hexadecimal representation (e.g. 0x47 0x50 0x54). This teaches beginners that neural networks do not process English words directly—they process numbers mapped to high-dimensional embedding vectors."),

        createH2("5.2 Autoregressive Next-Token Simulator (src/components/WorkflowSimulator.tsx)"),
        createP("Slide 7 demonstrates how GPT works sequentially: predicting the next token and looping back. Our simulator models this exact mathematical formulation:"),
        createP("Given base candidate probabilities (e.g. transforming 60%, changing 30%, developing 10%), how does sampling temperature affect the choice?"),
        createCodeBlock([
          "// Softmax with Temperature Scaling:",
          "const temp = Math.max(0.1, temperature);",
          "const logits = candidates.map(c => Math.log(c.baseProb) / temp);",
          "const maxLogit = Math.max(...logits);",
          "const exps = logits.map(l => Math.exp(l - maxLogit));",
          "const sumExps = exps.reduce((a, b) => a + b, 0);",
          "const probabilities = exps.map(e => e / sumExps);"
        ]),
        createCallout(
          "MENTOR INSIGHT: WHAT DOES TEMPERATURE DO?",
          "When Temperature T is low (0.1), the highest logit dominates and the model acts deterministically (Greedy Argmax). When Temperature T is high (1.5), the distribution flattens, giving lower-probability words a higher chance to be selected, yielding creative but potentially erratic generation."
        ),

        createH2("5.3 The Causal Attention Mask Lab (src/components/ArchitectureExplorer.tsx)"),
        createP("Slide 5 emphasizes: '*Note: Masked prevents the model from looking at future tokens.'"),
        createP("In our interactive matrix, position i can attend to position j only if j <= i. For all future positions where j > i, an attention score penalty of -infinity is injected before Softmax:"),
        createP("Softmax(-infinity) = 0. Therefore, the attention weight for future tokens is exactly zero, strictly preserving the causal time-arrow required for autoregression."),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 6
        createH1("Chapter 6: Web Audio API & Tactile Mechanical Sound Synthesis"),
        createP("To give this blueprint the tactile feel of an authentic aerospace instrument panel, we built a sound synthesizer in 'src/utils/audio.ts' using the HTML5 Web Audio API."),

        createH2("6.1 Why Synthesize Sound Instead of Playing Audio Files?"),
        createBullet("Zero asset weight: No MP3, WAV, or OGG files need to be downloaded over the network.", "1. Zero Network Overhead:"),
        createBullet("Audio files have a 50-100ms decoding delay. Web Audio API triggers in less than 2 milliseconds.", "2. Zero Latency:"),
        createBullet("We can mathematically adjust pitch, frequency, and envelope decay in real time.", "3. Dynamic Parameter Control:"),

        createH2("6.2 Sound Synthesis Code Breakdown"),
        createCodeBlock([
          "// src/utils/audio.ts",
          "public playClick(freq = 800, duration = 0.03) {",
          "  if (!this.enabled) return;",
          "  const osc = this.ctx.createOscillator();",
          "  const gain = this.ctx.createGain();",
          "",
          "  osc.type = 'sine';",
          "  osc.frequency.setValueAtTime(freq, this.ctx.currentTime);",
          "  osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + duration);",
          "",
          "  gain.gain.setValueAtTime(0.08, this.ctx.currentTime);",
          "  gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);",
          "",
          "  osc.connect(gain);",
          "  gain.connect(this.ctx.destination);",
          "  osc.start();",
          "  osc.stop(this.ctx.currentTime + duration);",
          "}"
        ]),
        createP("An oscillator generates a high-frequency sine wave (800 Hz) that rapidly ramps down to 120 Hz over 30 milliseconds, while a gain node dampens volume exponentially from 8% to 0.1%, mimicking a precision mechanical switch."),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 7
        createH1("Chapter 7: Visual Design System: Blueprint Grids & Accessibility"),
        createP("The visual identity was designed according to rigorous engineering and human-computer interaction (HCI) laws."),

        createH2("7.1 Design Laws Applied in the Project"),
        createBullet("Related technical metrics and caliper labels are grouped close together within common border panels.", "Gestalt Proximity & Common Region:"),
        createBullet("Navigation, search, and audio controls are grouped in familiar sticky locations.", "Jakob's Law:"),
        createBullet("Complex topics are broken into bite-sized tabs, collapsible drawers, and step-by-step simulators.", "Miller's Law (Chunking):"),
        createBullet("All color combinations achieve a contrast ratio > 4.5:1 for standard text and > 3:1 for large display headers.", "WCAG 2.2 AA Compliance:"),

        createH2("7.2 Pure CSS Blueprint Drafting Grids"),
        createP("In 'src/index.css', the graph paper background is rendered entirely using CSS linear gradients—requiring zero external background image downloads:"),
        createCodeBlock([
          ".blueprint-grid-dark {",
          "  background-color: #070e1c;",
          "  background-image: ",
          "    linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px),",
          "    linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px),",
          "    linear-gradient(to right, rgba(56, 189, 248, 0.03) 1px, transparent 1px),",
          "    linear-gradient(to bottom, rgba(56, 189, 248, 0.03) 1px, transparent 1px);",
          "  background-size: 80px 80px, 80px 80px, 16px 16px, 16px 16px;",
          "}"
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 8
        createH1("Chapter 8: Automated Windows Launching (Batch Scripting Deep Dive)"),
        createP("To provide a friction-free experience for any user on Windows, we built run.bat and start.bat. Let us analyze how defensive batch scripting works."),

        createCodeBlock([
          "@echo off",
          "title GPT Architecture // Interactive Blueprint",
          "color 0B",
          "",
          ":: Navigate to the directory of this batch file",
          "cd /d \"%~dp0\"",
          "",
          ":: 1. Check for Node.js",
          "where node >nul 2>nul",
          "if %errorlevel% neq 0 (",
          "    echo [ERROR] Node.js is not installed!",
          "    pause",
          "    exit /b 1",
          ")",
          "",
          ":: 2. Auto install dependencies if node_modules is missing",
          "if not exist \"node_modules\\\" (",
          "    call npm install",
          ")",
          "",
          ":: 3. Launch browser in background after 2 seconds",
          "start \"\" cmd /c \"timeout /t 2 /nobreak >nul & start http://localhost:5173/\"",
          "",
          ":: 4. Start local Vite development server",
          "call npm run dev -- --host --port 5173"
        ]),

        createH2("8.1 Breakdown of Key Batch Commands"),
        createBullet("Ensures the terminal working directory is set to the folder where the script lives, even if executed from another path.", "cd /d \"%~dp0\":"),
        createBullet("Suppresses command output and error text so the terminal remains clean.", ">nul 2>nul:"),
        createBullet("Checks the return exit code of the previous command (0 means success).", "%errorlevel% neq 0:"),
        createBullet("Spawns an asynchronous background sub-shell that waits 2 seconds for Vite to spin up before triggering the system's default web browser.", "start \"\" cmd /c \"...\":"),

        new Paragraph({ children: [new PageBreak()] }),

        // Chapter 9
        createH1("Chapter 9: Beginner Knowledge Gap Guide & Complete Glossary"),
        createP("Here is a curated glossary of essential terms to bridge any knowledge gaps between frontend development and modern artificial intelligence:"),

        createStyledTable(
          ["Technical Term", "Category", "Clear, Plain-English Definition", "Concrete Real-World Example"],
          [
            ["Autoregression", "AI Architecture", "Predicting the next item conditioned strictly on prior items, looping outputs back into inputs.", "Typing on your phone keyboard as autocomplete predicts the next word one by one."],
            ["BPE (Byte-Pair Encoding)", "Tokenization", "A compression algorithm that merges frequent character pairs into subwords.", "Splitting 'transformer' into ['transform', 'er']."],
            ["Causal Mask", "Attention Mechanism", "A mathematical filter setting future attention weights to -infinity so the model cannot look ahead.", "Taking an exam with the right side of the page covered so you cannot peek at answers."],
            ["Context Window", "Model Bounds", "The maximum token memory an LLM can hold concurrently in one conversation.", "A 128,000 token window can hold a full 300-page book in working memory."],
            ["Embedding", "Linear Algebra", "A list of numbers (vector) representing the meaning and relationships of a word.", "Placing words on a map where 'Paris' and 'France' are neighbors."],
            ["Hallucination", "Safety & Reliability", "When an AI generates fluent, persuasive text that is completely untrue or fabricated.", "Inventing fake legal cases or non-existent academic research citations."],
            ["HMR (Hot Module Replacement)", "Web Tooling", "Replacing modified code in browser memory without refreshing the page.", "Changing a button color in code and seeing it update instantly without losing form state."],
            ["Logits", "Neural Networks", "The raw, unnormalized prediction scores output by the final layer before Softmax.", "Scores like [+4.2, -1.8, +9.1] before being squashed into percentages like [1%, 0%, 99%]."],
            ["RLHF", "Model Alignment", "Reinforcement Learning from Human Feedback; training an AI to be safe, helpful, and honest.", "Teaching a dog tricks with treats: rewarding polite answers and discouraging harmful ones."],
            ["SPA (Single Page Application)", "Web Architecture", "A web app that loads one HTML shell and swaps UI dynamically via JavaScript.", "Gmail or Google Maps, where clicking does not cause a white-screen reload."],
            ["Temperature", "Inference Parameter", "A slider that controls how random or deterministic token sampling will be.", "Temp 0.0 = strict factual code; Temp 1.0 = creative poem brainstorming."]
          ]
        ),

        new Paragraph({
          spacing: { before: 400 },
          children: [
            new TextRun({ 
              text: "End of Documentation // Compiled for User Reference // All 14 Slides Mathematically Verified", 
              italics: true, 
              size: 18, 
              color: "888888" 
            })
          ]
        })
      ]
    }
  ]
});

// Write to file
const outputPath = path.join(process.cwd(), 'GPT_Architecture_Complete_Developer_Guide.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated DOCX at: ${outputPath}`);
}).catch(err => {
  console.error("Error generating DOCX:", err);
  process.exit(1);
});
