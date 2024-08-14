import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface PaymentFormProps {
    onSubmit: (paymentData: { cardNumber: string; expiryDate: string; cvv: string }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
    const { theme } = useTheme();
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const inputClasses = `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ cardNumber, expiryDate, cvv });
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form space-y-4">
            <div>
                <label htmlFor="cardNumber" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Card Number
                </label>
                <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className={inputClasses}
                    required
                />
            </div>
            <div>
                <label htmlFor="expiryDate" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Expiry Date
                </label>
                <input
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className={inputClasses}
                    placeholder="MM/YY"
                    required
                />
            </div>
            <div>
                <label htmlFor="cvv" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    CVV
                </label>
                <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className={inputClasses}
                    required
                />
            </div>
            <button
                type="submit"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    theme === 'dark'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                        : 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400'
                }`}
            >
                Submit Payment
            </button>
        </form>
    );
};

export default PaymentForm;
