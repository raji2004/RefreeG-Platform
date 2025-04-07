"use server";
import { revalidatePath } from "next/cache";
import { Country, SortedCountry } from "./type";
import { cookies } from "next/headers";
import { getUserById, getCausesByUserId } from "./firebase/actions";

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
  const cookieStore = cookies();
  await cookieStore.delete("userSession");
  revalidatePath("/");
  return true;
};

export async function getProfileData(userId: string) {
  try {
    const [profileUser, userCauses] = await Promise.all([
      getUserById(userId),
      getCausesByUserId(userId),
    ]);

    if (!profileUser) {
      return null;
    }

    return {
      ...profileUser,
      causesCount: userCauses.length,
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
}

export const fetchStatesForCountry = async (
  country: string
): Promise<string[]> => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      }
    );
    const data = await response.json();
    if (!data.error && data.data && data.data.states) {
      // Return an array of state names
      return data.data.states.map((s: { name: string }) => s.name);
    } else {
      throw new Error("No states data found for this country");
    }
  } catch (error) {
    console.error("Error fetching states for country:", error);
    throw error;
  }
};
