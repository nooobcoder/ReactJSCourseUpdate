import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReservationState {
	value: Array<String>;
}

const initialState: ReservationState = { value: ["Selena Gomez"] };

const reservationSlice = createSlice({
	name: "reservations",
	initialState,
	reducers: {
		addReservation: (state, { payload }: PayloadAction<String>) => {
			state.value.push(payload);
		},
		removeReservation: (state, { payload }: PayloadAction<number>) => {
			state.value.splice(payload, 1);
		},
	},
});

export const { addReservation, removeReservation } = reservationSlice.actions;

export default reservationSlice.reducer;
