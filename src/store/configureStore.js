import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import reducer from "./reducer";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger({ destination: "console" })],
  });
}
