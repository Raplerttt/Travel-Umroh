import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routeConstants';
import { useApp } from '../../../contexts/AppContext';
import FormInput from '../../../components/forms/FormInput/FormInput';
import Button from '../../../components/common/button/Button';
import LoadingSpinner from '../../../components/common/loading/LoadingSpinner';

const BookingManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useApp();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    loadBookingData();
  }, [id]);

  const loadBookingData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setBooking({
        id: id,
        customer: {
          name: 'Ahmad Rahman',
          email: 'ahmad@email.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main Street, Jakarta, Indonesia'
        },
        package: {
          name: 'Ramadan Special Umroh 2024',
          price: 2499,
          duration: 14
        },
        departureDate: '2024-03-15',
        passengers: [
          {
            name: 'Ahmad Rahman',
            passport: 'AB123456',
            dateOfBirth: '1985-05-15'
          },
          {
            name: 'Sarah Rahman',
            passport: 'AB123457',
            dateOfBirth: '1988-08-20'
          }
        ],
        rooms: [
          { type: 'double', supplement: 0 }
        ],
        totalAmount: 4998,
        status: 'confirmed',
        paymentStatus: 'paid',
        specialRequests: 'Need vegetarian meals',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-21'
      });
    } catch (error) {
      showNotification('Failed to load booking details', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBooking(prev => ({ ...prev, status: newStatus }));
      showNotification('Booking status updated successfully', 'success');
    } catch (error) {
      showNotification('Failed to update booking status', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotes = async (notes) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      showNotification('Admin notes saved successfully', 'success');
    } catch (error) {
      showNotification('Failed to save notes', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Booking Not Found
        </h3>
        <Button onClick={() => navigate(ROUTES.ADMIN_BOOKINGS)}>
          Back to Bookings
        </Button>
      </div>
    );
  }

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'confirmed', label: 'Confirmed', color: 'blue' },
    { value: 'paid', label: 'Paid', color: 'green' },
    { value: 'completed', label: 'Completed', color: 'gray' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ];

  const paymentStatusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'paid', label: 'Paid', color: 'green' },
    { value: 'failed', label: 'Failed', color: 'red' },
    { value: 'refunded', label: 'Refunded', color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(ROUTES.ADMIN_BOOKINGS)}
              className="text-gray-400 hover:text-gray-600"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Booking Management
            </h1>
          </div>
          <p className="text-gray-600">
            {booking.id} • {booking.customer.name}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button>
            Send Email
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Booking Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Package Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Package:</span> {booking.package.name}</p>
                  <p><span className="text-gray-600">Duration:</span> {booking.package.duration} days</p>
                  <p><span className="text-gray-600">Departure:</span> {new Date(booking.departureDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Package Price:</span> ${booking.package.price}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Payment Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Total Amount:</span> <span className="font-semibold">${booking.totalAmount}</span></p>
                  <p><span className="text-gray-600">Created:</span> {new Date(booking.createdAt).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Last Updated:</span> {new Date(booking.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Full Name"
                  value={booking.customer.name}
                  readOnly
                />
                <FormInput
                  label="Email"
                  value={booking.customer.email}
                  readOnly
                />
                <FormInput
                  label="Phone"
                  value={booking.customer.phone}
                  readOnly
                />
                <FormInput
                  label="Address"
                  value={booking.customer.address}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Passengers ({booking.passengers.length})
            </h2>
            
            <div className="space-y-4">
              {booking.passengers.map((passenger, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Passenger {index + 1} {index === 0 && '(Main)'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput
                      label="Full Name"
                      value={passenger.name}
                      readOnly
                    />
                    <FormInput
                      label="Passport Number"
                      value={passenger.passport}
                      readOnly
                    />
                    <FormInput
                      label="Date of Birth"
                      value={passenger.dateOfBirth}
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Special Requests
              </h2>
              <p className="text-gray-600">{booking.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Status Management
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Status
                </label>
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Status
                </label>
                <select
                  value={booking.paymentStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {paymentStatusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {isSaving && (
                <div className="text-sm text-blue-600">
                  Saving changes...
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                📧 Send Confirmation Email
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded">
                📄 Generate Invoice
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded">
                🎫 Generate Travel Documents
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                ❌ Cancel Booking
              </button>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Admin Notes
            </h3>
            
            <div className="space-y-3">
              <textarea
                placeholder="Add internal notes about this booking..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Button
                size="sm"
                onClick={() => handleSaveNotes('Test notes')}
                disabled={isSaving}
              >
                Save Notes
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Activity Timeline
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Booking Created</p>
                  <p className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Payment Received</p>
                  <p className="text-xs text-gray-500">{new Date(booking.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;