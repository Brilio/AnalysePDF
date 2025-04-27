import { Pattern } from '../../types';

export const detectInvoicePattern = (text: string): Pattern | null => {
  if (!text.match(/facture|invoice|montant|amount|total/i)) {
    return null;
  }

  const invoiceNumberMatch = text.match(/(?:facture|invoice)[^\d]*(\d+)/i);
  const dateMatch = text.match(/date\s*:\s*(\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4})/i);
  const amountMatch = text.match(/(?:montant|amount|total)[^\d]*(\d+(?:[,.]\d+)?)/i);
  const clientMatch = text.match(/(?:client|customer)[^\w]*([\w\s]+)(?:\n|$)/i);
  
  return {
    id: `pattern-invoice-${Date.now()}`,
    name: 'Facture',
    confidence: 0.85,
    data: {
      type: 'Facture',
      invoiceNumber: invoiceNumberMatch ? invoiceNumberMatch[1] : '',
      date: dateMatch ? dateMatch[1] : '',
      amount: amountMatch ? amountMatch[1] : '',
      client: clientMatch ? clientMatch[1].trim() : ''
    }
  };
};