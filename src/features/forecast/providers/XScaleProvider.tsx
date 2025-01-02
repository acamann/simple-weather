import * as d3scale from "d3-scale";
import { XScaleContext } from "./XScaleContext";

export const XScaleProvider: React.FC<{
  forecastData: { date: Date }[];
  width: number;
  children: React.ReactNode;
}> = ({ forecastData, width, children }) => {
  const scaleDateInternal = d3scale
    .scaleTime()
    .domain([forecastData[0].date, forecastData[forecastData.length - 1].date])
    .range([0, width]);

  const scaleDate = (
    value: Date | d3scale.NumberValue,
    clamp = { min: 0, max: width }
  ) => Math.max(Math.min(clamp.max, scaleDateInternal(value)), clamp.min);

  return (
    <XScaleContext.Provider value={{ scaleDate }}>
      {children}
    </XScaleContext.Provider>
  );
};
