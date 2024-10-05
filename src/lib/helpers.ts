import { Country } from "./type";

export const fetchCountriesData = async (): Promise<Country[]> => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Country[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        throw error;
    }
};
