// LocalStorage utilities dengan error handling
const storage = {
    // Get item from localStorage
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error(`Error getting ${key} from localStorage:`, error);
        return defaultValue;
      }
    },
  
    // Set item to localStorage
    set: (key, value) => {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        return true;
      } catch (error) {
        console.error(`Error setting ${key} to localStorage:`, error);
        return false;
      }
    },
  
    // Remove item from localStorage
    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
        return false;
      }
    },
  
    // Clear all items from localStorage
    clear: () => {
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
      }
    },
  
    // Clear all app-specific items
    clearAppData: () => {
      const keysToKeep = ['umroh-theme', 'umroh-language', 'umroh-direction'];
      const allKeys = Object.keys(localStorage);
      
      allKeys.forEach(key => {
        if (!keysToKeep.includes(key)) {
          storage.remove(key);
        }
      });
    },
  
    // Get multiple items
    getMultiple: (keys) => {
      return keys.reduce((acc, key) => {
        acc[key] = storage.get(key);
        return acc;
      }, {});
    },
  
    // Set multiple items
    setMultiple: (items) => {
      return Object.keys(items).every(key => storage.set(key, items[key]));
    }
  };
  
  export default storage;