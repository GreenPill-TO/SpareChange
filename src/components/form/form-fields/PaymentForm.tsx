import { Button } from "@/components/ui/Button";
import classNames from "classnames";
import React, { useState } from "react";

interface PaymentFormProps {
  onSubmit: (paymentData: { cardNumber: string; expiryDate: string; cvv: string }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const inputClasses = classNames(
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
    "focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
    "dark:bg-gray-800 dark:text-white bg-white text-gray-900"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ cardNumber, expiryDate, cvv });
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form space-y-4">
      <div>
        <label htmlFor="cardNumber" className={`block text-sm font-medium dark:text-white text-gray-700`}>
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
        <label htmlFor="expiryDate" className={`block text-sm font-medium dark:text-white text-gray-700`}>
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
        <label htmlFor="cvv" className={`block text-sm font-medium dark:text-white text-gray-700`}>
          CVV
        </label>
        <input id="cvv" name="cvv" type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} className={inputClasses} required />
      </div>
      <Button type="submit" className={classNames("inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium")}>
        Submit Payment
      </Button>
    </form>
  );
};

export default PaymentForm;
