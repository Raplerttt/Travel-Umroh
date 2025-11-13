import { useState, useEffect } from 'react';
import { bookingService } from '../services';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

export const useBooking = () => {
  const { showNotification } = useApp();
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user's bookings
  const getUserBookings = async (params = {}) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingService.getUserBookings(params);
      setUserBookings(response.data || response);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load bookings';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get booking by ID
  const getBookingById = async (id) => {
    setIsLoading(true);
    try {
      const response = await bookingService.getBookingById(id);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load booking details';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create new booking
  const createBooking = async (bookingData) => {
    setIsLoading(true);
    try {
      const response = await bookingService.createBooking(bookingData);
      showNotification('Booking created successfully', 'success');
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create booking';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel booking
  const cancelBooking = async (id, reason = '') => {
    setIsLoading(true);
    try {
      const response = await bookingService.cancelBooking(id, reason);
      setUserBookings(prev => prev.map(booking => 
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      ));
      showNotification('Booking cancelled successfully', 'success');
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to cancel booking';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload payment proof
  const uploadPaymentProof = async (id, file) => {
    setIsLoading(true);
    try {
      const response = await bookingService.uploadPaymentProof(id, file);
      showNotification('Payment proof uploaded successfully', 'success');
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to upload payment proof';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate booking total
  const calculateTotal = async (bookingData) => {
    try {
      const response = await bookingService.calculateTotal(bookingData);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to calculate total';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    }
  };

  // Check availability
  const checkAvailability = async (packageId, date, paxCount) => {
    try {
      const response = await bookingService.checkBookingAvailability(packageId, date, paxCount);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to check availability';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    }
  };

  // Load user bookings on mount if user is authenticated
  useEffect(() => {
    if (user) {
      getUserBookings();
    }
  }, [user]);

  return {
    userBookings,
    isLoading,
    error,
    getUserBookings,
    getBookingById,
    createBooking,
    cancelBooking,
    uploadPaymentProof,
    calculateTotal,
    checkAvailability,
    refetch: getUserBookings
  };
};

export default useBooking;