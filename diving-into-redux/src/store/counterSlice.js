import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

//! PART OF REDUX-TOOLKIT (@redux/toolkit) [https://redux-toolkit.js.org/api/createSlice]
const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		toggle(prevState) {
			console.log("toggle");
			return { ...prevState, showCounter: !prevState.showCounter };
		},
		increment(prevState) {
			return { ...prevState, counter: prevState.counter + 1 };
		},
		decrement(prevState) {
			return { ...prevState, counter: prevState.counter - 1 };
		},
		increase(prevState, action) {
			return {
				...prevState,
				counter: prevState.counter + action.payload,
			};
		},
	},
});

export const { decrement, increase, increment, toggle } = counterSlice.actions;
export default counterSlice;
