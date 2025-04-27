import React from 'react';

interface ModalFooterProps {
  onCancel: () => void;
  onSave: () => void;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onSave
}) => {
  return (
    <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Annuler
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Enregistrer
      </button>
    </div>
  );
};