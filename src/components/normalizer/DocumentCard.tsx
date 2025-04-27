import React from 'react';
import { Check } from 'lucide-react';
import { NormalizedData } from '../../types';

interface DocumentCardProps {
  data: NormalizedData;
  onValidate: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ data, onValidate }) => {
  return (
    <div className={`border rounded-lg overflow-hidden ${
      data.validated ? 'border-green-300 bg-green-50' : 'border-gray-300'
    }`}>
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <div className="flex items-center">
          <span className="font-medium text-gray-800 mr-2">
            Document:
          </span>
          <span className="text-gray-600 text-sm truncate max-w-[200px]">
            {data.source}
          </span>
        </div>
        
        <button
          onClick={onValidate}
          className={`p-2 rounded-full transition-colors ${
            data.validated 
              ? 'bg-green-100 text-green-600 hover:bg-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={data.validated ? 'Validé' : 'Valider'}
        >
          <Check className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.data).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                value={value as string}
                onChange={(e) => {
                  // Handle change through props if needed
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};