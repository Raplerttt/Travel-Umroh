import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConstants';
import { useApp } from '../../contexts/AppContext';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const UserBookings = () => {
  const { showNotification } = useApp();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      setBookings([
        {
          id: 'BK-2024-0015',
          packageName: 'Ramadan Special Umroh 2024',
          departureDate: '2024-03-15',
          returnDate: '2024-03-29',
          passengers: 2,
          totalAmount: 4998,
          status: 'confirmed',
          paymentStatus: 'paid',
          createdAt: '2024-01-20'
        },
        {
          id: 'BK-2024-0014',
          packageName: 'Economic Umroh Package',
          departureDate: '2024-04-10',
          returnDate: '2024-04-20',
          passengers: 1,
          totalAmount: 1799,
          status: 'pending',
          paymentStatus: 'pending',
          createdAt: '2024-01-19'
        },
        {
          id: 'BK-2023-0098',
          packageName: 'Premium Umroh Experience',
          departureDate: '2023-12-01',
          returnDate: '2023-12-12',
          passengers: 4,
          totalAmount: 13996,
          status: 'completed',
          paymentStatus: 'paid',
          createdAt: '2023-10-15'
        }
      ]);
    } catch (error) {
      showNotification('Failed to load bookings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const paymentStatusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const filters = [
    { value: 'all', label: 'All Bookings' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'paid', label: 'Paid' },
    { value: 'completed', label: 'Completed' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600">Manage and view your Umroh bookings</p>
        </div>
        
        <Link to={ROUTES.PACKAGES}>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
            Book New Umroh
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(filterOption => (
          <button
            key={filterOption.value}
            onClick={() => setFilter(filterOption.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === filterOption.value
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.packageName}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Booking ID: {booking.id}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">
                      ${booking.totalAmount}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Departure</p>
                    <p className="font-medium text-gray-900">
                      {new Date(booking.departureDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Return</p>
                    <p className="font-medium text-gray-900">
                      {new Date(booking.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Booked On</p>
                    <p className="font-medium text-gray-900">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                    {booking.status}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${paymentStatusColors[booking.paymentStatus]}`}>
                    Payment: {booking.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                <Link
                  to={ROUTES.BOOKING_DETAIL(booking.id)}
                  className="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors text-center"
                >
                  View Details
                </Link>
                
                {booking.status === 'pending' && (
                  <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
                    Complete Payment
                  </button>
                )}
                
                {booking.status === 'confirmed' && (
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                    Download Documents
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
          </h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all' 
              ? 'Start your spiritual journey by booking your first Umroh package.'
              : `You don't have any ${filter} bookings at the moment.`
            }
          </p>
          {filter === 'all' && (
            <Link to={ROUTES.PACKAGES}>
              <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors">
                Browse Packages
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default UserBookings;