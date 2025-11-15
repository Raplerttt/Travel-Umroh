// components/PrayerTimeBar.jsx
import React from 'react';
import { usePrayerTime } from '../../../contexts/PrayerTimeContext';

export const PrayerTimeBar = () => {
  const { prayerTimes, currentPrayer, location, selectedTimezone } = usePrayerTime();
  
  const prayers = [
    { key: 'fajr', name: 'Fajr', icon: '🌙', timeLabel: 'Subuh' },
    { key: 'sunrise', name: 'Sunrise', icon: '🌅', timeLabel: 'Syuruq' },
    { key: 'dhuhr', name: 'Dhuhr', icon: '☀️', timeLabel: 'Dzuhur' },
    { key: 'asr', name: 'Asr', icon: '⛅', timeLabel: 'Ashar' },
    { key: 'maghrib', name: 'Maghrib', icon: '🌇', timeLabel: 'Maghrib' },
    { key: 'isha', name: 'Isha', icon: '🌌', timeLabel: 'Isya' },
  ];

  // Format waktu lokal dengan timezone
  const formatLocalTime = (date) => {
    return date.toLocaleDateString('id-ID', {
      timeZone: selectedTimezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentTime = new Date();
  const localDateTime = formatLocalTime(currentTime);

  // Warna gradient berdasarkan waktu
  const getTimeBasedGradient = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return 'from-blue-50 to-amber-50'; // Pagi
    if (hour >= 12 && hour < 17) return 'from-amber-50 to-orange-50'; // Siang
    if (hour >= 17 && hour < 19) return 'from-orange-50 to-purple-50'; // Sore
    return 'from-purple-50 to-blue-100'; // Malam
  };

  return (
    <div className={`bg-gradient-to-r ${getTimeBasedGradient()} border-b border-gray-200/50 px-4 py-4 backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Header Info - Compact */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">
                  {location.split(',')[0]} {/* Hanya nama kota */}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {localDateTime.split(',')[0]} {/* Hari saja */}
              </div>
            </div>
          </div>

          {/* Prayer Times - Horizontal Scroll */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {prayers.map((prayer) => {
                const isActive = currentPrayer === prayer.key;
                const isNext = prayerTimes[prayer.key] && 
                  new Date(`${new Date().toDateString()} ${prayerTimes[prayer.key]}`) > currentTime;
                
                return (
                  <div
                    key={prayer.key}
                    className={`
                      flex flex-col items-center p-3 rounded-2xl min-w-[80px] transition-all duration-300
                      border-2 backdrop-blur-sm
                      ${isActive 
                        ? 'bg-white/80 border-emerald-500 shadow-lg scale-105' 
                        : isNext
                        ? 'bg-white/60 border-emerald-200 shadow-md'
                        : 'bg-white/40 border-gray-200/50'
                      }
                      hover:shadow-lg hover:scale-105
                    `}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm">{prayer.icon}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                      )}
                    </div>
                    
                    <div className="text-center">
                      <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                        {prayer.timeLabel}
                      </div>
                      <div className={`
                        text-sm font-bold mt-1
                        ${isActive ? 'text-emerald-700' : 'text-gray-800'}
                      `}>
                        {prayerTimes[prayer.key]?.substring(0, 5) || '--:--'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timezone & Current Time */}
          <div className="flex flex-col items-end flex-shrink-0">
            <div className="text-xs font-mono font-semibold text-gray-700 bg-white/60 px-2 py-1 rounded-lg">
              {localDateTime.split(',')[1]?.trim()} {/* Waktu saat ini */}
            </div>
            <div className="text-[10px] text-gray-500 mt-1 bg-white/40 px-2 py-1 rounded">
              {selectedTimezone}
            </div>
          </div>
        </div>

        {/* Progress Bar untuk waktu menuju sholat berikutnya */}
        <div className="mt-3 w-full bg-gray-200/50 rounded-full h-1">
          <div 
            className="bg-emerald-500 h-1 rounded-full transition-all duration-1000"
            style={{ width: '30%' }} // Ganti dengan progress aktual
          />
        </div>
      </div>
    </div>
  );
};