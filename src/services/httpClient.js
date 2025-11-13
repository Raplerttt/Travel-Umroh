import axios from 'axios';

// Create axios instance with base configuration
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add auth token to requests
    const token = localStorage.getItem('umroh-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add language header
    const language = localStorage.getItem('umroh-language') || 'id';
    config.headers['Accept-Language'] = language;

    console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data);

    return config;
  },
  (error) => {
    console.error('❌ [API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [API Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    const { response } = error;
    
    console.error(`❌ [API Response Error] ${response?.status} ${error.config?.url}`, {
      status: response?.status,
      data: response?.data,
      message: error.message
    });

    // Handle specific error statuses
    if (response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('umroh-token');
      window.location.href = '/login';
    } else if (response?.status === 403) {
      // Forbidden
      console.warn('Access forbidden');
    } else if (response?.status === 500) {
      // Server error
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

// Generic HTTP methods
export const http = {
  get: (url, config = {}) => httpClient.get(url, config),
  post: (url, data = {}, config = {}) => httpClient.post(url, data, config),
  put: (url, data = {}, config = {}) => httpClient.put(url, data, config),
  patch: (url, data = {}, config = {}) => httpClient.patch(url, data, config),
  delete: (url, config = {}) => httpClient.delete(url, config),
};

export default httpClient;