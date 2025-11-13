import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTE_GUARDS } from './routeConstants';
import LoadingSpinner from '../components/common/loading/LoadingSpinner';

const RouteGuard = ({ 
  children, 
  guardType = ROUTE_GUARDS.PUBLIC,
  requiredPermissions = [] 
}) => {
  const { isAuthenticated, isLoading, user, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Check route permissions based on guard type
  switch (guardType) {
    case ROUTE_GUARDS.AUTH:
      // Only for non-authenticated users (login, register pages)
      if (isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
      }
      break;

    case ROUTE_GUARDS.PRIVATE:
      // Only for authenticated users
      if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
      }
      
      // Check additional permissions if required
      if (requiredPermissions.length > 0) {
        const hasRequiredPermissions = requiredPermissions.every(permission => 
          hasPermission(permission)
        );
        
        if (!hasRequiredPermissions) {
          return <Navigate to="/dashboard" replace />;
        }
      }
      break;

    case ROUTE_GUARDS.ADMIN:
      // Only for admin users
      if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
      }
      break;

    case ROUTE_GUARDS.PUBLIC:
    default:
      // Public routes - no restrictions
      break;
  }

  return children;
};

export default RouteGuard;