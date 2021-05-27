import { useState } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";

type NewItemFormProps = {
	onAdd(text: string): void;
};

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
	const [text, setText] = useState("");
	const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") onAdd(text);
	};

	return (
		<NewItemFormContainer>
			<NewItemInput
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyPress={(e) => handleAddText(e)}
			/>
			<NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
		</NewItemFormContainer>
	);
};
