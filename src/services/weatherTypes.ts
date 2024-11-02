export type CurrentWeather = {
  main: {
    temp: number;
  };
};

export type GetCurrentWeatherProps = {
  latitude: number;
  longitude: number;
  exclude?: string;
};
