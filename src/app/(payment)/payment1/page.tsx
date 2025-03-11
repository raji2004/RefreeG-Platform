"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Navbar } from "@/components/ui/navbar";

export default function PaymentPage() {
  const [donation, setDonation] = useState(0);
  const [tip, setTip] = useState(0);
  const serviceFee = 10;
  const totalAmount = donation + tip + serviceFee;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 space-y-5 bg-white shadow-md rounded-lg my-10">
        <Image
          className="w-full rounded-lg"
          src="/donation_flow/cause_background.svg"
          alt="Donation Cause Image"
          width={800}
          height={400}
        />
        <div className="space-y-3">
          <h1 className="text-xl font-bold">
            You’re about to donate to{" "}
            <span className="text-blue-600">“Support flood victims”</span>
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

        <div className="flex justify-between items-center p-3 border rounded-lg">
          <span className="text-lg font-semibold">₦ NGN</span>
          <span className="text-lg">{donation.toLocaleString() || "0.00"}</span>
        </div>

        <Separator />

        <div className="flex items-center space-x-2">
          <h3 className="font-bold">Support RefreeG’s Mission</h3>
          <Image
            src="/donation_flow/information.svg"
            alt="Info"
            width={20}
            height={20}
          />
        </div>
        <p className="text-gray-600">
          At RefreeG, we’re committed to connecting donors with meaningful
          causes that foster socioeconomic growth across Africa. We don’t charge
          causes or beneficiaries a fee to list on our platform—we want 100% of
          your donation to go where it’s needed most.
        </p>

        <Slider
          defaultValue={[0]}
          max={donation}
          step={100}
          onValueChange={(value) => setTip(value[0])}
        />
        <p>Enter custom tip? ₦{tip.toLocaleString()}</p>

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

        <Button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Proceed
        </Button>
      </div>
    </div>
  );
}
