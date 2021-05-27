import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { FC } from "react";

type ColumnProps = {
	text: String;
};

export const Column: FC<ColumnProps> = ({ text, children }) => (
	<ColumnContainer>
		<ColumnTitle>{text}</ColumnTitle>
		{children}
		<AddNewItem
			onAdd={console.log}
			toggleButtonText={"+ Add another task"}
			dark
		/>
	</ColumnContainer>
);
