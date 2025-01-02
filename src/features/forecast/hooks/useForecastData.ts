import { ForecastMoment } from "../../../services/weatherTypes";

export const useForecastData = (forecast: ForecastMoment[]) =>
  forecast.map((datum) => ({
    date: new Date(datum.dt * 1000),
    feels_like: datum.main.feels_like,
    temp: datum.main.temp,
    pop: datum.pop,
    rain: datum.rain?.["3h"] ?? 0,
    weather: datum.weather,
  }));
