import { useState } from "react";

import "./NewExpense.css";

import ExpenseForm from "./ExpenseForm";

const NewExpense = ({ onSaveExpenseData }) => {
	const [isEditing, updateIsEditing] = useState(false);

	const saveExpenseDataHandler = (enteredExpenseData) => {
		const expenseData = {
			...enteredExpenseData,
			id: Math.random().toString(),
		};

		onSaveExpenseData(expenseData);
	};

	const startEditingHandler = () => updateIsEditing(true);
	const stopEditingHandler = () => updateIsEditing(false);

	return (
		<div className="new-expense">
			{!isEditing && (
				<button onClick={(event) => startEditingHandler()}>
					Add New Expense
				</button>
			)}
			{isEditing && (
				<ExpenseForm
					onSaveExpenseData={(data) => saveExpenseDataHandler(data)}
					onCancel={stopEditingHandler}
				/>
			)}
		</div>
	);
};

export default NewExpense;
