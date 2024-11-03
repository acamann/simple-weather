import { GeoCoordinates } from "../types";

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

// Current Weather
export type CurrentWeather = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  pop: number;
  rain?: {
    "3h": number;
  };
  weather: Weather[];
};

export type CurrentWeatherProps = GeoCoordinates & {
  exclude?: string;
};

// Five Day Forecast
export type Forecast = {
  list: CurrentWeather[];
};

export type ForecastProps = GeoCoordinates;
