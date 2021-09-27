import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import "./App.css";
import { RootState } from "./app/store";
import CustomerCard from "./components/CustomerCard";
import ReservatinCard from "./components/ReservationCard";
import { addReservation } from "./features/reservationSlice";

const App = () => {
	const [reservationNameInput, setReservationNameInput] = useState("");

	const reservations = useSelector(
		(state: RootState) => state.reservations.value
	);
	const customers = useSelector((state: RootState) => state.customer.value);

	const dispatch = useDispatch();

	const handleAddReservation = () => {
		if (!reservationNameInput) return;
		dispatch(addReservation(reservationNameInput));
		setReservationNameInput("");
	};

	return (
		<div className="App">
			<div className="container">
				<div className="reservation-container">
					<div>
						<h5 className="reservation-header">Reservations</h5>
						<div className="reservation-cards-container">
							{reservations.map((name, index) => (
								<ReservatinCard
									name={name}
									index={index}
									key={uuid()}
								/>
							))}
						</div>
					</div>
					<div className="reservation-input-container">
						<input
							value={reservationNameInput}
							onChange={(e) =>
								setReservationNameInput(e.target.value)
							}
						/>
						<button
							onClick={() => {
								handleAddReservation();
							}}
							type="button"
						>
							Add
						</button>
					</div>
				</div>
				<div className="customer-food-container">
					{customers.map((customer) => (
						<CustomerCard
							id={customer.id}
							name={customer.name}
							food={customer.food}
							key={customer.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
