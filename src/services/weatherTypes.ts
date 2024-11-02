type LocationProps = {
  latitude: number;
  longitude: number;
};

// Current Weather
export type CurrentWeather = {
  dt: number;
  main: {
    temp: number;
  };
};

export type CurrentWeatherProps = LocationProps & {
  exclude?: string;
};

// Five Day Forecast
export type Forecast = {
  list: CurrentWeather[];
};

export type ForecastProps = LocationProps;
