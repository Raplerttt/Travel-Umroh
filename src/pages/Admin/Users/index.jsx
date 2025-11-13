import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routeConstants';
import { useApp } from '../../../contexts/AppContext';
import SearchFilter from '../../../components/forms/SearchFilter/SearchFilter';
import Button from '../../../components/common/button/Button';
import Pagination from '../../../components/common/pagination/Pagination';
import LoadingSpinner from '../../../components/common/loading/LoadingSpinner';

const AdminUsers = () => {
  const { showNotification } = useApp();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: { value: '', label: 'Role', options: [] },
    status: { value: '', label: 'Status', options: [] }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      setUsers([
        {
          id: 1,
          name: 'Ahmad Rahman',
          email: 'ahmad@email.com',
          phone: '+1 (555) 123-4567',
          role: 'user',
          status: 'active',
          bookings: 5,
          joinedDate: '2023-05-15',
          lastLogin: '2024-01-20'
        },
        {
          id: 2,
          name: 'Sarah Ismail',
          email: 'sarah@email.com',
          phone: '+1 (555) 123-4568',
          role: 'user',
          status: 'active',
          bookings: 2,
          joinedDate: '2023-08-20',
          lastLogin: '2024-01-19'
        },
        {
          id: 3,
          name: 'Mohammed Ali',
          email: 'mohammed@email.com',
          phone: '+1 (555) 123-4569',
          role: 'admin',
          status: 'active',
          bookings: 12,
          joinedDate: '2023-01-10',
          lastLogin: '2024-01-20'
        },
        {
          id: 4,
          name: 'Fatima Khan',
          email: 'fatima@email.com',
          phone: '+1 (555) 123-4570',
          role: 'user',
          status: 'inactive',
          bookings: 0,
          joinedDate: '2023-11-05',
          lastLogin: '2023-12-15'
        }
      ]);
    } catch (error) {
      showNotification('Failed to load users', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      showNotification('User role updated successfully', 'success');
    } catch (error) {
      showNotification('Failed to update user role', 'error');
    }
  };

  const toggleUserStatus = async (user) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.map(u =>
        u.id === user.id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      ));
      
      showNotification(`User ${user.status === 'active' ? 'deactivated' : 'activated'}`, 'success');
    } catch (error) {
      showNotification('Failed to update user status', 'error');
    }
  };

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const roleColors = {
    user: 'bg-blue-100 text-blue-800',
    admin: 'bg-purple-100 text-purple-800'
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800'
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  ).filter(user =>
    (!filters.role.value || user.role === filters.role.value) &&
    (!filters.status.value || user.status === filters.status.value)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={loadUsers}
          >
            Refresh
          </Button>
          <Button>
            Export Users
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={{
          role: { ...filters.role, options: roleOptions },
          status: { ...filters.status, options: statusOptions }
        }}
        onFilterChange={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: { ...prev[key], value } }));
          setCurrentPage(1);
        }}
        placeholder="Search by name, email, or phone..."
      />

      {/* Users Table */}
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
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bookings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold text-sm">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Joined {new Date(user.joinedDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.bookings}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className={`text-xs font-medium rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-primary-500 ${
                            roleColors[user.role]
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[user.status]
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={ROUTES.ADMIN_USER_DETAIL(user.id)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => toggleUserStatus(user)}
                            className={`${
                              user.status === 'active' 
                                ? 'text-red-600 hover:text-red-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => {
                              // Implement send email
                              showNotification('Email sent to user', 'success');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Email
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-600">
                {searchTerm || Object.values(filters).some(f => f.value) 
                  ? 'Try adjusting your search or filters'
                  : 'No users registered yet'
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUsers;