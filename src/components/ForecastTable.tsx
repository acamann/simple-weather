import React from "react";
import { CurrentWeather } from "../services/weatherTypes";
import styled from "styled-components";
import { formatTemp } from "../utils/common";

type Props = {
  forecast: CurrentWeather[];
};

const Table = styled.table`
  width: 100%;
  th {
    text-align: left;
  }
  tbody {
    overflow-y: auto;
  }
`;

export const ForecastTable: React.FC<Props> = ({ forecast }) => {
  return (
    <Table>
      <tr>
        <th>Time</th>
        <th>Temp (Feels)</th>
        <th>Weather</th>
        <th>Precipitation</th>
      </tr>
      <tbody>
        {forecast.map((item) => (
          <tr key={item.dt}>
            <td>{getDayOfWeekAndTime(item.dt)}</td>
            <td>
              {formatTemp(item.main.temp)} ({formatTemp(item.main.feels_like)})
            </td>
            <td>{item.weather[0].main}</td>
            <td>{formatPrecipitation(item.pop, item.rain?.["3h"])}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

function formatPrecipitation(rainChance: number, rainVolume?: number) {
  const result: string[] = [];
  if (rainChance > 0) {
    result.push(`${Math.round(rainChance * 100)}%`);
  }
  if (rainVolume) {
    result.push(`${rainVolume}mm`);
  }
  return result.join(" ");
}

function getDayOfWeekAndTime(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const hours = date.getHours();
  let hoursDisplay = hours.toString();
  if (hours === 0) hoursDisplay = "12am";
  else if (hours < 12) hoursDisplay = `${hours}am`;
  else if (hours === 12) hoursDisplay = "noon";
  else hoursDisplay = `${hours % 12}pm`;

  return `${dayOfWeek} ${hoursDisplay}`;
}
