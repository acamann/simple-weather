import * as d3scale from "d3-scale";
import * as d3shape from "d3-shape";
import { useXScale } from "../providers/useXScale";

type PrecipitationData = {
  date: Date;
  pop: number;
};

type Props = {
  forecastData: PrecipitationData[];
  width: number;
  height: number;
  colors: {
    rain: string;
  };
};

export const PrecipitationGraph: React.FC<Props> = ({
  forecastData,
  width,
  height,
  colors,
}) => {
  const scaleHeight = 40;
  const graphHeight = height - scaleHeight;

  // TODO: figure
  const hasChanceOfPrecip = true;

  // Scale
  const { scaleDate } = useXScale();

  const scalePercentage = d3scale
    .scaleLinear()
    .domain([0, 1])
    .range([graphHeight, 12]);

  // Paths
  const popFillPath = d3shape
    .line(
      (d: PrecipitationData) => scaleDate(d.date),
      (d: PrecipitationData) => scalePercentage(d.pop)
    )
    .curve(d3shape.curveBumpX)([
    { date: forecastData[0].date, pop: 0 }, // start at 0 to fill area below percentage
    ...forecastData,
    {
      date: forecastData[forecastData.length - 1].date,
      pop: 0,
    }, // end at 0 to fill area below percentage
  ]);

  const popLinePath = d3shape
    .line(
      (d: PrecipitationData) => scaleDate(d.date),
      (d: PrecipitationData) => scalePercentage(d.pop)
    )
    .curve(d3shape.curveBumpX)(forecastData);

  // TODO: configurable
  const showPop = true;

  return (
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
  );
};
