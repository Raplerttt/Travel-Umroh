import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    primary: 'text-primary-500',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          ${sizes[size]}
          ${colors[color]}
          border-2 border-current border-t-transparent
          rounded-full animate-spin
        `}
      />
    </div>
  );
};

export default LoadingSpinner;