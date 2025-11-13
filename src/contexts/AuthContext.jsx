import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/api/auth';

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  permissions: [],
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        permissions: [],
      };
    
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    
    case AUTH_ACTIONS.SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('umroh-token');
      if (token) {
        const userData = await authService.getMe();
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: userData,
            token: token,
          },
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('umroh-token');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Actions
  const actions = {
    login: async (email, password) => {
      try {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
        const response = await authService.login({ email, password });
        
        const { user, token, permissions } = response;
        
        localStorage.setItem('umroh-token', token);
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user, token },
        });

        if (permissions) {
          dispatch({ type: AUTH_ACTIONS.SET_PERMISSIONS, payload: permissions });
        }

        return { success: true, user };
      } catch (error) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { 
          success: false, 
          error: error.response?.data?.message || 'Login failed' 
        };
      }
    },

    register: async (userData) => {
      try {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
        const response = await authService.register(userData);
        
        const { user, token } = response;
        
        localStorage.setItem('umroh-token', token);
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user, token },
        });

        return { success: true, user };
      } catch (error) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { 
          success: false, 
          error: error.response?.data?.message || 'Registration failed' 
        };
      }
    },

    logout: () => {
      localStorage.removeItem('umroh-token');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      authService.logout();
    },

    updateProfile: async (profileData) => {
      try {
        const updatedUser = await authService.updateProfile(profileData);
        dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: updatedUser });
        return { success: true, user: updatedUser };
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Update failed' 
        };
      }
    },

    changePassword: async (passwordData) => {
      try {
        await authService.changePassword(passwordData);
        return { success: true };
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Password change failed' 
        };
      }
    },

    hasPermission: (permission) => {
      return state.permissions.includes(permission) || 
             state.user?.role === 'admin';
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;