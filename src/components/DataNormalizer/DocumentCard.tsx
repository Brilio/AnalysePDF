import React from 'react';
import { Check, ChevronDown, ChevronUp, Clipboard } from 'lucide-react';
import { NormalizedData, ExtractedData } from '../../types';
import { PatternList } from './PatternList';

interface DocumentCardProps {
  item: NormalizedData;
  sourceData?: ExtractedData;
  index: number;
  isExpanded: boolean;
  onDataChange: (docId: string, field: string, value: string) => void;
  onValidation: (docId: string) => void;
  onToggleExpand: (docId: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  item,
  sourceData,
  index,
  isExpanded,
  onDataChange,
  onValidation,
  onToggleExpand
}) => {
  return (
    <div className={`border rounded-lg overflow-hidden ${
      item.validated ? 'border-green-300 bg-green-50' : 'border-gray-300'
    }`}>
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <div className="flex items-center">
          <span className="font-medium text-gray-800 mr-2">
            Document {index + 1}:
          </span>
          <span className="text-gray-600 text-sm truncate max-w-[200px]">
            {item.source}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onValidation(item.id)}
            className={`p-2 rounded-full transition-colors ${
              item.validated 
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={item.validated ? 'Validé' : 'Valider'}
          >
            <Check className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onToggleExpand(item.id)}
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
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(item.data).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                value={value as string}
                onChange={(e) => onDataChange(item.id, key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
        
        {isExpanded && sourceData?.patterns && sourceData.patterns.length > 0 && (
          <PatternList 
            patterns={sourceData.patterns}
            onPatternSelect={(pattern) => {
              Object.entries(pattern.data).forEach(([key, value]) => {
                onDataChange(item.id, key, value.toString());
              });
            }}
          />
        )}
      </div>
    </div>
  );
};