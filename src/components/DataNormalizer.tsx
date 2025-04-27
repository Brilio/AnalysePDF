import React, { useState, useEffect } from 'react';
import { ExtractedData, NormalizedData, Pattern } from '../types';
import { Check, AlertTriangle, Clipboard, ChevronDown, ChevronUp } from 'lucide-react';

interface DataNormalizerProps {
  extractedData: ExtractedData[];
  onNormalizationComplete: (data: NormalizedData[]) => void;
}

export const DataNormalizer: React.FC<DataNormalizerProps> = ({ 
  extractedData, 
  onNormalizationComplete 
}) => {
  const [normalizedData, setNormalizedData] = useState<NormalizedData[]>([]);
  const [expandedPatterns, setExpandedPatterns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initial normalization of data
    const normalized = extractedData.map(item => {
      // Take the highest confidence pattern data as the base
      const bestPattern = [...item.patterns].sort((a, b) => b.confidence - a.confidence)[0];
      
      return {
        id: item.id,
        source: item.fileName,
        data: bestPattern ? { ...bestPattern.data } : {},
        validated: false
      };
    });
    
    setNormalizedData(normalized);
    
    // Initialize expanded state for all patterns
    const expanded: Record<string, boolean> = {};
    extractedData.forEach(item => {
      expanded[item.id] = false;
    });
    setExpandedPatterns(expanded);
  }, [extractedData]);

  const handleDataChange = (docId: string, field: string, value: string) => {
    setNormalizedData(prev => 
      prev.map(item => 
        item.id === docId 
          ? { 
              ...item, 
              data: { 
                ...item.data, 
                [field]: value 
              } 
            } 
          : item
      )
    );
  };

  const toggleValidation = (docId: string) => {
    setNormalizedData(prev => 
      prev.map(item => 
        item.id === docId 
          ? { ...item, validated: !item.validated } 
          : item
      )
    );
  };

  const toggleExpand = (docId: string) => {
    setExpandedPatterns(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const handleComplete = () => {
    onNormalizationComplete(normalizedData);
  };

  const allValidated = normalizedData.every(item => item.validated);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Uniformisation des données
      </h2>
      
      <div className="space-y-6">
        {normalizedData.map((item, index) => {
          const sourceData = extractedData.find(d => d.id === item.id);
          const isExpanded = expandedPatterns[item.id];
          
          return (
            <div 
              key={item.id} 
              className={`border rounded-lg overflow-hidden ${
                item.validated ? 'border-green-300 bg-green-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 mr-2">
                    Document {index + 1}:
                  </span>
                  <span className="text-gray-600 text-sm truncate max-w-[200px]">
                    {item.source}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleValidation(item.id)}
                    className={`p-2 rounded-full transition-colors ${
                      item.validated 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={item.validated ? 'Validé' : 'Valider'}
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    title={isExpanded ? 'Réduire' : 'Étendre'}
                  >
                    {isExpanded 
                      ? <ChevronUp className="w-5 h-5" /> 
                      : <ChevronDown className="w-5 h-5" />
                    }
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(item.data).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) => handleDataChange(item.id, key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
                
                {isExpanded && sourceData?.patterns && sourceData.patterns.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                      <Clipboard className="w-4 h-4 mr-1" />
                      Modèles détectés
                    </h4>
                    
                    <div className="space-y-2">
                      {sourceData.patterns.map((pattern) => (
                        <div 
                          key={pattern.id}
                          className="text-sm p-3 rounded bg-gray-50 border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{pattern.name}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                              {Math.round(pattern.confidence * 100)}% confiance
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                            {Object.entries(pattern.data).map(([key, val]) => (
                              <div key={key} className="flex">
                                <span className="font-medium mr-1">{key}:</span>
                                <span className="truncate">{val.toString()}</span>
                              </div>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => {
                              // Copy this pattern's data to the normalized data
                              setNormalizedData(prev => 
                                prev.map(item => 
                                  item.id === sourceData.id 
                                    ? { ...item, data: { ...pattern.data } } 
                                    : item
                                )
                              );
                            }}
                            className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Utiliser ce modèle
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center text-sm">
          {!allValidated && (
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>Certaines données ne sont pas encore validées</span>
            </div>
          )}
          {allValidated && (
            <div className="flex items-center text-green-600">
              <Check className="w-4 h-4 mr-1" />
              <span>Toutes les données sont validées</span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleComplete}
          disabled={!allValidated}
          className={`px-4 py-2 rounded-md font-medium ${
            allValidated
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          Continuer vers l'exportation
        </button>
      </div>
    </div>
  );
};