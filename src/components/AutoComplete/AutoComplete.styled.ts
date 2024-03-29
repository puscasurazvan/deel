import styled from "styled-components";

export const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
});
export const InputWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  placeItems: "center",
  ">:first-child": {
    marginRight: "10px",
  },
});

export const Input = styled.input({
  border: "none",
  boxShadow: "0px 0px 2px 2px #B1D8FC",
  borderRadius: "5px",
  padding: "10px",
});

export const List = styled.ul({
  listStyle: "none",
  padding: "10px 20px",
  marginTop: "10px",
  borderRadius: "5px",
  maxHeight: "500px",
  overflowX: "hidden",
  border: "none",
  boxShadow: "0px 0px 2px 2px #DCDCDC",
});

export const IconSpan = styled.span({
  boxShadow: "0px 0px 2px 2px #B1D8FC",
  padding: "5px",
  borderRadius: "50%",
});
