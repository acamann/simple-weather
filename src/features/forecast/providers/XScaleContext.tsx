import { createContext } from "react";
import * as d3scale from "d3-scale";

type ContextType = {
  scaleDate: (
    value: Date | d3scale.NumberValue,
    clamp?: { min: number; max: number }
  ) => number;
};

export const XScaleContext = createContext<ContextType>({
  scaleDate: null,
} as unknown as ContextType);
