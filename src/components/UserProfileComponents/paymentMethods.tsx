import React, { useState } from 'react';
import Image from 'next/image';

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <div className="w-full p-4">
      {/* Title */}
      <div className="text-xl font-semibold mb-4">Payment Methods</div>

      {/* Filters & Dropdown */}
      <div className="flex justify-between items-center border-b pb-2">
        {/* Left: Payment Method Filters */}
        <div className="flex space-x-6 text-gray-700 font-medium">
          <div className="cursor-pointer">All Payment Methods</div>
          <div className="cursor-pointer">Credit Card(s)</div>
          <div className="cursor-pointer">Crypto Wallet(s)</div>
        </div>

        {/* Right: Dropdown & Refresh Button */}
        <div className="flex items-center space-x-4">
          {/* Dropdown */}
          <select
            value={selectedMethod}
            onChange={handleChange}
            className="p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Add Payment Method
            </option>
            <option value="credit-card">Credit Card</option>
            <option value="crypto-wallet">Crypto Wallet</option>
          </select>

          {/* Refresh Icon */}
          <Image
            src="/UserProfile/refresh.svg"
            className="w-6 h-6 cursor-pointer"
            alt="refresh"
            width={20}
            height={20}
            onClick={() => window.location.reload()}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4">
        {/* You can render specific content based on `selectedMethod` */}
        {selectedMethod === "credit-card" && <div>Displaying Credit Card Methods...</div>}
        {selectedMethod === "crypto-wallet" && <div>Displaying Crypto Wallet Methods...</div>}
      </div>
    </div>
  );
}
