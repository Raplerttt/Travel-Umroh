import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConstants';
import { usePackages } from '../../hooks/usePackages';
import { PackageCard } from '../../components/ui';
import Button from '../../components/common/button/Button';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const Home = () => {
  const { featuredPackages, isLoading } = usePackages();

  const stats = [
    { number: '5000+', label: 'Happy Pilgrims' },
    { number: '50+', label: 'Umroh Packages' },
    { number: '10+', label: 'Years Experience' },
    { number: '24/7', label: 'Customer Support' },
  ];

  const features = [
    {
      icon: '🕌',
      title: 'Expert Guidance',
      description: 'Experienced guides to assist you throughout your spiritual journey.'
    },
    {
      icon: '🏨',
      title: 'Quality Accommodation',
      description: 'Comfortable hotels near Haram with excellent facilities.'
    },
    {
      icon: '✈️',
      title: 'Direct Flights',
      description: 'Convenient flight arrangements with reputable airlines.'
    },
    {
      icon: '📋',
      title: 'Complete Documentation',
      description: 'We handle all visa and travel documentation for you.'
    },
    {
      icon: '🍽️',
      title: 'Nutritious Meals',
      description: 'Healthy and delicious meals throughout your journey.'
    },
    {
      icon: '🚌',
      title: 'Comfortable Transport',
      description: 'Air-conditioned buses for all your transportation needs.'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Begin Your Spiritual Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience the blessing of Umroh with our trusted travel services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.PACKAGES}>
                <Button size="lg" variant="secondary">
                  View Packages
                </Button>
              </Link>
              <Link to={ROUTES.ABOUT}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive Umroh services to ensure your spiritual journey is comfortable and meaningful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Packages
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular Umroh packages
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.slice(0, 3).map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to={ROUTES.PACKAGES}>
              <Button size="lg">
                View All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Contact us today to start planning your spiritual journey to the holy cities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.CONTACT}>
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
            </Link>
            <Link to={ROUTES.PACKAGES}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Browse Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;