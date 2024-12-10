import styled from "styled-components";
import { WeatherProvider } from "./providers/WeatherProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import { OverviewPage } from "./pages/OverviewPage";
import { CurrentPage } from "./pages/CurrentPage";
import { ForecastPage } from "./pages/ForecastPage";

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 100%;
`;

function App() {
  return (
    <WeatherProvider>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route index element={<OverviewPage />} />
            <Route path="current" element={<CurrentPage />} />
            <Route path="forecast" element={<ForecastPage />} />
          </Routes>
        </BrowserRouter>
        <div>Andy Camann</div>
      </Container>
    </WeatherProvider>
  );
}

export default App;
