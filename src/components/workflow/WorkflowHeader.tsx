import React from 'react';
import { FileText, FileSearch, Database, FileOutput } from 'lucide-react';
import { WorkflowStep as WorkflowStepType } from '../../types';
import { WorkflowStep } from './WorkflowStep';

interface WorkflowHeaderProps {
  currentStep: WorkflowStepType;
  isProcessing: boolean;
  onStepClick: (step: WorkflowStepType) => void;
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ 
  currentStep, 
  isProcessing,
  onStepClick 
}) => {
  const steps = [
    { 
      id: 'upload' as WorkflowStepType, 
      label: 'Téléversement', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      id: 'analyze' as WorkflowStepType, 
      label: 'Analyse', 
      icon: <FileSearch className="h-5 w-5" /> 
    },
    { 
      id: 'normalize' as WorkflowStepType, 
      label: 'Uniformisation', 
      icon: <Database className="h-5 w-5" /> 
    },
    { 
      id: 'export' as WorkflowStepType, 
      label: 'Exportation', 
      icon: <FileOutput className="h-5 w-5" /> 
    },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 md:mb-0">
            AnalysePDF
          </h1>

          <nav>
            <ol className="flex items-center space-x-2 md:space-x-4">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  {index > 0 && (
                    <div className={`h-px w-8 md:w-12 mr-2 md:mr-4 ${
                      index <= currentStepIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                  )}
                  
                  <WorkflowStep
                    step={step}
                    isActive={currentStep === step.id}
                    isPast={currentStepIndex >= index}
                    isProcessing={isProcessing}
                    onClick={() => onStepClick(step.id)}
                  />
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
};