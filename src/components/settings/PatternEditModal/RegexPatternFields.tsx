import React from 'react';

interface RegexPatternFieldsProps {
  patterns: Record<string, string>;
  onChange: (patterns: Record<string, string>) => void;
}

export const RegexPatternFields: React.FC<RegexPatternFieldsProps> = ({
  patterns,
  onChange
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Expressions régulières
      </label>
      <div className="mt-2 space-y-2">
        {Object.entries(patterns).map(([key, value]) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-500 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange({
                ...patterns,
                [key]: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};