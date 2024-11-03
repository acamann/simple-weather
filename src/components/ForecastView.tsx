import { useContext } from "react";
import styled from "styled-components";
import { SectionTitle } from "./SectionTitle";
import { ForecastGraph } from "./ForecastGraph";
import { WeatherContext } from "../providers/WeatherContext";

const Container = styled.div`
  width: 100%;
  //border: solid 5px blue;
`;

export const ForecastView: React.FC = () => {
  const { forecast } = useContext(WeatherContext);
  return (
    <Container>
      <SectionTitle>This Week</SectionTitle>
      <ForecastGraph forecast={forecast.list} />
    </Container>
  );
};
