import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routeConstants';
import { useApp } from '../../../contexts/AppContext';
import SearchFilter from '../../../components/forms/SearchFilter/SearchFilter';
import Button from '../../../components/common/button/Button';
import Pagination from '../../../components/common/pagination/Pagination';
import LoadingSpinner from '../../../components/common/loading/LoadingSpinner';

const AdminBookings = () => {
  const { showNotification } = useApp();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: { value: '', label: 'Status', options: [] },
    package: { value: '', label: 'Package', options: [] }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
          customer: { name: 'Ahmad Rahman', email: 'ahmad@email.com' },
          package: { name: 'Ramadan Special 2024', price: 2499 },
          departureDate: '2024-03-15',
          passengers: 2,
          totalAmount: 4998,
          status: 'confirmed',
          paymentStatus: 'paid',
          createdAt: '2024-01-20'
        },
        {
          id: 'BK-2024-0014',
          customer: { name: 'Sarah Ismail', email: 'sarah@email.com' },
          package: { name: 'Economic Umroh', price: 1799 },
          departureDate: '2024-04-10',
          passengers: 1,
          totalAmount: 1799,
          status: 'pending',
          paymentStatus: 'pending',
          createdAt: '2024-01-19'
        },
        {
          id: 'BK-2024-0013',
          customer: { name: 'Mohammed Ali', email: 'mohammed@email.com' },
          package: { name: 'Premium Umroh', price: 3499 },
          departureDate: '2024-03-20',
          passengers: 4,
          totalAmount: 13996,
          status: 'paid',
          paymentStatus: 'paid',
          createdAt: '2024-01-18'
        },
        {
          id: 'BK-2024-0012',
          customer: { name: 'Fatima Khan', email: 'fatima@email.com' },
          package: { name: 'Family Package', price: 8999 },
          departureDate: '2024-02-28',
          passengers: 6,
          totalAmount: 53994,
          status: 'completed',
          paymentStatus: 'paid',
          createdAt: '2024-01-15'
        }
      ]);
    } catch (error) {
      showNotification('Failed to load bookings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBookings(prev => prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      
      showNotification('Booking status updated', 'success');
    } catch (error) {
      showNotification('Failed to update booking status', 'error');
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'paid', label: 'Paid' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const packageOptions = [
    { value: 'ramadan-special', label: 'Ramadan Special 2024' },
    { value: 'economic', label: 'Economic Umroh' },
    { value: 'premium', label: 'Premium Umroh' },
    { value: 'family', label: 'Family Package' }
  ];

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
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-purple-100 text-purple-800'
  };

  const filteredBookings = bookings.filter(booking =>
    booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(booking =>
    (!filters.status.value || booking.status === filters.status.value) &&
    (!filters.package.value || booking.package.name.toLowerCase().includes(filters.package.value.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="text-gray-600">View and manage all Umroh bookings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={loadBookings}
          >
            Refresh
          </Button>
          <Button>
            Export Report
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={{
          status: { ...filters.status, options: statusOptions },
          package: { ...filters.package, options: packageOptions }
        }}
        onFilterChange={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: { ...prev[key], value } }));
          setCurrentPage(1);
        }}
        placeholder="Search by customer name, email, or booking ID..."
      />

      {/* Bookings Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Departure
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.customer.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {booking.customer.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.package.name}</div>
                        <div className="text-xs text-gray-500">
                          {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.departureDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${booking.totalAmount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className={`text-xs font-medium rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-primary-500 ${
                            statusColors[booking.status]
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="paid">Paid</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            paymentStatusColors[booking.paymentStatus]
                          }`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={ROUTES.ADMIN_BOOKING_DETAIL(booking.id)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => {
                              // Implement send reminder
                              showNotification('Reminder sent to customer', 'success');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Remind
                          </button>
                          <button
                            onClick={() => {
                              // Implement duplicate booking
                              showNotification('Booking duplicated', 'success');
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            Duplicate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} results
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {/* Empty State */}
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600">
                {searchTerm || Object.values(filters).some(f => f.value) 
                  ? 'Try adjusting your search or filters'
                  : 'No bookings have been made yet'
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBookings;