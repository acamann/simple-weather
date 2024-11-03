import styled from "styled-components";
import { CurrentWeatherView } from "./components/CurrentWeatherView";
import { ForecastView } from "./components/ForecastView";
import { GeolocationProvider } from "./providers/GeolocationProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
