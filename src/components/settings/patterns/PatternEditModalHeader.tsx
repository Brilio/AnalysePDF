import React from 'react';
import { X } from 'lucide-react';

interface PatternEditModalHeaderProps {
  onClose: () => void;
}

export const PatternEditModalHeader: React.FC<PatternEditModalHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex justify-between items-center p-6 border-b">
      <h2 className="text-xl font-semibold text-gray-900">
        Modifier le pattern
      </h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-500"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}; 