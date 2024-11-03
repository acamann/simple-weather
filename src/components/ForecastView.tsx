import { useContext } from "react";
import { useGetForecastQuery } from "../services/weather";
import { Forecast as TForecast } from "../services/weatherTypes";
import { GeolocationContext } from "../providers/GeolocationContext";
import styled from "styled-components";
import { SectionTitle } from "./SectionTitle";

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
      {forecast.list.map((weather) => (
        <div key={weather.dt}>{weather.main.temp}</div>
      ))}
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
