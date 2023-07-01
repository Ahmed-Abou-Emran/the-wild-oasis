import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

const StyledSideBar = styled.div`
  width: 26rem;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 1.6rem;
  grid-row: 1/ -1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export default function SideBar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
    </StyledSideBar>
  );
}
