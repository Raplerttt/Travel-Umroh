import React, { useState } from 'react';

const PrayerTime = ({ 
  prayerTimes,
  currentPrayer,
  location = "Mecca",
  date 
}) => {
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Riyadh');
  
  const prayers = [
    { key: 'fajr', name: 'Fajr', icon: '🌅' },
    { key: 'dhuhr', name: 'Dhuhr', icon: '☀️' },
    { key: 'asr', name: 'Asr', icon: '⛅' },
    { key: 'maghrib', name: 'Maghrib', icon: '🌇' },
    { key: 'isha', name: 'Isha', icon: '🌙' },
  ];

  const timezones = [
    { value: 'Asia/Riyadh', label: 'Arabia Standard Time' },
    { value: 'Asia/Dubai', label: 'Gulf Standard Time' },
    { value: 'Asia/Jakarta', label: 'Western Indonesia Time' },
    { value: 'Asia/Kuala_Lumpur', label: 'Malaysia Time' },
    { value: 'Europe/London', label: 'GMT' },
    { value: 'America/New_York', label: 'Eastern Time' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Prayer Times</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="text-primary-600">📍 {location}</span>
            <span>•</span>
            <span className="font-medium">{date}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Timezone Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="timezone" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Timezone:
            </label>
            <select
              id="timezone"
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-3xl">🕌</div>
        </div>
      </div>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {prayers.map((prayer) => (
          <div
            key={prayer.key}
            className={`
              p-4 rounded-xl text-center transition-all duration-300 ease-in-out
              ${currentPrayer === prayer.key
                ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-400 shadow-md'
                : 'bg-gray-50 border border-gray-100 hover:shadow-sm'
              }
            `}
          >
            <div className="text-2xl mb-3">{prayer.icon}</div>
            <div className="text-sm font-semibold text-gray-700 mb-2">
              {prayer.name}
            </div>
            <div className={`
              text-lg font-bold mb-1
              ${currentPrayer === prayer.key ? 'text-primary-700' : 'text-gray-900'}
            `}>
              {prayerTimes[prayer.key]}
            </div>
            {currentPrayer === prayer.key && (
              <div className="flex justify-center items-center gap-1 mt-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                <span className="text-xs text-primary-600 font-medium">Now</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTime;