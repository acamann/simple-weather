import { useLocation } from "react-router";
import styled from "styled-components";
import { BackButton } from "./BackButton";

const Container = styled.div<{ $hasBackButton: boolean }>`
  border-bottom: solid 1px lightgray;
  width: 100%;
  padding-bottom: 16px;
  display: flex;
  justify-content: ${(props) =>
    props.$hasBackButton ? "space-between" : "flex-end"};
`;

export const AppBar: React.FC = () => {
  const location = useLocation();
  const isNotHome = location.pathname != "/";
  return (
    <Container $hasBackButton={isNotHome}>
      {isNotHome && <BackButton />}
      <div>My Simple Weather</div>
    </Container>
  );
};
