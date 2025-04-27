import React, { useState } from 'react';
import { Pattern, CreatePatternInput } from '../../types';
import { PatternForm } from './PatternForm';
import { PatternList } from './PatternList';

export const PatternSettings: React.FC = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [editingPattern, setEditingPattern] = useState<Pattern | null>(null);

  const handleCreatePattern = (patternData: CreatePatternInput) => {
    const newPattern: Pattern = {
      ...patternData,
      id: crypto.randomUUID(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPatterns((prev) => [...prev, newPattern]);
  };

  const handleUpdatePattern = (patternData: CreatePatternInput) => {
    if (!editingPattern) return;

    const updatedPattern: Pattern = {
      ...editingPattern,
      ...patternData,
      updatedAt: new Date(),
    };

    setPatterns((prev) =>
      prev.map((p) => (p.id === editingPattern.id ? updatedPattern : p))
    );
    setEditingPattern(null);
  };

  const handleDeletePattern = (patternId: string) => {
    setPatterns((prev) => prev.filter((p) => p.id !== patternId));
  };

  const handleToggleActive = (patternId: string, isActive: boolean) => {
    setPatterns((prev) =>
      prev.map((p) =>
        p.id === patternId ? { ...p, isActive, updatedAt: new Date() } : p
      )
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {editingPattern ? 'Edit Pattern' : 'Create New Pattern'}
        </h2>
        <PatternForm
          pattern={editingPattern}
          onSubmit={editingPattern ? handleUpdatePattern : handleCreatePattern}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Pattern List</h2>
        <PatternList
          patterns={patterns}
          onEdit={setEditingPattern}
          onDelete={handleDeletePattern}
          onToggleActive={handleToggleActive}
        />
      </div>
    </div>
  );
}; 