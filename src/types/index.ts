export type RegexPatterns = {
  [category: string]: {
    [pattern: string]: string;
  };
};

export interface FileWithPreview extends File {
  preview: string;
}

export interface ExtractedData {
  id: string;
  patterns: Pattern[];
  rawText: string;
  processed: boolean;
  fileName: string;
}

export interface PatternFormData {
  name: string;
  description: string;
  regexPatterns?: RegexPatterns;
}

export interface Pattern {
  id: string;
  name: string;
  description: string;
  confidence: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  data: Record<string, any>;
}

export interface CreatePatternInput {
  name: string;
  description: string;
  confidence: number;
}

export type WorkflowStep = 'upload' | 'analyze' | 'normalize' | 'export' | 'settings';

export interface NormalizedData {
  id: string;
  fields: Record<string, string>;
  isValidated: boolean;
  source: string;
}