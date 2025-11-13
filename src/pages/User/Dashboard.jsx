import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConstants';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const { getUserBookings } = useBooking();

  // Mock data - in real app, this would come from API
  const stats = [
    { label: 'Total Bookings', value: '5', color: 'blue' },
    { label: 'Upcoming Trips', value: '2', color: 'green' },
    { label: 'Completed Umroh', value: '3', color: 'purple' },
    { label: 'Loyalty Points', value: '1,250', color: 'orange' }
  ];

  const recentBookings = [
    {
      id: '1',
      packageName: 'Ramadan Special Umroh',
      date: '2024-03-15',
      status: 'confirmed',
      amount: '$2,499'
    },
    {
      id: '2',
      packageName: 'Economic Umroh Package',
      date: '2024-04-20',
      status: 'pending',
      amount: '$1,799'
    }
  ];

  const quickActions = [
    {
      title: 'Book New Umroh',
      description: 'Start your spiritual journey',
      icon: '🎒',
      link: ROUTES.PACKAGES,
      color: 'primary'
    },
    {
      title: 'View Documents',
      description: 'Access your travel documents',
      icon: '📄',
      link: ROUTES.DOCUMENTS,
      color: 'blue'
    },
    {
      title: 'Update Profile',
      description: 'Keep your information current',
      icon: '👤',
      link: ROUTES.PROFILE,
      color: 'green'
    },
    {
      title: 'Get Support',
      description: '24/7 customer assistance',
      icon: '💬',
      link: ROUTES.CONTACT,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Ready for your next spiritual journey? Here's your Umroh travel overview.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Member since</p>
            <p className="font-semibold">2023</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mr-4`}>
                <span className={`text-${stat.color}-600 font-semibold text-lg`}>
                  {stat.value}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="block p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{action.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Bookings
            </h2>
            <Link
              to={ROUTES.BOOKINGS}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {booking.packageName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Departure: {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                  <p className="font-semibold text-gray-900 mt-1">{booking.amount}</p>
                </div>
              </div>
            ))}
          </div>

          {recentBookings.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">🎒</div>
              <p className="text-gray-600">No bookings yet</p>
              <Link
                to={ROUTES.PACKAGES}
                className="inline-block mt-2 text-primary-600 hover:text-primary-500 font-medium"
              >
                Book your first Umroh
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Trip */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Upcoming Umroh
        </h2>
        
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Ramadan Special Umroh 2024
              </h3>
              <p className="opacity-90">Departing: March 15, 2024</p>
              <p className="opacity-90">Duration: 14 days</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold mb-2">25</div>
              <p className="opacity-90">Days to go</p>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-4">
            <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Details
            </button>
            <button className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Download Documents
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Preparation Progress</span>
            <span>60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Documents: Complete</span>
            <span>Payment: Pending</span>
            <span>Visa: In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;