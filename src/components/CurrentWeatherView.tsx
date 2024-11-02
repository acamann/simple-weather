import { useGeolocation } from "../hooks/useGeolocation";
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
  // TODO add to RTK state
  const { data: location } = useGeolocation();
  const { latitude, longitude } = location ?? { latitude: 0, longitude: 0 };

  const { data: currentWeather } = useGetCurrentWeatherQuery({
    latitude,
    longitude,
  });

  if (!currentWeather) {
    return <>Loading...</>;
  }

  return <CurrentWeather weather={currentWeather} />;
};
