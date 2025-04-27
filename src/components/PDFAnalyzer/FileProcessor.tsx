import React from 'react';
import { FileWithPreview } from '../../types';
import { StatusIcon } from './StatusIcon';
import { ProgressBar } from './ProgressBar';

interface FileProcessorProps {
  file: FileWithPreview;
  status: 'pending' | 'processing' | 'complete' | 'error';
  progress: number;
}

export const FileProcessor: React.FC<FileProcessorProps> = ({
  file,
  status,
  progress
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <StatusIcon status={status} />
          <span className="ml-2 font-medium truncate max-w-[200px]">
            {file.name}
          </span>
        </div>
      </div>
      
      <ProgressBar progress={progress} />
      
      {status === 'error' && (
        <p className="text-sm text-red-500 mt-2">
          Une erreur est survenue lors de l'analyse de ce fichier.
        </p>
      )}
    </div>
  );
}; 