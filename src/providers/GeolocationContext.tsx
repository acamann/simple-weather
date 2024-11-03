import { createContext } from "react";
import { GeoCoordinates } from "../types";

type GeolocationContextType = GeoCoordinates;

export const GeolocationContext = createContext<GeolocationContextType>({
  longitude: 0,
  latitude: 0,
});
