import { useNavigate } from "react-router";
import { CurrentWeatherView } from "../components/CurrentWeatherView";
import { ForecastView } from "../components/ForecastView";
import styled from "styled-components";

const ClickableCard = styled.div`
  width: 100%;
  > :hover {
    border: solid 1px lightgray;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const OverviewPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <ClickableCard onClick={() => navigate("current")}>
        <CurrentWeatherView />
      </ClickableCard>
      <ClickableCard onClick={() => navigate("forecast")}>
        <ForecastView />
      </ClickableCard>
    </>
  );
};
