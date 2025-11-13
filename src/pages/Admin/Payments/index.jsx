import React, { useState, useEffect } from 'react';
import { useApp } from '../../../contexts/AppContext';
import SearchFilter from '../../../components/forms/SearchFilter/SearchFilter';
import Button from '../../../components/common/button/Button';
import Pagination from '../../../components/common/pagination/Pagination';
import LoadingSpinner from '../../../components/common/loading/LoadingSpinner';

const AdminPayments = () => {
  const { showNotification } = useApp();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: { value: '', label: 'Status', options: [] },
    method: { value: '', label: 'Method', options: [] }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      setPayments([
        {
          id: 'PAY-2024-0015',
          bookingId: 'BK-2024-0015',
          customer: 'Ahmad Rahman',
          amount: 4998,
          method: 'credit_card',
          status: 'completed',
          transactionId: 'TXN_123456789',
          createdAt: '2024-01-20',
          processedAt: '2024-01-20'
        },
        {
          id: 'PAY-2024-0014',
          bookingId: 'BK-2024-0014',
          customer: 'Sarah Ismail',
          amount: 1799,
          method: 'bank_transfer',
          status: 'pending',
          transactionId: null,
          createdAt: '2024-01-19',
          processedAt: null
        },
        {
          id: 'PAY-2024-0013',
          bookingId: 'BK-2024-0013',
          customer: 'Mohammed Ali',
          amount: 13996,
          method: 'paypal',
          status: 'completed',
          transactionId: 'TXN_987654321',
          createdAt: '2024-01-18',
          processedAt: '2024-01-18'
        },
        {
          id: 'PAY-2024-0012',
          bookingId: 'BK-2024-0012',
          customer: 'Fatima Khan',
          amount: 53994,
          method: 'credit_card',
          status: 'refunded',
          transactionId: 'TXN_456789123',
          createdAt: '2024-01-15',
          processedAt: '2024-01-16'
        }
      ]);
    } catch (error) {
      showNotification('Failed to load payments', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPayments(prev => prev.map(payment =>
        payment.id === paymentId ? { ...payment, status: newStatus } : payment
      ));
      
      showNotification('Payment status updated', 'success');
    } catch (error) {
      showNotification('Failed to update payment status', 'error');
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const methodOptions = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'installment', label: 'Installment' }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-purple-100 text-purple-800'
  };

  const methodColors = {
    credit_card: 'bg-blue-100 text-blue-800',
    bank_transfer: 'bg-green-100 text-green-800',
    paypal: 'bg-indigo-100 text-indigo-800',
    installment: 'bg-orange-100 text-orange-800'
  };

  const filteredPayments = payments.filter(payment =>
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(payment =>
    (!filters.status.value || payment.status === filters.status.value) &&
    (!filters.method.value || payment.method === filters.method.value)
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">View and manage all payment transactions</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={loadPayments}
          >
            Refresh
          </Button>
          <Button>
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="text-2xl text-green-600">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">${pendingAmount.toLocaleString()}</p>
            </div>
            <div className="text-2xl text-yellow-600">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
            <div className="text-2xl text-blue-600">💳</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={{
          status: { ...filters.status, options: statusOptions },
          method: { ...filters.method, options: methodOptions }
        }}
        onFilterChange={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: { ...prev[key], value } }));
          setCurrentPage(1);
        }}
        placeholder="Search by customer, payment ID, or booking ID..."
      />

      {/* Payments Table */}
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
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            Booking: {payment.bookingId}
                          </div>
                          {payment.transactionId && (
                            <div className="text-xs text-gray-400">
                              TXN: {payment.transactionId}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${payment.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            methodColors[payment.method]
                          }`}
                        >
                          {payment.method.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={payment.status}
                          onChange={(e) => updatePaymentStatus(payment.id, e.target.value)}
                          className={`text-xs font-medium rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-primary-500 ${
                            statusColors[payment.status]
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              // Implement view details
                              showNotification('Payment details opened', 'success');
                            }}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View
                          </button>
                          {payment.status === 'completed' && (
                            <button
                              onClick={() => updatePaymentStatus(payment.id, 'refunded')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Refund
                            </button>
                          )}
                          <button
                            onClick={() => {
                              // Implement resend receipt
                              showNotification('Receipt sent to customer', 'success');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Receipt
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
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} results
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No payments found
              </h3>
              <p className="text-gray-600">
                {searchTerm || Object.values(filters).some(f => f.value) 
                  ? 'Try adjusting your search or filters'
                  : 'No payment transactions yet'
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPayments;