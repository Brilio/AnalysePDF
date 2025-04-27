import { Pattern } from '../../types';

export const detectContractPattern = (text: string): Pattern | null => {
  if (!text.match(/contrat|contract|accord|agreement/i)) {
    return null;
  }

  const referenceMatch = text.match(/(?:référence|reference|n°)[^\d]*(\d+)/i);
  const dateMatch = text.match(/date\s*:\s*(\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4})/i);
  const partyMatch = text.match(/(?:partie|party)[^\w]*([\w\s]+)(?:\n|$)/i);
  
  return {
    id: `pattern-contract-${Date.now()}`,
    name: 'Contrat',
    confidence: 0.78,
    data: {
      type: 'Contrat',
      reference: referenceMatch ? referenceMatch[1] : '',
      date: dateMatch ? dateMatch[1] : '',
      party: partyMatch ? partyMatch[1].trim() : ''
    }
  };
};