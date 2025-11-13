import React from 'react';

const BookingSteps = ({ 
  currentStep = 1,
  steps = [
    { number: 1, title: 'Package Selection', description: 'Choose your package' },
    { number: 2, title: 'Passenger Details', description: 'Add passenger information' },
    { number: 3, title: 'Review & Confirm', description: 'Verify your booking' },
    { number: 4, title: 'Payment', description: 'Complete payment' },
  ]
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            {/* Step connector */}
            {index > 0 && (
              <div
                className={`w-full h-1 absolute top-4 -z-10 ${
                  step.number <= currentStep ? 'bg-primary-500' : 'bg-gray-200'
                }`}
                style={{ 
                  left: `-50%`,
                  transform: 'translateX(-50%)'
                }}
              />
            )}
            
            {/* Step circle */}
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center border-2 
                transition-colors relative z-10
                ${
                  step.number < currentStep
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : step.number === currentStep
                    ? 'bg-white border-primary-500 text-primary-500'
                    : 'bg-white border-gray-300 text-gray-500'
                }
              `}
            >
              {step.number < currentStep ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-semibold">{step.number}</span>
              )}
            </div>

            {/* Step text */}
            <div className="mt-2 text-center">
              <div
                className={`
                  text-sm font-medium
                  ${
                    step.number <= currentStep
                      ? 'text-primary-600'
                      : 'text-gray-500'
                  }
                `}
              >
                {step.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default BookingSteps;