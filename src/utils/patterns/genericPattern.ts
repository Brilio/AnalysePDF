import { Pattern } from '../../types';

export const createGenericPattern = (text: string): Pattern => {
  const dateMatches = text.match(/\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4}/g) || [];
  const numberMatches = text.match(/\b\d{4,}\b/g) || [];
  
  return {
    id: `pattern-generic-${Date.now()}`,
    name: 'Document Générique',
    confidence: 0.5,
    data: {
      type: 'Document',
      reference: numberMatches.length > 0 ? numberMatches[0] : '',
      date: dateMatches.length > 0 ? dateMatches[0] : '',
      content: text.substring(0, 100) + '...'
    }
  };
};