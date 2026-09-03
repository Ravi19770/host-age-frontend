import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps = 5 }) => {
  return (
    <div className="flex items-center justify-center mb-12">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;
        
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  isCompleted
                    ? 'bg-[#2563EB] text-white'
                    : isCurrent
                    ? 'bg-[#2563EB] text-white ring-4 ring-blue-100'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : step}
              </div>
              <div className="mt-2 text-xs font-medium text-slate-600">
                Step {step}
              </div>
            </div>
            {step < totalSteps && (
              <div
                className={`w-16 h-1 mx-2 transition-all ${
                  isCompleted ? 'bg-[#2563EB]' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;