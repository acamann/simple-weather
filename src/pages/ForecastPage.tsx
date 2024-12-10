import styled from "styled-components";
import { BackButton } from "../components/BackButton";
import { useContext } from "react";
import { WeatherContext } from "../providers/WeatherContext";
import { ForecastGraph } from "../components/ForecastGraph";

const Container = styled.div`
  width: 100%;
`;

export const ForecastPage = () => {
  const { forecast } = useContext(WeatherContext);
  return (
    <Container>
      <BackButton path="/" />
      <ForecastGraph forecast={forecast.list} />
      <table style={{ width: "100%", paddingTop: 16 }}>
        {forecast.list.map((item) => (
          <tr key={item.dt}>
            <td>{item.dt}</td>
            <td>{item.main.temp}</td>
            <td>{item.main.feels_like}</td>
            <td>{item.pop}</td>
            <td>{item.rain?.["3h"]}</td>
            <td>{item.weather[0].main}</td>
          </tr>
        ))}
      </table>
    </Container>
  );
};
