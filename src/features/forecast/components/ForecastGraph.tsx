import { useRef } from "react";
import { ForecastMoment } from "../../../services/weatherTypes";
import { useForecastData } from "../hooks/useForecastData";
import { useContainerWidth } from "../../../hooks/useContainerWidth";
import { DayMarkers } from "./DayMarkers";
import { XScaleProvider } from "../providers/XScaleProvider";
import { TemperatureGraph } from "./TemperatureGraph";
import { PrecipitationGraph } from "./PrecipitationGraph";

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

type Props = {
  forecast: ForecastMoment[];
  height?: number;
};

export const ForecastGraph: React.FC<Props> = ({ forecast, height = 220 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scaleHeight = 40;
  const graphHeight = height - scaleHeight;

  const width = useContainerWidth(containerRef);
  const forecastData = useForecastData(forecast);

  return (
    <XScaleProvider forecastData={forecastData} width={width}>
      <div ref={containerRef} style={{ width: "100%", height }}>
        <svg width={width} height={graphHeight}>
          <TemperatureGraph
            forecastData={forecastData}
            width={width}
            height={height}
            colors={colors}
          />
          <PrecipitationGraph
            forecastData={forecastData}
            width={width}
            height={height}
            colors={colors}
          />
        </svg>
        <div
          style={{
            width: "100%",
            position: "relative",
            height: scaleHeight,
          }}
        >
          <DayMarkers forecastData={forecastData} width={width} />
        </div>
      </div>
    </XScaleProvider>
  );
};
