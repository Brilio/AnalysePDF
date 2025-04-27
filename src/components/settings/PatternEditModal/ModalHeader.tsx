import React from 'react';
import { X } from 'lucide-react';

interface ModalHeaderProps {
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose }) => {
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