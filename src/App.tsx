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
  flex: 1;
`;

function App() {
  return (
    <GeolocationProvider>
      <Container>
        <CurrentWeatherView />
        <ForecastView />
        <div>Andy Camann</div>
      </Container>
    </GeolocationProvider>
  );
}

export default App;
