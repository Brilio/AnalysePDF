import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { NormalizedData } from '../../types';

export const exportToJson = async (normalizedData: NormalizedData[]) => {
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
};

export const exportToExcel = async (normalizedData: NormalizedData[]) => {
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
  
  const certSheet = XLSX.utils.json_to_sheet([{
    Certification: "Document Certifié",
    Timestamp: new Date().toISOString(),
    DocumentCount: normalizedData.length
  }]);
  XLSX.utils.book_append_sheet(workbook, certSheet, "Certification");
  
  XLSX.writeFile(workbook, `données_extraites_certifiées_${Date.now()}.xlsx`);
};