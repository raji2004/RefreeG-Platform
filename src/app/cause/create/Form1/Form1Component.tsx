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
import FiatCurrencies from "../_components/FiatCurrencies";
import CryptoCurrencies from "../_components/CryptoCurrencies";

export const Form1 = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const [mounted, setMounted] = useState(false);
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState("");
  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState("");
  const currency = watch("currency");

  useEffect(() => {
    setMounted(true);
  }, []);


  const fiatCurrencies = [
    {
      currency: "NGN",
      image: "/list_a_cause/Nigeria.png"
    },
    {
      currency: "USD",
      image: "/list_a_cause/United States.png"
    },
    {
      currency: "Pounds",
      image: "/list_a_cause/United Kingdom.png"
    },
    {
      currency: "EURO",
      image: "/list_a_cause/Netherlands.png"
    }
  ]

  const cryptoCurrencies = [
    {
      currency: "BTC",
      image: "/list_a_cause/Bitcoin.png"
    },
    {
      currency: "ETH",
      image: "/list_a_cause/Ethereum.png"
    },
    {
      currency: "BNB",
      image: "/list_a_cause/Bnb.png"
    },
    {
      currency: "Litecoin",
      image: "/list_a_cause/Litecoin.png"
    },
    {
      currency: "USDT",
      image: "/list_a_cause/Tether.png"
    },
    {
      currency: "TRX",
      image: "/list_a_cause/trx.png"
    },

    {
      currency: "Doge",
      image: "/list_a_cause/dodge.png"
    },
    {
      currency: "MATIC",
      image: "/list_a_cause/matic.png"
    },
    {
      currency: "Dot",
      image: "/list_a_cause/dot.png"
    },
    {
      currency: "BCH",
      image: "/list_a_cause/bch.png"
    },
    {
      currency: "XRP",
      image: "/list_a_cause/xrp.png"
    }
  ]

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
            <FormControl>
              <div className="relative w-60">
                <div className="mt-1 border border-[#5A5555] rounded-md pt-1.5 px-5 pb-3.5 relative">
                  <div className="absolute -top-2.5 left-3 bg-white px-2 text-xs text-gray-500">
                    State
                  </div>
                  <select
                    {...register("state")}
                    className="w-full h-full appearance-none bg-transparent text-[#2b2829] focus:outline-none"
                  >
                    <option value="" disabled selected hidden></option>
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
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#5A5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormControl>
              <div className="relative w-60">
                <div className="mt-1 border border-[#5A5555] rounded-md pt-1.5 px-5 pb-3.5 relative">
                  <div className="absolute -top-2.5 left-3 bg-white px-2 text-xs text-gray-500">
                    ZIP Code
                  </div>
                  <input
                    type="number"
                    {...register("zipCode")}
                    className="w-full h-full appearance-none bg-transparent text-[#2b2829] focus:outline-none no-spinners"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
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
          <FormControl>
            <div className="relative w-[200px] mt-5">
              <div className="mt-1 border border-[#5A5555] rounded-md pt-1.5 px-5 pb-3.5 relative">
                <div className="absolute -top-2.5 left-3 bg-white px-2 text-xs text-gray-500">
                  Currency type
                </div>
                <select
                  {...register("currency")}
                  className="w-full h-full appearance-none bg-transparent text-[#2b2829] focus:outline-none"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="Fiat Currency">Fiat Currency</option>
                  <option value="Crypto Currency">Crypto Currency</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#5A5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>


        {mounted && currency === "Fiat Currency" && (
          <div className="flex flex-row space-x-4 mt-5">
            {fiatCurrencies.map((curr) => (
              <FiatCurrencies 
                key={curr.currency} 
                currency={curr.currency} 
                image={curr.image} 
                selectedCurrency={selectedFiatCurrency}
                setSelectedCurrency={setSelectedFiatCurrency}
              />
            ))}
          </div>
        )}

        {mounted && currency === "Crypto Currency" && (
          <div className="flex flex-row flex-wrap gap-4 mt-5">
            {cryptoCurrencies.map((curr) => (
              <CryptoCurrencies 
                key={curr.currency} 
                currency={curr.currency} 
                image={curr.image} 
                selectedCurrency={selectedCryptoCurrency}
                setSelectedCurrency={setSelectedCryptoCurrency}
              />
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
