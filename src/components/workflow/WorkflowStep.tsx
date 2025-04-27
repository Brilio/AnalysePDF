import React from 'react';
import { FileText, FileSearch, Database, FileOutput } from 'lucide-react';
import { WorkflowStep as WorkflowStepType } from '../../types';

interface WorkflowStepProps {
  step: {
    id: WorkflowStepType;
    label: string;
    icon: React.ReactNode;
  };
  isActive: boolean;
  isPast: boolean;
  isProcessing: boolean;
  onClick: () => void;
}

export const WorkflowStep: React.FC<WorkflowStepProps> = ({
  step,
  isActive,
  isPast,
  isProcessing,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={!isPast || isProcessing}
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
      <span className={`ml-2 text-sm font-medium hidden md:inline-block ${
        isActive ? 'text-blue-600' : isPast ? 'text-blue-500' : 'text-gray-500'
      }`}>
        {step.label}
      </span>
    </button>
  );
};