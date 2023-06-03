import {useState, Fragment, useRef} from "react";

import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = ({addUser}) => {
  const [error, setError] = useState(null);

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const inputUsername = nameInputRef?.current?.value;
    const inputAge = ageInputRef?.current?.value;

    if (
      inputUsername.trim().length === 0 ||
      inputAge.trim().length === 0
    ) {
      setError({
        title: "Invalid Input!",
        message: "Please enter a valid name and age.",
      });
      return;
    }
    if (+inputAge < 1) {
      setError({
        title: "Invalid Age!",
        message: "Age must be greater than 0",
      });
      return;
    }
    addUser(inputUsername, inputAge);
    nameInputRef.current.value = ''
    ageInputRef.current.value = ''
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          clearError={() => setError(undefined)}
        />
      )}

      <Card className={styles.input}>
        <form onSubmit={(event) => addUserHandler(event)}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            step="1"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
