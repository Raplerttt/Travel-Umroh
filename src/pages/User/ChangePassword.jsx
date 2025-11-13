import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import FormInput from '../../components/forms/FormInput/FormInput';
import Button from '../../components/common/button/Button';

const ChangePassword = () => {
  const { changePassword } = useAuth();
  const { showNotification } = useApp();
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      if (result.success) {
        showNotification('Password changed successfully!', 'success');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setErrors({});
      } else {
        showNotification(result.error, 'error');
        setErrors({ submit: result.error });
      }
    } catch (error) {
      showNotification('Failed to change password', 'error');
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z\d]/.test(password)) strength += 1;
    
    const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return { strength, label: labels[strength], color: colors[strength] };
  };

  const strength = passwordStrength(formData.newPassword);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
        <p className="text-gray-600">Update your account password</p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
            {/* Current Password */}
            <FormInput
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
              placeholder="Enter your current password"
              required
            />

            {/* New Password */}
            <div>
              <FormInput
                label="New Password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                error={errors.newPassword}
                placeholder="Enter your new password"
                required
              />
              
              {formData.newPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Password strength:</span>
                    <span className={`text-sm font-medium ${
                      strength.strength <= 2 ? 'text-red-600' :
                      strength.strength <= 3 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${(strength.strength / 5) * 100}%` }}
                    />
                  </div>
                  <ul className="mt-2 text-xs text-gray-600 space-y-1">
                    <li className={formData.newPassword.length >= 8 ? 'text-green-600' : ''}>
                      ✓ At least 8 characters
                    </li>
                    <li className={/[a-z]/.test(formData.newPassword) ? 'text-green-600' : ''}>
                      ✓ Lowercase letter
                    </li>
                    <li className={/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : ''}>
                      ✓ Uppercase letter
                    </li>
                    <li className={/\d/.test(formData.newPassword) ? 'text-green-600' : ''}>
                      ✓ Number
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <FormInput
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm your new password"
              required
            />

            {/* Submit Error */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {errors.submit}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Password Security Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use a unique password that you don't use elsewhere</li>
                <li>• Avoid using personal information like birthdays or names</li>
                <li>• Consider using a password manager</li>
                <li>• Change your password regularly</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Changing Password...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;