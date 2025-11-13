import React from 'react';
import FormInput from '../../forms/FormInput/FormInput';
import DatePicker from '../../forms/DatePicker/DatePicker';

const PassengerForm = ({
  passenger,
  index,
  onChange,
  errors = {},
  isMainPassenger = false
}) => {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900">
          {isMainPassenger ? 'Main Passenger' : `Passenger ${index + 1}`}
        </h4>
        {isMainPassenger && (
          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
            Primary
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information */}
        <div className="md:col-span-2">
          <h5 className="text-sm font-semibold text-gray-700 mb-3">Personal Information</h5>
        </div>

        <FormInput
          label="Full Name"
          name={`name_${index}`}
          value={passenger.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
        />

        <FormInput
          label="Passport Number"
          name={`passport_${index}`}
          value={passenger.passportNumber}
          onChange={(e) => handleChange('passportNumber', e.target.value)}
          error={errors.passportNumber}
          required
        />

        <DatePicker
          label="Date of Birth"
          name={`dob_${index}`}
          value={passenger.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          error={errors.dateOfBirth}
          required
        />

        <FormInput
          label="Place of Birth"
          name={`pob_${index}`}
          value={passenger.placeOfBirth}
          onChange={(e) => handleChange('placeOfBirth', e.target.value)}
          error={errors.placeOfBirth}
          required
        />

        <div className="md:col-span-2">
          <h5 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h5>
        </div>

        <FormInput
          label="Email"
          name={`email_${index}`}
          type="email"
          value={passenger.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required={isMainPassenger}
        />

        <FormInput
          label="Phone Number"
          name={`phone_${index}`}
          value={passenger.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          required={isMainPassenger}
        />

        <div className="md:col-span-2">
          <h5 className="text-sm font-semibold text-gray-700 mb-3">Additional Information</h5>
        </div>

        <FormInput
          label="Emergency Contact Name"
          name={`emergency_name_${index}`}
          value={passenger.emergencyContactName}
          onChange={(e) => handleChange('emergencyContactName', e.target.value)}
          error={errors.emergencyContactName}
          required={isMainPassenger}
        />

        <FormInput
          label="Emergency Contact Phone"
          name={`emergency_phone_${index}`}
          value={passenger.emergencyContactPhone}
          onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
          error={errors.emergencyContactPhone}
          required={isMainPassenger}
        />

        {/* Special Requirements */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requirements
          </label>
          <textarea
            name={`requirements_${index}`}
            value={passenger.specialRequirements}
            onChange={(e) => handleChange('specialRequirements', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Any dietary restrictions, medical conditions, or special needs..."
          />
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;