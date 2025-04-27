import React, { useState, useEffect } from 'react';
import { ExtractedData, NormalizedData } from '../../types';
import { DocumentList } from './DocumentList';
import { ValidationFooter } from './ValidationFooter';

interface DataNormalizerProps {
  extractedData: ExtractedData[];
  onNormalizationComplete: (data: NormalizedData[]) => void;
}

export const DataNormalizer: React.FC<DataNormalizerProps> = ({ 
  extractedData, 
  onNormalizationComplete 
}) => {
  const [normalizedData, setNormalizedData] = useState<NormalizedData[]>([]);
  const [expandedPatterns, setExpandedPatterns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const normalized = extractedData.map(item => {
      const bestPattern = [...item.patterns].sort((a, b) => b.confidence - a.confidence)[0];
      return {
        id: item.id,
        source: item.fileName,
        data: bestPattern ? { ...bestPattern.data } : {},
        validated: false
      };
    });
    
    setNormalizedData(normalized);
    
    const expanded: Record<string, boolean> = {};
    extractedData.forEach(item => {
      expanded[item.id] = false;
    });
    setExpandedPatterns(expanded);
  }, [extractedData]);

  const handleDataChange = (docId: string, field: string, value: string) => {
    setNormalizedData(prev => 
      prev.map(item => 
        item.id === docId 
          ? { ...item, data: { ...item.data, [field]: value } } 
          : item
      )
    );
  };

  const handleValidation = (docId: string) => {
    setNormalizedData(prev => 
      prev.map(item => 
        item.id === docId 
          ? { ...item, validated: !item.validated } 
          : item
      )
    );
  };

  const toggleExpand = (docId: string) => {
    setExpandedPatterns(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const allValidated = normalizedData.every(item => item.validated);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Uniformisation des données
      </h2>
      
      <DocumentList
        normalizedData={normalizedData}
        extractedData={extractedData}
        onDataChange={handleDataChange}
        onValidation={handleValidation}
        expandedPatterns={expandedPatterns}
        onToggleExpand={toggleExpand}
      />
      
      <ValidationFooter
        allValidated={allValidated}
        onComplete={() => onNormalizationComplete(normalizedData)}
      />
    </div>
  );
};