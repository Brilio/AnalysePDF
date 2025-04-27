import React from 'react';
import { Pattern, PatternFormData } from '../../../types';
import { PatternForm } from './PatternForm';
import { PatternEditModalHeader } from './PatternEditModalHeader';

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
      updatedAt: new Date()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose} 
        />
        
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-[90vw] transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="max-h-[85vh] overflow-y-auto">
                <div className="bg-white px-6 py-4">
                  <PatternEditModalHeader onClose={onClose} />
                  <PatternForm
                    initialValues={pattern}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 