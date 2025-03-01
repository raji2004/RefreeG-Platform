"use client";

import React, { useState, useEffect } from "react";

export interface Form1Props {
  formData: {
    state: string;
    zipCode: string;
    currency: string;
  };
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: string } }
  ) => void;
  errors: Partial<Record<"state" | "zipCode" | "currency", string>>;
}

export default function Form1({ formData, handleChange, errors }: Form1Props) {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-[#2b2829] text-xl font-medium font-montserrat">
        Where are the donations going?
      </h2>
      <p className="pl-4 text-[#2b2829] text-sm font-normal font-montserrat">
        Choose the location where you plan to receive your funds.
      </p>
      <form className="mt-4">
        <div className="flex gap-4">
          <span>
            <label className="block text-sm font-medium">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 px-5 py-3.5 w-60 block rounded-md"
            >
              <option value="">Select State</option>
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="Akwa Ibom">Akwa Ibom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="FCT">FCT (Federal Capital Territory)</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Katsina">Katsina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamfara</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </span>

          <span>
            <label className="block text-sm font-medium">ZIP Code</label>
            <input
              type="number"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="mt-1 px-5 py-3.5 w-60 block rounded-md no-spinners"
              placeholder="Enter ZIP Code"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode}</p>
            )}
          </span>
        </div>

        <h2 className="text-[#2b2829] text-xl font-medium font-montserrat mt-16">
          How would you like to collect your donation?
        </h2>
        <p className="pl-4 text-[#2b2829] text-sm font-normal font-montserrat">
          Choose the currency you want to receive donations in.
        </p>
        <label className="block text-sm font-medium mt-4">
          Currency type
        </label>
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="mt-1 px-5 py-3.5 w-[200px] block rounded-md"
        >
          <option value="">Select Currency</option>
          <option value="Flat Currency">Flat Currency</option>
          <option value="Crypto Currency">Crypto Currency</option>
        </select>
        {errors.currency && (
          <p className="text-red-500 text-sm">{errors.currency}</p>
        )}
        {mounted && formData.currency === "Crypto Currency" && (
          <button
            type="button"
            className="mt-4 px-5 py-3.5 bg-blue-500 text-white rounded-md"
            onClick={() => (window.location.href = "/crypto-donation")}
          >
            Setup Crypto Payment
          </button>
        )}
      </form>
    </div>
  );
}
