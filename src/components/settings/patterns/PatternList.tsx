import React from 'react';
import { Pattern } from '../../../types';

interface PatternListProps {
  patterns: Pattern[];
  onEdit: (pattern: Pattern) => void;
  onDelete: (patternId: string) => void;
  onToggleActive: (patternId: string, isActive: boolean) => void;
}

export const PatternList: React.FC<PatternListProps> = ({
  patterns,
  onEdit,
  onDelete,
  onToggleActive,
}) => {
  return (
    <div className="space-y-4">
      {patterns.map((pattern) => (
        <div
          key={pattern.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{pattern.name}</h3>
            <p className="text-gray-600">{pattern.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500">
                Confidence: {pattern.confidence}%
              </span>
              <span className="text-sm text-gray-500">
                Last updated: {pattern.updatedAt.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onToggleActive(pattern.id, !pattern.isActive)}
              className={`px-3 py-1 rounded ${
                pattern.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {pattern.isActive ? 'Active' : 'Inactive'}
            </button>
            <button
              onClick={() => onEdit(pattern)}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(pattern.id)}
              className="px-3 py-1 bg-red-100 text-red-800 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 