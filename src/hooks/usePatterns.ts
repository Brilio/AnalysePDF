import { useState } from 'react';
import { Pattern, PatternFormData, RegexPatterns } from '../types';
import { DEFAULT_REGEX_PATTERNS } from '../constants/patterns';

export const usePatterns = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([{
    id: 'invoice-pattern',
    name: 'Default pattern',
    description: 'Détection des informations par défaut',
    confidence: 0.99,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    data: {},
    regexPatterns: DEFAULT_REGEX_PATTERNS as RegexPatterns
  }]);

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
      regexPatterns: formData.regexPatterns || {}
    };

    setPatterns(prev => [...prev, newPattern]);
  };

  return {
    patterns,
    handlePatternUpdate,
    handlePatternDelete,
    handlePatternCreate
  };
}; 