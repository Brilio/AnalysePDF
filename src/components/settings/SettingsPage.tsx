import React, { useState } from 'react';
import { Pattern } from '../../types';
import { PatternTable } from './patterns/PatternTable';
import { PatternEditModal } from './patterns/PatternEditModal';
import { SettingsHeader } from './SettingsHeader';
import { usePatterns } from '../../hooks/usePatterns';

export const SettingsPage: React.FC = () => {
  const { patterns, handlePatternUpdate, handlePatternDelete, handlePatternCreate } = usePatterns();
  const [editingPattern, setEditingPattern] = useState<Pattern | null>(null);

  const handleAddPattern = () => {
    setEditingPattern({
      id: '',
      name: '',
      description: '',
      confidence: 0.75,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SettingsHeader onAddPattern={handleAddPattern} />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Patterns existants
            </h2>
            <PatternTable
              patterns={patterns}
              onPatternUpdate={handlePatternUpdate}
              onPatternDelete={handlePatternDelete}
              onPatternEdit={setEditingPattern}
            />
          </div>
        </div>
      </div>

      {editingPattern && (
        <PatternEditModal
          pattern={editingPattern}
          isOpen={true}
          onClose={() => setEditingPattern(null)}
          onSave={editingPattern.id ? handlePatternUpdate : handlePatternCreate}
        />
      )}
    </div>
  );
};