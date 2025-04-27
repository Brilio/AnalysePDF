import React from 'react';
import { Input, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

interface RegexPatternInputProps {
  patternName: string;
  regex: string;
  onPatternNameChange: (newName: string) => void;
  onRegexChange: (newRegex: string) => void;
  onRemove: () => void;
}

export const RegexPatternInput: React.FC<RegexPatternInputProps> = ({
  patternName,
  regex,
  onPatternNameChange,
  onRegexChange,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        value={patternName}
        onChange={(e) => onPatternNameChange(e.target.value)}
        placeholder="Nom du pattern"
        style={{ width: '25%' }}
      />
      <Input
        value={regex}
        onChange={(e) => onRegexChange(e.target.value)}
        placeholder="Expression régulière"
        style={{ width: '75%' }}
      />
      <Button
        type="text"
        icon={<MinusCircleOutlined />}
        onClick={onRemove}
        danger
      />
    </div>
  );
}; 