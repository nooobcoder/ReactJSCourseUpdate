import styles from "../../styles/UI/Card.module.css"
import React from 'react';

const Card = ({children}) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

export default Card;