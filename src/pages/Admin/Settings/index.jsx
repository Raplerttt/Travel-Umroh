import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import FormInput from '../../../components/forms/FormInput/FormInput';
import Button from '../../../components/common/button/Button';

const AdminSettings = () => {
  const { showNotification } = useApp();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Umroh Travel',
    siteDescription: 'Your Trusted Umroh Travel Partner',
    contactEmail: 'info@umrohtravel.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Travel Street, Mecca, Saudi Arabia',
    currency: 'USD',
    timezone: 'Asia/Riyadh'
  });

  const [bookingSettings, setBookingSettings] = useState({
    advanceBookingDays: 30,
    maxPassengers: 10,
    cancellationPolicy: 'Free cancellation up to 30 days before departure',
    paymentDueDays: 7,
    autoConfirm: false,
    requireDocuments: true
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.umrohtravel.com',
    smtpPort: '587',
    smtpUsername: 'noreply@umrohtravel.com',
    fromName: 'Umroh Travel',
    fromEmail: 'noreply@umrohtravel.com',
    bookingConfirmation: true,
    paymentReminders: true,
    newsletter: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    require2FA: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    ipWhitelist: '',
    auditLog: true
  });

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'booking', name: 'Booking', icon: '📅' },
    { id: 'email', name: 'Email', icon: '📧' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'payment', name: 'Payment', icon: '💳' }
  ];

  const handleSaveSettings = async (settingsType) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showNotification(`${settingsType} settings saved successfully`, 'success');
    } catch (error) {
      showNotification(`Failed to save ${settingsType} settings`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Site Name"
          value={generalSettings.siteName}
          onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
        />
        <FormInput
          label="Contact Email"
          type="email"
          value={generalSettings.contactEmail}
          onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
        />
        <FormInput
          label="Contact Phone"
          value={generalSettings.contactPhone}
          onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
        />
        <FormInput
          label="Currency"
          value={generalSettings.currency}
          onChange={(e) => setGeneralSettings(prev => ({ ...prev, currency: e.target.value }))}
        />
      </div>
      
      <FormInput
        label="Site Description"
        value={generalSettings.siteDescription}
        onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
        multiline
        rows={3}
      />
      
      <FormInput
        label="Address"
        value={generalSettings.address}
        onChange={(e) => setGeneralSettings(prev => ({ ...prev, address: e.target.value }))}
        multiline
        rows={2}
      />

      <div className="flex justify-end">
        <Button
          onClick={() => handleSaveSettings('General')}
          loading={saving}
          disabled={saving}
        >
          Save General Settings
        </Button>
      </div>
    </div>
  );

  const renderBookingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Advance Booking (Days)"
          type="number"
          value={bookingSettings.advanceBookingDays}
          onChange={(e) => setBookingSettings(prev => ({ ...prev, advanceBookingDays: parseInt(e.target.value) }))}
        />
        <FormInput
          label="Max Passengers per Booking"
          type="number"
          value={bookingSettings.maxPassengers}
          onChange={(e) => setBookingSettings(prev => ({ ...prev, maxPassengers: parseInt(e.target.value) }))}
        />
        <FormInput
          label="Payment Due (Days)"
          type="number"
          value={bookingSettings.paymentDueDays}
          onChange={(e) => setBookingSettings(prev => ({ ...prev, paymentDueDays: parseInt(e.target.value) }))}
        />
      </div>

      <FormInput
        label="Cancellation Policy"
        value={bookingSettings.cancellationPolicy}
        onChange={(e) => setBookingSettings(prev => ({ ...prev, cancellationPolicy: e.target.value }))}
        multiline
        rows={3}
      />

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={bookingSettings.autoConfirm}
            onChange={(e) => setBookingSettings(prev => ({ ...prev, autoConfirm: e.target.checked }))}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Auto-confirm bookings
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={bookingSettings.requireDocuments}
            onChange={(e) => setBookingSettings(prev => ({ ...prev, requireDocuments: e.target.checked }))}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Require documents before confirmation
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSaveSettings('Booking')}
          loading={saving}
          disabled={saving}
        >
          Save Booking Settings
        </Button>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="SMTP Host"
          value={emailSettings.smtpHost}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
        />
        <FormInput
          label="SMTP Port"
          value={emailSettings.smtpPort}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
        />
        <FormInput
          label="SMTP Username"
          value={emailSettings.smtpUsername}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
        />
        <FormInput
          label="From Name"
          value={emailSettings.fromName}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
        />
        <FormInput
          label="From Email"
          type="email"
          value={emailSettings.fromEmail}
          onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
        />
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Email Notifications</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={emailSettings.bookingConfirmation}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, bookingConfirmation: e.target.checked }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Send booking confirmation emails
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={emailSettings.paymentReminders}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, paymentReminders: e.target.checked }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Send payment reminder emails
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={emailSettings.newsletter}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, newsletter: e.target.checked }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Send newsletter to subscribers
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSaveSettings('Email')}
          loading={saving}
          disabled={saving}
        >
          Save Email Settings
        </Button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Session Timeout (Minutes)"
          type="number"
          value={securitySettings.sessionTimeout}
          onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
        />
        <FormInput
          label="Max Login Attempts"
          type="number"
          value={securitySettings.maxLoginAttempts}
          onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
        />
        <FormInput
          label="Password Expiry (Days)"
          type="number"
          value={securitySettings.passwordExpiry}
          onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordExpiry: parseInt(e.target.value) }))}
        />
      </div>

      <FormInput
        label="IP Whitelist (Optional)"
        value={securitySettings.ipWhitelist}
        onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value }))}
        placeholder="Enter IP addresses separated by commas"
        multiline
        rows={2}
      />

      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={securitySettings.require2FA}
            onChange={(e) => setSecuritySettings(prev => ({ ...prev, require2FA: e.target.checked }))}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Require Two-Factor Authentication for admin accounts
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={securitySettings.auditLog}
            onChange={(e) => setSecuritySettings(prev => ({ ...prev, auditLog: e.target.checked }))}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Enable audit logging
          </label>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <svg className="h-5 w-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Security Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Changes to security settings may affect system access and user experience.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSaveSettings('Security')}
          loading={saving}
          disabled={saving}
        >
          Save Security Settings
        </Button>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Payment Gateway Configuration</h3>
        <p className="text-blue-700">
          Configure your payment gateway settings to accept online payments securely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Stripe Publishable Key"
          type="password"
          placeholder="pk_live_..."
        />
        <FormInput
          label="Stripe Secret Key"
          type="password"
          placeholder="sk_live_..."
        />
        <FormInput
          label="PayPal Client ID"
          type="password"
          placeholder="Client ID"
        />
        <FormInput
          label="PayPal Secret"
          type="password"
          placeholder="Secret Key"
        />
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Payment Methods</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm text-gray-900">Credit/Debit Cards</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm text-gray-900">Bank Transfer</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm text-gray-900">PayPal</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm text-gray-900">Installment Plans</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSaveSettings('Payment')}
          loading={saving}
          disabled={saving}
        >
          Save Payment Settings
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure your Umroh travel system settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tabs */}
        <div className="border-b">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-6 text-sm font-medium border-b-2 transition-colors flex items-center space-x-2
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'booking' && renderBookingSettings()}
          {activeTab === 'email' && renderEmailSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'payment' && renderPaymentSettings()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;