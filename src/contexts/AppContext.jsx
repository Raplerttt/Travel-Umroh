import React, { createContext, useContext, useReducer } from 'react';

// Initial state (tanpa theme)
const initialState = {
  language: 'id',
  isLoading: false,
  notification: null,
  mobileMenuOpen: false,
};

// Action types (tanpa theme actions)
const APP_ACTIONS = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.SET_LANGUAGE:
      return { ...state, language: action.payload };
    
    case APP_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case APP_ACTIONS.SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    
    case APP_ACTIONS.TOGGLE_MOBILE_MENU:
      return { ...state, mobileMenuOpen: action.payload };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    setLanguage: (language) => {
      localStorage.setItem('umroh-language', language);
      dispatch({ type: APP_ACTIONS.SET_LANGUAGE, payload: language });
    },

    setLoading: (isLoading) => {
      dispatch({ type: APP_ACTIONS.SET_LOADING, payload: isLoading });
    },

    showNotification: (message, type = 'info') => {
      dispatch({ 
        type: APP_ACTIONS.SET_NOTIFICATION, 
        payload: { message, type, id: Date.now() } 
      });
      
      // Auto hide notification after 5 seconds
      setTimeout(() => {
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATION, payload: null });
      }, 5000);
    },

    hideNotification: () => {
      dispatch({ type: APP_ACTIONS.SET_NOTIFICATION, payload: null });
    },

    toggleMobileMenu: (isOpen) => {
      dispatch({ type: APP_ACTIONS.TOGGLE_MOBILE_MENU, payload: isOpen });
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;