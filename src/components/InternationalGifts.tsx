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
const PAYPAL_LINK = 'https://www.paypal.com/qrcodes/p2pqrc/VQPSDKMCJA6V2';
const WISE_LINK = 'https://wise.com/pay/me/sefag95';

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
  const [method, setMethod] = useState<'paypal' | 'bank_gbp' | 'wise' | 'card'>('bank_gbp');

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
    if (method === 'paypal') {
      window.open(PAYPAL_LINK, '_blank', 'noopener,noreferrer');
      return;
    }
    if (method === 'wise') {
      window.open(WISE_LINK, '_blank', 'noopener,noreferrer');
      return;
    }
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

  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); alert('Copied to clipboard'); } catch {}
  };

  return (
    <div className="max-w-md mx-auto bg-surface rounded-2xl border border-border p-6 my-8 shadow-sm">
      {/* Method Segmented Control */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex items-center gap-1 bg-secondary rounded-lg p-1 border border-border">
          {([
            { id: 'bank_gbp', label: 'Bank (GBP)' },
            { id: 'paypal', label: 'PayPal' },
            { id: 'wise', label: 'Wise' },
          ] as const).map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMethod(opt.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                method === opt.id
                  ? 'bg-surface text-text-primary shadow-sm border border-border'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {method === 'paypal' ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary/60 border border-border">
            <p className="text-sm text-text-secondary">
              Give securely via PayPal. You’ll be redirected to PayPal.
            </p>
          </div>
          <div className="flex justify-center">
            <img src="/paypal_qrcode.jpeg" alt="PayPal QR code" className="rounded-md border border-border w-40 h-40 object-contain bg-white" />
          </div>
          <button
            type="button"
            onClick={() => window.open(PAYPAL_LINK, '_blank', 'noopener,noreferrer')}
            className="w-full inline-flex items-center justify-center bg-primary text-white py-3 px-4 rounded-full font-medium text-sm hover:brightness-110 transition"
          >
            Continue with PayPal
          </button>
        </div>
      ) : method === 'bank_gbp' ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary/60 border border-border space-y-2">
            <h4 className="text-sm font-medium text-text-primary">UK Bank Transfer (GBP)</h4>
            <div className="grid grid-cols-1 gap-3 text-sm text-text-secondary">
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary">Account Name:</span>
                <div className="flex items-center gap-2">
                  <span>Mamfe-ter Gemade</span>
                  <button onClick={() => copy('Mamfe-ter Gemade')} className="text-xs text-primary hover:underline">Copy</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary">Bank:</span>
                <div className="flex items-center gap-2">
                  <span>Barclays</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary">Sort Code:</span>
                <div className="flex items-center gap-2">
                  <span>20-89-16</span>
                  <button onClick={() => copy('20-89-16')} className="text-xs text-primary hover:underline">Copy</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span>63452751</span>
                  <button onClick={() => copy('63452751')} className="text-xs text-primary hover:underline">Copy</button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-text-secondary text-center">Please use your name as the payment reference if possible.</p>
        </div>
      ) : method === 'wise' ? (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary/60 border border-border">
            <p className="text-sm text-text-secondary">
              Give via Wise. Scan the QR code or open the link below.
            </p>
          </div>
          <div className="flex justify-center">
            <img src="/wise_qrcode.png" alt="Wise QR code" className="rounded-md border border-border w-40 h-40 object-contain bg-white" />
          </div>
          <button
            type="button"
            onClick={() => window.open(WISE_LINK, '_blank', 'noopener,noreferrer')}
            className="w-full inline-flex items-center justify-center bg-primary text-white py-3 px-4 rounded-full font-medium text-sm hover:brightness-110 transition"
          >
            Continue with Wise
          </button>
        </div>
      ) : (
        <>
      {/* Currency Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-secondary mb-1">Currency</label>
        <select
          name="currency"
          value={paymentData.currency}
          onChange={handleInputChange}
          className="w-full p-2 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent"
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
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Gift Amount ({selectedCurrency.symbol})
        </label>
        <input
          type="number"
          name="customAmount"
          placeholder="Enter amount"
          className="w-full p-2 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent"
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
            className="mr-2 h-4 w-4 text-primary focus:ring-primary/40 border-border rounded"
          />
          <span className="text-sm text-text-secondary">Send this gift anonymously</span>
        </label>
      </div>

      {/* Personal Information */}
      <div className="space-y-4 mb-6">
        {!paymentData.isAnonymous && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={paymentData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent"
                required={!paymentData.isAnonymous}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={paymentData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent"
                required={!paymentData.isAnonymous}
              />
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            value={paymentData.email}
            onChange={handleInputChange}
            className="w-full p-2 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Personal Message (Optional)</label>
          <textarea
            name="message"
            value={paymentData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-2 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent resize-none"
            placeholder="Share your thoughts or memories..."
          />
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-secondary/50 rounded p-3 mb-4 border border-border">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary">Total Amount:</span>
          <span className="font-medium text-text-primary">
            {selectedCurrency.symbol}{(paymentData.amount / 100).toFixed(2)} {selectedCurrency.name}
          </span>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isLoading || !paymentData.email || (!paymentData.isAnonymous && (!paymentData.firstName || !paymentData.lastName)) || !paymentData.amount || paymentData.amount < 100}
        className="w-full bg-primary text-white py-3 px-4 rounded-full font-medium text-sm hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {isLoading ? 'Processing...' : 
         paymentData.amount && paymentData.amount >= 100 ? 
         `Send Gift of ${selectedCurrency.symbol}${(paymentData.amount / 100).toFixed(2)}` : 
         'Enter Gift Amount'}
      </button>

      <p className="text-xs text-text-secondary text-center mt-2">
        Secured by Stripe
      </p>
      </>
      )}
    </div>
  );
};

export default InternationalGifts;
