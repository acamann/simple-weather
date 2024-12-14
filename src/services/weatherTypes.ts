import { GeoCoordinates } from "../types";

// common
export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type WeatherMoment<TRain> = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  pop: number;
  rain?: TRain;
  weather: Weather[];
};

// Current Weather
export type CurrentWeather = WeatherMoment<HourlyRain>;
type HourlyRain = { "1h": number };

export type CurrentWeatherProps = GeoCoordinates & {
  exclude?: string;
};

// Five Day Forecast
export type Forecast = {
  list: ForecastMoment[];
};
export type ForecastMoment = WeatherMoment<ThreeHourlyRain>;
type ThreeHourlyRain = { "3h": number };

export type ForecastProps = GeoCoordinates;
