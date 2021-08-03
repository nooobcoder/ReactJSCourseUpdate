import { Action, ActionTypes, Todo } from '../actions';

const todosReducer = (state: Todo[] = [], { type, payload }: Action) => {
  switch (type) {
    case ActionTypes.fetchTodos:
      return payload;
    case ActionTypes.deleteTodo:
      return state.filter((todo: Todo) => todo.id !== payload);
    default:
      return state;
  }
};

export { todosReducer };
