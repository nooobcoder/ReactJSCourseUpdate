import axios from "axios"

const todosApi = axios.create({
  baseURL: "http://localhost:3500",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

const getTodos = async () => {
  const response = await todosApi.get(`/todos`);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data;
}

const addTodo = async (todo) => await todosApi.post(`/todos`, todo);

const updateTodo = async (todo) => await todosApi.patch(`/todos/${todo.id}`, todo)

const deleteTodo = async ({ id }) => await todosApi.delete(`/todos/${id}`, id)

export { getTodos, addTodo, updateTodo, deleteTodo }
