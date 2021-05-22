import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartIsVisible: false };

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggle(prevState) {
			return { ...prevState, cartIsVisible: !prevState.cartIsVisible };
		},
	},
});

export const { toggle } = uiSlice.actions;
export default uiSlice;
