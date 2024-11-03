import { useContext } from "react";
import { GeolocationContext } from "../providers/GeolocationContext";
import { useGetCurrentWeatherQuery } from "../services/weather";
import { CurrentWeather as TCurrentWeather } from "../services/weatherTypes";
import styled from "styled-components";
import { formatTemp } from "../utils/common";
import { WeatherIcon } from "./WeatherIcon";

const Container = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
`;

type Props = {
  current: TCurrentWeather;
};

const CurrentWeather: React.FC<Props> = ({ current }) => {
  return (
    <Container>
      <Icon>
        <WeatherIcon weather={current.weather} />
      </Icon>
      <h1>{formatTemp(current.main.temp)}</h1>
    </Container>
  );
};

export const CurrentWeatherView: React.FC = () => {
  const { latitude, longitude } = useContext(GeolocationContext);

  const { data: currentWeather } = useGetCurrentWeatherQuery({
    latitude,
    longitude,
  });

  if (!currentWeather) {
    return <>Loading...</>;
  }

  return <CurrentWeather current={currentWeather} />;
};
