import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onSaveExpenseData, onCancel }) => {
	const [enteredTitle, updateEnteredTitle] = useState("");
	const [enteredAmount, updateEnteredAmount] = useState("");
	const [enteredDate, updateEnteredDate] = useState("");

	/* const [userInput, setUserInput] = useState({
		enteredTitle: "",
		enteredAmount: "",
		enteredDate: "",
	}); */

	const titleChangedHandler = (event) => {
		// setUserInput({ ...userInput, enteredTitle: event.target.value }); // Not instantaneous state update
		/* setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
		}); */
		updateEnteredTitle(event.target.value);
	};
	const amountChangedHandler = (event) => {
		// setUserInput({ ...userInput, enteredAmount: event.target.value });
		/* setUserInput((prevState) => {
      return { ...prevState, enteredAmount: event.target.value };
		}); */
		updateEnteredAmount(event.target.value);
	};
	const dateChangedHandler = (event) => {
		// setUserInput({ ...userInput, enteredDate: event.target.value });
		/* setUserInput((prevState) => {
      return { ...prevState, enteredDate: event.target.value };
		}); */
		updateEnteredDate(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const expenseData = {
			title: enteredTitle,
			amount: +enteredAmount,
			date: new Date(enteredDate),
		};
		updateEnteredTitle("");
		updateEnteredAmount("");
		updateEnteredDate("");
		onSaveExpenseData(expenseData);
	};

	return (
		<form
			onSubmit={(event) => {
				onSubmitHandler(event);
			}}
		>
			<div className="new-expense__controls">
				<div className="new-expense__control">
					<label>Title</label>
					<input
						type="text"
						onChange={(event) => titleChangedHandler(event)}
						value={enteredTitle}
					/>
				</div>
				<div className="new-expense__control">
					<label>Amount</label>
					<input
						type="number"
						min="0.01"
						step="0.01"
						onChange={(event) => amountChangedHandler(event)}
						value={enteredAmount}
					/>
				</div>
				<div className="new-expense__control">
					<label>Date</label>
					<input
						type="date"
						min="2019-01-01"
						max="2022-12-31"
						onChange={(event) => dateChangedHandler(event)}
						value={enteredDate}
					/>
				</div>
			</div>
			<div className="new-expense__actions">
				<button type="button" onClick={onCancel}>
					Cancel
				</button>
				<button type="submit">Add Expense</button>
			</div>
		</form>
	);
};

export default ExpenseForm;
