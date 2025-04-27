import React from 'react';
import { WorkflowHeader } from '../workflow/WorkflowHeader';
import { WorkflowStep } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: WorkflowStep;
  isProcessing: boolean;
  onStepClick: (step: WorkflowStep) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentStep,
  isProcessing,
  onStepClick
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <WorkflowHeader 
        currentStep={currentStep} 
        isProcessing={isProcessing}
        onStepClick={(step) => {
          if (!isProcessing) {
            onStepClick(step);
          }
        }}
      />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-4 px-6 bg-white shadow-inner">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © 2025 AnalysePDF - Extraction intelligente de données
        </div>
      </footer>
    </div>
  );
}; 