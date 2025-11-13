import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';
import UserDashboard from '../pages/User/Dashboard';
import UserProfile from '../pages/User/Profile';
import UserBookings from '../pages/User/Bookings';
import BookingDetail from '../pages/User/BookingDetail';
import UserDocuments from '../pages/User/Documents';
import ChangePassword from '../pages/User/ChangePassword';
import Booking from '../pages/Bookings';
import BookingConfirmation from '../pages/Bookings/BookingConfirmation';
import Payment from '../pages/Payments';

const PrivateRoutes = ({ isAuthenticated, user }) => {
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {/* Booking process routes */}
      <Route path="/booking/:packageId" element={<Booking />} />
      <Route path="/booking/:bookingId/confirmation" element={<BookingConfirmation />} />
      <Route path="/booking/:bookingId/payment" element={<Payment />} />
      
      {/* User dashboard routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="bookings" element={<UserBookings />} />
        <Route path="bookings/:id" element={<BookingDetail />} />
        <Route path="documents" element={<UserDocuments />} />
        <Route path="change-password" element={<ChangePassword />} />
        
        {/* Fallback for user routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      
      {/* Fallback for all private routes */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default PrivateRoutes;