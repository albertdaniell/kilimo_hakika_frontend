"use client";
import { configureStore } from "@reduxjs/toolkit";
import appData from "./features/AppData/appSlice";
import authData from "./features/AppData/authSlice";



export const rootStore = configureStore({
  reducer: {
    appData: appData,
    authData: authData,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
