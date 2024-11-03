import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CurrentCity, CurrentCityProps } from "./geocodingTypes";

//https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocode-to-city-api
export const geocodingApi = createApi({
  reducerPath: "geocodingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.bigdatacloud.net/data/",
  }),
  endpoints: (builder) => ({
    getCurrentCity: builder.query<CurrentCity, CurrentCityProps>({
      query: ({ latitude, longitude }) =>
        `reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    }),
  }),
});

export const { useGetCurrentCityQuery } = geocodingApi;
