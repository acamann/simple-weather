import { createContext } from "react";
import { CurrentWeather, Forecast } from "../services/weatherTypes";

type WeatherContextType = {
  current: CurrentWeather;
  forecast: Forecast;
};

export const WeatherContext = createContext<WeatherContextType>({
  current: {
    dt: 0,
    main: {
      temp: 0,
      feels_like: 0,
    },
    pop: 0,
    weather: [],
  },
  forecast: {
    list: [],
  },
});
