import "./App.css";
import { CurrentWeatherView } from "./components/CurrentWeatherView";
import { ForecastView } from "./components/ForecastView";

function App() {
  return (
    <>
      <CurrentWeatherView />
      <ForecastView />
    </>
  );
}

export default App;
