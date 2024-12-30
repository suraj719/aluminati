import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alumniSlice } from "./alumni";
import { alertSlice } from "./alerts";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  alumni: alumniSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
