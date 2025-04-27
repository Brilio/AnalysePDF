import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
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
  const workbook = new ExcelJS.Workbook();
  
  // Add main data sheet
  const worksheet = workbook.addWorksheet('Données Certifiées');
  
  // Get all unique keys from the data
  const allKeys = new Set<string>();
  normalizedData.forEach(item => {
    Object.keys(item.data).forEach(key => allKeys.add(key));
  });
  
  // Set up columns
  const columns = [
    { header: 'Source', key: 'source' },
    ...Array.from(allKeys).map(key => ({ header: key, key })),
    { header: 'CertificationId', key: 'certificationId' },
    { header: 'CertificationDate', key: 'certificationDate' }
  ];
  worksheet.columns = columns;
  
  // Add data rows
  normalizedData.forEach(item => {
    worksheet.addRow({
      source: item.source,
      ...item.data,
      certificationId: `PDF-${Date.now()}`,
      certificationDate: new Date().toLocaleDateString()
    });
  });
  
  // Add certification sheet
  const certSheet = workbook.addWorksheet('Certification');
  certSheet.columns = [
    { header: 'Certification', key: 'certification' },
    { header: 'Timestamp', key: 'timestamp' },
    { header: 'DocumentCount', key: 'documentCount' }
  ];
  certSheet.addRow({
    certification: 'Document Certifié',
    timestamp: new Date().toISOString(),
    documentCount: normalizedData.length
  });
  
  // Style improvements
  worksheet.getRow(1).font = { bold: true };
  certSheet.getRow(1).font = { bold: true };
  
  // Generate and save file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `données_extraites_certifiées_${Date.now()}.xlsx`);
};