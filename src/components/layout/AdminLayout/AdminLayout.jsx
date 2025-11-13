import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ROUTES } from '../../../routes/routeConstants';
import Header from '../Header/Header';

const AdminLayout = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect jika bukan admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const adminMenuItems = [
    {
      name: 'Dashboard',
      href: ROUTES.ADMIN,
      icon: '📊',
    },
    {
      name: 'Packages',
      href: ROUTES.ADMIN_PACKAGES,
      icon: '🎒',
    },
    {
      name: 'Bookings',
      href: ROUTES.ADMIN_BOOKINGS,
      icon: '📅',
    },
    {
      name: 'Users',
      href: ROUTES.ADMIN_USERS,
      icon: '👥',
    },
    {
      name: 'Payments',
      href: ROUTES.ADMIN_PAYMENTS,
      icon: '💳',
    },
    {
      name: 'Gallery',
      href: ROUTES.ADMIN_GALLERY,
      icon: '🖼️',
    },
    {
      name: 'Settings',
      href: ROUTES.ADMIN_SETTINGS,
      icon: '⚙️',
    },
  ];

  const isActive = (href) => location.pathname === href;

  const stats = [
    { label: 'Total Bookings', value: '1,234', change: '+12%' },
    { label: 'Revenue', value: '$45,678', change: '+8%' },
    { label: 'Users', value: '5,678', change: '+15%' },
    { label: 'Packages', value: '24', change: '+2' },
  ];

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
            <h2 className="text-lg font-semibold">Admin Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Admin Info */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-lg">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  Administrator
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {adminMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.href)
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-500'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t">
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-purple-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Link
                  to={ROUTES.ADMIN_NEW_PACKAGE}
                  className="block w-full text-center px-3 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
                >
                  + New Package
                </Link>
                <button className="block w-full text-center px-3 py-2 bg-white text-purple-700 text-sm border border-purple-300 rounded hover:bg-purple-50 transition-colors">
                  View Reports
                </button>
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
              <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
              <div className="w-6"></div>
            </div>
          </div>

          {/* Admin Header Stats */}
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="text-xs text-green-600 font-semibold">{stat.change}</div>
                  </div>
                ))}
              </div>
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

export default AdminLayout;