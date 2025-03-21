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
    setValue,
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
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData?.countryOfResidence) {
              setUserCountry(userData.countryOfResidence);
              fetchStatesForCountry(userData.countryOfResidence);
            } else {
              setStateError("Country not found in your profile.");
            }
          } else {
            setStateError("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setStateError("Failed to retrieve your country information.");
        }
      } else {
        setStateError("User not logged in.");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchStatesForCountry = async (country: string) => {
    setLoadingStates(true);
    setStateError(null);
    try {
      const res = await fetch("/api/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      if (data.states && Array.isArray(data.states)) {
        setStateOptions(data.states);

        // If the current stored state isn't in the new list, reset it to empty
        if (stateValue && !data.states.includes(stateValue)) {
          setValue("state", "");
        }
      } else {
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
              {authLoading && !userCountry ? (
                <p>Loading user info...</p>
              ) : userCountry ? (
                <select
                  // Use react-hook-form’s register for validation
                  {...register("state", {
                    required: "State is required",
                    validate: (value) =>
                      value.trim() !== "" || "Please select a valid state",
                  })}
                  // Control the select with watch("state") so it stays selected if valid
                  value={stateValue || ""}
                  onChange={(e) => {
                    setValue("state", e.target.value, { shouldValidate: true });
                  }}
                  className="mt-1 px-5 py-3.5 w-60 block rounded-[10px] border border-[#898384]"
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
            <FormMessage>{errors.state?.message?.toString()}</FormMessage>
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
                      return "Country or State not set";
                    }
                    try {
                      const zip = value.toString();
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
                      if (data.valid) {
                        return true;
                      } else {
                        return (
                          data.error ||
                          "The ZIP/Postal Code does not match the selected state."
                        );
                      }
                    } catch (err) {
                      console.error("ZIP validation error:", err);
                      return "ZIP validation failed";
                    }
                  },
                  onBlur: () => {
                    trigger("zipCode");
                  },
                })}
                className="mt-1 px-5 py-3.5 w-60 block rounded-[10px] border border-[#898384]"
                placeholder="Enter ZIP/Postal Code"
              />
            </FormControl>
            <FormMessage>{errors.zipCode?.message?.toString()}</FormMessage>
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
              className="mt-1 px-5 py-3.5 w-[200px] block rounded-[10px] border border-[#898384]"
            >
              <option value="">Select Currency</option>
              <option value="Flat Currency">Flat Currency</option>
              <option value="Crypto Currency">Crypto Currency</option>
            </select>
          </FormControl>
          <FormMessage>{errors.currency?.message?.toString()}</FormMessage>
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
