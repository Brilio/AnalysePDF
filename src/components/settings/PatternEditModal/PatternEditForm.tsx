import React from 'react';
import { Pattern } from '../../../types';
import { PatternField } from './PatternField';
import { RegexPatternFields } from './RegexPatternFields';

interface PatternEditFormProps {
  pattern: Pattern;
  onPatternChange: (updatedPattern: Pattern) => void;
}

export const PatternEditForm: React.FC<PatternEditFormProps> = ({
  pattern,
  onPatternChange
}) => {
  return (
    <div className="space-y-4">
      <PatternField
        label="Nom"
        value={pattern.name}
        onChange={(value) => onPatternChange({ ...pattern, name: value })}
      />

      <PatternField
        label="Description"
        value={pattern.description || ''}
        onChange={(value) => onPatternChange({ ...pattern, description: value })}
        multiline
      />

      <RegexPatternFields
        patterns={pattern.regexPatterns || {}}
        onChange={(patterns) => onPatternChange({ ...pattern, regexPatterns: patterns })}
      />
    </div>
  );
};