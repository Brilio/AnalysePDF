import React, { useState, useEffect } from 'react';
import { ExtractedData, NormalizedData } from '../../types';
import { DocumentCard } from './DocumentCard';
import { ValidationStatus } from './ValidationStatus';

interface DataNormalizerProps {
  extractedData: ExtractedData[];
  onNormalizationComplete: (data: NormalizedData[]) => void;
}

export const DataNormalizer: React.FC<DataNormalizerProps> = ({ 
  extractedData, 
  onNormalizationComplete 
}) => {
  const [normalizedData, setNormalizedData] = useState<NormalizedData[]>([]);

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
  }, [extractedData]);

  const handleValidation = (docId: string) => {
    setNormalizedData(prev => 
      prev.map(item => 
        item.id === docId 
          ? { ...item, validated: !item.validated } 
          : item
      )
    );
  };

  const allValidated = normalizedData.every(item => item.validated);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Uniformisation des données
      </h2>
      
      <div className="space-y-6">
        {normalizedData.map((item) => (
          <DocumentCard
            key={item.id}
            data={item}
            onValidate={() => handleValidation(item.id)}
          />
        ))}
      </div>
      
      <ValidationStatus
        allValidated={allValidated}
        onContinue={() => onNormalizationComplete(normalizedData)}
      />
    </div>
  );
};