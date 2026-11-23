export type Theme = 'dark' | 'light';

export interface HubCapability {
  id: string;
  title: string;
  description: string;
  examplePrompt: string;
  exampleOutput: string;
  iconName: string;
  tag: string;
}

export interface ArchitectureLayer {
  id: string;
  level: number;
  name: string;
  shortDesc: string;
  tensorShape: string;
  mathFormula?: string;
  fullExplanation: string;
  keyFunctions: string[];
  note?: string;
  color: string;
}

export interface TechnicalComponent {
  id: string;
  name: string;
  symbol: string;
  definition: string;
  extendedExplanation: string;
  analogousConcept: string;
  example: string;
  icon: string;
}

export interface TimelineMilestone {
  year: string;
  model: string;
  parameters: string;
  contextWindow: string;
  headline: string;
  description: string;
  breakthrough: string;
  paperRef?: string;
}

export interface PipelineStage {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  detailedProcess: string;
  dataSources: string;
  trainingObjective: string;
  costScale: string;
  icon: string;
}

export interface ApplicationDomain {
  id: string;
  name: string;
  summary: string;
  useCases: string[];
  prompt: string;
  codeOutput: string;
  language: string;
  impactMetrics: string;
}

export interface ComparisonDimension {
  dimension: string;
  traditionalSearch: {
    title: string;
    description: string;
    pros: string;
  };
  gptArchitecture: {
    title: string;
    description: string;
    pros: string;
  };
}

export interface FuturePillar {
  id: string;
  title: string;
  description: string;
  breakthroughTech: string;
  timeline: string;
  realWorldImpact: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Architecture' | 'Training' | 'Inference' | 'Safety' | 'General';
  definition: string;
  relatedSlide: string;
  example?: string;
}

export interface AcademicReference {
  id: string;
  title: string;
  authors: string;
  year: string;
  publication: string;
  significance: string;
  url: string;
  bibtex: string;
}
