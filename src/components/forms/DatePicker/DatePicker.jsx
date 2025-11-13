import React from 'react';

const DatePicker = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  minDate,
  maxDate,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        min={minDate}
        max={maxDate}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${error 
            ? 'border-red-500' 
            : 'border-gray-300'
          }
          ${disabled 
            ? 'bg-gray-100 cursor-not-allowed' 
            : 'bg-white'
          }
        `}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default DatePicker;