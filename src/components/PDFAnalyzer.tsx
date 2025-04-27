import React, { useEffect, useState } from 'react';
import { FileWithPreview, ExtractedData, Pattern } from '../types';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { analyzePDF } from '../utils/pdfProcessor';

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
          
          // Simulate progress updates
          const progressInterval = setInterval(() => {
            setProgress(prev => {
              const currentProgress = prev[file.name] || 0;
              if (currentProgress < 90) {
                return { ...prev, [file.name]: currentProgress + Math.random() * 10 };
              }
              return prev;
            });
          }, 500);
          
          // Process PDF and extract text
          const data = await analyzePDF(file, (p: number) => {
            setProgress(prev => ({ ...prev, [file.name]: p }));
          });
          
          clearInterval(progressInterval);
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
    
    // Cleanup function
    return () => {
      // Any cleanup needed
    };
  }, [files, onAnalysisComplete, onProcessingChange]);

  const getStatusIcon = (status: 'pending' | 'processing' | 'complete' | 'error') => {
    switch (status) {
      case 'pending':
        return <FileText className="w-5 h-5 text-gray-400" />;
      case 'processing':
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        );
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Analyse des documents PDF
      </h2>
      
      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.name} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {getStatusIcon(processingStatus[file.name])}
                <span className="ml-2 font-medium truncate max-w-[200px]">
                  {file.name}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {Math.round(progress[file.name] || 0)}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress[file.name] || 0}%` }}
              />
            </div>
            
            {processingStatus[file.name] === 'error' && (
              <p className="text-sm text-red-500 mt-2">
                Une erreur est survenue lors de l'analyse de ce fichier.
              </p>
            )}
          </div>
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