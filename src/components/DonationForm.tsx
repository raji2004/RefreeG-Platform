"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Cause, User } from "@/lib/type";
import PaymentButton from "./PaymentButton";

export default function DonationForm({ cause, user }: { cause: Cause, user: User }) {
  const [donation, setDonation] = useState(0);
  const serviceFee = 100;
  const totalAmount = donation + serviceFee;

  const handleDonationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDonation(Number(value));
  };

  return (
    <>
      <Image
        className="w-full rounded-lg"
        src={cause.img ?? "/donation_flow/cause_background.svg"}
        alt="Donation Cause Image"
        width={800}
        height={400}
      />
      <div className="space-y-3">
        <h1 className="text-xl font-bold">
          You&apos;re about to donate to{" "}
          <span className="text-blue-600">
            &quot;{cause.causeTitle}&quot;
          </span>
        </h1>
        <p className="text-gray-600">
          {cause.sections[0].description}
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

      <PaymentButton
        user={user}
        causeUserId={cause.userId}
        totalAmount={totalAmount}
        serviceFee={serviceFee}
        disabled={donation === 0}
      />
    </>
  );
}
