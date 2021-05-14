import {DUMMY_MEALS} from "./dummy_meals";
import styles from "../../styles/Meals/AvailableMeals.module.css"
import React from 'react';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map(({id, name, description, price}) => {
    return (<MealItem key={id} id={id} name={name} description={description} price={price}/>)
  })

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;