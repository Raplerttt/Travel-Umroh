import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <AuthProvider>
            <BookingProvider>
              <AppRoutes />
            </BookingProvider>
          </AuthProvider>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;