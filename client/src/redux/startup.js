import { createSlice } from "@reduxjs/toolkit";

export const startupSlice = createSlice({
  name: "startup",
  initialState: {
    startup: null,
  },
  reducers: {
    setStartup: (state, action) => {
      state.startup = action.payload;
    },
  },
});

export const { setStartup } = startupSlice.actions;
