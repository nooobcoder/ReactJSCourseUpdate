import { useDrag } from "react-dnd";
import { useAppState } from "../store/AppStateContext";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../store/actions";

export const useItemDrag = (item: DragItem) => {
	const { dispatch } = useAppState();
	const [, drag] = useDrag({
		type: item.type,
		item: () => {
			dispatch(setDraggedItem(item));
			return item;
		},
		end: () => dispatch(setDraggedItem(null)),
	});
	return { drag };
};
