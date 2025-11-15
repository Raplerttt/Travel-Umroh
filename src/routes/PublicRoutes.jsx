import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import Home from '../pages/Home';
import Packages from '../pages/Packages';
import PackageDetail from '../pages/Packages/PackageDetail';
import Schedule from '../pages/Schedule'
import About from '../pages/About';
import Contact from '../pages/Contact';
import Gallery from '../pages/Gallery';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import FAQ from '../pages/FAQ';

const PublicRoutes = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* Auth routes - redirect to home if already authenticated */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Register />
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <ForgotPassword />
        } 
      />
      <Route 
        path="/reset-password" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <ResetPassword />
        } 
      />

      {/* Public pages with main layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="packages" element={<Packages />} />
        <Route path="packages/:id" element={<PackageDetail />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="faq" element={<FAQ />} />
        
        {/* Fallback for public routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;