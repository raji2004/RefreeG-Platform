"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Example Shadcn UI components
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function FormSwitcher() {
  const [activeForm, setActiveForm] = useState("form1"); // 'form1' or 'form2'
  const [formValues, setFormValues] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    country: "",
    postalCode: "",
  });

  const isFormValid =
    formValues.nameOnCard &&
    formValues.cardNumber &&
    formValues.expiryDate &&
    formValues.cvv &&
    formValues.email &&
    formValues.country &&
    formValues.postalCode;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form Submitted:", formValues);
    }
  };

  return (
    <main className="flex flex-col md:flex-row">
      <div className="flex flex-col px-12 py-10 gap-8 w-full">
        <h1 className="text-black text-3xl font-bold font-montserrat">
          Payment Details
        </h1>

        <div>
          <h3 className="text-black text-xl font-medium font-montserrat">
            Payment Type
          </h3>
          <p className="text-gray-600 text-sm font-medium font-montserrat">
            What kind of donation is this?
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {["One-time donation", "Make this a recurring donation"].map(
            (option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer"
              >
                <Checkbox />
                <p className="text-black text-base font-medium">{option}</p>
              </label>
            )
          )}
        </div>

        <div>
          <h2 className="text-black text-2xl font-medium font-montserrat">
            Payment Method
          </h2>
          <p className="text-gray-600 text-lg font-medium font-montserrat">
            Choose how to pay
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <button
            onClick={() => setActiveForm("form1")}
            className={`w-full md:w-[300px] flex justify-center items-center gap-2 px-16 py-4 border-2 rounded text-black font-semibold font-montserrat ${
              activeForm === "form1"
                ? "border-blue-500"
                : "border-transparent text-gray-500"
            }`}
          >
            <Image
              src="/donation_flow/Magnetic Card.png"
              alt="Card"
              width={20}
              height={20}
            />
            Card
          </button>

          <button
            onClick={() => setActiveForm("form2")}
            className={`w-full md:w-[300px] flex justify-center items-center gap-2 px-16 py-4 border-2 rounded text-black font-semibold font-montserrat ${
              activeForm === "form2"
                ? "border-blue-500"
                : "border-transparent text-gray-500"
            }`}
          >
            <Image
              src="/donation_flow/Google Shopping.png"
              alt="Card"
              width={20}
              height={20}
            />
            Google pay
          </button>
        </div>

        {/* Forms */}
        <Card className="w-full max-w-xl">
          {activeForm === "form1" && (
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Name on Card */}
                <div className="mb-4">
                  <label
                    htmlFor="nameOnCard"
                    className="block text-sm font-medium"
                  >
                    Name on Card
                  </label>
                  <input
                    id="nameOnCard"
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded"
                    placeholder="Enter the name on your card"
                    value={formValues.nameOnCard}
                    onChange={handleChange}
                  />
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium"
                  >
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded"
                    placeholder="Enter your card number"
                    value={formValues.cardNumber}
                    onChange={handleChange}
                  />
                  <div className="flex gap-2">
                    <input
                      id="expiryDate"
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded"
                      placeholder="MM/YY"
                      value={formValues.expiryDate}
                      onChange={handleChange}
                    />
                    <input
                      id="cvv"
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded"
                      placeholder="CVV"
                      value={formValues.cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full mt-1 px-3 py-2 border rounded"
                    placeholder="Enter your email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Country and Postal Code */}
                <div className="flex gap-2 mb-4">
                  <div className="relative w-full">
                    <select
                      id="country"
                      className="appearance-none w-full mt-1 px-3 py-2 border rounded"
                      value={formValues.country}
                      onChange={handleChange}
                    >
                      <option value="">Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>

                    <Image
                      src="/donation_flow/Dropdown country.svg"
                      alt="Dropdown Arrow"
                      width={15}
                      height={15}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                  </div>

                  <input
                    id="postalCode"
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded"
                    placeholder="Enter your postal code"
                    value={formValues.postalCode}
                    onChange={handleChange}
                  />
                </div>

                {/* Terms and Conditions */}
                <p className="text-[#726c6c] text-base font-normal font-montserrat leading-normal mb-4">
                  By completing your donation, you agree that your contribution
                  is final and non-refundable unless otherwise stated by the
                  specific cause. RefreeG processes all donations securely and
                  does not control the specific use of funds by the
                  beneficiaries. For more information, please refer to our{" "}
                  <span className="text-[#0a0a0b] underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#0a0a0b] underline cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>

                {/* Submit Button */}
                <div
                  className={`w-full ${
                    isFormValid ? "" : "cursor-not-allowed"
                  }`}
                >
                  <Button
                    type="submit"
                    className={`w-full px-20 py-5 rounded-sm text-neutral-50 text-lg font-semibold font-montserrat leading-snug flex flex-row gap-1 ${
                      isFormValid
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-[#9F9C9C] text-white"
                    }`}
                    disabled={!isFormValid}
                  >
                    Pay <span>₦5,000</span>{" "}
                    <Image
                      src="/donation_flow/chevron-right 2.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </Button>
                </div>
              </form>
            </CardContent>
          )}

          {activeForm === "form2" && (
            <CardContent>
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full mt-1 px-3 py-2 border rounded"
                  />
                </div>
                <Button type="submit">
                  Pay <span>₦5,000</span>{" "}
                  <Image
                    src="/donation_flow/chevron-right 2"
                    alt=""
                    width={20}
                    height={20}
                  />
                </Button>
              </form>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Responsive image */}
      <div className="py-64 px-36 hidden md:block">
        <Image
          src="/donation_flow/rafiki.svg"
          alt="rafiki"
          width={800}
          height={800}
        />
      </div>
    </main>
  );
}
