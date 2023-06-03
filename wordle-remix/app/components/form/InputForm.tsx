import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";

import type { Dispatch, SetStateAction } from "react";

interface InputFormProps {
	input: string;
	setInput: Dispatch<SetStateAction<string>>;
	disabled?: boolean;
}

const styles = {
	formStyle: `h-0 overflow-hidden`,
};

const InputForm = ({ input, setInput, disabled = false }: InputFormProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	/* 
		Keeping the focus
			The form is hidden and we need to make sure that it's always focused so that we're able to input the word at any time. For that, we will handle two cases:

			when a user tries to move the focus from the input to another element, we want to keep the focus on the input
			when the component is re-rendered, we want to focus the input
			Disclaimer: this might not be the best from the accessibility perspective, so you might think of handling user interaction through keypress events rather than a hidden input.
	*/
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	return (
		<Form
			method="post"
			autoComplete="off"
			className="h-0 overflow-hidden"
			onSubmit={(e) => {
				if (input.length === 0) {
					e.preventDefault();
				}
			}}
		>
			<fieldset disabled={disabled}>
				<label>
					Guess:
					<input
						ref={inputRef}
						type="text"
						name="word"
						value={input}
						maxLength={5}
						onBlur={() => {
							if (inputRef.current) {
								inputRef.current.focus();
							}
						}}
						onChange={(e) => setInput(e.target.value.toLowerCase())}
					/>
				</label>
			</fieldset>
		</Form>
	);
};

export { InputForm };
