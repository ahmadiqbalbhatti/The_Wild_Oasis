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

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

function AppLayout() {
  return (<StyledAppLayout>
      <Header/>
      <Sidebar/>

      <Main>
        <Container>
          <Outlet/>
        </Container>
      </Main>
    </StyledAppLayout>);
}

export default AppLayout;
