import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { FileWithPreview } from '../types';

interface FileUploaderProps {
  onFilesSelected: (files: FileWithPreview[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ) as FileWithPreview[];
    
    onFilesSelected(filesWithPreview);
  }, [onFilesSelected]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const dropzoneClasses = `
    w-full h-64 border-2 border-dashed rounded-lg p-6
    flex flex-col items-center justify-center text-center
    transition-colors duration-200 ease-in-out
    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
    ${isDragAccept ? 'border-green-500 bg-green-50' : ''}
    ${isDragReject ? 'border-red-500 bg-red-50' : ''}
    hover:bg-gray-100 cursor-pointer
  `;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Téléversez vos fichiers PDF
      </h2>
      
      <div {...getRootProps({ className: dropzoneClasses })}>
        <input {...getInputProps()} />
        
        <Upload
          className={`mb-4 h-12 w-12 ${
            isDragActive ? 'text-blue-500' : 'text-gray-400'
          }`}
        />
        
        {isDragActive ? (
          <p className="text-lg font-medium text-blue-600">
            Déposez les fichiers ici...
          </p>
        ) : (
          <>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Glissez-déposez vos fichiers PDF ici
            </p>
            <p className="text-sm text-gray-500 mb-3">
              ou cliquez pour sélectionner des fichiers
            </p>
            <p className="text-xs text-gray-400">
              Formats acceptés: PDF
            </p>
          </>
        )}
      </div>

      <div className="mt-8">
        <h3 className="font-medium text-gray-700 mb-2">
          Instructions:
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Téléversez un ou plusieurs fichiers PDF contenant des données structurées</li>
          <li>Le système va automatiquement détecter les motifs de données récurrents</li>
          <li>Vous pourrez vérifier et ajuster les données extraites</li>
          <li>Le document final certifié sera généré pour téléchargement</li>
        </ul>
      </div>
    </div>
  );
};