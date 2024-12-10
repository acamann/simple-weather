import styled from "styled-components";
import { CurrentWeatherView } from "../components/CurrentWeatherView";
import { BackButton } from "../components/BackButton";

const Container = styled.div`
  width: 100%;
`;

export const CurrentPage = () => {
  return (
    <Container>
      <BackButton path="/" />
      <CurrentWeatherView />
    </Container>
  );
};
