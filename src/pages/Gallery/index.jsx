import React, { useState } from 'react';
import { useGallery } from '../../hooks/useGallery';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const Gallery = () => {
  const { gallery, categories, isLoading } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Kategori berdasarkan data gallery umroh
  const galleryCategories = [
    { id: 'all', name: 'Semua Foto', icon: '📸' },
    { id: 'makkah', name: 'Makkah', icon: '🕋' },
    { id: 'madinah', name: 'Madinah', icon: '🕌' },
    { id: 'ibadah', name: 'Ibadah', icon: '🙏' },
    { id: 'sejarah', name: 'Sejarah Islam', icon: '📜' },
    { id: 'akomodasi', name: 'Akomodasi', icon: '🏨' },
    { id: 'transportasi', name: 'Transportasi', icon: '🚌' },
    { id: 'makanan', name: 'Makanan', icon: '🍽️' },
    { id: 'kegiatan', name: 'Kegiatan', icon: '📸' }
  ];

  const filteredGallery = selectedCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === selectedCategory);

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
            Galeri Umroh
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi momen-momen berharga dari perjalanan umroh sebelumnya dan lihat apa yang menanti Anda
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {galleryCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-green-300'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold text-green-600">{filteredGallery.length}</span> foto 
            {selectedCategory !== 'all' && ` dalam kategori ${galleryCategories.find(cat => cat.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                {item.isFeatured && (
                  <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Unggulan
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full capitalize">
                    {galleryCategories.find(cat => cat.id === item.category)?.name || item.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      👁️ {item.views}
                    </span>
                    <span className="flex items-center gap-1">
                      ❤️ {item.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-8xl mb-6">📷</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Foto tidak ditemukan
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {selectedCategory === 'all' 
                ? 'Belum ada foto dalam galeri. Silakan coba lagi nanti.'
                : `Tidak ada foto dalam kategori ${galleryCategories.find(cat => cat.id === selectedCategory)?.name}. Coba pilih kategori lain.`
              }
            </p>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                Lihat Semua Foto
              </button>
            )}
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="max-w-6xl max-h-full bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-96 object-contain bg-gray-100"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {selectedImage.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {galleryCategories.find(cat => cat.id === selectedImage.category)?.icon}
                    {galleryCategories.find(cat => cat.id === selectedImage.category)?.name}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{selectedImage.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{new Date(selectedImage.uploadDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👁️</span>
                    <span>{selectedImage.views} dilihat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>❤️</span>
                    <span>{selectedImage.likes} suka</span>
                  </div>
                </div>

                {selectedImage.tags && selectedImage.tags.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;