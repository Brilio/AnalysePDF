import React, { useState } from 'react';
import { Pattern } from '../../types';
import { Edit2, Trash2, Check, X, ChevronUp, ChevronDown } from 'lucide-react';

interface PatternTableProps {
  patterns: Pattern[];
  onPatternUpdate: (pattern: Pattern) => void;
  onPatternDelete: (patternId: string) => void;
}

export const PatternTable: React.FC<PatternTableProps> = ({
  patterns,
  onPatternUpdate,
  onPatternDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Pattern | null>(null);
  const [sortField, setSortField] = useState<keyof Pattern>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof Pattern) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredPatterns = patterns
    .filter(pattern => 
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

  const handleEdit = (pattern: Pattern) => {
    setEditingId(pattern.id);
    setEditForm({ ...pattern });
  };

  const handleSave = async () => {
    if (editForm) {
      await onPatternUpdate(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const SortIcon = ({ field }: { field: keyof Pattern }) => (
    <button 
      onClick={() => handleSort(field)}
      className="ml-1 focus:outline-none"
    >
      {sortField === field ? (
        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
      ) : (
        <div className="w-4 h-4" />
      )}
    </button>
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un pattern..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Nom
                <SortIcon field="name" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Description
                <SortIcon field="description" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                Dernière modification
                <SortIcon field="updatedAt" />
              </div>
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPatterns.map((pattern) => (
            <tr key={pattern.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === pattern.id ? (
                  <input
                    type="text"
                    value={editForm?.name || ''}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">{pattern.name}</div>
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === pattern.id ? (
                  <textarea
                    value={editForm?.description || ''}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, description: e.target.value } : null)}
                    className="w-full px-2 py-1 border rounded"
                    rows={2}
                  />
                ) : (
                  <div className="text-sm text-gray-500">{pattern.description}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === pattern.id ? (
                  <select
                    value={editForm?.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, isActive: e.target.value === 'active' } : null)}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    pattern.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {pattern.isActive ? 'Actif' : 'Inactif'}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {pattern.updatedAt ? new Date(pattern.updatedAt).toLocaleDateString() : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {editingId === pattern.id ? (
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(pattern)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onPatternDelete(pattern.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};