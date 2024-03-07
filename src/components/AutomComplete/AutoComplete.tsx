import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import { useCountries } from "../../utils";
import { ListItem } from "../ListItem";

import * as Styled from "./AutoComplete.styled";

export const Autocomplete: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const { countries, loading } = useCountries();

  // Memoize the filterCountries function
  const filterCountries = useCallback(() => {
    if (searchTerm.length >= 2) {
      const filtered = countries
        .map((country) => country.name)
        .filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [searchTerm, countries]);

  // Memoize the filteredCountries array
  const memoizedFilteredCountries = useMemo(
    () => filteredCountries,
    [filteredCountries]
  );

  useEffect(() => {
    filterCountries();
  }, [filterCountries]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value !== searchTerm) {
      setSelectedCountry("");
    }
  };

  const handleCountryClick = (country: string) => {
    setSearchTerm(country);
    setSelectedCountry(country);
    setFilteredCountries([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCountries.length !== 1) return;
    if (event.key === "Enter") {
      handleCountryClick(filteredCountries[0]);
    }
  };

  console.log("filteredCountries", filteredCountries);

  return (
    <Styled.Wrapper>
      {selectedCountry && <h3>Selected Country: {selectedCountry}</h3>}
      <Styled.Input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {!filteredCountries.length && searchTerm.length >= 2 && (
        <p>No results found, try again</p>
      )}
      {!loading && searchTerm.length >= 2 && !selectedCountry && (
        <Styled.List>
          {memoizedFilteredCountries.map((country) => (
            <ListItem
              country={country}
              searchTerm={searchTerm}
              key={country}
              onClick={() => handleCountryClick(country)}
            />
          ))}
        </Styled.List>
      )}
    </Styled.Wrapper>
  );
};
