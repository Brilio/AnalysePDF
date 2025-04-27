import React from 'react';
import { Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RegexPatternInput } from './RegexPatternInput';

interface RegexCategoryFormProps {
  category: string;
  patterns: { [key: string]: string };
  onCategoryChange: (newCategory: string) => void;
  onPatternChange: (patternName: string, regex: string) => void;
  onPatternRemove: (patternName: string) => void;
  onCategoryRemove: () => void;
  onPatternAdd: () => void;
}

export const RegexCategoryForm: React.FC<RegexCategoryFormProps> = ({
  category,
  patterns,
  onCategoryChange,
  onPatternChange,
  onPatternRemove,
  onCategoryRemove,
  onPatternAdd,
}) => {
  return (
    <div className="border rounded p-4">
      <div className="flex items-center gap-2 mb-4">
        <Input
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          placeholder="Nom de la catégorie"
        />
        <Button
          type="text"
          icon={<MinusCircleOutlined />}
          onClick={onCategoryRemove}
          danger
        />
      </div>

      <div className="space-y-2">
        {Object.entries(patterns).map(([patternName, regex]) => (
          <RegexPatternInput
            key={patternName}
            patternName={patternName}
            regex={regex}
            onPatternNameChange={(newName) => {
              if (newName !== patternName) {
                onPatternRemove(patternName);
                onPatternChange(newName, regex);
              }
            }}
            onRegexChange={(newRegex) => onPatternChange(patternName, newRegex)}
            onRemove={() => onPatternRemove(patternName)}
          />
        ))}
      </div>

      <Button
        type="dashed"
        onClick={onPatternAdd}
        icon={<PlusOutlined />}
        className="mt-2"
      >
        Ajouter un pattern
      </Button>
    </div>
  );
}; 