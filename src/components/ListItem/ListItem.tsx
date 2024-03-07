import React from "react";

interface ListItemProps {
  country: string;
  searchTerm: string;
  onClick: () => void;
}

import * as Styled from "./ListItem.styled";

export const ListItem: React.FC<ListItemProps> = ({
  country,
  searchTerm,
  onClick,
}) => {
  const matches = country.toLowerCase().startsWith(searchTerm.toLowerCase());
  const highlightStart = matches
    ? 0
    : country.toLowerCase().indexOf(searchTerm.toLowerCase());
  const highlightEnd = highlightStart + searchTerm.length;

  return (
    <Styled.ListItemWrapper onClick={onClick}>
      {country.slice(0, highlightStart)}
      <Styled.Span>{country.slice(highlightStart, highlightEnd)}</Styled.Span>
      {country.slice(highlightEnd)}
    </Styled.ListItemWrapper>
  );
};
