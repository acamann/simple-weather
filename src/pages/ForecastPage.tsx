import styled from "styled-components";
import { ForecastView } from "../components/ForecastView";
import { BackButton } from "../components/BackButton";

const Container = styled.div`
  width: 100%;
`;

export const ForecastPage = () => {
  return (
    <Container>
      <BackButton path="/" />
      <ForecastView />
    </Container>
  );
};
