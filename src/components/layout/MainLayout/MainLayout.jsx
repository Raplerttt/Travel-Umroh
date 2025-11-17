// MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { PrayerTimeBar } from '../../common/prayer/PrayerTime'; // Import PrayerTimeBar

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* PrayerTimeBar untuk mobile - di atas Header */}
      <div className="lg:hidden">
        <PrayerTimeBar />
      </div>
      
      {/* Header dengan margin top conditional */}
      <Header />
      
      <main className="flex-1 pb-safe">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;