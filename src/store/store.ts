import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { patientsApi } from "./api/patients";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [patientsApi.reducerPath]: patientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, patientsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
