import React, { useState } from 'react';
import { FileWithPreview, ExtractedData, NormalizedData, WorkflowStep } from '../../types';
import { FileUploader } from '../FileUploader';
import { PDFAnalyzer } from '../PDFAnalyzer';
import { DataNormalizer } from '../DataNormalizer';
import { ExportDocument } from '../ExportDocument';
import { SettingsPage } from '../settings/SettingsPage';

export const WorkflowManager: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([]);
  const [normalizedData, setNormalizedData] = useState<NormalizedData[]>([]);
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('upload');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (selectedFiles: FileWithPreview[]) => {
    setFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      setCurrentStep('analyze');
    }
  };

  const handleAnalysisComplete = (data: ExtractedData[]) => {
    setExtractedData(data);
    setCurrentStep('normalize');
    setIsProcessing(false);
  };

  const handleNormalizationComplete = (data: NormalizedData[]) => {
    setNormalizedData(data);
    setCurrentStep('export');
  };

  const handleReset = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    
    setFiles([]);
    setExtractedData([]);
    setNormalizedData([]);
    setCurrentStep('upload');
    setIsProcessing(false);
  };

  const renderCurrentStep = () => {
    if (currentStep === 'settings') {
      return <SettingsPage />;
    }

    switch (currentStep) {
      case 'upload':
        return <FileUploader onFilesSelected={handleFilesSelected} />;
      case 'analyze':
        return (
          <PDFAnalyzer 
            files={files} 
            onAnalysisComplete={handleAnalysisComplete}
            onProcessingChange={setIsProcessing}
          />
        );
      case 'normalize':
        return (
          <DataNormalizer
            extractedData={extractedData}
            onNormalizationComplete={handleNormalizationComplete}
          />
        );
      case 'export':
        return (
          <ExportDocument
            normalizedData={normalizedData}
            onReset={handleReset}
          />
        );
      default:
        return <FileUploader onFilesSelected={handleFilesSelected} />;
    }
  };

  return {
    currentStep,
    isProcessing,
    setCurrentStep,
    renderCurrentStep
  };
}; 