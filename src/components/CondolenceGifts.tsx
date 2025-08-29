import React, { useState } from 'react';
import PaystackPop from '@paystack/inline-js';

interface PaymentData {
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  message?: string;
  isAnonymous: boolean;
}

const CondolenceGifts: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: 5000, // Default amount in kobo (₦50)
    email: '',
    firstName: '',
    lastName: '',
    message: '',
    isAnonymous: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'customAmount' ? parseInt(value) * 100 : value)
    }));
  };

  const handlePayment = async () => {
    if (!paymentData.email || (!paymentData.isAnonymous && (!paymentData.firstName || !paymentData.lastName)) || !paymentData.amount || paymentData.amount < 10000) {
      alert('Please fill in all required fields and enter a minimum amount of ₦100');
      return;
    }

    setIsLoading(true);

    const paystack = new PaystackPop();
    
    try {
      await paystack.newTransaction({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here', // Add to .env
        amount: paymentData.amount,
        email: paymentData.email,
        firstname: paymentData.isAnonymous ? 'Anonymous' : paymentData.firstName,
        lastname: paymentData.isAnonymous ? 'Donor' : paymentData.lastName,
        metadata: {
          custom_fields: [
            {
              display_name: "Condolence Message",
              variable_name: "condolence_message",
              value: paymentData.message || "No message provided"
            }
          ]
        },
        onSuccess: (transaction: any) => {
          console.log('Payment successful:', transaction);
          alert(`Thank you ${paymentData.firstName}! Your condolence gift of ₦${paymentData.amount / 100} has been received.`);
          // Reset form
          setPaymentData({
            amount: 5000,
            email: '',
            firstName: '',
            lastName: '',
            message: '',
            isAnonymous: false
          });
        },
        onCancel: () => {
          console.log('Payment cancelled');
          alert('Payment was cancelled');
        },
        onError: (error: any) => {
          console.error('Payment error:', error);
          alert('Payment failed. Please try again.');
        }
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Failed to initialize payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-surface rounded-2xl border border-border p-6 my-8 shadow-sm">

       {/* Bank Transfer Details */}
      <div className="mb-6 p-4 bg-secondary/60 border border-border rounded-xl">
        <h3 className="text-sm font-medium text-text-primary mb-2">Bank Transfer Details</h3>
        <div className="space-y-1 text-sm text-text-secondary">
          <div><span className="font-medium text-text-primary">Account Name:</span> Erane Gemade</div>
          <div><span className="font-medium text-text-primary">Account Number:</span> 6321484865</div>
          <div><span className="font-medium text-text-primary">Bank:</span> Fidelity Bank</div>
        </div>
      </div>

      {/* OR Divider */}
      <div className="flex items-center mb-6">
        <hr className="flex-1 border-border" />
        <span className="px-3 text-sm text-text-secondary font-medium">OR</span>
        <hr className="flex-1 border-border" />
      </div>
      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-1">Gift Amount (₦)</label>
        <input
          type="number"
          name="customAmount"
          placeholder="Enter amount"
          className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary placeholder:text-text-secondary/70 focus:ring-2 focus:ring-primary/40 focus:border-transparent"
          onChange={handleInputChange}
          min="100"
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
          <span className="font-medium text-text-primary">₦{(paymentData.amount / 100).toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isLoading || !paymentData.email || (!paymentData.isAnonymous && (!paymentData.firstName || !paymentData.lastName)) || !paymentData.amount || paymentData.amount < 10000}
        className="w-full bg-primary text-white py-3 px-4 rounded-full font-medium text-sm hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {isLoading ? 'Processing...' : 
         paymentData.amount && paymentData.amount >= 10000 ? 
         `Send Gift of ₦${(paymentData.amount / 100).toLocaleString()}` : 
         'Enter Gift Amount'}
      </button>

      <p className="text-xs text-text-secondary text-center mt-2">
        Secured by Paystack
      </p>
    </div>
  );
};

export default CondolenceGifts;
