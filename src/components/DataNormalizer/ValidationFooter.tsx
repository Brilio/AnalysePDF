import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';

interface ValidationFooterProps {
  allValidated: boolean;
  onComplete: () => void;
}

export const ValidationFooter: React.FC<ValidationFooterProps> = ({
  allValidated,
  onComplete
}) => {
  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="flex items-center text-sm">
        {!allValidated && (
          <div className="flex items-center text-amber-600">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>Certaines données ne sont pas encore validées</span>
          </div>
        )}
        {allValidated && (
          <div className="flex items-center text-green-600">
            <Check className="w-4 h-4 mr-1" />
            <span>Toutes les données sont validées</span>
          </div>
        )}
      </div>
      
      <button
        onClick={onComplete}
        disabled={!allValidated}
        className={`px-4 py-2 rounded-md font-medium ${
          allValidated
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        } transition-colors`}
      >
        Continuer vers l'exportation
      </button>
    </div>
  );
};