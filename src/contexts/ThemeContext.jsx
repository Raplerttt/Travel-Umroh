import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const themeConfig = {
  light: {
    name: 'light',
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      secondary: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
      },
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#1f2937',
        secondary: '#6b7280',
        inverse: '#ffffff',
      },
      border: '#e5e7eb',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      primary: {
        50: '#0c4a6e',
        100: '#075985',
        200: '#0369a1',
        300: '#0284c7',
        400: '#0ea5e9',
        500: '#38bdf8',
        600: '#7dd3fc',
        700: '#bae6fd',
        800: '#e0f2fe',
        900: '#f0f9ff',
      },
      secondary: {
        50: '#713f12',
        100: '#854d0e',
        200: '#a16207',
        300: '#ca8a04',
        400: '#eab308',
        500: '#facc15',
        600: '#fde047',
        700: '#fef08a',
        800: '#fef9c3',
        900: '#fefce8',
      },
      success: {
        50: '#14532d',
        100: '#166534',
        200: '#15803d',
        300: '#16a34a',
        400: '#22c55e',
        500: '#4ade80',
        600: '#86efac',
        700: '#bbf7d0',
        800: '#dcfce7',
        900: '#f0fdf4',
      },
      error: {
        50: '#7f1d1d',
        100: '#991b1b',
        200: '#b91c1c',
        300: '#dc2626',
        400: '#ef4444',
        500: '#f87171',
        600: '#fca5a5',
        700: '#fecaca',
        800: '#fee2e2',
        900: '#fef2f2',
      },
      warning: {
        50: '#78350f',
        100: '#92400e',
        200: '#b45309',
        300: '#d97706',
        400: '#f59e0b',
        500: '#fbbf24',
        600: '#fcd34d',
        700: '#fde68a',
        800: '#fef3c7',
        900: '#fffbeb',
      },
      gray: {
        50: '#111827',
        100: '#1f2937',
        200: '#374151',
        300: '#4b5563',
        400: '#6b7280',
        500: '#9ca3af',
        600: '#d1d5db',
        700: '#e5e7eb',
        800: '#f3f4f6',
        900: '#f9fafb',
      },
      background: '#111827',
      surface: '#1f2937',
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        inverse: '#1f2937',
      },
      border: '#374151',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.5)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.7), 0 2px 4px -2px rgb(0 0 0 / 0.7)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.7), 0 4px 6px -4px rgb(0 0 0 / 0.7)',
    },
  },
  hajj: {
    name: 'hajj',
    colors: {
      primary: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      success: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      gray: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      background: '#ffffff',
      surface: '#fefce8',
      text: {
        primary: '#1e293b',
        secondary: '#475569',
        inverse: '#ffffff',
      },
      border: '#e2e8f0',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(251 191 36 / 0.05)',
      md: '0 4px 6px -1px rgb(251 191 36 / 0.1), 0 2px 4px -2px rgb(251 191 36 / 0.1)',
      lg: '0 10px 15px -3px rgb(251 191 36 / 0.1), 0 4px 6px -4px rgb(251 191 36 / 0.1)',
    },
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('umroh-theme') || 'light';
    const savedDirection = localStorage.getItem('umroh-direction') || 'ltr';
    
    setTheme(savedTheme);
    setDirection(savedDirection);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('dir', savedDirection);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('umroh-theme', newTheme);
    
    // Update document attributes
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.remove('light', 'dark', 'hajj');
    document.documentElement.classList.add(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  const changeDirection = (newDirection) => {
    setDirection(newDirection);
    localStorage.setItem('umroh-direction', newDirection);
    document.documentElement.setAttribute('dir', newDirection);
  };

  const toggleDirection = () => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    changeDirection(newDirection);
  };

  const value = {
    theme,
    direction,
    themeConfig: themeConfig[theme],
    allThemes: themeConfig,
    changeTheme,
    toggleTheme,
    changeDirection,
    toggleDirection,
    isDark: theme === 'dark',
    isRTL: direction === 'rtl',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;