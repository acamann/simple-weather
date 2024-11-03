import React, { PropsWithChildren, useContext } from "react";
import { GeolocationContext } from "./GeolocationContext";
import { GeolocationProvider } from "./GeolocationProvider";
import {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
} from "../services/weather";
import { WeatherContext } from "./WeatherContext";

const WeatherProviderImplementation: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { latitude, longitude } = useContext(GeolocationContext);

  const { data: current, error: currentError } = useGetCurrentWeatherQuery({
    latitude,
    longitude,
  });

  const { data: forecast, error: forecastError } = useGetForecastQuery({
    latitude,
    longitude,
  });

  const error = currentError ?? forecastError;

  if (error) {
    return <>{error}</>;
  }

  if (!current || !forecast) {
    return <>Loading...</>;
  }

  return (
    <WeatherContext.Provider value={{ current, forecast }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const WeatherProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <GeolocationProvider>
      <WeatherProviderImplementation>{children}</WeatherProviderImplementation>
    </GeolocationProvider>
  );
};
