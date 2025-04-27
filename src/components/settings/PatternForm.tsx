import React, { useState } from 'react';
import { PatternFormData } from '../../types';
import { Plus, Minus } from 'lucide-react';

interface PatternFormProps {
  onSubmit: (data: PatternFormData) => void;
}

export const PatternForm: React.FC<PatternFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PatternFormData>({
    name: '',
    description: '',
    regexPatterns: { default: '' }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est obligatoire';
    }
    
    Object.entries(formData.regexPatterns).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[`regex_${key}`] = 'L\'expression régulière est obligatoire';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        description: '',
        regexPatterns: { default: '' }
      });
    }
  };

  const addRegexPattern = () => {
    const newKey = `pattern_${Object.keys(formData.regexPatterns).length}`;
    setFormData(prev => ({
      ...prev,
      regexPatterns: {
        ...prev.regexPatterns,
        [newKey]: ''
      }
    }));
  };

  const removeRegexPattern = (key: string) => {
    const { [key]: removed, ...rest } = formData.regexPatterns;
    setFormData(prev => ({
      ...prev,
      regexPatterns: rest
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom du pattern
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.name ? 'border-red-300' : ''
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Expressions régulières
          </label>
          <button
            type="button"
            onClick={addRegexPattern}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </button>
        </div>

        <div className="space-y-3">
          {Object.entries(formData.regexPatterns).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <input
                type="text"
                placeholder="Nom du champ"
                value={key}
                disabled={key === 'default'}
                className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Expression régulière"
                value={value}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  regexPatterns: {
                    ...prev.regexPatterns,
                    [key]: e.target.value
                  }
                }))}
                className={`flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors[`regex_${key}`] ? 'border-red-300' : ''
                }`}
              />
              {key !== 'default' && (
                <button
                  type="button"
                  onClick={() => removeRegexPattern(key)}
                  className="p-2 text-red-600 hover:text-red-900"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Créer le pattern
        </button>
      </div>
    </form>
  );
};