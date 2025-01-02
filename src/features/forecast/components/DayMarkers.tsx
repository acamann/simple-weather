import { Weather } from "../../../services/weatherTypes";
import { WeatherIcon } from "../../../components/WeatherIcon";
import { useXScale } from "../providers/useXScale";
import { getDayOfWeek } from "../../../utils/common";

type ForecastData = {
  date: Date;
  weather: Weather[] | Weather;
};

export const DayMarkers: React.FC<{
  forecastData: ForecastData[];
  width: number;
}> = ({ forecastData, width }) => {
  const { scaleDate } = useXScale();

  const days = forecastData
    .filter((datum) => {
      const hour = datum.date.getHours();
      return hour > 10 && hour < 14;
    })
    .map((datum) => {
      const date = datum.date;
      return {
        x: scaleDate(date, { min: 12, max: width - 12 }),
        date: date,
        label: getDayOfWeek(date)[0],
        weather: datum.weather,
      };
    });

  return (
    <>
      {days.map((day, index) => (
        <div
          key={index}
          style={{ position: "absolute", left: day.x - 12, width: 24 }}
        >
          <div style={{ fontSize: 12, textAlign: "center" }}>{day.label}</div>
          <WeatherIcon weather={day.weather} />
        </div>
      ))}
    </>
  );
};
