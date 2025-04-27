import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface SuccessMessageProps {
  onReset: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h3 className="text-xl font-bold text-green-700 mb-2">
        Exportation réussie!
      </h3>
      <p className="text-gray-600 mb-8">
        Votre document certifié a été généré et téléchargé avec succès.
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center mx-auto"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Commencer un nouveau projet
      </button>
    </div>
  );
};