import React, { PropsWithChildren, useEffect, useState } from "react";
import { GeolocationContext } from "./GeolocationContext";
import { GeoCoordinates } from "../types";

export const GeolocationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [location, setLocation] = useState<GeoCoordinates>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  if (error) {
    return <>{error}</>;
  }

  if (!location) {
    return <>Loading...</>;
  }

  return (
    <GeolocationContext.Provider value={location}>
      {children}
    </GeolocationContext.Provider>
  );
};
