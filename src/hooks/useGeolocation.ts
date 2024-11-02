import { useEffect, useState } from "react";

type Location = {
  latitude: number;
  longitude: number;
};

type Return = {
  data?: Location;
  error?: string;
};

export const useGeolocation = (): Return => {
  const [location, setLocation] = useState<Location>();
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

  return {
    data: location,
    error,
  };
};
