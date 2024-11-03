type LocationProps = {
  latitude: number;
  longitude: number;
};

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
  };
  weather: Weather[];
};

export type CurrentWeatherProps = LocationProps & {
  exclude?: string;
};

// Five Day Forecast
export type Forecast = {
  list: CurrentWeather[];
};

export type ForecastProps = LocationProps;
