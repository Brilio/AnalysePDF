import React, { useState, useEffect } from 'react';
import { PatternFormData } from '../../types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

interface PatternFormProps {
  onSubmit: (formData: PatternFormData) => void;
  initialData?: PatternFormData;
}

const defaultRegexPatterns = {
  "Invoice Number": "(?:facture|invoice)[^\\d]*(\\d+)",
  "Date": "date\\s*:\\s*(\\d{1,2}[\\/\\.\\-]\\d{1,2}[\\/\\.\\-]\\d{2,4})",
  "Amount": "(?:montant|amount|total)[^\\d]*(\\d+(?:[:,.]\\d+)?)",
  "Client": "(?:client|customer)[^\\w]*([\\w\\s]+)(?:\\n|$)"
};

export const PatternForm: React.FC<PatternFormProps> = ({ 
  onSubmit,
  initialData 
}) => {
  const [formData, setFormData] = useState<PatternFormData>(() => 
    initialData || {
      name: '',
      description: '',
      regexPatterns: defaultRegexPatterns
    }
  );

  const [regexJson, setRegexJson] = useState<string>(() =>
    JSON.stringify(initialData?.regexPatterns || defaultRegexPatterns, null, 2)
  );
  
  const [jsonError, setJsonError] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setRegexJson(JSON.stringify(initialData.regexPatterns, null, 2));
    }
  }, [initialData]);

  const validateAndUpdateJson = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      setJsonError('');
      setFormData(prev => ({
        ...prev,
        regexPatterns: parsed
      }));
      return true;
    } catch (error) {
      setJsonError('Format JSON invalide');
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAndUpdateJson(regexJson)) {
      onSubmit(formData);
      if (!initialData) {
        setFormData({
          name: '',
          description: '',
          regexPatterns: defaultRegexPatterns
        });
        setRegexJson(JSON.stringify(defaultRegexPatterns, null, 2));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom du pattern
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expressions régulières
        </label>
        <div className="border rounded-md overflow-hidden">
          <Editor
            value={regexJson}
            onValueChange={value => {
              setRegexJson(value);
              validateAndUpdateJson(value);
            }}
            highlight={code => highlight(code, languages.json, 'json')}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: '300px',
              backgroundColor: '#f8f9fa'
            }}
            className="w-full"
          />
        </div>
        {jsonError && (
          <p className="mt-2 text-sm text-red-600">
            {jsonError}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={!!jsonError}
          className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm ${
            jsonError 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {initialData ? 'Enregistrer les modifications' : 'Créer le pattern'}
        </button>
      </div>
    </form>
  );
};