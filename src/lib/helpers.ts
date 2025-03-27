"use server";
import { Country, SortedCountry } from "./type";
import { cookies } from "next/headers";

function sortCountries(countries: Country[]) {
  return countries
    .sort((a, b) => a.name.common.localeCompare(b.name.common)) // Sort by common name
    .map((country) => ({
      name: country.name,
      flags: country.flags,
    })); // Return only name and flags
}

export const fetchCountriesData = async (): Promise<SortedCountry[]> => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Country[] = await response.json();

    const sortedData = sortCountries(data);
    return sortedData;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw error;
  }
};

export const checkUserSession = () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;
    return userSession ? true : false;
}

export const getSessionId = async () => {
  const cookieStore = cookies();

  const userId = await cookieStore.get("userSession")?.value;
  if (!userId || userId === undefined) return null;

  return decodeURIComponent(userId).replace(/"/g, "").trim();
};

// lib/helpers.ts
export const SessionLogout = async () => {
    // Server-side: Delete cookie
    const cookieStore = cookies();
    cookieStore.delete('userSession');
    
    // Return a response that the client can handle
    return { success: true };
  };

export const getBaseURL = (): string => {
    if (typeof window !== "undefined") {
      // Client-side (browser)
      return window.location.origin;
    } else {
      // Server-side (Node.js)
      return process.env.BASE_URL || "http://localhost:3000"; // Fallback for local dev
    }
};

