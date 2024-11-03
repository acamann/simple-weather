import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "./services/weather";
import { geocodingApi } from "./services/geocoding";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geocodingApi.reducerPath]: geocodingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      weatherApi.middleware,
      geocodingApi.middleware
    ),
});

setupListeners(store.dispatch);
