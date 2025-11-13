import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

export const useApi = (apiFunction, immediate = true) => {
  const { showNotification } = useApp();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      setData(response.data || response);
      return response.data || response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMsg);
      showNotification(errorMsg, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Execute immediately if needed
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    refetch: execute
  };
};

export default useApi;