import { createContext } from "react";

export type GeolocationContextType = {
  longitude: number;
  latitude: number;
};

export const GeolocationContext = createContext<GeolocationContextType>({
  longitude: 0,
  latitude: 0,
});
