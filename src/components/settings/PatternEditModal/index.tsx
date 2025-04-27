import React from 'react';
import { Pattern, PatternFormData } from '../../../types';
import { PatternForm } from '../PatternForm';
import { ModalHeader } from './ModalHeader';

interface PatternEditModalProps {
  pattern: Pattern;
  isOpen: boolean;
  onClose: () => void;
  onSave: (pattern: Pattern) => void;
}

export const PatternEditModal: React.FC<PatternEditModalProps> = ({
  pattern,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (formData: PatternFormData) => {
    onSave({
      ...pattern,
      name: formData.name,
      description: formData.description,
      regexPatterns: formData.regexPatterns,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <ModalHeader onClose={onClose} />
            <PatternForm
              initialData={pattern}
              onSubmit={handleSubmit}
              mode="edit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};