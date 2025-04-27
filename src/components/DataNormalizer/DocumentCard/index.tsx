import React from 'react';
import { NormalizedData, ExtractedData } from '../../../types';
import { DocumentHeader } from './DocumentHeader';
import { DocumentFields } from './DocumentFields';
import { PatternList } from '../PatternList';

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
      <DocumentHeader
        index={index}
        source={item.source}
        validated={item.validated}
        isExpanded={isExpanded}
        onValidation={() => onValidation(item.id)}
        onToggleExpand={() => onToggleExpand(item.id)}
      />
      
      <div className="p-4">
        <DocumentFields
          data={item.data}
          onDataChange={(field, value) => onDataChange(item.id, field, value)}
        />
        
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