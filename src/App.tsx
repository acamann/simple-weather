import styled from "styled-components";
import { CurrentWeatherView } from "./components/CurrentWeatherView";
import { ForecastView } from "./components/ForecastView";
import { WeatherProvider } from "./providers/WeatherProvider";

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
        <CurrentWeatherView />
        <ForecastView />
        <div>Andy Camann</div>
      </Container>
    </WeatherProvider>
  );
}

export default App;
