import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { ROUTES } from '../../routes/routeConstants';
import FormInput from '../../components/forms/FormInput/FormInput';
import Button from '../../components/common/button/Button';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { showNotification } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!token) {
      newErrors.token = 'Invalid reset link';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showNotification('Password reset successfully! You can now sign in with your new password.', 'success');
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate(ROUTES.LOGIN, { replace: true });
      }, 3000);
    } catch (error) {
      showNotification('Failed to reset password', 'error');
      setErrors({ submit: 'Failed to reset password. The link may have expired.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to={ROUTES.HOME} className="inline-flex items-center">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Password Reset
            </h2>
            <div className="mt-4 text-sm text-gray-600">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-800">
                      Your password has been reset successfully! Redirecting to login...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to={ROUTES.HOME} className="inline-flex items-center">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Set new password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        {/* Token error */}
        {errors.token && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {errors.token}
                </h3>
              </div>
            </div>
            <div className="mt-2 text-center">
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Request a new reset link
              </Link>
            </div>
          </div>
        )}

        {/* Form */}
        {!errors.token && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormInput
                label="New password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Enter your new password"
                required
              />

              <FormInput
                label="Confirm new password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Confirm your new password"
                required
              />
            </div>

            {/* Submit error */}
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

            {/* Submit button */}
            <div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Resetting password...' : 'Reset password'}
              </Button>
            </div>

            <div className="text-center">
              <Link
                to={ROUTES.LOGIN}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;