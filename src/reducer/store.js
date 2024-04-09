import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import eventReducer from "./event";
import deliveryReducer from "./delivery";

const rootReducer = combineReducers({
  event: eventReducer,
  delivery: deliveryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
