import { useContext } from "react";
import { GeolocationContext } from "../providers/GeolocationContext";
import { useGetCurrentWeatherQuery } from "../services/weather";
import { CurrentWeather as TCurrentWeather } from "../services/weatherTypes";
import styled from "styled-components";
import { formatTemp } from "../utils/common";
import { WeatherIcon } from "./WeatherIcon";
import { useNearestCity } from "../hooks/useNearestCity";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //border: solid 5px red;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
`;

const Temps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Temp = styled.div`
  font-size: 64px;
`;

type Props = {
  current: TCurrentWeather;
};

const CurrentWeather: React.FC<Props> = ({ current }) => {
  const city = useNearestCity();
  return (
    <Container>
      <Icon>
        <WeatherIcon weather={current.weather} />
      </Icon>
      <Temps>
        <Temp>{formatTemp(current.main.temp)}</Temp>
        <div>
          {current.weather.length > 0
            ? `${current.weather[0].description}, `
            : undefined}
          feels like {formatTemp(current.main.feels_like)}
        </div>
        <div>{city}</div>
      </Temps>
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
