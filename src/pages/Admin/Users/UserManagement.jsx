import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routeConstants';
import { useApp } from '../../../contexts/AppContext';
import FormInput from '../../../components/forms/FormInput/FormInput';
import Button from '../../../components/common/button/Button';
import LoadingSpinner from '../../../components/common/loading/LoadingSpinner';

const UserManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useApp();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, [id]);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setUser({
        id: parseInt(id),
        name: 'Ahmad Rahman',
        email: 'ahmad@email.com',
        phone: '+1 (555) 123-4567',
        role: 'user',
        status: 'active',
        dateOfBirth: '1985-05-15',
        address: '123 Main Street, Jakarta, Indonesia',
        emergencyContact: '+1 (555) 987-6543',
        passportNumber: 'AB123456',
        joinedDate: '2023-05-15',
        lastLogin: '2024-01-20',
        totalBookings: 5,
        totalSpent: 12495,
        preferences: {
          newsletter: true,
          smsNotifications: false,
          specialOffers: true
        }
      });
    } catch (error) {
      showNotification('Failed to load user details', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showNotification('User details updated successfully', 'success');
    } catch (error) {
      showNotification('Failed to update user details', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          User Not Found
        </h3>
        <Button onClick={() => navigate(ROUTES.ADMIN_USERS)}>
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(ROUTES.ADMIN_USERS)}
              className="text-gray-400 hover:text-gray-600"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
          </div>
          <p className="text-gray-600">
            {user.name} • {user.email}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button>
            Send Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                value={user.name}
                onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
              />
              <FormInput
                label="Email"
                type="email"
                value={user.email}
                onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
              />
              <FormInput
                label="Phone"
                value={user.phone}
                onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
              />
              <FormInput
                label="Date of Birth"
                type="date"
                value={user.dateOfBirth}
                onChange={(e) => setUser(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              />
              <FormInput
                label="Passport Number"
                value={user.passportNumber}
                onChange={(e) => setUser(prev => ({ ...prev, passportNumber: e.target.value }))}
              />
              <FormInput
                label="Emergency Contact"
                value={user.emergencyContact}
                onChange={(e) => setUser(prev => ({ ...prev, emergencyContact: e.target.value }))}
              />
            </div>

            <div className="mt-6">
              <FormInput
                label="Address"
                value={user.address}
                onChange={(e) => setUser(prev => ({ ...prev, address: e.target.value }))}
                multiline
                rows={3}
              />
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Account Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={user.role}
                  onChange={(e) => setUser(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={user.status}
                  onChange={(e) => setUser(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Stats */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              User Statistics
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Bookings:</span>
                <span className="font-semibold">{user.totalBookings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Spent:</span>
                <span className="font-semibold">${user.totalSpent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Member Since:</span>
                <span className="font-semibold">{new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Login:</span>
                <span className="font-semibold">{new Date(user.lastLogin).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Communication Preferences
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={user.preferences.newsletter}
                  onChange={(e) => setUser(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, newsletter: e.target.checked }
                  }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Email Newsletter
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={user.preferences.smsNotifications}
                  onChange={(e) => setUser(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, smsNotifications: e.target.checked }
                  }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  SMS Notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={user.preferences.specialOffers}
                  onChange={(e) => setUser(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, specialOffers: e.target.checked }
                  }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Special Offers
                </label>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                📧 Send Welcome Email
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded">
                🔑 Reset Password
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded">
                📊 View Booking History
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                🚫 Suspend Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;