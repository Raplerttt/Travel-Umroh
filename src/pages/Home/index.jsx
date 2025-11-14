import React, { memo, useMemo, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConstants';
import { usePackages } from '../../hooks/usePackages';
import Button from '../../components/common/button/Button';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

// Lazy load dengan fallback
const PackageCard = React.lazy(() => 
  import('../../components/ui/PackageCard/PackageCard')
);

// Static data dipindah ke luar component untuk prevent re-creation
const STATS_DATA = [
  { number: '5000+', label: 'Happy Pilgrims' },
  { number: '50+', label: 'Umroh Packages' },
  { number: '10+', label: 'Years Experience' },
  { number: '24/7', label: 'Customer Support' },
];

const FEATURES_DATA = [
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

// Optimized components dengan memo
const StatItem = memo(({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
      {number}
    </div>
    <div className="text-gray-600 font-medium">
      {label}
    </div>
  </div>
));

const FeatureItem = memo(({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
    <div aria-hidden="true" className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600">
      {description}
    </p>
  </div>
));

const Home = () => {
  const { featuredPackages, isLoading } = usePackages();

  // Optimize featured packages dengan useMemo
  const displayedPackages = useMemo(() => 
    featuredPackages.slice(0, 3), 
    [featuredPackages]
  );

  return (
    <div>
      {/* Hero Section dengan proper SEO structure */}
      <section 
        aria-label="Hero section – Begin Your Spiritual Journey to Mecca and Medina"
        className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white"
      >
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
              <Link to={ROUTES.PACKAGES} aria-label="View our Umroh packages">
                <Button size="lg" variant="secondary">
                  View Packages
                </Button>
              </Link>
              <Link to={ROUTES.ABOUT} aria-label="Learn more about our Umroh services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section aria-labelledby="stats-heading" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">
            Company Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_DATA.map((stat, index) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section aria-labelledby="features-heading" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Umroh Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive Umroh services to ensure your spiritual journey is comfortable and meaningful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_DATA.map((feature, index) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section aria-labelledby="packages-heading" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="packages-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Umroh Packages
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular Umroh packages for your spiritual journey
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <Suspense fallback={
              <div className="flex justify-center py-12">
                <LoadingSpinner size="md" />
              </div>
            }>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPackages.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            </Suspense>
          )}

          <div className="text-center mt-12">
            <Link to={ROUTES.PACKAGES} aria-label="View all Umroh packages">
              <Button size="lg">
                View All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-labelledby="cta-heading" className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Contact us today to start planning your spiritual journey to the holy cities of Mecca and Medina
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.CONTACT} aria-label="Contact us for Umroh services">
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
            </Link>
            <Link to={ROUTES.PACKAGES} aria-label="Browse all Umroh packages">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-700 focus:ring-2 focus:ring-white">
                Browse Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Home);