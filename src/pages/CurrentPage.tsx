import styled from "styled-components";
import { CurrentWeatherView } from "../components/CurrentWeatherView";

const Container = styled.div`
  width: 100%;
`;

export const CurrentPage = () => {
  return (
    <Container>
      <CurrentWeatherView />
    </Container>
  );
};
