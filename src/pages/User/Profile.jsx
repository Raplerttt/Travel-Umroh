import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import FormInput from '../../components/forms/FormInput/FormInput';
import Button from '../../components/common/button/Button';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showNotification } = useApp();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || '',
    passportNumber: user?.passportNumber || '',
    dateOfBirth: user?.dateOfBirth || '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await updateProfile(formData);
      
      if (result.success) {
        showNotification('Profile updated successfully!', 'success');
      } else {
        showNotification(result.error, 'error');
      }
    } catch (error) {
      showNotification('Failed to update profile', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />

                <FormInput
                  label="Passport Number"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  placeholder="Enter passport number"
                />

                <FormInput
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />

                <FormInput
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency contact number"
                />
              </div>

              <FormInput
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="space-y-6">
          {/* Account Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Account Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loyalty Points</span>
                <span className="font-medium">1,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Profile Completion
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Basic Information</span>
                <span className="text-green-600 font-medium">Complete</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Contact Details</span>
                <span className="text-green-600 font-medium">Complete</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Passport Information</span>
                <span className="text-yellow-600 font-medium">Pending</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Emergency Contact</span>
                <span className="text-yellow-600 font-medium">Pending</span>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h3 className="font-semibold text-primary-900 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left text-primary-700 hover:text-primary-800 text-sm py-2">
                📄 Download Profile Data
              </button>
              <button className="w-full text-left text-primary-700 hover:text-primary-800 text-sm py-2">
                🔒 Privacy Settings
              </button>
              <button className="w-full text-left text-primary-700 hover:text-primary-800 text-sm py-2">
                📧 Notification Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;