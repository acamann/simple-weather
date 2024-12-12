import { WeatherProvider } from "./providers/WeatherProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import { OverviewPage } from "./pages/OverviewPage";
import { CurrentPage } from "./pages/CurrentPage";
import { ForecastPage } from "./pages/ForecastPage";
import { Layout } from "./pages/Layout";

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<OverviewPage />} />
            <Route path="current" element={<CurrentPage />} />
            <Route path="forecast" element={<ForecastPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
