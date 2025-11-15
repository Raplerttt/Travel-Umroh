import React, { createContext, useContext, useState, useEffect } from 'react';

const PrayerTimeContext = createContext();

export const usePrayerTime = () => {
  const context = useContext(PrayerTimeContext);
  if (!context) {
    throw new Error('usePrayerTime must be used within a PrayerTimeProvider');
  }
  return context;
};

export const PrayerTimeProvider = ({ children }) => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState('');
  const [location, setLocation] = useState('Loading location...');
  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  // Get user location permission
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        setIsLoading(true);
        setLocationError(null);

        if (!navigator.geolocation) {
          throw new Error('Geolocation is not supported by this browser');
        }

        // Request location permission
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          });
        });

        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });

        // Reverse geocoding to get location name
        const locationName = await getLocationName(latitude, longitude);
        setLocation(locationName);

        // Auto-detect timezone based on coordinates
        const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setSelectedTimezone(detectedTimezone);

      } catch (error) {
        console.error('Error getting location:', error);
        setLocationError(error.message);
        setLocation('Mecca, Saudi Arabia'); // Fallback location
        setSelectedTimezone('Asia/Riyadh'); // Fallback timezone
      } finally {
        setIsLoading(false);
      }
    };

    getUserLocation();
  }, []);

  // Get location name from coordinates using reverse geocoding
  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      return `${data.city || data.locality}, ${data.countryName}`;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  };

  // Fetch prayer times based on coordinates
  useEffect(() => {
    if (!coordinates) return;

    const fetchPrayerTimes = async () => {
      try {
        const { latitude, longitude } = coordinates;
        
        // Using Aladhan API for prayer times
        const today = new Date();
        const dateString = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${dateString}?latitude=${latitude}&longitude=${longitude}&method=2`
        );

        if (!response.ok) throw new Error('Failed to fetch prayer times');

        const data = await response.json();
        const timings = data.data.timings;

        const formattedPrayerTimes = {
          fajr: formatTime(timings.Fajr),
          sunrise: formatTime(timings.Sunrise),
          dhuhr: formatTime(timings.Dhuhr),
          asr: formatTime(timings.Asr),
          maghrib: formatTime(timings.Maghrib),
          isha: formatTime(timings.Isha)
        };

        setPrayerTimes(formattedPrayerTimes);
        
        // Determine current prayer
        determineCurrentPrayer(formattedPrayerTimes);

      } catch (error) {
        console.error('Error fetching prayer times:', error);
        // Fallback to mock data
        const mockPrayerTimes = {
          fajr: '05:30',
          sunrise: '06:45',
          dhuhr: '12:15',
          asr: '15:45',
          maghrib: '18:20',
          isha: '19:45'
        };
        setPrayerTimes(mockPrayerTimes);
        determineCurrentPrayer(mockPrayerTimes);
      }
    };

    fetchPrayerTimes();

    // Update current prayer every minute
    const interval = setInterval(() => {
      determineCurrentPrayer(prayerTimes);
    }, 60000);

    return () => clearInterval(interval);
  }, [coordinates]);

  // Helper function to format time
  const formatTime = (timeString) => {
    return timeString.substring(0, 5); // Extract HH:MM format
  };

  // Determine current prayer based on current time
  const determineCurrentPrayer = (times) => {
    const now = new Date();
    const currentTime = now.toTimeString().substring(0, 5); // HH:MM format

    const prayerSequence = [
      { key: 'fajr', time: times.fajr },
      { key: 'sunrise', time: times.sunrise },
      { key: 'dhuhr', time: times.dhuhr },
      { key: 'asr', time: times.asr },
      { key: 'maghrib', time: times.maghrib },
      { key: 'isha', time: times.isha }
    ];

    let current = '';
    
    for (let i = prayerSequence.length - 1; i >= 0; i--) {
      if (currentTime >= prayerSequence[i].time) {
        current = prayerSequence[i].key;
        break;
      }
    }

    // If before fajr, then it's isha of previous day
    if (!current && currentTime < times.fajr) {
      current = 'isha';
    }

    setCurrentPrayer(current || 'fajr');
  };

  // Manual location update function (optional)
  const updateLocation = async (newLatitude, newLongitude) => {
    try {
      setIsLoading(true);
      setCoordinates({ latitude: newLatitude, longitude: newLongitude });
      const locationName = await getLocationName(newLatitude, newLongitude);
      setLocation(locationName);
    } catch (error) {
      setLocationError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    prayerTimes,
    currentPrayer,
    location,
    coordinates,
    selectedTimezone,
    isLoading,
    locationError,
    updateLocation
  };

  return (
    <PrayerTimeContext.Provider value={value}>
      {children}
    </PrayerTimeContext.Provider>
  );
};