import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CurrentWeather,
  CurrentWeatherProps,
  Forecast,
  ForecastProps,
} from "./weatherTypes";

const OPEN_WEATHER_MAP_API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

export const weatherApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<CurrentWeather, CurrentWeatherProps>({
      query: ({ latitude, longitude, exclude = "alerts" }) => {
        const queryParams: Record<string, string> = {
          lat: latitude.toString(),
          lon: longitude.toString(),
          exclude: exclude,
          appid: OPEN_WEATHER_MAP_API_KEY,
          units: "imperial",
        };
        const query = new URLSearchParams(queryParams).toString();
        return `weather?${query}`;
      },
    }),
    getForecast: builder.query<Forecast, ForecastProps>({
      query: ({ latitude, longitude }) => {
        const queryParams: Record<string, string> = {
          lat: latitude.toString(),
          lon: longitude.toString(),
          appid: OPEN_WEATHER_MAP_API_KEY,
          units: "imperial",
        };
        const query = new URLSearchParams(queryParams).toString();
        return `forecast?${query}`;
      },
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi;
