import { useContext } from "react";
import { useGetForecastQuery } from "../services/weather";
import { Forecast as TForecast } from "../services/weatherTypes";
import { GeolocationContext } from "../providers/GeolocationContext";
import styled from "styled-components";
import { SectionTitle } from "./SectionTitle";
import { ForecastGraph } from "./ForecastGraph";

const Container = styled.div`
  width: 100%;
  //border: solid 5px blue;
`;

type Props = {
  forecast: TForecast;
};

const Forecast: React.FC<Props> = ({ forecast }) => {
  return (
    <Container>
      <SectionTitle>This Week</SectionTitle>
      <ForecastGraph forecast={forecast.list} />
    </Container>
  );
};

export const ForecastView: React.FC = () => {
  const { latitude, longitude } = useContext(GeolocationContext);

  const { data: forecast } = useGetForecastQuery({
    latitude,
    longitude,
  });

  if (!forecast) {
    return <>Loading...</>;
  }

  return <Forecast forecast={forecast} />;
};
