import React from 'react';

const ItineraryItem = ({ 
  day,
  title,
  description,
  activities = [],
  isFirst = false,
  isLast = false
}) => {
  // Icons based on activity type
  const getActivityIcon = (activity) => {
    if (activity.toLowerCase().includes('sholat') || activity.toLowerCase().includes('shalat') || activity.toLowerCase().includes('prayer')) return '🕌';
    if (activity.toLowerCase().includes('thawaf') || activity.toLowerCase().includes('tawaf') || activity.toLowerCase().includes('sa\'i')) return '🕋';
    if (activity.toLowerCase().includes('flight') || activity.toLowerCase().includes('penerbangan') || activity.toLowerCase().includes('penerbangan')) return '✈️';
    if (activity.toLowerCase().includes('hotel') || activity.toLowerCase().includes('check-in') || activity.toLowerCase().includes('check in')) return '🏨';
    if (activity.toLowerCase().includes('meal') || activity.toLowerCase().includes('makan') || activity.toLowerCase().includes('makan')) return '🍽️';
    if (activity.toLowerCase().includes('ziarah') || activity.toLowerCase().includes('tour') || activity.toLowerCase().includes('kunjungan')) return '📿';
    if (activity.toLowerCase().includes('manasik')) return '📖';
    if (activity.toLowerCase().includes('rest') || activity.toLowerCase().includes('istirahat') || activity.toLowerCase().includes('free')) return '💤';
    if (activity.toLowerCase().includes('miqat') || activity.toLowerCase().includes('ihram')) return '🧕';
    if (activity.toLowerCase().includes('tahallul')) return '✂️';
    if (activity.toLowerCase().includes('shopping') || activity.toLowerCase().includes('belanja')) return '🛍️';
    if (activity.toLowerCase().includes('packing') || activity.toLowerCase().includes('barang')) return '🎒';
    return '•';
  };

  return (
    <div className="flex group">
      {/* Timeline */}
      <div className="flex flex-col items-center mr-4 lg:mr-6">
        {/* Top line - only show if not first */}
        {!isFirst && (
          <div className="w-0.5 bg-green-200 h-6 rounded-t-full" />
        )}
        
        {/* Day circle */}
        <div className="relative">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <span className="text-white text-sm lg:text-base font-bold">
              {typeof day === 'string' && day.includes('Hari') ? day.split(' ')[1] : day}
            </span>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-200" />
        </div>

        {/* Bottom line - only show if not last */}
        {!isLast && (
          <div className="w-0.5 bg-green-200 h-6 rounded-b-full flex-1" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 lg:pb-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 lg:p-8 group-hover:border-green-200">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">
                  {title.includes('Makkah') || title.includes('Masjidil Haram') ? '🕋' : 
                   title.includes('Madinah') || title.includes('Masjid Nabawi') ? '🕌' :
                   title.includes('Penerbangan') || title.includes('Keberangkatan') ? '✈️' : '📅'}
                </span>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                  {title}
                </h3>
              </div>
              
              {/* Description */}
              {description && (
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Day Badge */}
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold border border-green-200">
              {typeof day === 'string' ? day : `Hari ${day}`}
            </div>
          </div>

          {/* Activities */}
          {activities && activities.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs mr-2">
                  📝
                </span>
                Aktivitas Hari Ini:
              </h4>
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:bg-green-50 transition-colors">
                    <span className="text-lg mt-0.5 flex-shrink-0">
                      {getActivityIcon(activity)}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info Based on Day Type */}
          {renderAdditionalInfo(title, activities)}

          {/* Tips */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <span className="text-yellow-500 mt-0.5">💡</span>
              <p>
                <strong>Tips:</strong> {getDaySpecificTips(title)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to render additional info based on day type
const renderAdditionalInfo = (title, activities) => {
  if (title.includes('Penerbangan') || title.includes('Keberangkatan')) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs mr-2">
            ✈️
          </span>
          Informasi Penerbangan:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <span className="text-xl">🛄</span>
            <div>
              <div className="text-sm font-medium text-gray-700">Bagasi</div>
              <div className="text-xs text-blue-600">23kg + 7kg cabin</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <span className="text-xl">⏰</span>
            <div>
              <div className="text-sm font-medium text-gray-700">Check-in</div>
              <div className="text-xs text-blue-600">3 jam sebelum keberangkatan</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (title.includes('Makkah') || activities?.some(act => act.includes('Masjidil Haram'))) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs mr-2">
            🕋
          </span>
          Informasi Makkah:
        </h4>
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
          <span className="text-2xl">🕋</span>
          <div>
            <p className="text-sm font-medium text-gray-700">Masjidil Haram</p>
            <p className="text-xs text-red-600 mt-1">Patuhi aturan dan etika beribadah di area Masjidil Haram</p>
          </div>
        </div>
      </div>
    );
  }

  if (title.includes('Madinah') || activities?.some(act => act.includes('Masjid Nabawi'))) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs mr-2">
            🕌
          </span>
          Informasi Madinah:
        </h4>
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
          <span className="text-2xl">🕌</span>
          <div>
            <p className="text-sm font-medium text-gray-700">Masjid Nabawi</p>
            <p className="text-xs text-green-600 mt-1">Raudhah dan makam Rasulullah berada di kompleks masjid</p>
          </div>
        </div>
      </div>
    );
  }

  if (title.includes('Miqat') || activities?.some(act => act.includes('ihram'))) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
          <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs mr-2">
            🧕
          </span>
          Informasi Miqat:
        </h4>
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
          <span className="text-2xl">🧕</span>
          <div>
            <p className="text-sm font-medium text-gray-700">Pakaian Ihram</p>
            <p className="text-xs text-purple-600 mt-1">Pakai pakaian ihram dan bacaan talbiyah dimulai dari miqat</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Helper function to get day-specific tips
const getDaySpecificTips = (title) => {
  if (title.includes('Penerbangan') || title.includes('Keberangkatan')) {
    return 'Pastikan dokumen lengkap, uang saku dalam USD, dan bawalah obat pribadi.';
  }
  if (title.includes('Miqat') || title.includes('ihram')) {
    return 'Persiapkan pakaian ihram, hafal bacaan talbiyah, dan hindari larangan ihram.';
  }
  if (title.includes('Makkah') || title.includes('Masjidil Haram')) {
    return 'Minum air zamzam secukupnya, jaga wudhu, dan manfaatkan waktu untuk ibadah di Masjidil Haram.';
  }
  if (title.includes('Madinah') || title.includes('Masjid Nabawi')) {
    return 'Sering-seringlah shalat di Raudhah, baca shalawat, dan ziarah ke makam Rasulullah.';
  }
  if (title.includes('Kepulangan') || title.includes('Pulang')) {
    return 'Periksa kembali barang bawaan, siapkan dokumen kepulangan, dan bawa oleh-oleh zamzam.';
  }
  return 'Pastikan kondisi fisik prima, patuhi petunjuk pembimbing, dan manfaatkan waktu untuk ibadah.';
};

export default ItineraryItem;