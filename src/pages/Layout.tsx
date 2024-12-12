import { Outlet } from "react-router";
import { AppBar } from "./../components/AppBar";
import { Footer } from "./../components/Footer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

export const Layout = () => {
  return (
    <Container>
      <AppBar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </Container>
  );
};
