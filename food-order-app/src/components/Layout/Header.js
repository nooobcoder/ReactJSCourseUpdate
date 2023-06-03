import styles from "../../styles/Layout/Header.module.css";
import mealsImage from "../../assets/meals.jpg";

import React, { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onShowCart }) => {
	return (
		<Fragment>
			<header className={styles.header}>
				<h1>Yummy Meals!</h1>
				<HeaderCartButton onClick={onShowCart} />
			</header>
			<div className={styles["main-image"]}>
				<img src={mealsImage} alt={"A table full of delicious food."} />
			</div>
		</Fragment>
	);
};

export default Header;
