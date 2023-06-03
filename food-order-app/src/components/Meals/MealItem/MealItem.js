import styles from "../../../styles/Meals/MealItem/MealItem.module.css";

import {useContext} from 'react';
import MealItemForm from "./MealItemForm";
import {CartContext} from "../../../store/CartContext";

const MealItem = ({id, name, description, price}) => {
  const cartContextData = useContext(CartContext)
  const formattedPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartContextData.addItem({id, name, amount, price})
  }

  return (
    <li className={styles.meal}>
      <div><h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;