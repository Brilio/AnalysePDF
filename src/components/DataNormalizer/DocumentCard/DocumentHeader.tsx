import React from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface DocumentHeaderProps {
  index: number;
  source: string;
  validated: boolean;
  isExpanded: boolean;
  onValidation: () => void;
  onToggleExpand: () => void;
}

export const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  index,
  source,
  validated,
  isExpanded,
  onValidation,
  onToggleExpand
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50">
      <div className="flex items-center">
        <span className="font-medium text-gray-800 mr-2">
          Document {index + 1}:
        </span>
        <span className="text-gray-600 text-sm truncate max-w-[200px]">
          {source}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onValidation}
          className={`p-2 rounded-full transition-colors ${
            validated 
              ? 'bg-green-100 text-green-600 hover:bg-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={validated ? 'Validé' : 'Valider'}
        >
          <Check className="w-5 h-5" />
        </button>
        
        <button
          onClick={onToggleExpand}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title={isExpanded ? 'Réduire' : 'Étendre'}
        >
          {isExpanded 
            ? <ChevronUp className="w-5 h-5" /> 
            : <ChevronDown className="w-5 h-5" />
          }
        </button>
      </div>
    </div>
  );
};