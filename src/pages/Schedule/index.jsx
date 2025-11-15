import React, { useState } from 'react';
import { useSchedule } from '../../hooks/useSchedule';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';
import Button from '../../components/common/button/Button';

const Schedule = () => {
  const { 
    schedules, 
    departureMonths, 
    airlines, 
    isLoading, 
    getSchedules,
    checkAvailability 
  } = useSchedule();

  const [filters, setFilters] = useState({
    departureMonth: '',
    airline: '',
    minPrice: '',
    maxPrice: '',
    duration: '',
    sort: 'date-early'
  });

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    getSchedules(newFilters);
  };

  const handleAvailabilityCheck = async (scheduleId) => {
    try {
      const result = await checkAvailability(scheduleId, 1);
      alert(`Kuota tersedia: ${result.availableSlots} kursi`);
    } catch (error) {
      // Error already handled in hook
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
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDeparture = (departureDate) => {
    const today = new Date();
    const departure = new Date(departureDate);
    const diffTime = departure - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Jadwal Keberangkatan Umroh
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih jadwal keberangkatan yang sesuai dengan waktu Anda. Dapatkan pengalaman umroh yang tak terlupakan.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Departure Month Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bulan Keberangkatan
              </label>
              <select
                value={filters.departureMonth}
                onChange={(e) => handleFilterChange('departureMonth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Semua Bulan</option>
                {departureMonths.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label} ({month.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Airline Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maskapai
              </label>
              <select
                value={filters.airline}
                onChange={(e) => handleFilterChange('airline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Semua Maskapai</option>
                {airlines.map(airline => (
                  <option key={airline} value={airline}>
                    {airline}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durasi Minimal
              </label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Semua Durasi</option>
                <option value="9">9+ hari</option>
                <option value="12">12+ hari</option>
                <option value="15">15+ hari</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urutkan Berdasarkan
              </label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="date-early">Tanggal Terdekat</option>
                <option value="date-late">Tanggal Terjauh</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="duration">Durasi Terlama</option>
              </select>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Minimum (Rp)
              </label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Maksimum (Rp)
              </label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                placeholder="100000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Schedules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {schedules.map((schedule) => {
            const daysUntilDeparture = getDaysUntilDeparture(schedule.departureDate);
            
            return (
              <div
                key={schedule.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Header with Status */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        {schedule.packageName}
                      </h3>
                      <p className="text-green-100 text-sm">
                        {schedule.airline} • {schedule.duration}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      schedule.availableSlots > 5 
                        ? 'bg-green-400 text-white' 
                        : schedule.availableSlots > 0
                        ? 'bg-yellow-400 text-white'
                        : 'bg-red-400 text-white'
                    }`}>
                      {schedule.availableSlots > 0 
                        ? `${schedule.availableSlots} kursi tersedia`
                        : 'Penuh'
                      }
                    </span>
                  </div>
                </div>

                {/* Schedule Details */}
                <div className="p-4">
                  {/* Departure Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Keberangkatan:</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatDate(schedule.departureDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Kepulangan:</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatDate(schedule.returnDate)}
                      </span>
                    </div>
                  </div>

                  {/* Countdown */}
                  {daysUntilDeparture > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-yellow-800 text-center">
                        {daysUntilDeparture === 1 
                          ? 'Berangkat besok!' 
                          : `Berangkat dalam ${daysUntilDeparture} hari`
                        }
                      </p>
                    </div>
                  )}

                  {/* Hotels */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Akomodasi:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Makkah:</span>
                        <span className="font-medium">{schedule.hotelMakkah}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Madinah:</span>
                        <span className="font-medium">{schedule.hotelMadinah}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(schedule.price)}
                      </span>
                      <span className="text-sm text-gray-500">/orang</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAvailabilityCheck(schedule.id)}
                      >
                        Cek Kuota
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedSchedule(schedule)}
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {schedules.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-8xl mb-6">📅</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Jadwal tidak ditemukan
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Tidak ada jadwal yang sesuai dengan filter yang dipilih. Coba ubah filter atau hubungi kami untuk informasi lebih lanjut.
            </p>
          </div>
        )}

        {/* Schedule Detail Modal */}
        {selectedSchedule && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSchedule(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedSchedule.packageName}
                    </h2>
                    <p className="text-green-100">
                      {selectedSchedule.airline} • {selectedSchedule.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSchedule(null)}
                    className="text-white hover:text-green-200 text-2xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Schedule Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Keberangkatan</h4>
                    <p className="text-gray-600">{formatDate(selectedSchedule.departureDate)}</p>
                    <p className="text-sm text-gray-500">{selectedSchedule.departureAirport}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Kepulangan</h4>
                    <p className="text-gray-600">{formatDate(selectedSchedule.returnDate)}</p>
                    <p className="text-sm text-gray-500">{selectedSchedule.arrivalAirport}</p>
                  </div>
                </div>

                {/* Itinerary Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Itinerary Singkat</h4>
                  <div className="space-y-3">
                    {selectedSchedule.itinerary.slice(0, 3).map((day, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {day.day}
                          </div>
                          {index < 2 && <div className="w-0.5 h-6 bg-gray-300 mt-1"></div>}
                        </div>
                        <div className="flex-1 pb-3">
                          <h5 className="font-medium text-gray-900">{day.title}</h5>
                          <p className="text-sm text-gray-600">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included & Excluded */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Termasuk:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedSchedule.included.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Tidak Termasuk:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedSchedule.excluded.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-red-500 mr-2">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedSchedule(null)}
                  >
                    Tutup
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => {
                      // Handle booking logic here
                      alert('Fitur booking akan segera tersedia');
                    }}
                  >
                    Booking Sekarang
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;