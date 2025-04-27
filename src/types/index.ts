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
  regexPatterns?: Record<string, string | RegExp>;
}

export interface Pattern extends PatternFormData {
  id: string;
  confidence: number;
  data: Record<string, string | number>;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type WorkflowStep = 'upload' | 'analyze' | 'normalize' | 'export' | 'settings';