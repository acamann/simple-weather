import "./App.css";
import { useGeolocation } from "./hooks/useGeolocation";
import { useGetCurrentWeatherQuery } from "./services/weather";

function App() {
  const { data: location, isSuccess: isLocationSuccess } = useGeolocation();
  const { data: currentWeather } = useGetCurrentWeatherQuery(
    {
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
    },
    { skip: !isLocationSuccess }
  );

  return (
    <>
      <h1>Temp: {currentWeather?.main.temp}</h1>
    </>
  );
}

export default App;
