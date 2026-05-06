
import React from 'react';
import { Icons } from './Icons';

type Status = 'applied' | 'viewed' | 'screening' | 'interview' | 'offer' | 'rejected';

interface TimelineProps {
  status: string; // Using string to accommodate the loose typing from DB for now
  dates?: { [key: string]: string };
}

export const ApplicationTimeline = ({ status }: TimelineProps) => {
  const steps: { id: Status; label: string; icon: any }[] = [
    { id: 'applied', label: 'Applied', icon: Icons.FileText },
    { id: 'viewed', label: 'Viewed', icon: Icons.CheckCircle },
    { id: 'screening', label: 'Screening', icon: Icons.Search },
    { id: 'interview', label: 'Interview', icon: Icons.MessageSquare },
    { id: 'offer', label: 'Offer', icon: Icons.Star },
  ];

  // Map current status to index
  const getCurrentStepIndex = (s: string) => {
    if (s === 'rejected') return -1; // Special case
    const idx = steps.findIndex(step => step.id === s);
    return idx === -1 ? 0 : idx;
  };

  const currentIndex = getCurrentStepIndex(status);

  if (status === 'rejected') {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-800">
        <Icons.X className="w-5 h-5" />
        <span className="font-medium">Application Rejected</span>
      </div>
    );
  }

  // Calculate percentage width for the progress bar
  // If status is not found (e.g. 'shortlisted'), default to 0
  const progressPercentage = currentIndex >= 0 
    ? (currentIndex / (steps.length - 1)) * 100 
    : 0;

  return (
    <div className="w-full py-4">
      <div className="relative flex justify-between items-center">
        {/* Background Line */}
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 dark:bg-gray-600 -z-10 transform -translate-y-1/2 rounded-full"></div>
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-4 left-0 h-1 bg-green-500 -z-10 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>

        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 relative z-10 group">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white shadow-md shadow-green-200 dark:shadow-none' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-500'
                }`}
              >
                {isCompleted ? <Icons.CheckCircle className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-medium transition-colors ${
                isCurrent 
                  ? 'text-green-600 dark:text-green-400 font-bold' 
                  : isCompleted 
                    ? 'text-gray-700 dark:text-gray-300' 
                    : 'text-gray-400 dark:text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
