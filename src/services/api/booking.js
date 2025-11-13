import { http } from '../httpClient';

const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    const response = await http.post('/bookings', bookingData);
    return response.data;
  },

  // Get user's bookings
  getUserBookings: async (params = {}) => {
    const response = await http.get('/bookings/my-bookings', { params });
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await http.get(`/bookings/${id}`);
    return response.data;
  },

  // Update booking
  updateBooking: async (id, updateData) => {
    const response = await http.put(`/bookings/${id}`, updateData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id, reason = '') => {
    const response = await http.post(`/bookings/${id}/cancel`, { reason });
    return response.data;
  },

  // Get booking payment info
  getBookingPayment: async (id) => {
    const response = await http.get(`/bookings/${id}/payment`);
    return response.data;
  },

  // Upload payment proof
  uploadPaymentProof: async (id, file) => {
    const formData = new FormData();
    formData.append('paymentProof', file);

    const response = await http.post(`/bookings/${id}/payment-proof`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get booking timeline
  getBookingTimeline: async (id) => {
    const response = await http.get(`/bookings/${id}/timeline`);
    return response.data;
  },

  // Get booking documents
  getBookingDocuments: async (id) => {
    const response = await http.get(`/bookings/${id}/documents`);
    return response.data;
  },

  // Download document
  downloadDocument: async (bookingId, documentId) => {
    const response = await http.get(`/bookings/${bookingId}/documents/${documentId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Calculate booking total
  calculateTotal: async (bookingData) => {
    const response = await http.post('/bookings/calculate-total', bookingData);
    return response.data;
  },

  // Check availability for booking
  checkBookingAvailability: async (packageId, date, paxCount) => {
    const response = await http.get('/bookings/check-availability', {
      params: { packageId, date, pax: paxCount }
    });
    return response.data;
  }
};

export default bookingService;