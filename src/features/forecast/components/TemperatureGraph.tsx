import * as d3scale from "d3-scale";
import * as d3shape from "d3-shape";
import { useXScale } from "../providers/useXScale";

type ForecastData = {
  date: Date;
  temp: number;
  feels_like: number;
};

type Props = {
  forecastData: ForecastData[];
  width: number;
  height: number;
  showTemp?: boolean;
  showFeelsLike?: boolean;
  showLabels?: boolean;
  colors: {
    primary: string;
    onBackground: string;
  };
};

export const TemperatureGraph: React.FC<Props> = ({
  forecastData,
  width,
  height,
  showLabels = true,
  colors,
}) => {
  const scaleHeight = 40;
  const graphHeight = height - scaleHeight;

  // determine temp extremes
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

  // TODO: figure
  const hasChanceOfPrecip = true;

  const { scaleDate } = useXScale();

  const scaleTemps = d3scale
    .scaleLinear()
    .domain([low.degrees, high.degrees])
    .range([graphHeight - 24, hasChanceOfPrecip ? 36 : 12]);

  // Paths
  const temperaturePath = d3shape
    .line(
      (d: ForecastData) => scaleDate(d.date),
      (d: ForecastData) => scaleTemps(d.temp)
    )
    .curve(d3shape.curveBumpX)(forecastData);

  // TODO: split this out to it's own separate instance of this single dumber component
  const feelsLikePath = d3shape
    .line(
      (d: ForecastData) => scaleDate(d.date),
      (d: ForecastData) => scaleTemps(d.feels_like)
    )
    .curve(d3shape.curveBumpX)(forecastData);

  const days = forecastData
    .filter((datum) => {
      const hour = datum.date.getHours();
      return hour > 10 && hour < 14;
    })
    .map((datum) => ({
      date: datum.date,
    }));

  // Labels
  const tempLabels = days.flatMap((day) => {
    const verticalOffset = 10;
    const sortedTempsForDay = forecastData
      .filter((datum) => datum.date.getDate() === day.date.getDate())
      .sort((a, b) => a.temp - b.temp);
    const high = sortedTempsForDay[0];
    const low = sortedTempsForDay[sortedTempsForDay.length - 1];
    return [
      {
        x: scaleDate(high.date, { min: 10, max: width - 10 }),
        y: scaleTemps(high.temp) + verticalOffset,
        text: `${Math.round(high.temp)}`,
      },
      {
        x: scaleDate(low.date, { min: 10, max: width - 10 }),
        y: scaleTemps(low.temp) - verticalOffset / 2,
        text: `${Math.round(low.temp)}`,
      },
    ];
  });

  // TODO: configurable
  const showTemp = true;
  const showFeelsLike = true;

  return (
    <svg width={width} height={graphHeight}>
      {showTemp && temperaturePath ? (
        <path d={temperaturePath} stroke={colors.onBackground} fill="none" />
      ) : undefined}
      {showFeelsLike && feelsLikePath ? (
        <path
          d={feelsLikePath}
          stroke={colors.onBackground}
          opacity={0.4}
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
    </svg>
  );
};
