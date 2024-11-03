import { useContext } from "react";
import { GeolocationContext } from "../providers/GeolocationContext";
import { useGetCurrentWeatherQuery } from "../services/weather";
import { CurrentWeather as TCurrentWeather } from "../services/weatherTypes";

type Props = {
  weather: TCurrentWeather;
};

const CurrentWeather: React.FC<Props> = ({ weather }) => {
  return (
    <>
      <h1>Temp: {weather.main.temp}</h1>
    </>
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

  return <CurrentWeather weather={currentWeather} />;
};
