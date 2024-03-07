import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import { useFetchCountries } from "../../utils";
import { ListItem } from "../ListItem";

import * as Styled from "./AutoComplete.styled";

export const Autocomplete: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const { countries, loading } = useFetchCountries();

  // Callback and memoize to avoid unnecessary rerenders and updates
  const filterCountries = useCallback(() => {
    if (searchTerm.length >= 2) {
      const filteredCountries = countries
        .map((country) => country.name)
        .filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredCountries(filteredCountries);
    } else {
      setFilteredCountries([]);
    }
  }, [searchTerm, countries]);

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

  // Selects a country and empties the filtered array
  const handleCountryClick = (country: string) => {
    setSearchTerm(country);
    setSelectedCountry(country);
    setFilteredCountries([]);
  };

  // Selects a country when enter is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCountries.length !== 1) return;
    if (event.key === "Enter") {
      handleCountryClick(filteredCountries[0]);
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.InputWrapper>
        <Styled.Input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {selectedCountry && <span>✔️</span>}
      </Styled.InputWrapper>
      {!filteredCountries.length &&
        searchTerm.length >= 2 &&
        !selectedCountry && <p>No results found, try again</p>}
      {!loading &&
        searchTerm.length >= 2 &&
        !selectedCountry &&
        !!filteredCountries.length && (
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
