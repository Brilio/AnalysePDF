import { Pattern } from '../../types';
import { detectInvoicePattern } from './invoicePattern';
import { detectContractPattern } from './contractPattern';
import { createGenericPattern } from './genericPattern';

export const detectPatterns = (text: string): Pattern[] => {
  const patterns: Pattern[] = [];
  
  const invoicePattern = detectInvoicePattern(text);
  if (invoicePattern) patterns.push(invoicePattern);
  
  const contractPattern = detectContractPattern(text);
  if (contractPattern) patterns.push(contractPattern);
  
  if (patterns.length === 0) {
    patterns.push(createGenericPattern(text));
  }
  
  return patterns;
};