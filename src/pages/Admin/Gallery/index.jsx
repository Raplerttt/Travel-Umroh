import React, { useState, useEffect } from 'react';
import { useApp } from '../../../contexts/AppContext';
import Button from '../../../components/common/button/Button';
import Modal from '../../../components/common/modal/Modal';
import LoadingSpinner from '../../../components/common/loading/LoadingSpinner';

const AdminGallery = () => {
  const { showNotification } = useApp();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      setImages([
        {
          id: 1,
          title: 'Kaaba View',
          description: 'Beautiful view of the Kaaba during Ramadan',
          category: 'mecca',
          image: 'https://images.unsplash.com/photo-1547996160-81dfd13da7d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          uploadedAt: '2024-01-15',
          featured: true
        },
        {
          id: 2,
          title: 'Prophet Mosque',
          description: 'The beautiful Prophet Mosque in Medina',
          category: 'medina',
          image: 'https://images.unsplash.com/photo-1575886870667-39c0a0b1c043?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          uploadedAt: '2024-01-14',
          featured: true
        },
        {
          id: 3,
          title: 'Hotel Accommodation',
          description: '5-star hotel near Haram with excellent facilities',
          category: 'hotels',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          uploadedAt: '2024-01-13',
          featured: false
        },
        {
          id: 4,
          title: 'Group Photo',
          description: 'Our happy pilgrims after completing Umroh',
          category: 'group',
          image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          uploadedAt: '2024-01-12',
          featured: false
        }
      ]);
    } catch (error) {
      showNotification('Failed to load gallery', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'mecca', name: 'Mecca' },
    { id: 'medina', name: 'Medina' },
    { id: 'hotels', name: 'Hotels' },
    { id: 'transport', name: 'Transport' },
    { id: 'group', name: 'Group Photos' }
  ];

  const handleUpload = async (formData) => {
    setUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newImage = {
        id: images.length + 1,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: URL.createObjectURL(formData.file),
        uploadedAt: new Date().toISOString().split('T')[0],
        featured: false
      };
      
      setImages(prev => [newImage, ...prev]);
      setShowUploadModal(false);
      showNotification('Image uploaded successfully', 'success');
    } catch (error) {
      showNotification('Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const toggleFeatured = async (image) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setImages(prev => prev.map(img =>
        img.id === image.id ? { ...img, featured: !img.featured } : img
      ));
      
      showNotification(`Image ${image.featured ? 'removed from' : 'added to'} featured`, 'success');
    } catch (error) {
      showNotification('Failed to update featured status', 'error');
    }
  };

  const deleteImage = async (imageId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setImages(prev => prev.filter(img => img.id !== imageId));
      showNotification('Image deleted successfully', 'success');
    } catch (error) {
      showNotification('Failed to delete image', 'error');
    }
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600">Manage photos for your Umroh packages</p>
        </div>
        
        <Button onClick={() => setShowUploadModal(true)}>
          + Upload Image
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
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
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {image.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full capitalize">
                      {image.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() => toggleFeatured(image)}
                      className={`text-xs px-2 py-1 rounded ${
                        image.featured
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {image.featured ? 'Unfeature' : 'Feature'}
                    </button>
                    
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🖼️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No images found
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedCategory !== 'all' 
                  ? `No images in ${categories.find(c => c.id === selectedCategory)?.name} category`
                  : 'Get started by uploading your first image'
                }
              </p>
              {selectedCategory === 'all' && (
                <Button onClick={() => setShowUploadModal(true)}>
                  Upload Image
                </Button>
              )}
            </div>
          )}
        </>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload New Image"
      >
        <UploadForm 
          onUpload={handleUpload}
          onCancel={() => setShowUploadModal(false)}
          uploading={uploading}
          categories={categories.filter(c => c.id !== 'all')}
        />
      </Modal>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-96 object-contain"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-600 mb-2">{selectedImage.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="capitalize">{selectedImage.category}</span>
                <span>Uploaded: {new Date(selectedImage.uploadedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Upload Form Component
const UploadForm = ({ onUpload, onCancel, uploading, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'mecca',
    file: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.file && formData.title) {
      onUpload(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image File *
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: JPG, PNG, WebP. Max size: 5MB
        </p>
      </div>

      {formData.file && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            Selected file: {formData.file.name}
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={uploading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!formData.file || !formData.title || uploading}
          loading={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </div>
    </form>
  );
};

export default AdminGallery;