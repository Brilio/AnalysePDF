export type RegexPatterns = {
  [category: string]: {
    [pattern: string]: string;
  };
};

export interface Pattern {
  id: string;
  name: string;
  description?: string;
  confidence: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  data: Record<string, any>;
  regexPatterns: RegexPatterns;
}

export interface PatternFormData {
  name: string;
  description: string;
  regexPatterns: RegexPatterns;
} 