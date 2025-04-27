import { FileWithPreview, ExtractedData } from '../types';
import { extractTextFromPDF } from './pdf/extractText';
import { detectPatterns } from './patterns/patternDetector';

export const analyzePDF = async (
  file: FileWithPreview,
  progressCallback: (progress: number) => void
): Promise<ExtractedData> => {
  const text = await extractTextFromPDF(file, progressCallback);
  const patterns = detectPatterns(text);
  
  return {
    id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    patterns,
    rawText: text,
    processed: true,
    fileName: file.name
  };
};