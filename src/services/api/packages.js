import { http } from '../httpClient';
import packagesData from '../mockData/packages.json';

const packagesService = {
  // Get all packages with filtering and pagination
  getPackages: async (params = {}) => {
    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredPackages = [...packagesData.allPackages];
      
      // Filter by category
      if (params.category) {
        filteredPackages = filteredPackages.filter(
          pkg => pkg.category === params.category
        );
      }
      
      // Filter by price range
      if (params.minPrice) {
        filteredPackages = filteredPackages.filter(
          pkg => pkg.price >= params.minPrice
        );
      }
      
      if (params.maxPrice) {
        filteredPackages = filteredPackages.filter(
          pkg => pkg.price <= params.maxPrice
        );
      }
      
      // Filter by departure date
      if (params.departureMonth) {
        filteredPackages = filteredPackages.filter(
          pkg => {
            const departureDate = new Date(pkg.departureDate);
            return departureDate.getMonth() + 1 === parseInt(params.departureMonth);
          }
        );
      }
      
      // Sort packages
      if (params.sort) {
        switch (params.sort) {
          case 'price-low':
            filteredPackages.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredPackages.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredPackages.sort((a, b) => b.rating - a.rating);
            break;
          case 'duration':
            filteredPackages.sort((a, b) => {
              const aDays = parseInt(a.duration);
              const bDays = parseInt(b.duration);
              return bDays - aDays;
            });
            break;
          default:
            break;
        }
      }
      
      return {
        data: filteredPackages,
        total: filteredPackages.length,
        categories: packagesData.categories
      };
    }
    
    // For production, use real API
    const response = await http.get('/packages', { params });
    return response.data;
  },

  // Get featured packages
  getFeaturedPackages: async (limit = 6) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      const featured = packagesData.featuredPackages.slice(0, limit);
      return {
        data: featured,
        total: featured.length
      };
    }
    
    const response = await http.get('/packages/featured', {
      params: { limit }
    });
    return response.data;
  },

  // Get package by ID
  getPackageById: async (id) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const packageItem = packagesData.allPackages.find(
        pkg => pkg.id === parseInt(id)
      );
      
      if (!packageItem) {
        throw {
          response: {
            data: {
              message: 'Paket umroh tidak ditemukan'
            }
          }
        };
      }
      
      return {
        data: packageItem
      };
    }
    
    const response = await http.get(`/packages/${id}`);
    return response.data;
  },

  // Get packages by category
  getPackagesByCategory: async (category, params = {}) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const categoryPackages = packagesData.allPackages.filter(
        pkg => pkg.category === category
      );
      
      return {
        data: categoryPackages,
        total: categoryPackages.length,
        category: packagesData.categories.find(cat => cat.id === category)
      };
    }
    
    const response = await http.get(`/packages/category/${category}`, { params });
    return response.data;
  },

  // Search packages
  searchPackages: async (query, filters = {}) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let results = [...packagesData.allPackages];
      
      // Search in name, description, and tags
      if (query && query.trim()) {
        const searchTerm = query.toLowerCase().trim();
        results = results.filter(pkg =>
          pkg.name.toLowerCase().includes(searchTerm) ||
          pkg.description.toLowerCase().includes(searchTerm) ||
          pkg.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          pkg.airline.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply additional filters
      if (filters.category) {
        results = results.filter(pkg => pkg.category === filters.category);
      }
      
      if (filters.minPrice) {
        results = results.filter(pkg => pkg.price >= filters.minPrice);
      }
      
      if (filters.maxPrice) {
        results = results.filter(pkg => pkg.price <= filters.maxPrice);
      }
      
      if (filters.minRating) {
        results = results.filter(pkg => pkg.rating >= filters.minRating);
      }
      
      if (filters.duration) {
        results = results.filter(pkg => {
          const pkgDuration = parseInt(pkg.duration);
          return pkgDuration >= parseInt(filters.duration);
        });
      }
      
      return {
        data: results,
        total: results.length,
        query: query
      };
    }
    
    const response = await http.get('/packages/search', {
      params: { q: query, ...filters }
    });
    return response.data;
  },

  // Get available dates for a package
  getAvailableDates: async (packageId) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const dates = packagesData.availableDates[packageId] || [];
      
      return {
        data: dates,
        packageId: packageId
      };
    }
    
    const response = await http.get(`/packages/${packageId}/dates`);
    return response.data;
  },

  // Get package categories
  getCategories: async () => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 200));
      return {
        data: packagesData.categories
      };
    }
    
    const response = await http.get('/packages/categories');
    return response.data;
  },

  // Get package reviews
  getPackageReviews: async (packageId, params = {}) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const reviews = packagesData.reviews[packageId] || [];
      
      return {
        data: reviews,
        total: reviews.length,
        averageRating: reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0
      };
    }
    
    const response = await http.get(`/packages/${packageId}/reviews`, { params });
    return response.data;
  },

  // Add review to package
  addReview: async (packageId, reviewData) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate adding review
      const newReview = {
        id: Date.now(),
        ...reviewData,
        date: new Date().toISOString().split('T')[0],
        packageId: parseInt(packageId)
      };
      
      return {
        data: newReview,
        message: 'Review berhasil ditambahkan'
      };
    }
    
    const response = await http.post(`/packages/${packageId}/reviews`, reviewData);
    return response.data;
  },

  // Get related packages
  getRelatedPackages: async (packageId, limit = 4) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const packageItem = packagesData.allPackages.find(pkg => pkg.id === parseInt(packageId));
      if (!packageItem) {
        return { data: [] };
      }
      
      const related = packagesData.allPackages
        .filter(pkg => pkg.id !== parseInt(packageId) && pkg.category === packageItem.category)
        .slice(0, limit);
      
      return {
        data: related,
        total: related.length
      };
    }
    
    const response = await http.get(`/packages/${packageId}/related`, {
      params: { limit }
    });
    return response.data;
  },

  // Get package availability
  checkAvailability: async (packageId, date, paxCount = 1) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const packageItem = packagesData.allPackages.find(pkg => pkg.id === parseInt(packageId));
      if (!packageItem) {
        throw {
          response: {
            data: {
              message: 'Paket tidak ditemukan'
            }
          }
        };
      }
      
      const isAvailable = packageItem.availability >= paxCount;
      
      return {
        data: {
          available: isAvailable,
          availableSlots: packageItem.availability,
          requestedPax: paxCount,
          package: packageItem.name,
          date: date
        }
      };
    }
    
    const response = await http.get(`/packages/${packageId}/availability`, {
      params: { date, pax: paxCount }
    });
    return response.data;
  }
};

export default packagesService;