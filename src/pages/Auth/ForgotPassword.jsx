import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { ROUTES } from '../../routes/routeConstants';
import FormInput from '../../components/forms/FormInput/FormInput';
import Button from '../../components/common/button/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { showNotification } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showNotification('Password reset instructions sent to your email', 'success');
      setIsSubmitted(true);
      setError('');
    } catch (error) {
      showNotification('Failed to send reset instructions', 'error');
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
              Check your email
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
                      We've sent password reset instructions to <strong>{email}</strong>
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4">
                Didn't receive the email?{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Back to sign in
            </Link>
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
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <FormInput
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={error}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending instructions...' : 'Send reset instructions'}
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
      </div>
    </div>
  );
};

export default ForgotPassword;