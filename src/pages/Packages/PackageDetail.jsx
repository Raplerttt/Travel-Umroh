import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePackages } from '../../hooks/usePackages';
import { useBooking } from '../../contexts/BookingContext';
import { ROUTES } from '../../routes/routeConstants';
import { ItineraryItem, PrayerTime } from '../../components/ui';
import Button from '../../components/common/button/Button';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const PackageDetail = () => {
  const { id } = useParams();
  const { getPackageById, isLoading } = usePackages();
  const { setPackage: setBookingPackage } = useBooking();
  const [packageData, setPackageData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchPackage = async () => {
      const pkg = await getPackageById(id);
      setPackageData(pkg);
    };
    
    fetchPackage();
  }, [id]);

  const handleBookNow = () => {
    if (packageData) {
      setBookingPackage(packageData);
      // Navigation will be handled by the link
    }
  };

  if (isLoading || !packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const {
    name,
    description,
    price,
    duration,
    image,
    features,
    itinerary,
    inclusions,
    exclusions,
    importantNotes
  } = packageData;

  const prayerTimes = {
    fajr: '05:00',
    dhuhr: '12:30',
    asr: '15:45',
    maghrib: '18:20',
    isha: '19:45'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to={ROUTES.HOME} className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link to={ROUTES.PACKAGES} className="text-gray-400 hover:text-gray-500">
                Packages
              </Link>
            </li>
            <li>
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-gray-500">{name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Package Header */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">${price}</div>
                    <div className="text-gray-500">per person</div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg mb-4">{description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>🕒 {duration} days</span>
                  <span>⭐ 4.8 (124 reviews)</span>
                  <span>👥 Group size: 30-40 people</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="border-b">
                <nav className="flex -mb-px">
                  {['overview', 'itinerary', 'inclusions', 'notes'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        py-4 px-6 text-sm font-medium border-b-2 transition-colors
                        ${activeTab === tab
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Package Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Daily Itinerary</h3>
                    <div className="space-y-1">
                      {itinerary.map((day, index) => (
                        <ItineraryItem
                          key={day.day}
                          day={day.day}
                          title={day.title}
                          description={day.description}
                          activities={day.activities}
                          meals={day.meals}
                          accommodations={day.accommodations}
                          isFirst={index === 0}
                          isLast={index === itinerary.length - 1}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Inclusions Tab */}
                {activeTab === 'inclusions' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-green-600 mb-4">What's Included</h4>
                      <ul className="space-y-2">
                        {inclusions.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-red-600 mb-4">What's Not Included</h4>
                      <ul className="space-y-2">
                        {exclusions.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
                    <div className="prose prose-sm max-w-none">
                      {importantNotes.map((note, index) => (
                        <div key={index} className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <strong>Note {index + 1}:</strong> {note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Book This Package</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Package Price:</span>
                  <span className="font-semibold">${price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration:</span>
                  <span>{duration} days</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${price}</span>
                </div>
                
                <Link to={ROUTES.BOOKING(id)}>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </Link>
                
                <p className="text-xs text-gray-500 text-center">
                  Free cancellation up to 30 days before departure
                </p>
              </div>
            </div>

            {/* Prayer Times */}
            <PrayerTime
              prayerTimes={prayerTimes}
              currentPrayer="dhuhr"
              location="Mecca"
              date={new Date().toLocaleDateString()}
            />

            {/* Contact Info */}
            <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
              <h4 className="font-semibold text-primary-900 mb-3">Need Help?</h4>
              <p className="text-primary-700 text-sm mb-4">
                Our travel consultants are here to assist you with any questions.
              </p>
              <Button variant="primary" size="sm" className="w-full">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;