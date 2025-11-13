import { http } from '../httpClient';

const packagesService = {
  // Get all packages with filtering and pagination
  getPackages: async (params = {}) => {
    const response = await http.get('/packages', { params });
    return response.data;
  },

  // Get featured packages
  getFeaturedPackages: async (limit = 6) => {
    const response = await http.get('/packages/featured', {
      params: { limit }
    });
    return response.data;
  },

  // Get package by ID
  getPackageById: async (id) => {
    const response = await http.get(`/packages/${id}`);
    return response.data;
  },

  // Get packages by category
  getPackagesByCategory: async (category, params = {}) => {
    const response = await http.get(`/packages/category/${category}`, { params });
    return response.data;
  },

  // Search packages
  searchPackages: async (query, filters = {}) => {
    const response = await http.get('/packages/search', {
      params: { q: query, ...filters }
    });
    return response.data;
  },

  // Get available dates for a package
  getAvailableDates: async (packageId) => {
    const response = await http.get(`/packages/${packageId}/dates`);
    return response.data;
  },

  // Get package categories
  getCategories: async () => {
    const response = await http.get('/packages/categories');
    return response.data;
  },

  // Get package reviews
  getPackageReviews: async (packageId, params = {}) => {
    const response = await http.get(`/packages/${packageId}/reviews`, { params });
    return response.data;
  },

  // Add review to package
  addReview: async (packageId, reviewData) => {
    const response = await http.post(`/packages/${packageId}/reviews`, reviewData);
    return response.data;
  },

  // Get related packages
  getRelatedPackages: async (packageId, limit = 4) => {
    const response = await http.get(`/packages/${packageId}/related`, {
      params: { limit }
    });
    return response.data;
  },

  // Get package availability
  checkAvailability: async (packageId, date, paxCount) => {
    const response = await http.get(`/packages/${packageId}/availability`, {
      params: { date, pax: paxCount }
    });
    return response.data;
  }
};

export default packagesService;