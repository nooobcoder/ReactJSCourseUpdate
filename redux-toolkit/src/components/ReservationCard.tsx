import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addCustomer } from "../features/customerSlice";
import { removeReservation } from "../features/reservationSlice";

interface ReservationCardTypes {
	name: String;
	index: number;
}

const ReservatinCard = ({ name, index }: ReservationCardTypes) => {
	const dispatch = useDispatch();
	const handleRemovePost = () => {
		dispatch(removeReservation(index));
		dispatch(
			addCustomer({
				id: uuid(),
				name: name as string,
				food: [],
			})
		);
	};

	return (
		<div
			className="reservation-card-container"
			onKeyDown={() => handleRemovePost()}
			role="button"
			tabIndex={0}
			onClick={() => {
				handleRemovePost();
			}}
		>
			{name}
		</div>
	);
};

export default ReservatinCard;
