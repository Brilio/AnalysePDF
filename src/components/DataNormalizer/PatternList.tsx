import React from 'react';
import { Clipboard } from 'lucide-react';
import { Pattern } from '../../types';

interface PatternListProps {
  patterns: Pattern[];
  onPatternSelect: (pattern: Pattern) => void;
}

export const PatternList: React.FC<PatternListProps> = ({
  patterns,
  onPatternSelect
}) => {
  return (
    <div className="mt-4 pt-4 border-t">
      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
        <Clipboard className="w-4 h-4 mr-1" />
        Modèles détectés
      </h4>
      
      <div className="space-y-2">
        {patterns.map((pattern) => (
          <div 
            key={pattern.id}
            className="text-sm p-3 rounded bg-gray-50 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{pattern.name}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {Math.round(pattern.confidence * 100)}% confiance
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              {Object.entries(pattern.data).map(([key, val]) => (
                <div key={key} className="flex">
                  <span className="font-medium mr-1">{key}:</span>
                  <span className="truncate">{val.toString()}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onPatternSelect(pattern)}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Utiliser ce modèle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};