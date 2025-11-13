import { useState, useEffect } from 'react';
import { galleryService } from '../services';
import { useApp } from '../contexts/AppContext';

export const useGallery = () => {
  const { showNotification } = useApp();
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all gallery items
  const getGallery = async (params = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await galleryService.getGallery(params);
      setGallery(response.data || response);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load gallery';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get gallery by category
  const getGalleryByCategory = async (category, params = {}) => {
    setIsLoading(true);
    try {
      const response = await galleryService.getGalleryByCategory(category, params);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load gallery category';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get featured gallery items
  const getFeaturedGallery = async (limit = 8) => {
    setIsLoading(true);
    try {
      const response = await galleryService.getFeaturedGallery(limit);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load featured gallery';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload to gallery
  const uploadToGallery = async (file, metadata = {}) => {
    setIsLoading(true);
    try {
      const response = await galleryService.uploadToGallery(file, metadata);
      showNotification('Image uploaded successfully', 'success');
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to upload image';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete from gallery
  const deleteFromGallery = async (id) => {
    setIsLoading(true);
    try {
      const response = await galleryService.deleteFromGallery(id);
      setGallery(prev => prev.filter(item => item.id !== id));
      showNotification('Image deleted successfully', 'success');
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete image';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load gallery on mount
  useEffect(() => {
    getGallery();
  }, []);

  return {
    gallery,
    isLoading,
    error,
    getGallery,
    getGalleryByCategory,
    getFeaturedGallery,
    uploadToGallery,
    deleteFromGallery,
    refetch: getGallery
  };
};

export default useGallery;