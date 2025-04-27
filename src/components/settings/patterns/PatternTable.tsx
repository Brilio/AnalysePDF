import React from 'react';
import { Pattern } from '../../../types';
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
  const handleToggleActive = (pattern: Pattern) => {
    onPatternUpdate({
      ...pattern,
      isActive: !pattern.isActive
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Confiance
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patterns.map((pattern) => (
            <tr key={pattern.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {pattern.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {pattern.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {(pattern.confidence * 100).toFixed(0)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleToggleActive(pattern)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {pattern.isActive ? (
                    <ToggleRight className="w-6 h-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onPatternEdit(pattern)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onPatternDelete(pattern.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
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