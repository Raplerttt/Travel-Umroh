import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { ROUTES } from '../../routes/routeConstants';
import FormInput from '../../components/forms/FormInput/FormInput';
import Button from '../../components/common/button/Button';
import Modal from '../../components/common/modal/Modal';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

  const [bankData, setBankData] = useState({
    accountNumber: '',
    accountName: '',
    bankName: ''
  });

  // Mock booking data
  const booking = {
    id: bookingId,
    packageName: 'Ramadan Special Umroh 2024',
    totalAmount: 2499,
    dueDate: '2024-02-15'
  };

  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Pay securely with your credit or debit card'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Transfer directly to our bank account'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🔵',
      description: 'Pay using your PayPal account'
    },
    {
      id: 'installment',
      name: 'Installment Plan',
      icon: '📅',
      description: 'Spread your payment over months'
    }
  ];

  const handleCardInput = (field, value) => {
    let formattedValue = value;

    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) formattedValue = formattedValue.slice(0, 3);
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const validatePayment = () => {
    if (paymentMethod === 'credit_card') {
      if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
        showNotification('Please enter a valid 16-digit card number', 'error');
        return false;
      }
      if (!cardData.expiryDate || cardData.expiryDate.length !== 5) {
        showNotification('Please enter a valid expiry date', 'error');
        return false;
      }
      if (!cardData.cvv || cardData.cvv.length !== 3) {
        showNotification('Please enter a valid CVV', 'error');
        return false;
      }
      if (!cardData.cardHolder) {
        showNotification('Please enter card holder name', 'error');
        return false;
      }
    }

    if (paymentMethod === 'bank_transfer') {
      if (!bankData.accountNumber) {
        showNotification('Please enter account number', 'error');
        return false;
      }
      if (!bankData.accountName) {
        showNotification('Please enter account name', 'error');
        return false;
      }
      if (!bankData.bankName) {
        showNotification('Please enter bank name', 'error');
        return false;
      }
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setShowSuccessModal(true);
    } catch (error) {
      showNotification('Payment failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-xl text-gray-600">
            Secure payment for your Umroh journey
          </p>
          <div className="mt-4 bg-white inline-block px-4 py-2 rounded-lg border">
            <span className="text-sm text-gray-600">Booking Reference:</span>
            <span className="ml-2 font-mono font-bold text-primary-600">{booking.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">{booking.packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Reference:</span>
                  <span className="font-mono">{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span>{new Date(booking.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary-600">${booking.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Card Details</h3>
                  
                  <FormInput
                    label="Card Number"
                    value={cardData.cardNumber}
                    onChange={(e) => handleCardInput('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Expiry Date"
                      value={cardData.expiryDate}
                      onChange={(e) => handleCardInput('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                    />

                    <FormInput
                      label="CVV"
                      value={cardData.cvv}
                      onChange={(e) => handleCardInput('cvv', e.target.value)}
                      placeholder="123"
                      type="password"
                      maxLength={3}
                    />
                  </div>

                  <FormInput
                    label="Card Holder Name"
                    value={cardData.cardHolder}
                    onChange={(e) => handleCardInput('cardHolder', e.target.value)}
                    placeholder="John Doe"
                  />

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="saveCard" className="rounded" />
                    <label htmlFor="saveCard" className="text-sm text-gray-600">
                      Save card for future payments
                    </label>
                  </div>
                </div>
              )}

              {/* Bank Transfer Form */}
              {paymentMethod === 'bank_transfer' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Bank Transfer Details</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Our Bank Details:</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Bank:</strong> Umroh Travel Bank</p>
                      <p><strong>Account Number:</strong> 1234 5678 9012</p>
                      <p><strong>SWIFT/BIC:</strong> UMTBSARI</p>
                      <p><strong>Reference:</strong> {booking.id}</p>
                    </div>
                  </div>

                  <FormInput
                    label="Your Account Number"
                    value={bankData.accountNumber}
                    onChange={(e) => setBankData(prev => ({ ...prev, accountNumber: e.target.value }))}
                    placeholder="Enter your account number"
                  />

                  <FormInput
                    label="Account Holder Name"
                    value={bankData.accountName}
                    onChange={(e) => setBankData(prev => ({ ...prev, accountName: e.target.value }))}
                    placeholder="Enter account holder name"
                  />

                  <FormInput
                    label="Bank Name"
                    value={bankData.bankName}
                    onChange={(e) => setBankData(prev => ({ ...prev, bankName: e.target.value }))}
                    placeholder="Enter your bank name"
                  />
                </div>
              )}

              {/* PayPal */}
              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔵</div>
                  <p className="text-gray-600 mb-4">
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                  <Button variant="outline" className="w-full max-w-xs">
                    Continue to PayPal
                  </Button>
                </div>
              )}

              {/* Installment Plan */}
              {paymentMethod === 'installment' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Installment Plan</h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">3-Month Installment Plan</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div className="flex justify-between">
                        <span>First Payment (Today):</span>
                        <span className="font-semibold">$833</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Second Payment (Next Month):</span>
                        <span className="font-semibold">$833</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Final Payment (2 Months):</span>
                        <span className="font-semibold">$833</span>
                      </div>
                    </div>
                  </div>

                  <FormInput
                    label="Select Installment Period"
                    type="select"
                  >
                    <option>3 Months (0% Interest)</option>
                    <option>6 Months (2% Interest)</option>
                    <option>12 Months (5% Interest)</option>
                  </FormInput>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Secure Payment</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your payment information is encrypted and secure. We do not store your card details.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              size="lg"
              className="w-full"
              loading={isProcessing}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Payment...' : `Pay $${booking.totalAmount}`}
            </Button>

            <p className="text-center text-sm text-gray-500">
              By completing this payment, you agree to our{' '}
              <Link to="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Need Help */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Need Help with Payment?
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ payments@umrohtravel.com</p>
                <p>🕒 Mon-Fri 9AM-6PM</p>
              </div>
            </div>

            {/* Payment Security */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Payment Security
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  SSL Encrypted Connection
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  PCI DSS Compliant
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Money Back Guarantee
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-2">
                Cancellation Policy
              </h3>
              <p className="text-sm text-yellow-700">
                Free cancellation up to 30 days before departure. 
                50% refund between 15-30 days. No refund within 15 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Payment Successful!"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Payment Completed Successfully
          </h3>
          
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your Umroh journey is now confirmed!
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">${booking.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono">TXN_{Date.now()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleSuccessClose}
              className="flex-1"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                // In real app, this would download the invoice
                showNotification('Invoice downloaded successfully!', 'success');
              }}
              className="flex-1"
            >
              Download Invoice
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Payment;