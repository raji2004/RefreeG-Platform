"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function DonationForm() {
  const [donation, setDonation] = useState(0);
  const [tip, setTip] = useState(0);
  const serviceFee = 10;
  const totalAmount = donation + tip + serviceFee;

  const handleTipChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only update the tip if the donation amount is greater than 0
    if (donation > 0) {
      setTip(Number(value));
    }
  };

  const handleDonationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDonation(Number(value));
  };

  return (
    <>
      <Image
        className="w-full rounded-lg"
        src="/donation_flow/cause_background.svg"
        alt="Donation Cause Image"
        width={800}
        height={400}
      />
      <div className="space-y-3">
        <h1 className="text-xl font-bold">
          You're about to donate to{" "}
          <span className="text-blue-600">"Support flood victims"</span>
        </h1>
        <p className="text-gray-600">
          Help the victims of the Maiduguri floods rebuild their new homes and
          send their kids back to school with your donations!
        </p>
      </div>

      <ToggleGroup
        type="single"
        onValueChange={(value) => setDonation(Number(value))}
        className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2"
      >
        {[1000, 5000, 10000, 50000, 100000, 1000000].map((amount) => (
          <ToggleGroupItem
            key={amount}
            className="border px-4 py-2"
            value={amount.toString()}
          >
            ₦{amount.toLocaleString()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Editable Donation Amount Input */}
      <div className="flex justify-between items-center p-3 border rounded-lg">
        <span className="text-lg font-semibold">₦ NGN</span>
        <input
          type="number"
          value={donation === 0 ? "" : donation}
          onChange={handleDonationChange}
          className="text-lg text-right border-none outline-none placeholder:text-sm"
          placeholder="Enter donation amount"
          min="0"
        />
      </div>

      <Separator />

      <div className="flex items-center space-x-2">
        <h3 className="font-bold">Support RefreeG's Mission</h3>
        <Image
          src="/donation_flow/information.svg"
          alt="Info"
          width={20}
          height={20}
        />
      </div>
      <p className="text-gray-600">
        At RefreeG, we're committed to connecting donors with meaningful causes
        that foster socioeconomic growth across Africa. We don't charge causes
        or beneficiaries a fee to list on our platform—we want 100% of your
        donation to go where it's needed most.
      </p>

      {/* Added an input text box for custom tip */}
      <div className="space-y-2">
        <label htmlFor="customTip" className="text-gray-700">
          Enter custom tip:
        </label>
        <input
          id="customTip"
          type="number"
          value={tip === 0 ? "" : tip}
          onChange={handleTipChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your custom tip"
          min="0"
          disabled={donation === 0}
        />
        {donation === 0 && (
          <p className="text-sm text-red-500">
            Please select or enter a donation amount first.
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox />
        <p>Donate anonymously</p>
      </div>

      <Separator />

      <div className="space-y-3">
        <h2 className="font-bold">Your Donation Summary</h2>
        <div className="flex justify-between">
          <p>Donation Amount</p>
          <p>₦{donation.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p>RefreeG Tip</p>
          <p>₦{tip.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <p>Service Fee</p>
            <Image
              src="/donation_flow/information.svg"
              alt="Info"
              width={20}
              height={20}
            />
          </div>
          <p>₦{serviceFee.toLocaleString()}</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>₦{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      <Button
        className={`w-full text-white py-3 rounded-lg ${
          donation === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={donation === 0}
      >
        Proceed
      </Button>
    </>
  );
}
