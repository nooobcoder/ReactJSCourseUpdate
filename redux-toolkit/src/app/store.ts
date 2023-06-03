import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customerSlice";
import reservationsReducer from "../features/reservationSlice";

const store = configureStore({
	reducer: { reservations: reservationsReducer, customer: customerReducer },
});
export { store };

// Types export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
