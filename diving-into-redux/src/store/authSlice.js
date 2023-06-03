import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { isAuthenticated: false };
const authSlice = createSlice({
	name: "auth",
	initialState: authInitialState,
	reducers: {
		login(prevState) {
			console.log(";");
			return {
				...prevState,
				isAuthenticated: true,
			};
		},
		logout(prevState) {
			return {
				...prevState,
				isAuthenticated: false,
			};
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice;
