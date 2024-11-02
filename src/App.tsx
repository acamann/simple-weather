import "./App.css";
import { CurrentWeatherView } from "./components/CurrentWeatherView";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
  const { data: location } = useGeolocation();

  return !location ? (
    <>Loading...</>
  ) : (
    <>
      <CurrentWeatherView location={location} />
    </>
  );
}

export default App;
