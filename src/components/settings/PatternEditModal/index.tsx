import React, { useState, useEffect } from 'react';
import { Pattern } from '../../../types';
import { X } from 'lucide-react';
import { PatternForm } from '../PatternForm';

interface PatternEditModalProps {
  pattern: Pattern;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPattern: Pattern) => void;
}

export const PatternEditModal: React.FC<PatternEditModalProps> = ({
  pattern,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const handleSubmit = (formData: any) => {
    onSave({
      ...pattern,
      name: formData.name,
      description: formData.description,
      regexPatterns: formData.regexPatterns
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
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

        <div className="p-6">
          <PatternForm 
            onSubmit={handleSubmit}
            initialData={{
              name: pattern.name,
              description: pattern.description || '',
              regexPatterns: pattern.regexPatterns || {}
            }}
          />
        </div>
      </div>
    </div>
  );
};