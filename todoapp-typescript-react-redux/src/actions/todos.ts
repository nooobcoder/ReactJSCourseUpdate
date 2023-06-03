import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';

import { ActionTypes } from './types';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

const URL = `https://jsonplaceholder.typicode.com/todos`;

// Async action with thunk
const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const response: AxiosResponse<Array<Todo>> = await axios.get<Array<Todo>>(URL);

    dispatch<FetchTodosAction>({ type: ActionTypes.fetchTodos, payload: response.data });
  };
};

// Synchronous action without thunk
const deleteTodo = (id: number): DeleteTodoAction => ({ type: ActionTypes.deleteTodo, payload: id });

export { fetchTodos, deleteTodo };
