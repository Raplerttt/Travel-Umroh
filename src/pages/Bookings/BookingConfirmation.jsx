import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/button/Button';

const BookingConfirmation = () => {
  const { bookingId } = useParams();

  // Mock booking data - in real app, this would come from API
  const booking = {
    id: bookingId,
    packageName: 'Ramadan Special Umroh 2024',
    departureDate: '2024-03-15',
    totalAmount: 2499,
    passengers: [
      { name: 'John Doe', passport: 'AB123456' },
      { name: 'Jane Doe', passport: 'AB123457' }
    ],
    status: 'confirmed'
  };

  const nextSteps = [
    {
      step: 1,
      title: 'Complete Payment',
      description: 'Proceed to secure payment gateway',
      action: 'Pay Now',
      link: ROUTES.PAYMENT(bookingId),
      completed: false
    },
    {
      step: 2,
      title: 'Upload Documents',
      description: 'Submit required travel documents',
      action: 'Upload Documents',
      link: '#',
      completed: false
    },
    {
      step: 3,
      title: 'Pre-Departure Orientation',
      description: 'Attend online orientation session',
      action: 'View Schedule',
      link: '#',
      completed: false
    },
    {
      step: 4,
      title: 'Receive Travel Documents',
      description: 'Get your visa and itinerary',
      action: 'Track Status',
      link: '#',
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your Umroh journey has been successfully booked
          </p>
          <div className="mt-4 bg-white inline-block px-4 py-2 rounded-lg border">
            <span className="text-sm text-gray-600">Booking Reference:</span>
            <span className="ml-2 font-mono font-bold text-primary-600">{booking.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Booking Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Package Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Package:</span> {booking.packageName}</p>
                    <p><span className="text-gray-600">Departure:</span> {new Date(booking.departureDate).toLocaleDateString()}</p>
                    <p><span className="text-gray-600">Status:</span> <span className="text-green-600 font-medium">{booking.status}</span></p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Payment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Total Amount:</span> <span className="font-semibold">${booking.totalAmount}</span></p>
                    <p><span className="text-gray-600">Payment Status:</span> <span className="text-yellow-600 font-medium">Pending</span></p>
                    <p><span className="text-gray-600">Due Date:</span> 7 days from now</p>
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-3">Passengers</h3>
                <div className="space-y-2">
                  {booking.passengers.map((passenger, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{passenger.name}</span>
                      <span className="text-sm text-gray-600">{passenger.passport}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Next Steps
              </h2>

              <div className="space-y-4">
                {nextSteps.map((step) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{step.step}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>
                    
                    <div>
                      <Link to={step.link}>
                        <Button size="sm" variant={step.step === 1 ? 'primary' : 'outline'}>
                          {step.action}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            {/* Payment CTA */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h3 className="font-semibold text-primary-900 mb-3">
                Complete Your Payment
              </h3>
              <p className="text-primary-700 text-sm mb-4">
                Secure your booking by completing the payment process.
              </p>
              <Link to={ROUTES.PAYMENT(bookingId)}>
                <Button size="lg" className="w-full">
                  Pay Now
                </Button>
              </Link>
              <p className="text-xs text-primary-600 text-center mt-3">
                Due within 7 days
              </p>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Need Assistance?
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ support@umrohtravel.com</p>
                <p>🕒 24/7 Customer Support</p>
              </div>
            </div>

            {/* Download Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Booking Documents
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left text-primary-600 hover:text-primary-700 text-sm py-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Booking Summary
                </button>
                <button className="w-full text-left text-primary-600 hover:text-primary-700 text-sm py-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Invoice
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link to={ROUTES.DASHBOARD} className="block text-primary-600 hover:text-primary-700 text-sm">
                  View in Dashboard
                </Link>
                <Link to={ROUTES.PACKAGES} className="block text-primary-600 hover:text-primary-700 text-sm">
                  Browse Other Packages
                </Link>
                <Link to={ROUTES.FAQ} className="block text-primary-600 hover:text-primary-700 text-sm">
                  FAQ & Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;