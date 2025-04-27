import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  isExporting: boolean;
  onClick: () => void;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  isExporting,
  onClick
}) => {
  return (
    <div className="flex justify-center pt-4">
      <button
        onClick={onClick}
        disabled={isExporting}
        className={`px-6 py-3 rounded-md font-medium flex items-center ${
          isExporting
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } transition-colors`}
      >
        {isExporting ? (
          <>
            <div className="w-5 h-5 border-2 border-gray-200 border-t-transparent rounded-full animate-spin mr-2" />
            Exportation en cours...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 mr-2" />
            Exporter le document certifié
          </>
        )}
      </button>
    </div>
  );
};