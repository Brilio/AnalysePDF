import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { PDFAnalyzer } from './components/PDFAnalyzer';
import { DataNormalizer } from './components/DataNormalizer';
import { ExportDocument } from './components/ExportDocument';
import { WorkflowHeader } from './components/workflow/WorkflowHeader';
import { SettingsPage } from './components/settings/SettingsPage';
import { FileWithPreview, ExtractedData, NormalizedData, WorkflowStep } from './types';

function App() {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <WorkflowHeader 
        currentStep={currentStep} 
        isProcessing={isProcessing}
        onStepClick={(step) => {
          if (!isProcessing) {
            setCurrentStep(step);
          }
        }}
      />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderCurrentStep()}
      </main>
      <footer className="py-4 px-6 bg-white shadow-inner">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © 2025 AnalysePDF - Extraction intelligente de données
        </div>
      </footer>
    </div>
  );
}

export default App