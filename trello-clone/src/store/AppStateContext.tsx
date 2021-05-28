import { createContext, useContext, FC, Dispatch } from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";

const appData: AppState = {
	lists: [
		{
			id: "0",
			text: "To Do",
			tasks: [{ id: "c0", text: "Generate app scaffold" }],
		},
		{
			id: "1",
			text: "In Progress",
			tasks: [{ id: "c2", text: "Learn Typescript" }],
		},
		{
			id: "2",
			text: "Done",
			tasks: [{ id: "c3", text: "Begin to use static typing" }],
		},
	],
	draggedItem: null,
};

type AppStateContextProps = {
	draggedItem: DragItem | null;
	lists: List[];
	getTasksByListId(id: string): Task[];
	dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
	{} as AppStateContextProps
);

export const AppStateProvider: FC = ({ children }) => {
	const [state, dispatch] = useImmerReducer(appStateReducer, appData);
	const { draggedItem, lists } = state;

	const getTasksByListId = (id: string) => {
		return lists.find((list) => list.id === id)?.tasks || [];
	};

	return (
		<AppStateContext.Provider
			value={{ lists, getTasksByListId, dispatch, draggedItem }}
		>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppState = () => useContext(AppStateContext);
