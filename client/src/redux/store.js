import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alumniSlice } from "./alumni";
import { alertSlice } from "./alerts";
import { startupSlice } from "./startup";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  alumni: alumniSlice.reducer,
  startup: startupSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
