import React from 'react';
import { Plus } from 'lucide-react';

interface SettingsHeaderProps {
  onAddPattern: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onAddPattern }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos patterns de reconnaissance de texte
        </p>
      </div>
      <button
        onClick={onAddPattern}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-5 h-5 mr-2" />
        Ajouter un pattern
      </button>
    </div>
  );
}; 