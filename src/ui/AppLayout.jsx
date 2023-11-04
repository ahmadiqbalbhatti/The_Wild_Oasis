import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import styled from "styled-components";

const Main = styled.main`
  //background-color: green;
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);

`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  border-right: 1px solid var(--color-grey-100);
`;

function AppLayout() {
  return (<StyledAppLayout>
      <Header/>
      <Sidebar/>

      <Main>
        <Outlet/>
      </Main>
    </StyledAppLayout>);
}

export default AppLayout;
