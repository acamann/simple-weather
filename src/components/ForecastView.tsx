import { useGeolocation } from "../hooks/useGeolocation";
import { useGetForecastQuery } from "../services/weather";
import { Forecast as TForecast } from "../services/weatherTypes";

type Props = {
  forecast: TForecast;
};

const Forecast: React.FC<Props> = ({ forecast }) => {
  return (
    <>
      <h2>Forecast:</h2>
      {forecast.list.map((weather) => (
        <div key={weather.dt}>{weather.main.temp}</div>
      ))}
    </>
  );
};

export const ForecastView: React.FC = () => {
  const { data: location } = useGeolocation();

  // gross
  const { latitude, longitude } = location ?? { latitude: 0, longitude: 0 };

  const { data: forecast } = useGetForecastQuery({
    latitude,
    longitude,
  });

  if (!forecast) {
    return <>Loading...</>;
  }

  return <Forecast forecast={forecast} />;
};
