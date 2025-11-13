import { http } from '../httpClient';

const paymentService = {
  // Initialize payment
  initializePayment: async (paymentData) => {
    const response = await http.post('/payments/initialize', paymentData);
    return response.data;
  },

  // Get payment methods
  getPaymentMethods: async () => {
    const response = await http.get('/payments/methods');
    return response.data;
  },

  // Process payment
  processPayment: async (paymentId, paymentData) => {
    const response = await http.post(`/payments/${paymentId}/process`, paymentData);
    return response.data;
  },

  // Get payment status
  getPaymentStatus: async (paymentId) => {
    const response = await http.get(`/payments/${paymentId}/status`);
    return response.data;
  },

  // Verify payment
  verifyPayment: async (paymentId) => {
    const response = await http.post(`/payments/${paymentId}/verify`);
    return response.data;
  },

  // Cancel payment
  cancelPayment: async (paymentId) => {
    const response = await http.post(`/payments/${paymentId}/cancel`);
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async (params = {}) => {
    const response = await http.get('/payments/history', { params });
    return response.data;
  },

  // Get payment details
  getPaymentDetails: async (paymentId) => {
    const response = await http.get(`/payments/${paymentId}`);
    return response.data;
  },

  // Handle payment callback
  handleCallback: async (paymentId, callbackData) => {
    const response = await http.post(`/payments/${paymentId}/callback`, callbackData);
    return response.data;
  },

  // Refund payment
  refundPayment: async (paymentId, refundData) => {
    const response = await http.post(`/payments/${paymentId}/refund`, refundData);
    return response.data;
  }
};

export default paymentService;