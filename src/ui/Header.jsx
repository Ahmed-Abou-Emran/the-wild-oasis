import styled from "styled-components";

const StyledHeader = styled.div`
  width: 100%;
  height: 6.4rem;
  background-color: #f5f5f5;
  padding: 1.6rem;
  grid-column: 2/ -1;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}
