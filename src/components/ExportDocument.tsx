import React, { useState } from 'react';
import { NormalizedData } from '../types';
import { Download, FileJson, FileSpreadsheet, CheckCircle, ArrowLeft } from 'lucide-react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface ExportDocumentProps {
  normalizedData: NormalizedData[];
  onReset: () => void;
}

export const ExportDocument: React.FC<ExportDocumentProps> = ({ 
  normalizedData,
  onReset
}) => {
  const [exportFormat, setExportFormat] = useState<'json' | 'excel'>('json');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      if (exportFormat === 'json') {
        // Create a certified JSON document
        const certifiedData = {
          metadata: {
            timestamp: new Date().toISOString(),
            certificationId: `PDF-${Date.now()}`,
            documentCount: normalizedData.length,
            certified: true
          },
          data: normalizedData.map(item => ({
            source: item.source,
            data: item.data
          }))
        };
        
        const blob = new Blob([JSON.stringify(certifiedData, null, 2)], { type: 'application/json' });
        saveAs(blob, `données_extraites_certifiées_${Date.now()}.json`);
      } else {
        // Create a certified Excel document
        const worksheet = XLSX.utils.json_to_sheet(
          normalizedData.map(item => ({
            Source: item.source,
            ...item.data,
            CertificationId: `PDF-${Date.now()}`,
            CertificationDate: new Date().toLocaleDateString()
          }))
        );
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Données Certifiées");
        
        // Add certification sheet
        const certSheet = XLSX.utils.json_to_sheet([{
          Certification: "Document Certifié",
          Timestamp: new Date().toISOString(),
          DocumentCount: normalizedData.length
        }]);
        XLSX.utils.book_append_sheet(workbook, certSheet, "Certification");
        
        // Generate Excel file and save
        XLSX.writeFile(workbook, `données_extraites_certifiées_${Date.now()}.xlsx`);
      }
      
      setExportSuccess(true);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Exportation du document certifié
      </h2>
      
      {exportSuccess ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Exportation réussie!
          </h3>
          <p className="text-gray-600 mb-8">
            Votre document certifié a été généré et téléchargé avec succès.
          </p>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Commencer un nouveau projet
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="font-medium text-gray-700 mb-4">Format d'exportation:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  exportFormat === 'json' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setExportFormat('json')}
              >
                <div className="flex items-center mb-2">
                  <FileJson className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="font-medium">JSON</span>
                </div>
                <p className="text-sm text-gray-600">
                  Format structuré, idéal pour l'intégration avec d'autres systèmes ou API.
                </p>
              </div>
              
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  exportFormat === 'excel' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setExportFormat('excel')}
              >
                <div className="flex items-center mb-2">
                  <FileSpreadsheet className="w-6 h-6 text-green-600 mr-2" />
                  <span className="font-medium">Excel</span>
                </div>
                <p className="text-sm text-gray-600">
                  Tableur facile à manipuler, parfait pour l'analyse et le partage.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6 border-t pt-6">
            <h3 className="font-medium text-gray-700 mb-2">Résumé des données:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Nombre de documents: <span className="font-medium">{normalizedData.length}</span></li>
              <li>Champs extraits: <span className="font-medium">
                {normalizedData.length > 0 
                  ? Object.keys(normalizedData[0].data).length 
                  : 0}
              </span></li>
              <li>Documents validés: <span className="font-medium text-green-600">
                {normalizedData.filter(d => d.validated).length}/{normalizedData.length}
              </span></li>
            </ul>
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`px-6 py-3 rounded-md font-medium flex items-center ${
                isExporting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors`}
            >
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-200 border-t-transparent rounded-full animate-spin mr-2" />
                  Exportation en cours...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Exporter le document certifié
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};