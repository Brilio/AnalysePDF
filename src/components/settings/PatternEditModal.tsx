import React, { useState, useEffect } from 'react';
import { Pattern } from '../../types';
import { X } from 'lucide-react';

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
  const [editedPattern, setEditedPattern] = useState<Pattern>(pattern);

  useEffect(() => {
    setEditedPattern(pattern);
  }, [pattern]);

  if (!isOpen) return null;

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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                value={editedPattern.name}
                onChange={(e) => setEditedPattern(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={editedPattern.description || ''}
                onChange={(e) => setEditedPattern(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expressions régulières
              </label>
              <div className="mt-2 space-y-2">
                {Object.entries(editedPattern.regexPatterns || {}).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setEditedPattern(prev => ({
                        ...prev,
                        regexPatterns: {
                          ...prev.regexPatterns,
                          [key]: e.target.value
                        }
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onSave(editedPattern);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};