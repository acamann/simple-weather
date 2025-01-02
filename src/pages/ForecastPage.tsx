import styled from "styled-components";
import { useContext } from "react";
import { WeatherContext } from "../providers/WeatherContext";
import { ForecastGraph } from "../features/forecast/components/ForecastGraph";
import { ForecastTable } from "../components/ForecastTable";

const Container = styled.div`
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: lightgray;
  margin: 12px 0;
`;

export const ForecastPage = () => {
  const { forecast } = useContext(WeatherContext);
  return (
    <Container>
      <ForecastGraph forecast={forecast.list} />
      <Divider />
      <ForecastTable forecast={forecast.list} />
    </Container>
  );
};
