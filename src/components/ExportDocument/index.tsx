import React, { useState } from 'react';
import { NormalizedData } from '../../types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { ExportFormatSelector } from './ExportFormatSelector';
import { DataSummary } from './DataSummary';
import { SuccessMessage } from './SuccessMessage';
import { ExportButton } from './ExportButton';
import { exportToJson, exportToExcel } from './exportUtils';

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
        await exportToJson(normalizedData);
      } else {
        await exportToExcel(normalizedData);
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
        <SuccessMessage onReset={onReset} />
      ) : (
        <>
          <ExportFormatSelector
            exportFormat={exportFormat}
            onFormatChange={setExportFormat}
          />
          <DataSummary normalizedData={normalizedData} />
          <ExportButton
            isExporting={isExporting}
            onClick={handleExport}
          />
        </>
      )}
    </div>
  );
};