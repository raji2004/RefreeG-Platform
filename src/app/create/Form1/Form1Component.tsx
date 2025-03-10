"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Adjust the path as needed

export const Form1 = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const [mounted, setMounted] = useState(false);
  const currency = watch("currency");

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
          <FormItem>
            <FormLabel>State</FormLabel>
            <FormControl>
              <select
                {...register("state")}
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
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>ZIP Code</FormLabel>
            <FormControl>
              <input
                type="number"
                {...register("zipCode")}
                className="mt-1 px-5 py-3.5 w-60 block rounded-md no-spinners"
                placeholder="Enter ZIP Code"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        <h2 className="text-[#2b2829] text-xl font-medium font-montserrat mt-16">
          How would you like to collect your donation?
        </h2>
        <p className="pl-4 text-[#2b2829] text-sm font-normal font-montserrat">
          Choose the currency you want to receive donations in.
        </p>

        <FormItem>
          <FormLabel>Currency type</FormLabel>
          <FormControl>
            <select
              {...register("currency")}
              className="mt-1 px-5 py-3.5 w-[200px] block rounded-md"
            >
              <option value="">Select Currency</option>
              <option value="Flat Currency">Flat Currency</option>
              <option value="Crypto Currency">Crypto Currency</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>

        {mounted && currency === "Crypto Currency" && (
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
};
