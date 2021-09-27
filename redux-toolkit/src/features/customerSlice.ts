import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Customer {
	id: string;
	name: string;
	food: string[];
}

interface AddFoodToCustomerPayload {
	food: string;
	id: string;
}

export interface CustomerState {
	value: Customer[];
}

const initialState: CustomerState = { value: [] };

const reservationSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		addCustomer: (state, { payload }: PayloadAction<Customer>) => {
			state.value.push(payload);
		},
		addFoodToCustomer: (
			state,
			{ payload }: PayloadAction<AddFoodToCustomerPayload>
		) => {
			state.value.forEach((customer) => {
				if (customer.id === payload.id)
					customer.food.push(payload.food);
			});
		},
	},
});

export const { addCustomer, addFoodToCustomer } = reservationSlice.actions;

export default reservationSlice.reducer;
