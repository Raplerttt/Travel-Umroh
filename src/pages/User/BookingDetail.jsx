import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConstants';
import { useApp } from '../../contexts/AppContext';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const UserBookingDetail = () => {
  const { id } = useParams();
  const { showNotification } = useApp();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookingDetail();
  }, [id]);

  const loadBookingDetail = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setBooking({
        id: id,
        packageName: 'Ramadan Special Umroh 2024',
        description: 'Special Umroh package during the blessed month of Ramadan with 5-star accommodation',
        departureDate: '2024-03-15',
        returnDate: '2024-03-29',
        duration: 14,
        passengers: [
          {
            name: 'Ahmad Rahman',
            passport: 'AB123456',
            dateOfBirth: '1985-05-15',
            relationship: 'Main Passenger'
          },
          {
            name: 'Sarah Rahman',
            passport: 'AB123457',
            dateOfBirth: '1988-08-20',
            relationship: 'Spouse'
          }
        ],
        rooms: [
          { type: 'double', location: 'Mecca - Hotel A' },
          { type: 'double', location: 'Medina - Hotel B' }
        ],
        totalAmount: 4998,
        status: 'confirmed',
        paymentStatus: 'paid',
        specialRequests: 'Need vegetarian meals for both passengers',
        createdAt: '2024-01-20',
        itinerary: [
          {
            day: 1,
            title: 'Departure from Home Country',
            description: 'Flight from home country to Jeddah'
          },
          {
            day: 2,
            title: 'Arrival in Mecca',
            description: 'Transfer to hotel and prepare for Umroh'
          }
        ]
      });
    } catch (error) {
      showNotification('Failed to load booking details', 'error');
    } finally {
      setIsLoading(false);
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
        <Link to={ROUTES.BOOKINGS}>
          <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors">
            Back to My Bookings
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Link to={ROUTES.BOOKINGS} className="text-gray-400 hover:text-gray-600">
              ←
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
          </div>
          <p className="text-gray-600">
            {booking.packageName} • {booking.id}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Print Itinerary
          </button>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Travel Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Package:</span> {booking.packageName}</p>
                  <p><span className="text-gray-600">Duration:</span> {booking.duration} days</p>
                  <p><span className="text-gray-600">Departure:</span> {new Date(booking.departureDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Return:</span> {new Date(booking.returnDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Payment Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Total Amount:</span> <span className="font-semibold">${booking.totalAmount}</span></p>
                  <p><span className="text-gray-600">Status:</span> <span className="text-green-600 font-medium capitalize">{booking.status}</span></p>
                  <p><span className="text-gray-600">Payment:</span> <span className="text-green-600 font-medium capitalize">{booking.paymentStatus}</span></p>
                  <p><span className="text-gray-600">Booked On:</span> {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-2">Special Requests</h3>
                <p className="text-gray-600 text-sm">{booking.specialRequests}</p>
              </div>
            )}
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
                    {passenger.relationship}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{passenger.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Passport Number</p>
                      <p className="font-medium">{passenger.passport}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium">{new Date(passenger.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary Preview */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Travel Itinerary</h2>
            
            <div className="space-y-4">
              {booking.itinerary.slice(0, 3).map((day, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{day.day}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{day.title}</h3>
                    <p className="text-sm text-gray-600">{day.description}</p>
                  </div>
                </div>
              ))}
              
              {booking.itinerary.length > 3 && (
                <div className="text-center">
                  <button className="text-primary-600 hover:text-primary-500 font-medium">
                    View Full Itinerary ({booking.itinerary.length} days)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                📧 Email Itinerary
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded">
                📄 Download Documents
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded">
                🎫 View E-Ticket
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                ❌ Cancel Booking
              </button>
            </div>
          </div>

          {/* Accommodation */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Accommodation</h3>
            
            <div className="space-y-3">
              {booking.rooms.map((room, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium capitalize">{room.type} Room</p>
                  <p className="text-gray-600">{room.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="font-semibold text-primary-900 mb-2">Need Help?</h3>
            <p className="text-primary-700 text-sm mb-3">
              Our support team is here to assist you.
            </p>
            <div className="text-primary-600 text-sm space-y-1">
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ support@umrohtravel.com</p>
              <p>🕒 24/7 Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingDetail;