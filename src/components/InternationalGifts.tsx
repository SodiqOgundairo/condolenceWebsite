import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';

interface PaymentData {
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  message?: string;
  currency: string;
  isAnonymous: boolean;
}

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here');

const InternationalGifts: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: 1000, // Default amount in cents ($10.00)
    email: '',
    firstName: '',
    lastName: '',
    message: '',
    currency: 'usd',
    isAnonymous: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const currencies = [
    { code: 'usd', symbol: '$', name: 'USD' },
  ];

  const selectedCurrency = currencies.find(c => c.code === paymentData.currency) || currencies[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'customAmount' ? parseInt(value) * 100 : value)
    }));
  };

  const handlePayment = async () => {
    if (!paymentData.email || (!paymentData.isAnonymous && (!paymentData.firstName || !paymentData.lastName)) || !paymentData.amount || paymentData.amount < 100) {
      alert('Please fill in all required fields and enter a minimum amount of $1.00');
      return;
    }

    setIsLoading(true);

    try {
      // Note: This is a simplified implementation
      // In a real app, you'd need to implement Stripe Elements for card collection
      // and handle the payment on your backend
      
      alert(`International payment setup needed. Amount: ${selectedCurrency.symbol}${(paymentData.amount / 100).toFixed(2)} ${selectedCurrency.name}`);
      console.log('Payment would be processed with:', {
        amount: paymentData.amount,
        currency: paymentData.currency,
        customer: `${paymentData.firstName} ${paymentData.lastName}`,
        email: paymentData.email,
        message: paymentData.message
      });
      
      // Reset form
      setPaymentData({
        amount: 1000,
        email: '',
        firstName: '',
        lastName: '',
        message: '',
        currency: 'usd',
        isAnonymous: false
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Failed to initialize payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded border border-gray-200 p-6 my-8">
      {/* Currency Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <select
          name="currency"
          value={paymentData.currency}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.symbol} {currency.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gift Amount ({selectedCurrency.symbol})
        </label>
        <input
          type="number"
          name="customAmount"
          placeholder="Enter amount"
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          onChange={handleInputChange}
          min="1"
          step="0.01"
        />
      </div>

      {/* Anonymous Option */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isAnonymous"
            checked={paymentData.isAnonymous}
            onChange={handleInputChange}
            className="mr-2 h-4 w-4 text-gray-600 focus:ring-gray-400 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Send this gift anonymously</span>
        </label>
      </div>

      {/* Personal Information */}
      <div className="space-y-4 mb-6">
        {!paymentData.isAnonymous && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={paymentData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                required={!paymentData.isAnonymous}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={paymentData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                required={!paymentData.isAnonymous}
              />
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            value={paymentData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Personal Message (Optional)</label>
          <textarea
            name="message"
            value={paymentData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
            placeholder="Share your thoughts or memories..."
          />
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded p-3 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-medium text-gray-800">
            {selectedCurrency.symbol}{(paymentData.amount / 100).toFixed(2)} {selectedCurrency.name}
          </span>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isLoading || !paymentData.email || (!paymentData.isAnonymous && (!paymentData.firstName || !paymentData.lastName)) || !paymentData.amount || paymentData.amount < 100}
        className="w-full bg-gray-600 text-white py-3 px-4 rounded font-medium text-sm hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Processing...' : 
         paymentData.amount && paymentData.amount >= 100 ? 
         `Send Gift of ${selectedCurrency.symbol}${(paymentData.amount / 100).toFixed(2)}` : 
         'Enter Gift Amount'}
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        Secured by Stripe
      </p>
    </div>
  );
};

export default InternationalGifts;
