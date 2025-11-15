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
    originalPrice,
    duration,
    image,
    features = [],
    isFeatured = false,
    discount,
    category,
    rating,
    reviewCount
  } = pkg;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 ${className}`}>
      {/* Image */}
      <div className="relative">
        <img
          src={image || pkg.images?.[0] || '/images/package-default.jpg'}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isFeatured && (
            <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
              ⭐ Featured
            </span>
          )}
          {category && (
            <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
              {category}
            </span>
          )}
        </div>
        
        {discount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
              -{discount}%
            </span>
          </div>
        )}
        
        <div className="absolute bottom-3 left-3">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded-full">
            {duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        {rating && (
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(rating))}
              {'☆'.repeat(5 - Math.floor(rating))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {rating} ({reviewCount || 0} reviews)
            </span>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <ul className="mb-4 space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
            {features.length > 3 && (
              <li className="text-xs text-gray-500 pl-6">
                +{features.length - 3} more features
              </li>
            )}
          </ul>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(price)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">per person</div>
          </div>

          <div className="flex gap-2">
            {/* View Details Button */}
            <Link to={`${ROUTES.PACKAGES}/${id}`}>
              <Button 
                variant="outline" 
                size="sm"
                className="whitespace-nowrap"
              >
                Details
              </Button>
            </Link>
            
            {/* Book Now Button */}
            <Link to={`${ROUTES.PACKAGES}/${id}/book`}>
              <Button 
                size="sm"
                className="whitespace-nowrap bg-green-500 hover:bg-green-600"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;