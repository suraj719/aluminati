import { createSlice } from "@reduxjs/toolkit";

export const alumniSlice = createSlice({
  name: "alumni",
  initialState: {
    alumni: null,
  },
  reducers: {
    setAlumni: (state, action) => {
      state.alumni = action.payload;
    },
  },
});

export const { setAlumni } = alumniSlice.actions;
