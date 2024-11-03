import { useContext } from "react";
import { useGetForecastQuery } from "../services/weather";
import { Forecast as TForecast } from "../services/weatherTypes";
import { GeolocationContext } from "../providers/GeolocationContext";

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
