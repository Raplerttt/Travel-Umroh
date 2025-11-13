import React, { useState } from 'react';

const HajjGuide = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Ihram",
      description: "Entering the state of consecration",
      details: "Perform ghusl, wear Ihram clothing, and make the intention for Hajj.",
      tips: [
        "Trim nails and remove unwanted hair before Ihram",
        "Avoid using scented products",
        "Recite Talbiyah frequently"
      ]
    },
    {
      title: "Tawaf",
      description: "Circling the Kaaba seven times",
      details: "Start from the Black Stone and circle the Kaaba counterclockwise.",
      tips: [
        "Keep the Kaaba on your left side",
        "Recite specific supplications during Tawaf",
        "Perform two rak'ahs after Tawaf"
      ]
    },
    {
      title: "Sa'i",
      description: "Walking between Safa and Marwah",
      details: "Walk seven times between the hills of Safa and Marwah.",
      tips: [
        "Start at Safa and end at Marwah",
        "Men should run between the green lights",
        "Make supplications at Safa and Marwah"
      ]
    },
    {
      title: "Arafat",
      description: "Standing at Mount Arafat",
      details: "Spend the day in prayer and supplication at Arafat.",
      tips: [
        "This is the most important day of Hajj",
        "Spend time in sincere repentance",
        "Make abundant dua until sunset"
      ]
    },
    {
      title: "Muzdalifah",
      description: "Collecting pebbles for stoning",
      details: "Spend the night under the open sky and collect pebbles.",
      tips: [
        "Collect 49-70 pebbles for stoning",
        "Perform Maghrib and Isha together",
        "Rest and prepare for the next day"
      ]
    },
    {
      title: "Ramy al-Jamarat",
      description: "Stoning the pillars",
      details: "Throw pebbles at the three pillars in Mina.",
      tips: [
        "Stone the pillars after sunrise",
        "Recite Takbir with each throw",
        "Face the Qibla while stoning"
      ]
    },
    {
      title: "Sacrifice",
      description: "Offering animal sacrifice",
      details: "Sacrifice an animal or donate for sacrifice.",
      tips: [
        "Can be done personally or through agents",
        "Distribute meat to the poor",
        "Shave or trim hair after sacrifice"
      ]
    },
    {
      title: "Farewell Tawaf",
      description: "Final circling of the Kaaba",
      details: "Perform the final Tawaf before leaving Mecca.",
      tips: [
        "This is the last ritual of Hajj",
        "Must be done before leaving Mecca",
        "No Sa'i required after this Tawaf"
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Hajj Step-by-Step Guide</h3>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {activeStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((activeStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-6 p-6 bg-primary-50 rounded-lg border border-primary-200">
        <h4 className="text-lg font-semibold text-primary-900 mb-2">
          {steps[activeStep].title}
        </h4>
        <p className="text-primary-700 mb-3">{steps[activeStep].description}</p>
        <p className="text-gray-700 mb-4">{steps[activeStep].details}</p>
        
        <div className="bg-white rounded p-4">
          <h5 className="font-semibold text-gray-900 mb-2">Important Tips:</h5>
          <ul className="space-y-1">
            {steps[activeStep].tips.map((tip, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Step Indicators */}
      <div className="mt-6 flex justify-center space-x-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeStep ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HajjGuide;