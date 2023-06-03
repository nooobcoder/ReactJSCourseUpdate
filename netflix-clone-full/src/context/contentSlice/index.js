import { createSlice } from "@reduxjs/toolkit";

const content = { series: null, films: null };

const contentSlice = createSlice({
  name: "contentSlice",
  initialState: content,
  reducers: {
    setContent: (prevState, { payload }) => {
      return { ...prevState, ...payload };
    },
  },
});

export const { setContent } = contentSlice.actions;
export default contentSlice;
