import React from 'react';
import { NormalizedData } from '../../types';

interface DataSummaryProps {
  normalizedData: NormalizedData[];
}

export const DataSummary: React.FC<DataSummaryProps> = ({ normalizedData }) => {
  return (
    <div className="mb-6 border-t pt-6">
      <h3 className="font-medium text-gray-700 mb-2">Résumé des données:</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>Nombre de documents: <span className="font-medium">{normalizedData.length}</span></li>
        <li>Champs extraits: <span className="font-medium">
          {normalizedData.length > 0 
            ? Object.keys(normalizedData[0].data).length 
            : 0}
        </span></li>
        <li>Documents validés: <span className="font-medium text-green-600">
          {normalizedData.filter(d => d.validated).length}/{normalizedData.length}
        </span></li>
      </ul>
    </div>
  );
};