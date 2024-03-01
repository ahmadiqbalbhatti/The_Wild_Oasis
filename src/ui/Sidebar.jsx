import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";
import Uploader from "../data/Uploader.jsx";

const StyledSidebar = styled.aside`

  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  min-height: 100vh;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo/>
      <MainNav/>


      <Uploader/>
    </StyledSidebar>
  );
}

export default Sidebar;
