import { FC } from "react";
import { Column } from "./Column";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./store/AppStateContext";

import { AppContainer } from "./styles";
import { addList } from "./store/actions";

export const App: FC = ({ children }) => {
	const { lists, dispatch } = useAppState();
	return (
		<AppContainer>
			{lists.map((list) => (
				<Column text={list.text} key={list.id} id={list.id} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another list"
				onAdd={(text) => dispatch(addList(text))}
				dark
			/>
		</AppContainer>
	);
};
