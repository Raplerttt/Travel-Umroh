import { useState, useEffect } from 'react';
import { scheduleService } from '../services';
import { useApp } from '../contexts/AppContext';

export const useSchedule = () => {
  const { showNotification } = useApp();
  const [schedules, setSchedules] = useState([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [departureMonths, setDepartureMonths] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all schedules
  const getSchedules = async (params = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await scheduleService.getSchedules(params);
      setSchedules(response.data || response);
      if (response.departureMonths) {
        setDepartureMonths(response.departureMonths);
      }
      if (response.airlines) {
        setAirlines(response.airlines);
      }
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal memuat jadwal';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get schedule by ID
  const getScheduleById = async (id) => {
    setIsLoading(true);
    try {
      const response = await scheduleService.getScheduleById(id);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal memuat detail jadwal';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get schedules by package
  const getSchedulesByPackage = async (packageId) => {
    setIsLoading(true);
    try {
      const response = await scheduleService.getSchedulesByPackage(packageId);
      setSchedules(response.data || response);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal memuat jadwal paket';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check availability
  const checkAvailability = async (scheduleId, paxCount = 1) => {
    try {
      const response = await scheduleService.checkAvailability(scheduleId, paxCount);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal memeriksa ketersediaan';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    }
  };

  // Get upcoming schedules
  const getUpcomingSchedules = async (limit = 6) => {
    try {
      const response = await scheduleService.getUpcomingSchedules(limit);
      setUpcomingSchedules(response.data || response);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal memuat jadwal mendatang';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    }
  };

  // Book schedule
  const bookSchedule = async (scheduleId, bookingData) => {
    setIsLoading(true);
    try {
      const response = await scheduleService.bookSchedule(scheduleId, bookingData);
      showNotification('Booking berhasil dibuat', 'success');
      // Refresh schedules after booking
      await getSchedules();
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal melakukan booking';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    getSchedules();
    getUpcomingSchedules();
  }, []);

  return {
    schedules,
    upcomingSchedules,
    departureMonths,
    airlines,
    isLoading,
    error,
    getSchedules,
    getScheduleById,
    getSchedulesByPackage,
    checkAvailability,
    getUpcomingSchedules,
    bookSchedule,
    refetch: getSchedules
  };
};

export default useSchedule;