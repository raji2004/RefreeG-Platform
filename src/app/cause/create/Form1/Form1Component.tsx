"use client";

import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const Form1 = () => {
  const {
    register,
    trigger,
    formState: { errors },
    watch,
  } = useFormContext();

  // Local state to manage auth, user country, and state options
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<boolean>(false);
  const [stateError, setStateError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Watch the state field to pass its current value for ZIP code validation
  const stateValue = watch("state");
  const currency = watch("currency");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user);
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          console.log("User doc exists:", userDocSnap.exists());
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log("User data:", userData);
            if (userData?.countryOfResidence) {
              console.log("User country:", userData.countryOfResidence);
              setUserCountry(userData.countryOfResidence);
              fetchStatesForCountry(userData.countryOfResidence);
            } else {
              console.error("Country not found in profile");
              setStateError("Country not found in your profile.");
            }
          } else {
            console.error("User document not found");
            setStateError("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setStateError("Failed to retrieve your country information.");
        }
      } else {
        console.error("User not logged in.");
        setStateError("User not logged in.");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchStatesForCountry = async (country: string) => {
    console.log("Fetching states for country:", country);
    setLoadingStates(true);
    setStateError(null);
    try {
      const res = await fetch("/api/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      console.log("Response from /api/states:", data);
      if (data.states && Array.isArray(data.states)) {
        setStateOptions(data.states);
      } else {
        console.error("No states returned");
        setStateError("No states found for your country.");
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setStateError("Error fetching states. Please try again later.");
    } finally {
      setLoadingStates(false);
    }
  };

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
          {/* State Field */}
          <FormItem>
            <FormLabel>State</FormLabel>
            <FormControl>
              {(authLoading && !userCountry) ? (
                <p>Loading user info...</p>
              ) : userCountry ? (
                <select
                  {...register("state", {
                    required: "State is required",
                  })}
                  className="mt-1 px-5 py-3.5 w-60 block rounded-md"
                >
                  <option value="">Select State</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-red-500">
                  {stateError || "Retrieving country info..."}
                </p>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* ZIP/Postal Code Field with Asynchronous Validation */}
          <FormItem>
            <FormLabel>ZIP/Postal Code</FormLabel>
            <FormControl>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                {...register("zipCode", {
                  required: "ZIP/Postal Code is required",
                  validate: async (value) => {
                    if (!userCountry || !stateValue) {
                      console.error("Validation error: Country or State not set");
                      return "Country or State not set";
                    }
                    try {
                      const zip = value.toString();
                      console.log(
                        "Validating ZIP:",
                        zip,
                        "for country:",
                        userCountry,
                        "and state:",
                        stateValue
                      );
                      const res = await fetch("/api/validateZip", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          country: userCountry,
                          state: stateValue,
                          zipCode: zip,
                        }),
                      });
                      const data = await res.json();
                      console.log("Response from /api/validateZip:", data);
                      if (data.valid) {
                        return true;
                      } else {
                        console.error("ZIP validation failed:", data.error);
                        return data.error || "The ZIP/Postal Code does not match the selected state.";
                      }
                    } catch (err) {
                      console.error("ZIP validation error:", err);
                      return "ZIP validation failed";
                    }
                  },
                  onBlur: () => {
                    console.log("ZIP field blurred, triggering validation");
                    trigger("zipCode");
                  },
                })}
                className="mt-1 px-5 py-3.5 w-60 block rounded-md"
                placeholder="Enter ZIP/Postal Code"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        {/* Currency type remains unchanged */}
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

        {/* When Crypto Currency is selected, show a button to setup crypto donation */}
        {currency === "Crypto Currency" && (
          <div className="mt-4">
            <button
              type="button"
              className="px-5 py-3.5 bg-blue-500 text-white rounded-md"
              onClick={() => (window.location.href = "/crypto-donation")}
            >
              Setup Crypto Donation
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
