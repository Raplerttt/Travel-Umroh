import React, { useState, useEffect } from 'react';
import { usePackages } from '../../hooks/usePackages';
import { PackageCard } from '../../components/ui';
import SearchFilter from '../../components/forms/SearchFilter/SearchFilter';
import Pagination from '../../components/common/pagination/Pagination';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const Packages = () => {
  const { packages, isLoading, getPackages } = usePackages();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: { value: '', label: 'Category', options: [] },
    duration: { value: '', label: 'Duration', options: [] },
    priceRange: { value: '', label: 'Price Range', options: [] }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {

    getPackages();
  }, []);

  // Filter packages based on search and filters
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category.value || pkg.category === filters.category.value;
    const matchesDuration = !filters.duration.value || pkg.duration === parseInt(filters.duration.value);
    
    return matchesSearch && matchesCategory && matchesDuration;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: { ...prev[filterKey], value }
    }));
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Umroh Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated Umroh packages designed to provide you with the best spiritual experience
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={handleFilterChange}
          placeholder="Search packages by name or description..."
          className="mb-8"
        />

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {paginatedPackages.length} of {filteredPackages.length} packages
          </p>
        </div>

        {/* Packages Grid */}
        {paginatedPackages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {paginatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No packages found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;