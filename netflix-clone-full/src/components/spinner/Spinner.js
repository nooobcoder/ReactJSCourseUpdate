import React from "react";
import styles from "./index.module.css";

const Spinner = () => {
  return <div id={styles.loader} className={styles.nfLoader}></div>;
};

export default Spinner;
