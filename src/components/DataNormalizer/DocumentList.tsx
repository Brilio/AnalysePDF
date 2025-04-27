import React from 'react';
import { NormalizedData, ExtractedData } from '../../types';
import { DocumentCard } from './DocumentCard';

interface DocumentListProps {
  normalizedData: NormalizedData[];
  extractedData: ExtractedData[];
  onDataChange: (docId: string, field: string, value: string) => void;
  onValidation: (docId: string) => void;
  expandedPatterns: Record<string, boolean>;
  onToggleExpand: (docId: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  normalizedData,
  extractedData,
  onDataChange,
  onValidation,
  expandedPatterns,
  onToggleExpand
}) => {
  return (
    <div className="space-y-6">
      {normalizedData.map((item, index) => {
        const sourceData = extractedData.find(d => d.id === item.id);
        const isExpanded = expandedPatterns[item.id];
        
        return (
          <DocumentCard
            key={item.id}
            item={item}
            sourceData={sourceData}
            index={index}
            isExpanded={isExpanded}
            onDataChange={onDataChange}
            onValidation={onValidation}
            onToggleExpand={onToggleExpand}
          />
        );
      })}
    </div>
  );
};