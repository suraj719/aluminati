import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alumniSlice } from "./alumni";

const rootReducer = combineReducers({
  alumni: alumniSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
