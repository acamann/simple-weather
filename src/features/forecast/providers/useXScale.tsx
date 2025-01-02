import { useContext } from "react";
import { XScaleContext } from "./XScaleContext";

export const useXScale = () => useContext(XScaleContext);
