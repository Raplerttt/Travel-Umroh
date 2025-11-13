import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES, ROUTE_GUARDS } from './routeConstants';
import RouteGuard from './RouteGuard';

// Layouts
import MainLayout from '../components/layout/MainLayout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';
import AdminLayout from '../components/layout/AdminLayout/AdminLayout';

// Public Pages
import Home from '../pages/Home';
import Packages from '../pages/Packages/index';
import PackageDetail from '../pages/Packages/PackageDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Gallery from '../pages/Gallery';
import FAQ from '../pages/FAQ';

// Auth Pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';

// User Pages
import UserDashboard from '../pages/User/Dashboard';
import UserProfile from '../pages/User/Profile';
import UserBookings from '../pages/User/Bookings';
import BookingDetail from '../pages/User/BookingDetail';
import UserDocuments from '../pages/User/Documents';
import ChangePassword from '../pages/User/ChangePassword';

// Booking Process
import Booking from '../pages/Bookings/index';
import BookingConfirmation from '../pages/Bookings/BookingConfirmation';
import Payment from '../pages/Payments/index';

// Admin Pages
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route 
        path={ROUTES.LOGIN} 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.AUTH}>
            <Login />
          </RouteGuard>
        } 
      />
      <Route 
        path={ROUTES.REGISTER} 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.AUTH}>
            <Register />
          </RouteGuard>
        } 
      />
      <Route 
        path={ROUTES.FORGOT_PASSWORD} 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.AUTH}>
            <ForgotPassword />
          </RouteGuard>
        } 
      />
      <Route 
        path={ROUTES.RESET_PASSWORD} 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.AUTH}>
            <ResetPassword />
          </RouteGuard>
        } 
      />

      {/* Public Routes with Main Layout */}
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="packages" element={<Packages />} />
        <Route path="packages/:id" element={<PackageDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="faq" element={<FAQ />} />
      </Route>

      {/* User Dashboard Routes */}
      <Route 
        path={ROUTES.DASHBOARD} 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.PRIVATE}>
            <DashboardLayout />
          </RouteGuard>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="bookings" element={<UserBookings />} />
        <Route path="bookings/:id" element={<BookingDetail />} />
        <Route path="documents" element={<UserDocuments />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      {/* Booking Process Routes */}
      <Route 
        path="booking/:packageId" 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.PRIVATE}>
            <Booking />
          </RouteGuard>
        } 
      />
      <Route 
        path="booking/:bookingId/confirmation" 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.PRIVATE}>
            <BookingConfirmation />
          </RouteGuard>
        } 
      />
      <Route 
        path="booking/:bookingId/payment" 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.PRIVATE}>
            <Payment />
          </RouteGuard>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path={ROUTES.ADMIN} 
        element={
          <RouteGuard guardType={ROUTE_GUARDS.ADMIN}>
            <AdminLayout />
          </RouteGuard>
        }
      >
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
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};

export default AppRoutes;