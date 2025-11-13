import React from 'react';

const PrayerTime = ({ 
  prayerTimes,
  currentPrayer,
  location = "Mecca",
  date 
}) => {
  const prayers = [
    { key: 'fajr', name: 'Fajr', icon: '🌅' },
    { key: 'dhuhr', name: 'Dhuhr', icon: '☀️' },
    { key: 'asr', name: 'Asr', icon: '⛅' },
    { key: 'maghrib', name: 'Maghrib', icon: '🌇' },
    { key: 'isha', name: 'Isha', icon: '🌙' },
  ];

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Prayer Times</h3>
          <p className="text-sm text-gray-600">
            {location} • {date}
          </p>
        </div>
        <div className="text-2xl">🕌</div>
      </div>

      {/* Prayer Times */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {prayers.map((prayer) => (
          <div
            key={prayer.key}
            className={`
              p-4 rounded-lg text-center transition-all
              ${currentPrayer === prayer.key
                ? 'bg-primary-50 border-2 border-primary-500 transform scale-105'
                : 'bg-gray-50 border border-gray-200'
              }
            `}
          >
            <div className="text-2xl mb-2">{prayer.icon}</div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              {prayer.name}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {prayerTimes[prayer.key]}
            </div>
            {currentPrayer === prayer.key && (
              <div className="mt-2">
                <span className="inline-block w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Iqama Times</span>
          <span>Updated daily</span>
        </div>
      </div>
    </div>
  );
};

export default PrayerTime;