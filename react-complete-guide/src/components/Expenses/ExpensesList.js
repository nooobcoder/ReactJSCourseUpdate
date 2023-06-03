import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const renderListItems = (expenses) => {
	if (expenses.length !== 0) {
    const elems = [];
		for (const { id, title, amount, date } of expenses) {
			elems.push(
				<ExpenseItem
					key={id}
					id={id}
					title={title}
					amount={amount}
					date={date}
				/>
			);
		}
		return elems;
	} else {
		return (
			<h2 className="expenses-list__fallback">
				No expenses found with this filter!
			</h2>
		);
	}
};

const ExpensesList = ({ expenses, selectedYear }) => {
	const filterExpensesByYear = (year) =>
		expenses.filter(
			(expense) => expense.date.getFullYear().toString() === year
		);

	return (
		<ul className="expenses-list">
			{renderListItems(filterExpensesByYear(selectedYear))}
		</ul>
	);
};

export default ExpensesList;
