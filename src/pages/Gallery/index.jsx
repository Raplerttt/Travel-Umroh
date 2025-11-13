import React, { useState } from 'react';
import { useGallery } from '../../hooks/useGallery';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const Gallery = () => {
  const { gallery, isLoading } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'mecca', name: 'Mecca' },
    { id: 'medina', name: 'Medina' },
    { id: 'hotels', name: 'Hotels' },
    { id: 'transport', name: 'Transport' },
    { id: 'group', name: 'Group Photos' }
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
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments from our previous Umroh journeys and see what awaits you
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No photos found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category to see more photos.
            </p>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-full">
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-96 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-600">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;