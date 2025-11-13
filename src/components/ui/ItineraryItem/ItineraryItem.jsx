import React from 'react';

const ItineraryItem = ({ 
  day,
  title,
  description,
  activities = [],
  meals = {},
  accommodations,
  isFirst = false,
  isLast = false
}) => {
  return (
    <div className="flex">
      {/* Timeline line */}
      <div className="flex flex-col items-center mr-6">
        <div className={`w-1 bg-primary-200 flex-1 ${isFirst ? 'rounded-t-full' : ''} ${isLast ? 'rounded-b-full' : ''}`} />
        <div className="w-8 h-8 rounded-full bg-primary-500 border-4 border-white shadow-sm flex items-center justify-center">
          <span className="text-white text-sm font-semibold">{day}</span>
        </div>
        <div className={`w-1 bg-primary-200 flex-1 ${isFirst ? 'rounded-t-full' : ''} ${isLast ? 'rounded-b-full' : ''}`} />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Day {day}: {title}
          </h3>
          
          {description && (
            <p className="text-gray-600 mb-4">
              {description}
            </p>
          )}

          {/* Activities */}
          {activities.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Activities:</h4>
              <ul className="space-y-1">
                {activities.map((activity, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meals */}
          {(meals.breakfast || meals.lunch || meals.dinner) && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Meals:</h4>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {meals.breakfast && <span>🍳 Breakfast</span>}
                {meals.lunch && <span>🍽️ Lunch</span>}
                {meals.dinner && <span>🍲 Dinner</span>}
              </div>
            </div>
          )}

          {/* Accommodations */}
          {accommodations && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Accommodation:</h4>
              <p className="text-sm text-gray-600">{accommodations}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryItem;