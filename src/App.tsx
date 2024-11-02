import "./App.css";
import { useGetCurrentWeatherQuery } from "./services/weather";

function App() {
  const { data: currentWeather } = useGetCurrentWeatherQuery({
    latitude: 29.8091725,
    longitude: -95.5404691,
  });

  return (
    <>
      <h1>Temp: {currentWeather?.main.temp}</h1>
    </>
  );
}

export default App;
