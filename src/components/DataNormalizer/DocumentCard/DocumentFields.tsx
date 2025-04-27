import React from 'react';

interface DocumentFieldsProps {
  data: Record<string, string | number>;
  onDataChange: (field: string, value: string) => void;
}

export const DocumentFields: React.FC<DocumentFieldsProps> = ({
  data,
  onDataChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <input
            type="text"
            value={value as string}
            onChange={(e) => onDataChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}
    </div>
  );
};