import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = ({ selected, onChangeFilter }) => {
	const years = [2019, 2020, 2021, 2022];
	return (
		<div className="expenses-filter">
			<div className="expenses-filter__control">
				<label>Filter by year</label>
				<select
					value={selected}
					onChange={(event) => onChangeFilter(event.target.value)}
				>
					{years.map((year) => (
						<option value={year.toString()} key={year}>
							{year}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default ExpensesFilter;
