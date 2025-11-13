import { http } from '../httpClient';

const authService = {
  // Login user
  login: async (credentials) => {
    const response = await http.post('/auth/login', credentials);
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    const response = await http.post('/auth/register', userData);
    return response.data;
  },

  // Get current user profile
  getMe: async () => {
    const response = await http.get('/auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await http.put('/auth/profile', profileData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await http.put('/auth/password', passwordData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await http.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (resetData) => {
    const response = await http.post('/auth/reset-password', resetData);
    return response.data;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await http.post('/auth/verify-email', { token });
    return response.data;
  },

  // Resend verification email
  resendVerification: async (email) => {
    const response = await http.post('/auth/resend-verification', { email });
    return response.data;
  },

  // Logout (client-side only)
  logout: async () => {
    // Clear token from localStorage is done in AuthContext
    return { success: true };
  },

  // Refresh token
  refreshToken: async () => {
    const response = await http.post('/auth/refresh-token');
    return response.data;
  },

  // Check if email exists
  checkEmail: async (email) => {
    const response = await http.post('/auth/check-email', { email });
    return response.data;
  },
};

export default authService;