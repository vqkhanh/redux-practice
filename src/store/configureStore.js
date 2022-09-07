import { configureStore } from "@reduxjs/toolkit";
import func from "./middleware/func";
import logger from "./middleware/logger";
import reducer from "./reducer";

export default function () {
  return configureStore({
    reducer,
    middleware: [logger({ destination: "console" }), func],
  });
  return store;
}
