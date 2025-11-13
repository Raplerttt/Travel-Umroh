import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routeConstants';
import { useApp } from '../../../contexts/AppContext';
import FormInput from '../../../components/forms/FormInput/FormInput';
import Button from '../../../components/common/button/Button';
import LoadingSpinner from '../../../components/common/loading/LoadingSpinner';

const PackageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useApp();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'premium',
    status: 'active',
    featured: false,
    image: '',
    features: [''],
    itinerary: [{ day: 1, title: '', description: '', activities: [''] }],
    inclusions: [''],
    exclusions: [''],
    importantNotes: ['']
  });

  useEffect(() => {
    if (isEditing) {
      loadPackageData();
    }
  }, [id]);

  const loadPackageData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for editing
      setFormData({
        name: 'Ramadan Special Umroh 2024',
        description: 'Special Umroh package during the blessed month of Ramadan',
        price: 2499,
        duration: 14,
        category: 'premium',
        status: 'active',
        featured: true,
        image: 'https://images.unsplash.com/photo-1547996160-81dfd13da7d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        features: ['5-star hotel near Haram', 'Direct flights', 'Experienced guide', 'All meals included'],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Jeddah',
            description: 'Arrive at Jeddah airport and transfer to Mecca',
            activities: ['Airport pickup', 'Transfer to Mecca', 'Hotel check-in', 'Rest']
          }
        ],
        inclusions: ['Return flights', 'Hotel accommodation', 'All ground transportation', 'Umroh visa'],
        exclusions: ['Personal expenses', 'Travel insurance', 'Additional meals', 'Tips'],
        importantNotes: ['Valid passport required', 'Vaccination certificates needed', 'Booking subject to availability']
      });
    } catch (error) {
      showNotification('Failed to load package data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayFieldItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayFieldItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showNotification(
        `Package ${isEditing ? 'updated' : 'created'} successfully!`,
        'success'
      );
      navigate(ROUTES.ADMIN_PACKAGES);
    } catch (error) {
      showNotification(
        `Failed to ${isEditing ? 'update' : 'create'} package`,
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Package' : 'Create New Package'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Update package details' : 'Add a new Umroh travel package'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Package Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter package name"
            />

            <FormInput
              label="Price ($)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter package price"
            />

            <FormInput
              label="Duration (days)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="Enter duration in days"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="premium">Premium</option>
                <option value="economic">Economic</option>
                <option value="family">Family</option>
                <option value="group">Group</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured Package
              </label>
            </div>
          </div>

          <div className="mt-6">
            <FormInput
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter package description"
              multiline
              rows={4}
            />
          </div>

          <div className="mt-6">
            <FormInput
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Features</h2>
            <button
              type="button"
              onClick={() => addArrayFieldItem('features')}
              className="px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600"
            >
              + Add Feature
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FormInput
                  value={feature}
                  onChange={(e) => handleArrayFieldChange('features', index, e.target.value)}
                  placeholder="Enter feature"
                  className="flex-1"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayFieldItem('features', index)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Inclusions</h2>
              <button
                type="button"
                onClick={() => addArrayFieldItem('inclusions')}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                + Add Inclusion
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FormInput
                    value={inclusion}
                    onChange={(e) => handleArrayFieldChange('inclusions', index, e.target.value)}
                    placeholder="What's included"
                    className="flex-1"
                  />
                  {formData.inclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayFieldItem('inclusions', index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Exclusions</h2>
              <button
                type="button"
                onClick={() => addArrayFieldItem('exclusions')}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                + Add Exclusion
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.exclusions.map((exclusion, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FormInput
                    value={exclusion}
                    onChange={(e) => handleArrayFieldChange('exclusions', index, e.target.value)}
                    placeholder="What's not included"
                    className="flex-1"
                  />
                  {formData.exclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayFieldItem('exclusions', index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Important Notes</h2>
            <button
              type="button"
              onClick={() => addArrayFieldItem('importantNotes')}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
            >
              + Add Note
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.importantNotes.map((note, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FormInput
                  value={note}
                  onChange={(e) => handleArrayFieldChange('importantNotes', index, e.target.value)}
                  placeholder="Enter important note"
                  className="flex-1"
                />
                {formData.importantNotes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayFieldItem('importantNotes', index)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.ADMIN_PACKAGES)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (isEditing ? 'Updating...' : 'Creating...')
              : (isEditing ? 'Update Package' : 'Create Package')
            }
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;