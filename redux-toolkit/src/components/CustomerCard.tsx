import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addFoodToCustomer } from "../features/customerSlice";

interface CustomerCardType {
	id: string;
	name: string;
	food: string[];
}

function CustomerCard({ id, name, food }: CustomerCardType) {
	const [customerFoodInput, setCustomerFoodInput] = useState("");
	const dispatch = useDispatch();
	return (
		<div className="customer-food-card-container">
			<h5>{name}</h5>
			<div className="customer-foods-container">
				<div className="customer-food">
					{food.map((foodItem) => (
						<p key={uuid()}>{foodItem}</p>
					))}
				</div>
				<div className="customer-food-input-container">
					<input
						value={customerFoodInput}
						onChange={(e) => setCustomerFoodInput(e.target.value)}
					/>
					<button
						type="button"
						onClick={() => {
							dispatch(
								addFoodToCustomer({
									id,
									food: customerFoodInput,
								})
							);
							setCustomerFoodInput("");
						}}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
}

export default CustomerCard;
