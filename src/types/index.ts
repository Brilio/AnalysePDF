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

export interface Pattern {
  id: string;
  name: string;
  confidence: number;
  data: Record<string, string | number>;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  regexPatterns?: Record<string, string>;
}

export interface PatternFormData {
  name: string;
  description: string;
  regexPatterns: Record<string, string>;
}

export type WorkflowStep = 'upload' | 'analyze' | 'normalize' | 'export' | 'settings';