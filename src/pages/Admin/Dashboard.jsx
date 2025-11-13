import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConstants';
import { useApp } from '../../contexts/AppContext';

const AdminDashboard = () => {
  const { showNotification } = useApp();
  const [timeRange, setTimeRange] = useState('month');
  const [stats, setStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setStats({
        totalBookings: 1247,
        totalRevenue: 1542300,
        activeUsers: 856,
        pendingBookings: 23,
        bookingsGrowth: 12.5,
        revenueGrowth: 8.3,
        usersGrowth: 15.2
      });

      setRecentActivities([
        {
          id: 1,
          type: 'booking',
          message: 'New booking received from Ahmad Rahman',
          time: '2 minutes ago',
          icon: '📅',
          color: 'blue'
        },
        {
          id: 2,
          type: 'payment',
          message: 'Payment completed for booking #BK-2024-0012',
          time: '15 minutes ago',
          icon: '💳',
          color: 'green'
        },
        {
          id: 3,
          type: 'user',
          message: 'New user registration: Sarah Ismail',
          time: '1 hour ago',
          icon: '👤',
          color: 'purple'
        },
        {
          id: 4,
          type: 'support',
          message: 'Support ticket #ST-124 needs attention',
          time: '2 hours ago',
          icon: '💬',
          color: 'orange'
        }
      ]);
    } catch (error) {
      showNotification('Failed to load dashboard data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const quickStats = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings?.toLocaleString() || '0',
      change: stats.bookingsGrowth,
      icon: '📅',
      color: 'blue',
      link: ROUTES.ADMIN_BOOKINGS
    },
    {
      title: 'Total Revenue',
      value: `$${(stats.totalRevenue / 1000).toFixed(0)}K`,
      change: stats.revenueGrowth,
      icon: '💰',
      color: 'green',
      link: ROUTES.ADMIN_PAYMENTS
    },
    {
      title: 'Active Users',
      value: stats.activeUsers?.toLocaleString() || '0',
      change: stats.usersGrowth,
      icon: '👥',
      color: 'purple',
      link: ROUTES.ADMIN_USERS
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings?.toString() || '0',
      change: -5,
      icon: '⏳',
      color: 'orange',
      link: ROUTES.ADMIN_BOOKINGS
    }
  ];

  const recentBookings = [
    {
      id: 'BK-2024-0015',
      customer: 'Ahmad Rahman',
      package: 'Ramadan Special 2024',
      amount: 2499,
      status: 'confirmed',
      date: '2024-03-15'
    },
    {
      id: 'BK-2024-0014',
      customer: 'Sarah Ismail',
      package: 'Economic Umroh',
      amount: 1799,
      status: 'pending',
      date: '2024-04-10'
    },
    {
      id: 'BK-2024-0013',
      customer: 'Mohammed Ali',
      package: 'Premium Umroh',
      amount: 3499,
      status: 'paid',
      date: '2024-03-20'
    },
    {
      id: 'BK-2024-0012',
      customer: 'Fatima Khan',
      package: 'Family Package',
      amount: 8999,
      status: 'completed',
      date: '2024-02-28'
    }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="block bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className={`flex items-center mt-2 text-sm ${
                  stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span>
                    {stat.change >= 0 ? '↗' : '↘'} {Math.abs(stat.change)}%
                  </span>
                  <span className="text-gray-500 ml-1">from last period</span>
                </div>
              </div>
              <div className={`text-3xl bg-${stat.color}-100 text-${stat.color}-600 p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
              <Link
                to={ROUTES.ADMIN_BOOKINGS}
                className="text-primary-600 hover:text-primary-500 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-primary-600 font-semibold text-sm">BK</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {booking.customer}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {booking.package}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${booking.amount}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${`bg-${activity.color}-100 text-${activity.color}-600`}`}>
                    {activity.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-center text-primary-600 hover:text-primary-500 text-sm font-medium py-2">
              View All Activities
            </button>
          </div>
        </div>
      </div>

      {/* Charts & Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <p>Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to={ROUTES.ADMIN_NEW_PACKAGE}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-green-600 text-lg">➕</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">
                  Create New Package
                </p>
                <p className="text-sm text-gray-600">Add new Umroh package</p>
              </div>
            </Link>

            <Link
              to={ROUTES.ADMIN_BOOKINGS}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-blue-600 text-lg">📅</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">
                  Manage Bookings
                </p>
                <p className="text-sm text-gray-600">View and manage all bookings</p>
              </div>
            </Link>

            <Link
              to={ROUTES.ADMIN_USERS}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <span className="text-purple-600 text-lg">👥</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">
                  User Management
                </p>
                <p className="text-sm text-gray-600">Manage users and permissions</p>
              </div>
            </Link>

            <Link
              to={ROUTES.ADMIN_GALLERY}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <span className="text-orange-600 text-lg">🖼️</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">
                  Gallery Management
                </p>
                <p className="text-sm text-gray-600">Upload and manage photos</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-600">API Status</p>
              <p className="text-lg font-semibold text-green-600">Online</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-600">Database</p>
              <p className="text-lg font-semibold text-green-600">Healthy</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage</p>
              <p className="text-lg font-semibold text-yellow-600">75% Used</p>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-lg font-semibold text-gray-600">2 hours ago</p>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;