import React from 'react';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'pending' | 'processing' | 'complete' | 'error';

interface StatusIconProps {
  status: Status;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
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