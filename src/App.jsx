// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PrayerTimeProvider } from './contexts/PrayerTimeContext';
import { AppRoutes } from './routes';
import { PrayerTimeBar } from './components/common/prayer/PrayerTime';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <AuthProvider>
            <BookingProvider>
              <PrayerTimeProvider>
                <div className="min-h-screen flex flex-col">
                    {/* Sembunyikan di mobile, tampilkan di md ke atas */}
                    <div className="lg:hidden">
                      <PrayerTimeBar />
                    </div>
                  {/* Main Content */}
                  <main className="flex-1">
                    <AppRoutes />
                  </main>
                </div>
              </PrayerTimeProvider>
            </BookingProvider>
          </AuthProvider>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;