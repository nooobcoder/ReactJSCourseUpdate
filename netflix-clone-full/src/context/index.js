import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import contentSlice from "./contentSlice";

const store = configureStore({
  reducer: { app: appSlice.reducer, content: contentSlice.reducer },
  devTools: process.env.REACT_APP_STATE === "development" ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
