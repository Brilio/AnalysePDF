import React from 'react';

interface PatternFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export const PatternField: React.FC<PatternFieldProps> = ({
  label,
  value,
  onChange,
  multiline = false
}) => {
  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500";
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={inputClasses}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        />
      )}
    </div>
  );
};