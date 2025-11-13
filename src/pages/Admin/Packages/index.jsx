import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routeConstants';
import { useApp } from '../../../contexts/AppContext';
import SearchFilter from '../../../components/forms/SearchFilter/SearchFilter';
import Button from '../../../components/common/button/Button';
import Modal from '../../../components/common/modal/Modal';
import LoadingSpinner from '../../../components/common/loading/LoadingSpinner';

const AdminPackages = () => {
  const { showNotification } = useApp();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: { value: '', label: 'Category', options: [] },
    status: { value: '', label: 'Status', options: [] }
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      setPackages([
        {
          id: 1,
          name: 'Ramadan Special Umroh 2024',
          description: 'Special Umroh package during the blessed month of Ramadan',
          price: 2499,
          duration: 14,
          category: 'premium',
          status: 'active',
          featured: true,
          createdAt: '2024-01-15',
          bookings: 45
        },
        {
          id: 2,
          name: 'Economic Umroh Package',
          description: 'Budget-friendly Umroh package with essential services',
          price: 1799,
          duration: 10,
          category: 'economic',
          status: 'active',
          featured: false,
          createdAt: '2024-01-10',
          bookings: 23
        },
        {
          id: 3,
          name: 'Premium Umroh Experience',
          description: 'Luxury Umroh package with 5-star accommodation',
          price: 3499,
          duration: 12,
          category: 'premium',
          status: 'active',
          featured: true,
          createdAt: '2024-01-08',
          bookings: 18
        },
        {
          id: 4,
          name: 'Family Umroh Package',
          description: 'Special package designed for families',
          price: 8999,
          duration: 14,
          category: 'family',
          status: 'inactive',
          featured: false,
          createdAt: '2024-01-05',
          bookings: 12
        }
      ]);
    } catch (error) {
      showNotification('Failed to load packages', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePackage = async () => {
    if (!selectedPackage) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPackages(prev => prev.filter(pkg => pkg.id !== selectedPackage.id));
      showNotification('Package deleted successfully', 'success');
      setShowDeleteModal(false);
      setSelectedPackage(null);
    } catch (error) {
      showNotification('Failed to delete package', 'error');
    }
  };

  const togglePackageStatus = async (pkg) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPackages(prev => prev.map(item => 
        item.id === pkg.id 
          ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
          : item
      ));
      
      showNotification(`Package ${pkg.status === 'active' ? 'deactivated' : 'activated'}`, 'success');
    } catch (error) {
      showNotification('Failed to update package status', 'error');
    }
  };

  const toggleFeatured = async (pkg) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPackages(prev => prev.map(item => 
        item.id === pkg.id 
          ? { ...item, featured: !item.featured }
          : item
      ));
      
      showNotification(`Package ${pkg.featured ? 'removed from' : 'added to'} featured`, 'success');
    } catch (error) {
      showNotification('Failed to update featured status', 'error');
    }
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(pkg => 
    (!filters.category.value || pkg.category === filters.category.value) &&
    (!filters.status.value || pkg.status === filters.status.value)
  );

  const categoryOptions = [
    { value: 'premium', label: 'Premium' },
    { value: 'economic', label: 'Economic' },
    { value: 'family', label: 'Family' },
    { value: 'group', label: 'Group' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Packages</h1>
          <p className="text-gray-600">Create and manage Umroh travel packages</p>
        </div>
        
        <Link to={ROUTES.ADMIN_NEW_PACKAGE}>
          <Button>
            + Create New Package
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={{
          category: { ...filters.category, options: categoryOptions },
          status: { ...filters.status, options: statusOptions }
        }}
        onFilterChange={(key, value) => setFilters(prev => ({
          ...prev,
          [key]: { ...prev[key], value }
        }))}
        placeholder="Search packages by name or description..."
      />

      {/* Packages Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bookings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 font-semibold text-sm">UM</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {pkg.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {pkg.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${pkg.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{pkg.duration} days</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{pkg.bookings}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            pkg.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {pkg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            pkg.featured
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {pkg.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleFeatured(pkg)}
                            className={`px-3 py-1 rounded text-xs ${
                              pkg.featured
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {pkg.featured ? 'Unfeature' : 'Feature'}
                          </button>
                          
                          <button
                            onClick={() => togglePackageStatus(pkg)}
                            className={`px-3 py-1 rounded text-xs ${
                              pkg.status === 'active'
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {pkg.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          
                          <Link
                            to={ROUTES.ADMIN_EDIT_PACKAGE(pkg.id)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                          >
                            Edit
                          </Link>
                          
                          <button
                            onClick={() => {
                              setSelectedPackage(pkg);
                              setShowDeleteModal(true);
                            }}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🎒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No packages found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || Object.values(filters).some(f => f.value) 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first package'
                }
              </p>
              {!searchTerm && !Object.values(filters).some(f => f.value) && (
                <Link to={ROUTES.ADMIN_NEW_PACKAGE}>
                  <Button>
                    + Create New Package
                  </Button>
                </Link>
              )}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedPackage(null);
        }}
        title="Delete Package"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the package "{selectedPackage?.name}"? 
            This action cannot be undone.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-red-800">Warning</h4>
                <p className="text-sm text-red-700 mt-1">
                  This will permanently delete the package and cannot be recovered.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedPackage(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeletePackage}
            >
              Delete Package
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPackages;