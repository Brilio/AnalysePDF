import React from 'react';
import { FileJson, FileSpreadsheet } from 'lucide-react';

interface ExportFormatSelectorProps {
  exportFormat: 'json' | 'excel';
  onFormatChange: (format: 'json' | 'excel') => void;
}

export const ExportFormatSelector: React.FC<ExportFormatSelectorProps> = ({
  exportFormat,
  onFormatChange
}) => {
  return (
    <div className="mb-8">
      <h3 className="font-medium text-gray-700 mb-4">Format d'exportation:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            exportFormat === 'json' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => onFormatChange('json')}
        >
          <div className="flex items-center mb-2">
            <FileJson className="w-6 h-6 text-blue-600 mr-2" />
            <span className="font-medium">JSON</span>
          </div>
          <p className="text-sm text-gray-600">
            Format structuré, idéal pour l'intégration avec d'autres systèmes ou API.
          </p>
        </div>
        
        <div
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            exportFormat === 'excel' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => onFormatChange('excel')}
        >
          <div className="flex items-center mb-2">
            <FileSpreadsheet className="w-6 h-6 text-green-600 mr-2" />
            <span className="font-medium">Excel</span>
          </div>
          <p className="text-sm text-gray-600">
            Tableur facile à manipuler, parfait pour l'analyse et le partage.
          </p>
        </div>
      </div>
    </div>
  );
};