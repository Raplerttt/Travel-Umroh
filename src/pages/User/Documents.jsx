import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner';

const UserDocuments = () => {
  const { showNotification } = useApp();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      setDocuments([
        {
          id: 1,
          name: 'Umroh Visa',
          type: 'visa',
          bookingId: 'BK-2024-0015',
          status: 'approved',
          downloadUrl: '#',
          uploadedAt: '2024-01-25',
          expiryDate: '2024-04-15'
        },
        {
          id: 2,
          name: 'Flight E-Ticket',
          type: 'ticket',
          bookingId: 'BK-2024-0015',
          status: 'available',
          downloadUrl: '#',
          uploadedAt: '2024-02-01',
          expiryDate: '2024-03-15'
        },
        {
          id: 3,
          name: 'Hotel Vouchers',
          type: 'voucher',
          bookingId: 'BK-2024-0015',
          status: 'available',
          downloadUrl: '#',
          uploadedAt: '2024-02-01',
          expiryDate: '2024-03-29'
        },
        {
          id: 4,
          name: 'Travel Insurance',
          type: 'insurance',
          bookingId: 'BK-2024-0015',
          status: 'pending',
          downloadUrl: null,
          uploadedAt: null,
          expiryDate: '2024-03-29'
        }
      ]);
    } catch (error) {
      showNotification('Failed to load documents', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    available: 'bg-green-100 text-green-800',
    approved: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const typeIcons = {
    visa: '🛂',
    ticket: '🎫',
    voucher: '🏨',
    insurance: '🛡️',
    itinerary: '📋',
    other: '📄'
  };

  const handleDownload = (document) => {
    if (document.downloadUrl) {
      showNotification(`Downloading ${document.name}`, 'success');
      // In real app, this would trigger file download
    } else {
      showNotification('Document not available for download yet', 'warning');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <p className="text-gray-600">Access and download your travel documents</p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((document) => (
          <div key={document.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{typeIcons[document.type]}</div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[document.status]}`}>
                {document.status}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{document.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Booking: {document.bookingId}
            </p>
            
            <div className="space-y-2 text-sm text-gray-600">
              {document.uploadedAt && (
                <p>Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}</p>
              )}
              {document.expiryDate && (
                <p>Expires: {new Date(document.expiryDate).toLocaleDateString()}</p>
              )}
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => handleDownload(document)}
                disabled={!document.downloadUrl}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  document.downloadUrl
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {document.downloadUrl ? 'Download' : 'Not Available'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Required Documents</h2>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="text-gray-400 text-4xl mb-3">📤</div>
            <p className="text-gray-600 mb-2">Upload passport copies, photos, and other required documents</p>
            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Upload Documents
            </button>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Required Documents</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Please upload clear copies of your passport (first page), passport-sized photos, and any other requested documents at least 45 days before departure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No documents available
          </h3>
          <p className="text-gray-600">
            Your travel documents will appear here once they are processed and ready for download.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDocuments;