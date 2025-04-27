import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RegexPatterns } from '../../../../types';
import { RegexCategoryForm } from './RegexCategoryForm';

interface RegexPatternsFormProps {
  value?: RegexPatterns;
  onChange?: (patterns: RegexPatterns) => void;
}

export const RegexPatternsForm: React.FC<RegexPatternsFormProps> = ({
  value = {},
  onChange
}) => {
  const handleCategoryChange = (oldCategory: string, newCategory: string) => {
    if (oldCategory === newCategory) return;
    const newPatterns = { ...value };
    newPatterns[newCategory] = newPatterns[oldCategory];
    delete newPatterns[oldCategory];
    onChange?.(newPatterns);
  };

  const handlePatternChange = (category: string, patternName: string, regex: string) => {
    const newPatterns = { ...value };
    if (!newPatterns[category]) {
      newPatterns[category] = {};
    }
    newPatterns[category][patternName] = regex;
    onChange?.(newPatterns);
  };

  const addCategory = () => {
    const newPatterns = { ...value };
    newPatterns[`Nouvelle catégorie ${Object.keys(newPatterns).length + 1}`] = {};
    onChange?.(newPatterns);
  };

  const removeCategory = (category: string) => {
    const newPatterns = { ...value };
    delete newPatterns[category];
    onChange?.(newPatterns);
  };

  const addPattern = (category: string) => {
    const newPatterns = { ...value };
    newPatterns[category][`Nouveau pattern ${Object.keys(newPatterns[category]).length + 1}`] = '';
    onChange?.(newPatterns);
  };

  const removePattern = (category: string, patternName: string) => {
    const newPatterns = { ...value };
    delete newPatterns[category][patternName];
    onChange?.(newPatterns);
  };

  return (
    <div className="space-y-4">
      {Object.entries(value).map(([category, patterns]) => (
        <RegexCategoryForm
          key={category}
          category={category}
          patterns={patterns}
          onCategoryChange={(newCategory) => handleCategoryChange(category, newCategory)}
          onPatternChange={(patternName, regex) => handlePatternChange(category, patternName, regex)}
          onPatternRemove={(patternName) => removePattern(category, patternName)}
          onCategoryRemove={() => removeCategory(category)}
          onPatternAdd={() => addPattern(category)}
        />
      ))}

      <Button
        type="dashed"
        onClick={addCategory}
        icon={<PlusOutlined />}
        block
      >
        Ajouter une catégorie
      </Button>
    </div>
  );
}; 