import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ROUTES } from '../../../routes/routeConstants';
import Header from '../Header/Header';

const DashboardLayout = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect jika tidak authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const menuItems = [
    {
      name: 'Dashboard',
      href: ROUTES.DASHBOARD,
      icon: '📊',
    },
    {
      name: 'My Bookings',
      href: ROUTES.BOOKINGS,
      icon: '📅',
    },
    {
      name: 'Documents',
      href: ROUTES.DOCUMENTS,
      icon: '📄',
    },
    {
      name: 'Profile',
      href: ROUTES.PROFILE,
      icon: '👤',
    },
    {
      name: 'Change Password',
      href: ROUTES.CHANGE_PASSWORD,
      icon: '🔒',
    },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-between h-16 px-4 border-b lg:hidden">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-lg">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {user?.role || 'User'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.href)
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="p-4 border-t">
            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-primary-900 mb-2">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-700">Bookings:</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Upcoming:</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-700">Completed:</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile menu button */}
          <div className="lg:hidden bg-white border-b">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
              <div className="w-6"></div> {/* Spacer for balance */}
            </div>
          </div>

          {/* Page content */}
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;