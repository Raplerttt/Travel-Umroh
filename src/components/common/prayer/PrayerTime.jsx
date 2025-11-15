// components/PrayerTimeBar.jsx
import React, { useState, useEffect } from 'react';
import { usePrayerTime } from '../../../contexts/PrayerTimeContext';

export const PrayerTimeBar = () => {
  const { prayerTimes, currentPrayer, location, selectedTimezone } = usePrayerTime();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const prayers = [
    { key: 'fajr', name: 'Fajr', icon: '🌙', timeLabel: 'Subuh' },
    { key: 'sunrise', name: 'Sunrise', icon: '🌅', timeLabel: 'Syuruq' },
    { key: 'dhuhr', name: 'Dhuhr', icon: '☀️', timeLabel: 'Dzuhur' },
    { key: 'asr', name: 'Asr', icon: '⛅', timeLabel: 'Ashar' },
    { key: 'maghrib', name: 'Maghrib', icon: '🌇', timeLabel: 'Maghrib' },
    { key: 'isha', name: 'Isha', icon: '🌌', timeLabel: 'Isya' },
  ];

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format waktu lokal dengan timezone
  const formatLocalTime = (date) => {
    return date.toLocaleDateString('id-ID', {
      timeZone: selectedTimezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const localDateTime = formatLocalTime(currentTime);

  // Format responsive untuk semua layar
  const formatResponsiveDate = (dateString) => {
    const parts = dateString.split(/,\s|\s/);
    const day = parts[0];
    const date = parts[1];
    const month = parts[2];
    const year = parts[3];
    const time = parts.slice(4).join(' ');
    
    return {
      dayFull: day,
      dayShort: day.substring(0, 3),
      date: `${date} ${month}`,
      dateShort: `${date} ${month.substring(0, 3)}`,
      time: time,
      timeWithoutSeconds: time.replace(/:\d{2}$/, '') // Remove seconds for some displays
    };
  };

  const responsiveDate = formatResponsiveDate(localDateTime);

  // Format jam untuk tampilan real-time
  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      timeZone: selectedTimezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const currentTimeFormatted = formatTime(currentTime);

  // Warna gradient berdasarkan waktu
  const getTimeBasedGradient = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return 'from-blue-50 to-amber-50';
    if (hour >= 12 && hour < 17) return 'from-amber-50 to-orange-50';
    if (hour >= 17 && hour < 19) return 'from-orange-50 to-purple-50';
    return 'from-purple-50 to-blue-100';
  };

  return (
    <div className={`bg-gradient-to-r ${getTimeBasedGradient()} border-b border-gray-200/50 backdrop-blur-sm safe-area-top`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between px-6 py-4">
            
            {/* Location & Date - Desktop */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <div className="flex flex-col">
                  <div className="text-lg font-semibold text-gray-800">
                    {location.split(',')[0]}
                  </div>
                  <div className="text-sm text-gray-600">
                    {responsiveDate.dayFull}, {responsiveDate.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times - Desktop Grid */}
            <div className="flex-1 max-w-2xl">
              <div className="grid grid-cols-6 gap-4 px-8">
                {prayers.map((prayer) => {
                  const isActive = currentPrayer === prayer.key;
                  const isNext = prayerTimes[prayer.key] && 
                    new Date(`${new Date().toDateString()} ${prayerTimes[prayer.key]}`) > currentTime;
                  
                  return (
                    <div
                      key={prayer.key}
                      className={`
                        flex flex-col items-center p-4 rounded-2xl transition-all duration-300
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{prayer.icon}</span>
                        {isActive && (
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        )}
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                          {prayer.timeLabel}
                        </div>
                        <div className={`
                          text-lg font-bold mt-2
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

            {/* Current Time & Timezone - Desktop */}
            <div className="flex flex-col items-end flex-shrink-0">
              {/* Real-time Clock */}
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl font-mono font-bold text-gray-800 bg-white/70 px-4 py-3 rounded-xl shadow-sm min-w-[140px] text-center">
                  {currentTimeFormatted}
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-white/40 px-3 py-1 rounded">
                {selectedTimezone}
              </div>
            </div>
          </div>

          {/* Progress Bar - Desktop */}
          <div className="px-6 pb-4">
            <div className="max-w-2xl mx-auto">
              <div className="w-full bg-gray-200/50 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: '30%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            
            {/* Location & Date - Tablet */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-lg">📍</span>
              <div className="flex flex-col">
                <div className="text-base font-semibold text-gray-800">
                  {location.split(',')[0]}
                </div>
                <div className="text-xs text-gray-600">
                  {responsiveDate.dayShort}, {responsiveDate.dateShort}
                </div>
              </div>
            </div>

            {/* Prayer Times - Tablet Scroll */}
            <div className="flex-1 min-w-0 mx-4">
              <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {prayers.map((prayer) => {
                  const isActive = currentPrayer === prayer.key;
                  const isNext = prayerTimes[prayer.key] && 
                    new Date(`${new Date().toDateString()} ${prayerTimes[prayer.key]}`) > currentTime;
                  
                  return (
                    <div
                      key={prayer.key}
                      className={`
                        flex flex-col items-center p-3 rounded-xl min-w-[80px] transition-all duration-300 flex-shrink-0
                        border backdrop-blur-sm
                        ${isActive 
                          ? 'bg-white/80 border-emerald-500 shadow-md scale-105' 
                          : isNext
                          ? 'bg-white/60 border-emerald-200 shadow-sm'
                          : 'bg-white/40 border-gray-200/50'
                        }
                        hover:shadow-md hover:scale-105
                      `}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-sm">{prayer.icon}</span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        )}
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
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

            {/* Current Time & Timezone - Tablet */}
            <div className="flex flex-col items-end flex-shrink-0">
              {/* Real-time Clock */}
              <div className="text-xl font-mono font-semibold text-gray-800 bg-white/60 px-3 py-2 rounded-lg shadow-sm min-w-[100px] text-center mb-1">
                {currentTimeFormatted}
              </div>
              <div className="text-xs text-gray-500 bg-white/40 px-2 py-1 rounded truncate max-w-[120px]">
                {selectedTimezone.split('/').pop()}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="px-3 py-3">
            
            {/* Top Row - Location & Time - Mobile */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-shrink-0 max-w-[50%]">
                <span className="text-base flex-shrink-0">📍</span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-gray-800 truncate">
                    {location.split(',')[0]}
                  </div>
                  <div className="text-[10px] text-gray-600 truncate">
                    {responsiveDate.dayShort}, {responsiveDate.dateShort}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end flex-shrink-0">
                {/* Real-time Clock - Mobile */}
                <div className="text-sm font-mono font-bold text-gray-800 bg-white/60 px-2 py-1.5 rounded-lg shadow-sm min-w-[70px] text-center mb-1">
                  {currentTimeFormatted.split(':').slice(0, 2).join(':')}
                </div>
                <div className="text-[9px] text-gray-500 bg-white/40 px-1.5 py-0.5 rounded truncate max-w-[80px]">
                  {selectedTimezone.split('/').pop()}
                </div>
              </div>
            </div>

            {/* Prayer Times - Horizontal Scroll - Mobile */}
            <div className="relative">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
                {prayers.map((prayer) => {
                  const isActive = currentPrayer === prayer.key;
                  const isNext = prayerTimes[prayer.key] && 
                    new Date(`${new Date().toDateString()} ${prayerTimes[prayer.key]}`) > currentTime;
                  
                  return (
                    <div
                      key={prayer.key}
                      className={`
                        flex flex-col items-center p-2 rounded-xl min-w-[60px] transition-all duration-300 flex-shrink-0
                        border backdrop-blur-sm
                        ${isActive 
                          ? 'bg-white/80 border-emerald-500 shadow-md scale-105' 
                          : isNext
                          ? 'bg-white/60 border-emerald-200 shadow-sm'
                          : 'bg-white/40 border-gray-200/50'
                        }
                        hover:shadow-md hover:scale-105
                      `}
                    >
                      <div className="flex items-center gap-0.5 mb-0.5">
                        <span className="text-xs">{prayer.icon}</span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        )}
                      </div>
                      
                      <div className="text-center min-w-0 w-full">
                        <div className="text-[9px] font-semibold text-gray-600 uppercase tracking-tight leading-tight">
                          {prayer.timeLabel.length > 5 ? prayer.timeLabel.substring(0, 5) : prayer.timeLabel}
                        </div>
                        <div className={`
                          text-xs font-bold mt-0.5
                          ${isActive ? 'text-emerald-700' : 'text-gray-800'}
                        `}>
                          {prayerTimes[prayer.key]?.substring(0, 5) || '--:--'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
            </div>

            {/* Progress Bar - Mobile */}
            <div className="mt-2 w-full bg-gray-200/30 rounded-full h-0.5">
              <div 
                className="bg-emerald-500 h-0.5 rounded-full transition-all duration-1000"
                style={{ width: '30%' }}
              />
            </div>
          </div>
        </div>

        {/* Current Prayer Indicator - All Sizes */}
        {currentPrayer && (
          <div className="border-t border-gray-200/50">
            <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 py-2">
              <div className="flex items-center justify-center">
                <div className="bg-emerald-500/10 border border-emerald-200 rounded-full px-3 py-1.5 md:px-4 md:py-2">
                  <span className="text-[10px] md:text-xs font-semibold text-emerald-700 flex items-center gap-2">
                    <span className="text-sm md:text-base">🕌</span>
                    <span>Waktu {prayers.find(p => p.key === currentPrayer)?.timeLabel} Berlangsung</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};