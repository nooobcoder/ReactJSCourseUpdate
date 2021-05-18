import { useState, useRef } from "react";

const SimpleInput = () => {
	const nameInputRef = useRef();
	const [enteredName, setEnteredName] = useState("");
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	const nameInputChangedHandler = (event) => {
		setEnteredName(event.target.value);

		if (enteredName.trim() !== "") {
			setEnteredNameIsValid(false);
			return;
		}
	};

	const nameInputBlurHandler = () => {
		setEnteredNameTouched(true);

		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
			return;
		}
	}

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		const input = nameInputRef.current.value;
		setEnteredNameTouched(true);

		if (enteredName.trim() === "") {
			setEnteredNameIsValid(false);
			return;
		} else {
			setEnteredName(input);
			setEnteredNameIsValid(true);
			console.log(`SUBMITTED`, enteredName);
		}
	};

	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	return (
		<form onSubmit={(event) => formSubmissionHandler(event)}>
			<div
				className={
					nameInputIsInvalid ? "form-control invalid" : "form-control"
				}
			>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					ref={nameInputRef}
					onChange={nameInputChangedHandler}
					onBlur={nameInputBlurHandler}
				/>
				{nameInputIsInvalid && (
					<p className={"error-text"}>Name must not be empty</p>
				)}
			</div>
			<div className="form-actions">
				<button>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
