import React, { useState } from 'react';
import { PatternFormData } from '../../types';

interface PatternFormProps {
  onSubmit: (formData: PatternFormData) => void;
}

export const PatternForm: React.FC<PatternFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PatternFormData>({
    name: '',
    description: '',
    regexPatterns: {
      invoiceNumber: '',
      date: '',
      amount: '',
      client: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      regexPatterns: {
        invoiceNumber: '',
        date: '',
        amount: '',
        client: ''
      }
    });
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

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Expressions régulières</h3>
        
        {Object.entries(formData.regexPatterns).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="text"
              id={key}
              value={value}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                regexPatterns: {
                  ...prev.regexPatterns,
                  [key]: e.target.value
                }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Créer le pattern
        </button>
      </div>
    </form>
  );
};