import { useContext } from "react";
import { useGetCurrentCityQuery } from "../services/geocoding";
import { GeolocationContext } from "../providers/GeolocationContext";

export const useNearestCity = () => {
  const location = useContext(GeolocationContext);
  const { data } = useGetCurrentCityQuery(location);
  return data?.city ?? "";
};
