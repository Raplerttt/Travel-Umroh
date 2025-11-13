import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import FormInput from '../../components/forms/FormInput/FormInput';
import Button from '../../components/common/button/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useApp();

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

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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
      
      showNotification('Message sent successfully! We will get back to you soon.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      showNotification('Failed to send message', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Mon to Fri 9am to 6pm'
    },
    {
      icon: '✉️',
      title: 'Email',
      details: 'info@umrohtravel.com',
      description: 'Send us your query anytime!'
    },
    {
      icon: '📍',
      title: 'Address',
      details: '123 Travel Street, Mecca',
      description: 'Saudi Arabia'
    },
    {
      icon: '🕒',
      title: 'Office Hours',
      details: 'Monday - Saturday',
      description: '9:00 AM - 6:00 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our Umroh packages? We're here to help you plan your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Enter your full name"
                    required
                  />

                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Enter your email"
                    required
                  />

                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="Enter your phone number"
                    required
                  />

                  <FormInput
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-3xl mb-3">{info.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {info.title}
                </h3>
                <p className="text-primary-600 font-medium mb-1">
                  {info.details}
                </p>
                <p className="text-gray-500 text-sm">
                  {info.description}
                </p>
              </div>
            ))}

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Emergency Contact
              </h3>
              <p className="text-red-700 mb-3">
                For urgent matters during travel
              </p>
              <div className="text-red-600 font-semibold">
                +966 55 123 4567
              </div>
              <p className="text-red-500 text-sm mt-1">
                24/7 Available
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Quick answers to common questions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'What documents are required for Umroh?',
              'How far in advance should I book?',
              'What is included in the package price?',
              'Can I customize my itinerary?',
              'What is your cancellation policy?',
              'Do you provide visa assistance?'
            ].map((question, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border text-center">
                <p className="text-gray-900 font-medium">{question}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-8">
            View All FAQs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;