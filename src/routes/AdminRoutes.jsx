import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout/AdminLayout';
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminPackages from '../pages/Admin/Packages';
import PackageForm from '../pages/Admin/Packages/PackageForm';
import AdminBookings from '../pages/Admin/Bookings';
import BookingManagement from '../pages/Admin/Bookings/BookingManagement';
import AdminUsers from '../pages/Admin/Users';
import UserManagement from '../pages/Admin/Users/UserManagement';
import AdminPayments from '../pages/Admin/Payments';
import AdminGallery from '../pages/Admin/Gallery';
import AdminSettings from '../pages/Admin/Settings';

const AdminRoutes = ({ isAuthenticated, user }) => {
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        
        {/* Packages Management */}
        <Route path="packages">
          <Route index element={<AdminPackages />} />
          <Route path="new" element={<PackageForm />} />
          <Route path="edit/:id" element={<PackageForm />} />
        </Route>
        
        {/* Bookings Management */}
        <Route path="bookings">
          <Route index element={<AdminBookings />} />
          <Route path=":id" element={<BookingManagement />} />
        </Route>
        
        {/* Users Management */}
        <Route path="users">
          <Route index element={<AdminUsers />} />
          <Route path=":id" element={<UserManagement />} />
        </Route>
        
        {/* Payments Management */}
        <Route path="payments" element={<AdminPayments />} />
        
        {/* Gallery Management */}
        <Route path="gallery" element={<AdminGallery />} />
        
        {/* Settings */}
        <Route path="settings" element={<AdminSettings />} />
        
        {/* Fallback for admin routes */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;