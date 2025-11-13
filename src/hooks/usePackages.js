import { useState, useEffect } from 'react';
import { packagesService } from '../services';
import { useApp } from '../contexts/AppContext';

export const usePackages = () => {
  const { showNotification } = useApp();
  const [packages, setPackages] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all packages
  const getPackages = async (params = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await packagesService.getPackages(params);
      setPackages(response.data || response);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load packages';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get featured packages
  const getFeaturedPackages = async (limit = 6) => {
    setIsLoading(true);
    try {
      const response = await packagesService.getFeaturedPackages(limit);
      setFeaturedPackages(response.data || response);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load featured packages';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get package by ID
  const getPackageById = async (id) => {
    setIsLoading(true);
    try {
      const response = await packagesService.getPackageById(id);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load package details';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Search packages
  const searchPackages = async (query, filters = {}) => {
    setIsLoading(true);
    try {
      const response = await packagesService.searchPackages(query, filters);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to search packages';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load featured packages on mount
  useEffect(() => {
    getFeaturedPackages();
  }, []);

  return {
    packages,
    featuredPackages,
    isLoading,
    error,
    getPackages,
    getFeaturedPackages,
    getPackageById,
    searchPackages,
    refetch: getPackages
  };
};

export default usePackages;