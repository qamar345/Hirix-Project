import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./adminApi";
import { employerApi } from "./employerApi";
import { candidateApi } from "./candidateApi";

export const store = configureStore({
  reducer: {
    // RTK Query reducers (auto-generated)
    [adminApi.reducerPath]: adminApi.reducer,
    [employerApi.reducerPath]: employerApi.reducer,
    [candidateApi.reducerPath]: candidateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminApi.middleware,
      employerApi.middleware,
      candidateApi.middleware
    ),
});

export default store;
