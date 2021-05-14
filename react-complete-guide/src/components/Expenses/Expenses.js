import { useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import ExpensesList from "./ExpensesList";

import "./Expenses.css";

const Expenses = ({ expenses }) => {
	const [filteredYear, setFilteredYear] = useState(
		new Date().getFullYear().toString()
	);

	const filterChangeHandler = (selectedYear) => setFilteredYear(selectedYear);

	return (
		<div>
			<Card className="expenses">
				<ExpensesFilter
					selected={filteredYear}
					onChangeFilter={filterChangeHandler}
				/>
				<ExpensesChart expenses={expenses} />
				<ExpensesList expenses={expenses} selectedYear={filteredYear} />
			</Card>
		</div>
	);
};

export default Expenses;
