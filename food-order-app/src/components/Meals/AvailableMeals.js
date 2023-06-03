// import { DUMMY_MEALS } from "./dummy_meals";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Meals/AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import Spinner from "../UI/Spinner";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [httpError, setHttpError] = useState(undefined);

	useEffect(() => {
		const fetchMeals = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get(
					`${process.env.REACT_APP_API_ENDPOINT}/meals.json`
				);
				const meals = [];
				for (const key in response.data) meals.push(response.data[key]);
				setMeals((prevState) => meals);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				setHttpError({ message: "Database fetch error." });
				console.clear();
				console.error("[ ERROR ]", "Database fetch error.");
			}
		};
		fetchMeals();
	}, []);

	// REACT_APP_API_ENDPOINT
	// const mealsList = DUMMY_MEALS.map(({ id, name, description, price }) => {

	const mealsList = meals.map(({ id, name, description, price }) => {
		return (
			<MealItem
				key={id}
				id={id}
				name={name}
				description={description}
				price={price}
			/>
		);
	});

	if (httpError) {
		return <p className={styles.MealsError}>{httpError.message}</p>;
	}

	return !isLoading ? (
		mealsList.length > 0 && (
			<section className={styles.meals}>
				<Card>{mealsList}</Card>
			</section>
		)
	) : (
		<Spinner />
	);
};

export default AvailableMeals;
