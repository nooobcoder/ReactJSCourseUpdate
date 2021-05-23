import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartIsVisible: false, notification: null };

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggle(prevState) {
			return { ...prevState, cartIsVisible: !prevState.cartIsVisible };
		},
		showNotification(prevState, { payload }) {
			prevState.notification = {
				status: payload.status,
				title: payload.title,
				message: payload.message,
			};
		},
	},
});

export const { toggle, showNotification } = uiSlice.actions;
export default uiSlice;
