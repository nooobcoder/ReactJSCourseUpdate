import styles from "../../styles/Cart/Cart.module.css";
import Modal from "../UI/Modal"

import React, {useContext} from 'react';
import {CartContext} from "../../store/CartContext";
import CartItem from "./CartItem";


const Cart = ({onClose}) => {
  const cartContextData = useContext(CartContext);

  const totalAmount = `$${cartContextData.totalAmount.toFixed(2)}`;
  const hasItems = cartContextData.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContextData.removeItem(id);
  }
  const cartItemAddHandler = (item) => {
    cartContextData.addItem(item);
  };


  const cartItems = <ul className={styles['cart-items']}>
    {cartContextData.items.map((item) => (
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />
    ))}
  </ul>

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onClose}>CLOSE</button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;