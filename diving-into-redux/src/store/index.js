// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import authSlice from "./authSlice";

/* 
! PART OF REDUX
export const TOGGLE_COUNTER = "TOGGLE_COUNTER";
export const INCREMENT = "INCREMENT";
export const INCREASE = "INCREASE";
export const DECREMENT = "DECREMENT";
 */

//! PART OF REDUX
/*const initialState = { counter: 0, showCounter: true };
  const counterReducer = (prevState = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case TOGGLE_COUNTER:
			return { ...prevState, showCounter: !prevState.showCounter };
		case INCREMENT:
			return { ...prevState, counter: prevState.counter + 1 };
		case INCREASE:
			return { ...prevState, counter: prevState.counter + payload };
		case DECREMENT:
			return { ...prevState, counter: prevState.counter - 1 };
		default:
			return prevState;
	}
};
const store = createStore(counterReducer);
export default store;
 */

const store = configureStore({
	reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

// !DO NOT TOUCH THIS
export default store;
