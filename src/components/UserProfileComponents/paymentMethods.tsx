"use client";

import React, { useState } from "react";
import { EyeIcon, Trash2Icon } from "lucide-react";

// Interfaces for payment methods
interface CreditCard {
  id: number;
  name: string;
  bankName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface CryptoWallet {
  id: number;
  address: string;
  network: string;
}

type PaymentMethod = CreditCard | CryptoWallet;

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAccountDetails, setShowAccountDetails] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<string>("All");

  const [creditCardData, setCreditCardData] = useState<Partial<CreditCard>>({});
  const [cryptoWalletData, setCryptoWalletData] = useState<Partial<CryptoWallet>>({});

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    setCreditCardData({});
    setCryptoWalletData({});
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreditCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWalletInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCryptoWalletData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedMethod === "Credit Card") {
      const newCard: CreditCard = {
        id: Date.now(),
        name: creditCardData.name || "",
        bankName: creditCardData.bankName || "",
        cardNumber: creditCardData.cardNumber || "",
        expiry: creditCardData.expiry || "",
        cvv: creditCardData.cvv || "",
      };
      setPaymentMethods((prev) => [...prev, newCard]);
    } else if (selectedMethod === "Crypto Wallet") {
      const newWallet: CryptoWallet = {
        id: Date.now(),
        address: cryptoWalletData.address || "",
        network: cryptoWalletData.network || "",
      };
      setPaymentMethods((prev) => [...prev, newWallet]);
    }
    setSelectedMethod("");
  };

  const toggleAccountDetails = (id: number) => {
    setShowAccountDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveMethod = (id: number) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const filteredMethods = paymentMethods.filter((method) => {
    if (filter === "Credit Card") return "cardNumber" in method;
    if (filter === "Crypto Wallet") return "address" in method;
    return true;
  });

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
      <div className="flex flex-col-reverse md:flex md:flex-col-reverse lg:flex lg:flex-row justify-between items-center mb-4">
        <div className="flex text-xs md:text-base gap-4 paymentfilter">
            {['All', 'Credit Card', 'Crypto Wallet'].map((type) => (
            <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded ${
                filter === type ? 'border-b-4 border-blue-700' : 'bg-gray-100'
                }`}
            >
                {type === 'All' ? 'All Payment Methods' : `${type}(s)`}
            </button>
            ))}
        </div>

        {/* Dropdown aligned to the right */}
        <div className="flex text-xs md:text-lg py-2 gap-2 items-center ml-auto">
            <select
            value={selectedMethod}
            onChange={(e) => handleMethodChange(e.target.value)}
            className="border rounded p-2"
            >
            <option value="">Add Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Crypto Wallet">Crypto Wallet</option>
            </select>
        </div>
      </div>


      {/* Dynamic Form */}
      {selectedMethod && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedMethod === "Credit Card" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name on Card"
                className="border p-2 w-full rounded"
                value={creditCardData.name ?? ""}
                onChange={handleCardInputChange}
                required
              />
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                className="border p-2 w-full rounded"
                value={creditCardData.bankName ?? ""}
                onChange={handleCardInputChange}
                required
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Account Number"
                className="border p-2 w-full rounded"
                value={creditCardData.cardNumber ?? ""}
                onChange={handleCardInputChange}
                required
              />
              <input
                type="date"
                name="expiry"
                className="border p-2 w-full rounded"
                value={creditCardData.expiry ?? ""}
                onChange={handleCardInputChange}
                required
              />
              <input
                type="number"
                name="cvv"
                placeholder="CVV"
                maxLength={3}
                className="border p-2 w-full rounded"
                value={creditCardData.cvv ?? ""}
                onChange={handleCardInputChange}
                required
              />
            </>
          )}

          {selectedMethod === "Crypto Wallet" && (
            <>
              <input
                type="text"
                name="address"
                placeholder="Wallet Address"
                className="border p-2 w-full rounded"
                value={cryptoWalletData.address ?? ""}
                onChange={handleWalletInputChange}
                required
              />
              <input
                type="text"
                name="network"
                placeholder="Network (e.g., Polygon, Ethereum)"
                className="border p-2 w-full rounded"
                value={cryptoWalletData.network ?? ""}
                onChange={handleWalletInputChange}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg"
          >
            Save {selectedMethod}
          </button>
        </form>
      )}

      {/* Display Added Methods */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Your Payment Methods:</h3>
        {filteredMethods.length === 0 ? (
          <p>No payment methods added yet.</p>
        ) : (
          <ul className="space-y-3">
            {filteredMethods.map((item) => (
              "cardNumber" in item ? (
                <li
                  key={item.id}
                  className="border p-4 m-2 rounded bg-gray-50 shadow-sm flex justify-between h-20 items-center"
                >
                  <div>
                    {showAccountDetails[item.id] ? (
                      item.cardNumber
                    ) : (
                      "**** **** **** ****"
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => toggleAccountDetails(item.id)}
                      className="text-blue-600"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveMethod(item.id)}
                      className="text-red-600"
                    >
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ) : (
                <li
                  key={item.id}
                  className="border p-4 rounded bg-gray-50 shadow-sm flex justify-between h-12 items-center"
                >
                  <div>
                    <p>🪙 <strong>Wallet Address:</strong> {item.address}</p>
                    <p>🌐 <strong>Network:</strong> {item.network}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMethod(item.id)}
                    className="text-red-600"
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </button>
                </li>
              )
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
