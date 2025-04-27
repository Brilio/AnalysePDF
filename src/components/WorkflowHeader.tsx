import React from 'react';
import { FileText, FileSearch, Database, FileOutput } from 'lucide-react';
import { WorkflowStep } from '../types';

interface WorkflowHeaderProps {
  currentStep: WorkflowStep;
  isProcessing: boolean;
  onStepClick: (step: WorkflowStep) => void;
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ 
  currentStep, 
  isProcessing,
  onStepClick 
}) => {
  const steps: { id: WorkflowStep; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'upload', 
      label: 'Téléversement', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      id: 'analyze', 
      label: 'Analyse', 
      icon: <FileSearch className="h-5 w-5" /> 
    },
    { 
      id: 'normalize', 
      label: 'Uniformisation', 
      icon: <Database className="h-5 w-5" /> 
    },
    { 
      id: 'export', 
      label: 'Exportation', 
      icon: <FileOutput className="h-5 w-5" /> 
    },
  ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 md:mb-0">
            AnalysePDF
          </h1>

          <nav>
            <ol className="flex items-center space-x-2 md:space-x-4">
              {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isPast = steps.findIndex(s => s.id === currentStep) > index;
                const isFuture = steps.findIndex(s => s.id === currentStep) < index;
                
                return (
                  <li key={step.id} className="flex items-center">
                    {index > 0 && (
                      <div className={`h-px w-8 md:w-12 mr-2 md:mr-4 ${
                        isPast ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                    )}
                    
                    <button
                      onClick={() => onStepClick(step.id)}
                      disabled={isFuture || isProcessing}
                      className={`flex items-center ${
                        isActive 
                          ? 'text-white bg-blue-600' 
                          : isPast 
                            ? 'text-blue-600 bg-blue-100 hover:bg-blue-200' 
                            : 'text-gray-500 bg-gray-100'
                      } ${
                        isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      } rounded-full p-2 transition-colors duration-200`}
                    >
                      {step.icon}
                    </button>
                    
                    <span className={`ml-2 text-sm font-medium hidden md:inline-block ${
                      isActive ? 'text-blue-600' : isPast ? 'text-blue-500' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
};