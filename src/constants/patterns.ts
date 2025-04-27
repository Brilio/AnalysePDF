import { RegexPatterns } from '../types';

export const DEFAULT_REGEX_PATTERNS: RegexPatterns = {
    "Invoice Information": {
      "Invoice Number": "(?:facture|invoice|num[eé]ro|bill)[^\\d]*(\\d+)",
      "Invoice Date": "(?:date|issued on)[^\\d]*(\\d{1,2}[\\/\\.\\-]\\d{1,2}[\\/\\.\\-]\\d{2,4})",
      "Due Date": "(?:due date|payment due|[eé]ch[eé]ance)[^\\d]*(\\d{1,2}[\\/\\.\\-]\\d{1,2}[\\/\\.\\-]\\d{2,4})",
      "Reference Number": "(?:reference|ref|r[eé]f[eé]rence)[^\\w]*([\\w\\s\\-]+)",
      "Order Number": "(?:order number|purchase order|po number|num[eé]ro de commande|num[eé]ro po)[^\\d]*(\\d+)"
    },
    
    "Financial Details": {
      "Amount": "(?:montant|amount|total|balance due)[^\\d]*(\\d+(?:[:,.]\\d+)?)",
      "Tax Amount": "(?:tax|vat|tva)[^\\d]*(\\d+(?:[:,.]\\d+)?)",
      "Subtotal": "(?:subtotal|net amount|sous-total)[^\\d]*(\\d+(?:[:,.]\\d+)?)",
      "Discount": "(?:discount|remise)[^\\d]*(\\d+(?:[:,.]\\d+)?)",
      "Currency": "(?:(?:currency|devise)[^A-Z]*)([A-Z]{3})"
    },
  
    "Client and Supplier Details": {
      "Client": "(?:client|customer|billed to)[^\\w]*([\\w\\s]+)(?:\\n|$)",
      "Supplier": "(?:supplier|vendor|fournisseur|issued by)[^\\w]*([\\w\\s]+)(?:\\n|$)",
      "Client Address": "(?:client address|billing address)[^\\w]*([\\w\\s,\\-\\n]+)",
      "Supplier Address": "(?:supplier address|vendor address)[^\\w]*([\\w\\s,\\-\\n]+)",
      "Shipping Address": "(?:shipping address|adresse de livraison)[^\\w]*([\\w\\s,\\-\\n]+)"
    },
  
    "Payment Information": {
      "Payment Terms": "(?:payment terms|terms|conditions de paiement)[^:\\n]*:?\\s*([\\w\\s%]+)",
      "Payment Method": "(?:payment method|method of payment|mode de paiement)[^\\w]*([\\w\\s]+)",
      "Bank Name": "(?:bank name|nom de la banque)[^\\w]*([\\w\\s]+)",
      "IBAN": "(?:iban)[^\\w]*([A-Z]{2}\\d{2}[A-Z0-9]{1,30})",
      "BIC/SWIFT": "(?:bic|swift)[^\\w]*([A-Z0-9]{8,11})",
      "Account Number": "(?:account number|num[eé]ro de compte)[^\\w]*(\\d+)"
    },
  
    "Product Details": {
      "Product Description": "(?:d[eé]signation produit\/service)[^\\n]*\\n([^\\n]+)",
      "Product Additional Info": "(?:d[eé]signation produit\/service)[^\\n]*\\n[^\\n]+\\n([^\\n]+)",
      "Service Period": "(?:service period|period covered)[^\\d]*(\\d{1,2}[\\/\\.\\-]\\d{1,2}[\\/\\.\\-]\\d{2,4})\\s*-\\s*(\\d{1,2}[\\/\\.\\-]\\d{1,2}[\\/\\.\\-]\\d{2,4})",
      "Quantity": "(?:quantit[eé] ou base de calcul)[^\\d]*(\\d+)",
      "Unit Price HT": "(?:prix unitaire HT)[^\\d]*(\\d{1,3}(?:[.,]\\d{1,2})?)",
      "TVA": "(?:tva)[^\\d]*(\\d+)",
      "Total HT": "(?:total HT)[^\\d]*(\\d{1,3}(?:[.,]\\d{1,2})?)"
    },
  
    "Contact Information": {
      "Contact Email": "(?:email|courriel|e-mail)[^\\w]*([\\w._%+-]+@[\\w.-]+\\.[a-zA-Z]{2,})",
      "Contact Phone": "(?:phone|t[eé]l[eé]phone|tel)[^\\d]*(\\+?\\d{1,4}[\\s.-]?\\(?\\d+\\)?[\\s.-]?\\d+[\\s.-]?\\d+)"
    },
  
    "Legal Information": {
      "VAT Number": "(?:vat number|num[eé]ro tva)[^\\w]*(\\w+)",
      "Company Registration Number": "(?:company registration|reg no)[^\\d]*(\\d+)",
      "SIRET/SIREN": "(?:siret|siren)[^\\d]*(\\d{9,14})",
      "Website": "(?:website)[^\\w]*(https?:\\/\\/[\\w\\.-]+)"
    },
  
    "Additional Information": {
      "Notes": "(?:notes|remarks|commentaires)[^\\w]*([\\w\\s,.]+)(?:\\n|$)",
      "Page Number": "(?:page)\\s*(\\d+)\\s*(?:of|sur)\\s*(\\d+)"
    }
  }; 