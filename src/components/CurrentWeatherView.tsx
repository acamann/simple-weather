import { useGetCurrentWeatherQuery } from "../services/weather";

type Props = {
  location: {
    latitude: number;
    longitude: number;
  };
};

export const CurrentWeatherView: React.FC<Props> = ({
  location: { latitude, longitude },
}) => {
  const { data: currentWeather } = useGetCurrentWeatherQuery({
    latitude,
    longitude,
  });

  return (
    <>
      <h1>Temp: {currentWeather?.main.temp}</h1>
    </>
  );
};
