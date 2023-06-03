import styles from "../../../styles/Meals/MealItem/MealItemForm.module.css"
import {useRef, useState} from 'react';
import Input from "../../UI/Input";

const MealItemForm = ({onAddToCart}) => {
  const [amountIsValid, setAmountValidity] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const inputAmount = amountInputRef?.current?.value;
    const inputAmountNumber = +inputAmount;

    if (inputAmount.trim().length === 0 || inputAmountNumber < 1 || inputAmountNumber > 5) {
      setAmountValidity(false);
      return;
    }

    onAddToCart(inputAmountNumber);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input label={'Amount'} ref={amountInputRef}
             input={{id: 'amount', type: 'number', min: '1', max: '5', step: '1', defaultValue: '1'}}/>
      <button>➕ ADD</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;