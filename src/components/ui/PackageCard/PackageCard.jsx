import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routeConstants';
import Button from '../../common/button/Button';

const PackageCard = ({ 
  package: pkg, 
  className = '' 
}) => {
  const {
    id,
    name,
    description,
    price,
    duration,
    image,
    features = [],
    isFeatured = false,
    discount
  } = pkg;

  return (
    <div className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {isFeatured && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary-500 text-white px-2 py-1 text-xs font-semibold rounded">
              Featured
            </span>
          </div>
        )}
        {discount && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              -{discount}%
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
            {duration} days
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <ul className="mb-4 space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
            {features.length > 3 && (
              <li className="text-sm text-gray-500">
                +{features.length - 3} more features
              </li>
            )}
          </ul>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            {discount ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-600">
                  ${price - (price * discount / 100)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${price}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary-600">
                ${price}
              </span>
            )}
            <div className="text-sm text-gray-500">per person</div>
          </div>

          <Link to={ROUTES.BOOKING(id)}>
            <Button size="sm">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;