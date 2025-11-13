import { http } from '../httpClient';

const galleryService = {
  // Get all gallery items
  getGallery: async (params = {}) => {
    const response = await http.get('/gallery', { params });
    return response.data;
  },

  // Get gallery by category
  getGalleryByCategory: async (category, params = {}) => {
    const response = await http.get(`/gallery/category/${category}`, { params });
    return response.data;
  },

  // Get gallery categories
  getGalleryCategories: async () => {
    const response = await http.get('/gallery/categories');
    return response.data;
  },

  // Get featured gallery items
  getFeaturedGallery: async (limit = 8) => {
    const response = await http.get('/gallery/featured', {
      params: { limit }
    });
    return response.data;
  },

  // Upload to gallery (admin only)
  uploadToGallery: async (file, metadata = {}) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await http.post('/gallery/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete from gallery (admin only)
  deleteFromGallery: async (id) => {
    const response = await http.delete(`/gallery/${id}`);
    return response.data;
  }
};

export default galleryService;