import { http } from '../httpClient';
import galleryData from '../mockData/gallery.json';

const galleryService = {
  // Get all gallery items
  getGallery: async (params = {}) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredGallery = [...galleryData.allGallery];
      
      // Filter by category
      if (params.category) {
        filteredGallery = filteredGallery.filter(
          item => item.category === params.category
        );
      }
      
      // Filter by featured
      if (params.featured !== undefined) {
        filteredGallery = filteredGallery.filter(
          item => item.isFeatured === params.featured
        );
      }
      
      // Search by title or description
      if (params.search) {
        const searchTerm = params.search.toLowerCase().trim();
        filteredGallery = filteredGallery.filter(item =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      // Sort gallery items
      if (params.sort) {
        switch (params.sort) {
          case 'latest':
            filteredGallery.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            break;
          case 'popular':
            filteredGallery.sort((a, b) => b.views - a.views);
            break;
          case 'likes':
            filteredGallery.sort((a, b) => b.likes - a.likes);
            break;
          case 'title':
            filteredGallery.sort((a, b) => a.title.localeCompare(b.title));
            break;
          default:
            break;
        }
      }
      
      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedGallery = filteredGallery.slice(startIndex, endIndex);
      
      return {
        data: paginatedGallery,
        total: filteredGallery.length,
        page: page,
        totalPages: Math.ceil(filteredGallery.length / limit),
        categories: galleryData.categories
      };
    }
    
    const response = await http.get('/gallery', { params });
    return response.data;
  },

  // Get gallery by category
  getGalleryByCategory: async (category, params = {}) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const categoryItems = galleryData.allGallery.filter(
        item => item.category === category
      );
      
      const categoryInfo = galleryData.categories.find(cat => cat.id === category);
      
      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedItems = categoryItems.slice(startIndex, endIndex);
      
      return {
        data: paginatedItems,
        total: categoryItems.length,
        page: page,
        totalPages: Math.ceil(categoryItems.length / limit),
        category: categoryInfo
      };
    }
    
    const response = await http.get(`/gallery/category/${category}`, { params });
    return response.data;
  },

  // Get gallery categories
  getGalleryCategories: async () => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        data: galleryData.categories
      };
    }
    
    const response = await http.get('/gallery/categories');
    return response.data;
  },

  // Get featured gallery items
  getFeaturedGallery: async (limit = 8) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const featured = galleryData.featuredGallery.slice(0, limit);
      
      return {
        data: featured,
        total: featured.length
      };
    }
    
    const response = await http.get('/gallery/featured', {
      params: { limit }
    });
    return response.data;
  },

  // Upload to gallery (admin only)
  uploadToGallery: async (file, metadata = {}) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate upload process
      const newItem = {
        id: Date.now(),
        title: metadata.title || 'New Image',
        description: metadata.description || '',
        image: URL.createObjectURL(file),
        category: metadata.category || 'makkah',
        tags: metadata.tags || [],
        isFeatured: metadata.isFeatured || false,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: 'Admin',
        views: 0,
        likes: 0,
        location: metadata.location || 'Makkah, Saudi Arabia',
        imageSize: '1920x1080',
        imageType: file.type.startsWith('image/') ? 'photo' : 'video'
      };
      
      // Add to mock data (in real app, this would be sent to backend)
      galleryData.allGallery.unshift(newItem);
      if (newItem.isFeatured) {
        galleryData.featuredGallery.unshift(newItem);
      }
      
      return {
        data: newItem,
        message: 'Gambar berhasil diupload'
      };
    }
    
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
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from mock data
      galleryData.allGallery = galleryData.allGallery.filter(item => item.id !== parseInt(id));
      galleryData.featuredGallery = galleryData.featuredGallery.filter(item => item.id !== parseInt(id));
      
      return {
        message: 'Gambar berhasil dihapus',
        deletedId: id
      };
    }
    
    const response = await http.delete(`/gallery/${id}`);
    return response.data;
  },

  // Like a gallery item
  likeGalleryItem: async (id) => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const item = galleryData.allGallery.find(item => item.id === parseInt(id));
      if (item) {
        item.likes += 1;
      }
      
      return {
        data: { likes: item?.likes || 0 },
        message: 'Gambar disukai'
      };
    }
    
    const response = await http.post(`/gallery/${id}/like`);
    return response.data;
  },

  // Increment view count
  incrementViewCount: async (id) => {
    if (process.env.NODE_ENV === 'development') {
      // Don't wait for this in development
      const item = galleryData.allGallery.find(item => item.id === parseInt(id));
      if (item) {
        item.views += 1;
      }
      return { success: true };
    }
    
    const response = await http.post(`/gallery/${id}/view`);
    return response.data;
  }
};

export default galleryService;