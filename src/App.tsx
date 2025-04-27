import React from 'react';
import { Layout } from './components/Layout/Layout';
import { WorkflowManager } from './components/workflow/WorkflowManager';

function App() {
  const {
    currentStep,
    isProcessing,
    setCurrentStep,
    renderCurrentStep
  } = WorkflowManager();

  return (
    <Layout
      currentStep={currentStep}
      isProcessing={isProcessing}
      onStepClick={setCurrentStep}
    >
      {renderCurrentStep()}
    </Layout>
  );
}

export default App;