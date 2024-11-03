import styled from "styled-components";
import { CurrentWeatherView } from "./components/CurrentWeatherView";
import { ForecastView } from "./components/ForecastView";
import { GeolocationProvider } from "./providers/GeolocationProvider";

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

function App() {
  return (
    <GeolocationProvider>
      <Container>
        <CurrentWeatherView />
        <ForecastView />
      </Container>
    </GeolocationProvider>
  );
}

export default App;
