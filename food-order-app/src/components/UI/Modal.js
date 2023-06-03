import styles from "../../styles/UI/Modal.module.css";

import React, {Fragment} from 'react';
import {createPortal} from "react-dom";


const BackDrop = ({onClose}) => {
  return (<div className={styles.backdrop} onClick={onClose}>

  </div>)
}

const ModalOverlay = ({children}) => {
  return (<div className={styles.modal}>
    <div>{children}</div>
  </div>)
}

const portalElement = document.getElementById('overlays');

const Modal = ({children, onClose}) => {
  return (
    <Fragment>
      {createPortal(<BackDrop onClose={onClose}/>, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;