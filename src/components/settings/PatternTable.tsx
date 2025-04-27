import React from 'react';
import { Pattern } from '../../types';

interface PatternTableProps {
  patterns: Pattern[];
  onPatternUpdate: (pattern: Pattern) => void;
  onPatternDelete: (patternId: string) => void;
}

export const PatternTable: React.FC<PatternTableProps> = ({
  patterns,
  onPatternUpdate,
  onPatternDelete
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confiance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patterns.map((pattern) => (
            <tr key={pattern.id}>
              <td className="px-6 py-4 whitespace-nowrap">{pattern.name}</td>
              <td className="px-6 py-4">{pattern.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{(pattern.confidence * 100).toFixed(0)}%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  pattern.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {pattern.isActive ? 'Actif' : 'Inactif'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onPatternUpdate({ ...pattern, isActive: !pattern.isActive })}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  {pattern.isActive ? 'Désactiver' : 'Activer'}
                </button>
                <button
                  onClick={() => onPatternDelete(pattern.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};