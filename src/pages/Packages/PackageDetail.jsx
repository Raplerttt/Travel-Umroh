import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePackages } from '../../hooks/usePackages';
import { useBooking } from '../../contexts/BookingContext';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../../components/common/button/Button';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const PackageDetail = () => {
  const { id } = useParams();
  const { getPackageById, isLoading } = usePackages();
  const { setPackage: setBookingPackage } = useBooking();
  const [packageData, setPackageData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const pkg = await getPackageById(id);
        setPackageData(pkg);
      } catch (error) {
        console.error('Error fetching package:', error);
      }
    };
    
    fetchPackage();
  }, [id, getPackageById]);

  const handleBookNow = () => {
    if (packageData) {
      setBookingPackage(packageData);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Flexible';
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    originalPrice,
    duration,
    images = [],
    features = [],
    itinerary = [],
    included = [],
    excluded = [],
    importantNotes = [],
    category,
    rating,
    reviewCount,
    hotelMakkah,
    hotelMadinah,
    distanceMakkah,
    distanceMadinah,
    airline,
    departureDate,
    returnDate,
    maxPax,
    availability
  } = packageData;

  const mainImage = images[selectedImage] || images[0] || '/images/package-default.jpg';
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'itinerary', name: 'Itinerary', icon: '🗓️' },
    { id: 'facilities', name: 'Fasilitas', icon: '🏨' },
    { id: 'terms', name: 'Syarat', icon: '📝' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to={ROUTES.HOME} className="text-green-600 hover:text-green-700 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link to={ROUTES.PACKAGES} className="text-green-600 hover:text-green-700 transition-colors">
            Paket Umroh
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600 truncate max-w-xs">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="relative">
                <img
                  src={mainImage}
                  alt={name}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                {hasDiscount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full font-bold text-sm">
                    -{discountPercentage}%
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg">
                  <span className="font-semibold">{category}</span>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="p-4 border-t">
                  <div className="flex space-x-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-green-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Package Header */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        🕒
                      </span>
                      <span>{duration}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        ⭐
                      </span>
                      <span>{rating || 4.8} ({reviewCount || 124} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        👥
                      </span>
                      <span>Max {maxPax || 30} jamaah</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        ✈️
                      </span>
                      <span>{airline}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  <div className="mb-2">
                    <span className="text-3xl lg:text-4xl font-bold text-green-600">
                      {formatPrice(price)}
                    </span>
                    {hasDiscount && (
                      <span className="ml-2 text-lg text-gray-500 line-through">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">per orang</div>
                  <div className={`text-sm font-semibold ${
                    (availability || 15) > 5 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {availability || 15} kursi tersedia
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="border-b">
                <nav className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center space-x-2 py-4 px-6 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                        ${activeTab === tab.id
                          ? 'border-green-500 text-green-600 bg-green-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6 lg:p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Overview Paket</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {features.length > 0 ? (
                        features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                            <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5 flex-shrink-0">
                              ✓
                            </span>
                            <span className="text-gray-700 leading-relaxed">{feature}</span>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center text-gray-500 py-8">
                          Tidak ada fitur yang tersedia
                        </div>
                      )}
                    </div>

                    {/* Hotel Information */}
                    {(hotelMakkah || hotelMadinah) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {hotelMakkah && (
                          <div className="bg-blue-50 rounded-xl p-6">
                            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                              <span className="text-xl mr-2">🕋</span>
                              Hotel Makkah
                            </h4>
                            <p className="text-blue-800 font-medium text-lg">{hotelMakkah}</p>
                            {distanceMakkah && (
                              <p className="text-blue-600 text-sm mt-1">{distanceMakkah} dari Masjidil Haram</p>
                            )}
                          </div>
                        )}
                        {hotelMadinah && (
                          <div className="bg-green-50 rounded-xl p-6">
                            <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                              <span className="text-xl mr-2">🕌</span>
                              Hotel Madinah
                            </h4>
                            <p className="text-green-800 font-medium text-lg">{hotelMadinah}</p>
                            {distanceMadinah && (
                              <p className="text-green-600 text-sm mt-1">{distanceMadinah} dari Masjid Nabawi</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Itinerary Perjalanan</h3>
                    
                    <div className="space-y-4">
                      {itinerary.length > 0 ? (
                        itinerary.map((day, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-start space-x-4">
                              <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                  {day.day}
                                </div>
                                {index < itinerary.length - 1 && (
                                  <div className="w-0.5 h-8 bg-green-300 mt-2"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                  {day.title}
                                </h4>
                                <p className="text-sm text-green-700 mb-1">
                                  {new Date(day.date).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </p>
                                <p className="text-gray-600 mb-3">{day.description}</p>
                                {day.activities && day.activities.length > 0 && (
                                  <div className="space-y-2">
                                    {day.activities.map((activity, activityIndex) => (
                                      <div key={activityIndex} className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                        {activity}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          Itinerary belum tersedia
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Facilities Tab */}
                {activeTab === 'facilities' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Fasilitas yang Disediakan</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                          <span className="text-xl mr-2">✅</span>
                          Termasuk dalam Paket
                        </h4>
                        {included.length > 0 ? (
                          <ul className="space-y-3">
                            {included.map((item, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                                  ✓
                                </span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500">Tidak ada fasilitas yang termasuk</p>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                          <span className="text-xl mr-2">❌</span>
                          Tidak Termasuk
                        </h4>
                        {excluded.length > 0 ? (
                          <ul className="space-y-3">
                            {excluded.map((item, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                                  ✗
                                </span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500">Tidak ada fasilitas yang dikecualikan</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms Tab */}
                {activeTab === 'terms' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Syarat & Ketentuan</h3>
                    
                    {importantNotes.length > 0 ? (
                      <div className="space-y-4">
                        {importantNotes.map((note, index) => (
                          <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <div className="flex items-start space-x-3">
                              <span className="text-yellow-600 text-lg">📌</span>
                              <div>
                                <h4 className="font-semibold text-yellow-800 mb-2">
                                  Catatan Penting {index + 1}
                                </h4>
                                <p className="text-yellow-700 leading-relaxed">{note}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <p className="text-yellow-700">Tidak ada catatan penting</p>
                      </div>
                    )}

                    {/* General Terms */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Ketentuan Umum</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Pembayaran DP 30% untuk konfirmasi booking</li>
                        <li>• Pelunasan 45 hari sebelum keberangkatan</li>
                        <li>• Dokumen harus lengkap dan valid</li>
                        <li>• Mengikuti manasik sebelum keberangkatan</li>
                        <li>• Mematuhi peraturan selama di Arab Saudi</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-lg border p-6 top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Pesan Paket Ini
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Harga Paket:</span>
                  <span className="font-semibold text-green-600">{formatPrice(price)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Durasi:</span>
                  <span className="font-medium">{duration}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Maskapai:</span>
                  <span className="font-medium">{airline}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Ketersediaan:</span>
                  <span className={`font-semibold ${
                    (availability || 15) > 5 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {availability || 15} kursi
                  </span>
                </div>
              </div>

              <Link to={ROUTES.BOOKING} onClick={handleBookNow}>
                <Button 
                  size="lg" 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 transition-colors"
                >
                  📅 Pesan Sekarang
                </Button>
              </Link>
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-green-600 mb-2">
                  <span>🛡️</span>
                  <span>Garansi Terpercaya</span>
                </div>
                <p className="text-xs text-gray-500">
                  Gratis pembatalan 30 hari sebelum keberangkatan
                </p>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <h4 className="font-bold text-lg mb-3 flex items-center">
                <span className="text-xl mr-2">💬</span>
                Butuh Bantuan?
              </h4>
              <p className="text-green-100 text-sm mb-4 leading-relaxed">
                Konsultan kami siap membantu menjawab pertanyaan Anda tentang paket umroh ini.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-6 mr-2">📞</span>
                  <span>+62 21 1234 5678</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 mr-2">💬</span>
                  <span>+62 812 3456 7890</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 mr-2">📧</span>
                  <span>info@umroh.com</span>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">⚡</span>
                Fakta Cepat
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal Berangkat:</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(departureDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal Pulang:</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(returnDate)}
                  </span>
                </div>
                {hotelMakkah && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hotel Makkah:</span>
                    <span className="font-medium text-gray-900">{hotelMakkah}</span>
                  </div>
                )}
                {hotelMadinah && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hotel Madinah:</span>
                    <span className="font-medium text-gray-900">{hotelMadinah}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;