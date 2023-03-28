import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    authStore: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
