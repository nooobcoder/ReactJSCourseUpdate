import styles from "../../styles/Layout/HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import React, {useContext} from 'react';
import {CartContext} from "../../store/CartContext";


const HeaderCartButton = ({onClick}) => {
  const cartContextData = useContext(CartContext);
  const numberOfCartItems = cartContextData.items.reduce((index, item) => index + item.amount, 0);

  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;