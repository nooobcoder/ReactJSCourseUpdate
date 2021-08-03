import { FetchTodosAction, DeleteTodoAction } from './todos';

enum ActionTypes {
  fetchTodos = 'FETCH_TODOS',
  deleteTodo = 'DELETE_TODO',
}

export type Action = FetchTodosAction | DeleteTodoAction;
export { ActionTypes };
