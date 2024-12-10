import { useEffect, useRef, useState } from "react";
import { CurrentWeather } from "../services/weatherTypes";
import { getDayOfWeek } from "../utils/common";
import { WeatherIcon } from "./WeatherIcon";
import * as d3scale from "d3-scale";
import * as d3shape from "d3-shape";

// TODO: allow changing settings
const showTemp = true;
const showPop = true;
const showFeelsLike = true;
const showLabels = true;

// TODO: copied some stuff over for now to hard code here
const CoolGrey = {
  Neutral50: "#F5F7FA",
  Neutral100: "#E4E7EB",
  Neutral200: "#CBD2D9",
  Neutral300: "#9AA5B1",
  Neutral400: "#7B8794",
  Neutral500: "#616E7C",
  Neutral600: "#52606D",
  Neutral700: "#3E4C59",
  Neutral800: "#323F4B",
  Neutral900: "#1F2933",
};

const colors = {
  primary: "#303F9F",
  secondary: "#BDBDBD",
  rain: "#3a7ca5",
  back: CoolGrey.Neutral50,
  onBackground: CoolGrey.Neutral800,
};

// relocate maybe
interface ForecastData {
  date: Date;
  feels_like: number;
  temp: number;
  pop: number;
  rain: number;
}

type Props = {
  forecast: CurrentWeather[];
  height?: number;
};

export const ForecastGraph: React.FC<Props> = ({ forecast, height = 220 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const scaleHeight = 40;
  const graphHeight = height - scaleHeight;

  useEffect(() => {
    if (containerRef.current) {
      const handleResize = () => {
        if (containerRef.current) {
          const containerWidth =
            containerRef.current.getBoundingClientRect().width;

          setWidth(containerWidth);
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [containerRef]);

  const forecastData: ForecastData[] = forecast.map((datum) => ({
    date: new Date(datum.dt * 1000),
    feels_like: datum.main.feels_like,
    temp: datum.main.temp,
    pop: datum.pop,
    rain: datum.rain?.["3h"] ?? 0,
  }));

  const scaleDate = d3scale
    .scaleTime()
    .domain([forecastData[0].date, forecastData[forecastData.length - 1].date])
    .range([0, width]);

  const feelsLikeDesc = [...forecastData].sort(
    (a, b) => b.feels_like - a.feels_like
  );
  const minFeelsLike = feelsLikeDesc[feelsLikeDesc.length - 1];
  const maxFeelsLike = feelsLikeDesc[0];

  const tempDesc = [...forecastData].sort((a, b) => b.temp - a.temp);
  const minTemp = tempDesc[tempDesc.length - 1];
  const maxTemp = tempDesc[0];

  const low = {
    date:
      minFeelsLike.feels_like < minTemp.temp ? minFeelsLike.date : minTemp.date,
    degrees:
      minFeelsLike.feels_like < minTemp.temp
        ? minFeelsLike.feels_like
        : minTemp.temp,
  };
  const high = {
    date:
      maxFeelsLike.feels_like > maxTemp.temp ? maxFeelsLike.date : maxTemp.date,
    degrees:
      maxFeelsLike.feels_like > maxTemp.temp
        ? maxFeelsLike.feels_like
        : maxTemp.temp,
  };

  const forecastSortedPrecip = [...forecastData].sort((a, b) => b.pop - a.pop);
  //const lowPrecip = forecastSortedPrecip[forecastSortedPrecip.length - 1];
  const highPrecip = forecastSortedPrecip[0];

  const hasChanceOfPrecip = highPrecip.pop > 0;

  const scaleTemps = d3scale
    .scaleLinear()
    .domain([low.degrees, high.degrees])
    .range([graphHeight - 24, hasChanceOfPrecip ? 36 : 12]);

  const scalePercentage = d3scale
    .scaleLinear()
    .domain([0, 1])
    .range([graphHeight, 12]);

  const temperaturePath = d3shape
    .line(
      (d: ForecastData) => scaleDate(d.date),
      (d: ForecastData) => scaleTemps(d.temp)
    )
    .curve(d3shape.curveBumpX)(forecastData);

  const feelsLikePath = d3shape
    .line(
      (d: ForecastData) => scaleDate(d.date),
      (d: ForecastData) => scaleTemps(d.feels_like)
    )
    .curve(d3shape.curveBumpX)(forecastData);

  const popFillPath = d3shape
    .line(
      (d: ForecastData) => scaleDate(d.date),
      (d: ForecastData) => scalePercentage(d.pop)
    )
    .curve(d3shape.curveBumpX)([
    { date: forecastData[0].date, pop: 0, temp: 0, feels_like: 0, rain: 0 }, // start at 0 to fill area below percentage
    ...forecastData,
    {
      date: forecastData[forecastData.length - 1].date,
      pop: 0,
      temp: 0,
      feels_like: 0,
      rain: 0,
    }, // end at 0 to fill area below percentage
  ]);

  const popLinePath = d3shape
    .line(
      (d: ForecastData) => scaleDate(d.date),
      (d: ForecastData) => scalePercentage(d.pop)
    )
    .curve(d3shape.curveBumpX)(forecastData);

  const days = forecast
    .filter((datum) => {
      const date = new Date(datum.dt * 1000);
      const hour = date.getHours();
      return hour > 10 && hour < 14;
    })
    .map((datum) => {
      const date = new Date(datum.dt * 1000);
      return {
        x: scaleDate(date),
        date: date,
        label: getDayOfWeek(date)[0],
        weather: datum.weather[0],
      };
    });

  const tempLabels = days.flatMap((day) => {
    const verticalOffset = 10;
    const sortedTempsForDay = forecast
      .filter(
        (datum) => new Date(datum.dt * 1000).getDate() === day.date.getDate()
      )
      .sort((a, b) => a.main.temp - b.main.temp);
    const high = sortedTempsForDay[0];
    const low = sortedTempsForDay[sortedTempsForDay.length - 1];
    return [
      {
        x: scaleDate(new Date(high.dt * 1000)),
        y: scaleTemps(high.main.temp) + verticalOffset,
        text: `${Math.round(high.main.temp)}`,
      },
      {
        x: scaleDate(new Date(low.dt * 1000)),
        y: scaleTemps(low.main.temp) - verticalOffset / 2,
        text: `${Math.round(low.main.temp)}`,
      },
    ];
  });

  return (
    <div ref={containerRef} style={{ width: "100%", height }}>
      <svg width={width} height={graphHeight}>
        <defs>
          <linearGradient
            id="precipitationGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.rain} stopOpacity="0.9" />
            <stop offset="90%" stopColor={colors.rain} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colors.rain} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g x={0} y={0}>
          {showTemp && temperaturePath ? (
            <path
              d={temperaturePath}
              stroke={colors.onBackground}
              fill="none"
            />
          ) : undefined}
          {showLabels &&
            tempLabels.map((label, index) => (
              <text
                key={index}
                x={label.x}
                y={label.y}
                fontSize={10}
                textAnchor="middle"
                fill={colors.onBackground}
              >
                {label.text}
              </text>
            ))}
          {showFeelsLike && feelsLikePath ? (
            <path
              d={feelsLikePath}
              stroke={colors.onBackground}
              opacity={0.4}
              fill="none"
            />
          ) : undefined}
          {showPop && popFillPath && popLinePath && hasChanceOfPrecip ? (
            <>
              <path
                d={popFillPath}
                fill="url(#precipitationGradient)"
                fillOpacity={0.3}
              />
              <path
                d={popLinePath}
                stroke="url(#precipitationGradient)"
                fill="none"
              />
            </>
          ) : undefined}
        </g>
      </svg>
      <div
        style={{
          width: "100%",
          position: "relative",
          height: scaleHeight,
        }}
      >
        {days.map((day, index) => (
          <div
            key={index}
            style={{ position: "absolute", left: day.x - 12, width: 24 }}
          >
            <div style={{ fontSize: 12, textAlign: "center" }}>{day.label}</div>
            <WeatherIcon weather={day.weather} />
          </div>
        ))}
      </div>
    </div>
  );
};
