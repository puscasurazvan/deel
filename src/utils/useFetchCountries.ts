import { useState, useEffect } from "react";

interface Country {
  name: string;
}

import { mockedCountries } from "./mockedCountries";

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        setCountries(
          data.map((country: Country) => ({
            name: country.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries(mockedCountries);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading };
};
