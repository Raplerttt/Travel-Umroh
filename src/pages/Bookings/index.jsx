import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../../contexts/BookingContext';
import { usePackages } from '../../hooks/usePackages';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../routes/routeConstants';
import { BookingSteps, PassengerForm } from '../../components/ui';
import FormInput from '../../components/forms/FormInput/FormInput';
import DatePicker from '../../components/forms/DatePicker/DatePicker';
import Button from '../../components/common/button/Button';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';
import Modal from '../../components/common/modal/Modal';

const Booking = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getPackageById, isLoading: packageLoading } = usePackages();
  const {
    selectedPackage,
    bookingData,
    currentStep,
    setPackage,
    updateBookingData,
    nextStep,
    prevStep,
    addPassenger,
    updatePassenger,
    removePassenger,
    calculateTotal,
    isValidStep
  } = useBooking();

  const [packageData, setPackageData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ type: 'single', supplement: 0 });

  useEffect(() => {
    const loadPackage = async () => {
      if (packageId && !selectedPackage) {
        const pkg = await getPackageById(packageId);
        if (pkg) {
          setPackageData(pkg);
          setPackage(pkg);
        }
      } else if (selectedPackage) {
        setPackageData(selectedPackage);
      }
    };

    loadPackage();
  }, [packageId, selectedPackage]);

  // Initialize main passenger with user data
  useEffect(() => {
    if (user && bookingData.passengers.length === 0) {
      addPassenger({
        name: user.name,
        email: user.email,
        phone: user.phone,
        isMainPassenger: true
      });
    }
  }, [user]);

  const steps = [
    { number: 1, title: 'Package & Date', description: 'Select travel dates' },
    { number: 2, title: 'Passenger Details', description: 'Add passenger information' },
    { number: 3, title: 'Room Selection', description: 'Choose accommodation' },
    { number: 4, title: 'Review & Confirm', description: 'Verify your booking' },
  ];

  const handleAddPassenger = () => {
    if (bookingData.passengers.length < bookingData.numberOfPax) {
      addPassenger({
        name: '',
        email: '',
        phone: '',
        passportNumber: '',
        dateOfBirth: '',
        placeOfBirth: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        specialRequirements: '',
        isMainPassenger: false
      });
    }
  };

  const handlePassengerChange = (index, field, value) => {
    updatePassenger(index, { [field]: value });
  };

  const handleAddRoom = () => {
    const updatedRooms = [...bookingData.rooms, newRoom];
    updateBookingData({ rooms: updatedRooms });
    setShowRoomModal(false);
    setNewRoom({ type: 'single', supplement: 0 });
  };

  const handleRemoveRoom = (index) => {
    const updatedRooms = bookingData.rooms.filter((_, i) => i !== index);
    updateBookingData({ rooms: updatedRooms });
  };

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to create booking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bookingId = 'BOOK_' + Date.now();
      navigate(ROUTES.BOOKING_CONFIRMATION(bookingId));
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (packageLoading || !packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Umroh Journey
          </h1>
          <p className="text-xl text-gray-600">
            {packageData.name}
          </p>
        </div>

        {/* Booking Steps */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <BookingSteps currentStep={currentStep} steps={steps} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Package & Date Selection */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Select Travel Dates
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DatePicker
                      label="Preferred Departure Date"
                      name="departureDate"
                      value={bookingData.departureDate}
                      onChange={(e) => updateBookingData({ departureDate: e.target.value })}
                      required
                    />

                    <FormInput
                      label="Number of Pilgrims"
                      name="numberOfPax"
                      type="number"
                      min="1"
                      max="10"
                      value={bookingData.numberOfPax}
                      onChange={(e) => updateBookingData({ numberOfPax: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  {/* Available Dates */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Available Departure Dates
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['2024-03-15', '2024-04-10', '2024-05-05', '2024-06-01'].map((date) => (
                        <button
                          key={date}
                          onClick={() => updateBookingData({ departureDate: date })}
                          className={`p-3 border rounded-lg text-center transition-colors ${
                            bookingData.departureDate === date
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-medium">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</div>
                          <div className="text-2xl font-bold">{new Date(date).getDate()}</div>
                          <div className="text-sm text-gray-500">{new Date(date).getFullYear()}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Passenger Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Passenger Details
                    </h2>
                    <div className="text-sm text-gray-600">
                      {bookingData.passengers.length} of {bookingData.numberOfPax} passengers
                    </div>
                  </div>

                  <div className="space-y-6">
                    {bookingData.passengers.map((passenger, index) => (
                      <PassengerForm
                        key={index}
                        passenger={passenger}
                        index={index}
                        onChange={handlePassengerChange}
                        isMainPassenger={index === 0}
                      />
                    ))}
                  </div>

                  {bookingData.passengers.length < bookingData.numberOfPax && (
                    <button
                      onClick={handleAddPassenger}
                      className="w-full mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
                    >
                      + Add Passenger {bookingData.passengers.length + 1}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Room Selection */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Room Selection
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Selected Rooms
                    </h3>
                    
                    {bookingData.rooms.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="text-gray-400 text-4xl mb-3">🏨</div>
                        <p className="text-gray-600">No rooms selected yet</p>
                        <button
                          onClick={() => setShowRoomModal(true)}
                          className="mt-2 text-primary-600 hover:text-primary-500 font-medium"
                        >
                          Add your first room
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {bookingData.rooms.map((room, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900 capitalize">
                                {room.type} Room
                              </h4>
                              <p className="text-sm text-gray-600">
                                Supplement: ${room.supplement}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveRoom(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => setShowRoomModal(true)}
                      className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
                    >
                      + Add Another Room
                    </button>
                  </div>

                  {/* Room Types Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Room Types</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Single:</strong> Private room for one person</p>
                      <p><strong>Double:</strong> Room for two people sharing</p>
                      <p><strong>Triple:</strong> Room for three people sharing</p>
                      <p><strong>Quad:</strong> Room for four people sharing</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Review Your Booking
                </h2>

                <div className="space-y-6">
                  {/* Package Summary */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Package Details
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">{packageData.name}</h4>
                      <p className="text-gray-600">{packageData.description}</p>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>Duration: {packageData.duration} days</span>
                        <span>Departure: {bookingData.departureDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Passengers Summary */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Passengers ({bookingData.passengers.length})
                    </h3>
                    <div className="space-y-2">
                      {bookingData.passengers.map((passenger, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{passenger.name}</p>
                            <p className="text-sm text-gray-600">{passenger.passportNumber}</p>
                          </div>
                          {index === 0 && (
                            <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                              Main Passenger
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rooms Summary */}
                  {bookingData.rooms.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Room Selection
                      </h3>
                      <div className="space-y-2">
                        {bookingData.rooms.map((room, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                            <span className="capitalize">{room.type} Room</span>
                            <span className="font-medium">+${room.supplement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Requests */}
                  {bookingData.specialRequests && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Special Requests
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600">{bookingData.specialRequests}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              
              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  disabled={!isValidStep(currentStep)}
                  className="ml-auto"
                >
                  Continue to {steps[currentStep].title}
                </Button>
              ) : (
                <Button
                  onClick={handleProceedToPayment}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="ml-auto"
                >
                  Confirm & Proceed to Payment
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Booking Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Package Price:</span>
                  <span>${packageData.price} x {bookingData.numberOfPax}</span>
                </div>
                
                {bookingData.rooms.map((room, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="capitalize">{room.type} Room Supplement:</span>
                    <span>+${room.supplement}</span>
                  </div>
                ))}

                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  <p>✓ Free cancellation up to 30 days before departure</p>
                  <p>✓ Best price guarantee</p>
                  <p>✓ 24/7 customer support</p>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h4 className="font-semibold text-primary-900 mb-2">
                Need Help?
              </h4>
              <p className="text-primary-700 text-sm mb-3">
                Our travel consultants are here to assist you.
              </p>
              <div className="text-primary-600 text-sm">
                📞 +1 (555) 123-4567
              </div>
              <div className="text-primary-600 text-sm">
                ✉️ support@umrohtravel.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Selection Modal */}
      <Modal
        isOpen={showRoomModal}
        onClose={() => setShowRoomModal(false)}
        title="Add Room"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={newRoom.type}
              onChange={(e) => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="triple">Triple Room</option>
              <option value="quad">Quad Room</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplement Amount ($)
            </label>
            <input
              type="number"
              value={newRoom.supplement}
              onChange={(e) => setNewRoom(prev => ({ ...prev, supplement: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowRoomModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddRoom}>
              Add Room
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Booking;