import React, { useEffect, useState } from 'react';
import { FileWithPreview, ExtractedData } from '../../types';
import { analyzePDF } from '../../utils/pdfProcessor';
import { FileProcessor } from './FileProcessor';

interface PDFAnalyzerProps {
  files: FileWithPreview[];
  onAnalysisComplete: (data: ExtractedData[]) => void;
  onProcessingChange: (isProcessing: boolean) => void;
}

export const PDFAnalyzer: React.FC<PDFAnalyzerProps> = ({ 
  files, 
  onAnalysisComplete,
  onProcessingChange 
}) => {
  const [processingStatus, setProcessingStatus] = useState<Record<string, 'pending' | 'processing' | 'complete' | 'error'>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [results, setResults] = useState<ExtractedData[]>([]);

  useEffect(() => {
    const initialStatus: Record<string, 'pending' | 'processing' | 'complete' | 'error'> = {};
    const initialProgress: Record<string, number> = {};
    
    files.forEach(file => {
      initialStatus[file.name] = 'pending';
      initialProgress[file.name] = 0;
    });
    
    setProcessingStatus(initialStatus);
    setProgress(initialProgress);
    
    const processFiles = async () => {
      onProcessingChange(true);
      const extractedData: ExtractedData[] = [];
      
      for (const file of files) {
        try {
          setProcessingStatus(prev => ({ ...prev, [file.name]: 'processing' }));
          
          const data = await analyzePDF(file, (p: number) => {
            setProgress(prev => ({ ...prev, [file.name]: p }));
          });
          
          setProgress(prev => ({ ...prev, [file.name]: 100 }));
          setProcessingStatus(prev => ({ ...prev, [file.name]: 'complete' }));
          
          extractedData.push(data);
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error);
          setProcessingStatus(prev => ({ ...prev, [file.name]: 'error' }));
        }
      }
      
      setResults(extractedData);
      if (extractedData.length > 0) {
        onAnalysisComplete(extractedData);
      }
    };
    
    processFiles();
  }, [files, onAnalysisComplete, onProcessingChange]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Analyse des documents PDF
      </h2>
      
      <div className="space-y-4">
        {files.map((file) => (
          <FileProcessor
            key={file.name}
            file={file}
            status={processingStatus[file.name]}
            progress={progress[file.name] || 0}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          Le système analyse les documents pour détecter les modèles de données récurrents.
          Cette opération peut prendre quelques instants.
        </p>
      </div>
    </div>
  );
}; 