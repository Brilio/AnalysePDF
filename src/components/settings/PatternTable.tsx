import React from 'react';
import { Pattern } from '../../types';
import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface PatternTableProps {
  patterns: Pattern[];
  onPatternUpdate: (pattern: Pattern) => void;
  onPatternDelete: (patternId: string) => void;
  onPatternEdit: (pattern: Pattern) => void;
}

export const PatternTable: React.FC<PatternTableProps> = ({
  patterns,
  onPatternUpdate,
  onPatternDelete,
  onPatternEdit
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
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onPatternEdit(pattern)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onPatternUpdate({ ...pattern, isActive: !pattern.isActive })}
                    className={`${pattern.isActive ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'}`}
                    title={pattern.isActive ? 'Désactiver' : 'Activer'}
                  >
                    {pattern.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => onPatternDelete(pattern.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};