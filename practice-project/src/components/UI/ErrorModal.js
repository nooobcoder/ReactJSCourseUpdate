import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";

import styles from "./ErrorModal.module.css";

const Backdrop = ({clearError}) => {
  return <div className={styles.backdrop} onClick={clearError}/>
}

const ModalOverlay = ({title, message, clearError}) => {
  return <Card className={styles.modal}>
    <header className={styles.header}>
      <h2>{title}</h2>
    </header>
    <div className={styles.content}>
      <p>{message}</p>
    </div>
    <footer className={styles.actions}>
      <Button onClick={clearError}>Dismiss</Button>
    </footer>
  </Card>
}

const ErrorModal = ({title, message, clearError}) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop clearError={clearError}/>, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay title={title} message={message}
                                           clearError={clearError}/>, document.getElementById('overlay-root'))}
    </Fragment>
  );
};

export default ErrorModal;
