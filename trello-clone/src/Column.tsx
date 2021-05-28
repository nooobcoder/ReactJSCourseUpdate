import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { useRef } from "react";
import { useAppState } from "./store/AppStateContext";
import { addTask } from "./store/actions";
import { useItemDrag } from "./utils/useItemDrag";

type ColumnProps = {
	text: string;
	id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
	const { draggedItem, getTasksByListId, dispatch } = useAppState();
	const tasks = getTasksByListId(id);
	const ref = useRef<HTMLDivElement>(null);

	const { drag } = useItemDrag({ type: "COLUMN", id, text });
	drag(ref);

	return (
		<ColumnContainer ref={ref}>
			<ColumnTitle>{text}</ColumnTitle>
			{tasks.map((task) => (
				<Card text={task.text} key={task.id} id={task.id} />
			))}
			<AddNewItem
				onAdd={(text) => dispatch(addTask(text, id))}
				toggleButtonText={"+ Add another task"}
				dark
			/>
		</ColumnContainer>
	);
};
