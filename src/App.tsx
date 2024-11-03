import "./App.css";
import { CurrentWeatherView } from "./components/CurrentWeatherView";
import { ForecastView } from "./components/ForecastView";
import { GeolocationProvider } from "./providers/GeolocationProvider";

function App() {
  return (
    <GeolocationProvider>
      <CurrentWeatherView />
      <ForecastView />
    </GeolocationProvider>
  );
}

export default App;
