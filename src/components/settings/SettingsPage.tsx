import React, { useState } from 'react';
import { Pattern, PatternFormData } from '../../types';
import { PatternTable } from './PatternTable';
import { PatternForm } from './PatternForm';
import { PatternEditModal } from './PatternEditModal';
import { Settings } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([
    {
      id: 'invoice-pattern',
      name: 'Facture',
      description: 'Détection des informations de facturation',
      confidence: 0.85,
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      data: {},
      regexPatterns: {
        invoiceNumber: '(?:facture|invoice)[^\\d]*(\\d+)',
        date: 'date\\s*:\\s*(\\d{1,2}[\\/\\.-]\\d{1,2}[\\/\\.-]\\d{2,4})',
        amount: '(?:montant|amount|total)[^\\d]*(\\d+(?:[,.]\\d+)?)',
        client: '(?:client|customer)[^\\w]*([\\w\\s]+)(?:\\n|$)'
      }
    }
  ]);

  const [editingPattern, setEditingPattern] = useState<Pattern | null>(null);

  const handlePatternUpdate = async (updatedPattern: Pattern) => {
    setPatterns(prev =>
      prev.map(p => p.id === updatedPattern.id ? {
        ...updatedPattern,
        updatedAt: new Date().toISOString()
      } : p)
    );
  };

  const handlePatternDelete = async (patternId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce pattern ?')) {
      setPatterns(prev => prev.filter(p => p.id !== patternId));
    }
  };

  const handlePatternCreate = (formData: PatternFormData) => {
    const newPattern: Pattern = {
      id: `pattern-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      confidence: 0.75,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {},
      regexPatterns: formData.regexPatterns
    };

    setPatterns(prev => [...prev, newPattern]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <Settings className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Paramètres des patterns</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Créer un nouveau pattern
            </h2>
            <PatternForm onSubmit={handlePatternCreate} />
          </div>
        </div>
      </div>

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

      {editingPattern && (
        <PatternEditModal
          pattern={editingPattern}
          isOpen={true}
          onClose={() => setEditingPattern(null)}
          onSave={handlePatternUpdate}
        />
      )}
    </div>
  );
};