import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTodos, deleteTodo, Todo } from '../actions';
import { StoreState } from '../reducers';

const App: React.FC<any> = (): JSX.Element => {
  const todosSelector = useSelector((state: StoreState) => state.todos);
  const actionDispatcher = useDispatch();

  todosSelector.length > 0 && console.log(todosSelector);

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    actionDispatcher(fetchTodos());
  };

  const onTodoClick = (id: number): void => {
    actionDispatcher(deleteTodo(id));
  };

  const renderList = (): Array<JSX.Element> =>
    todosSelector.map((todo: Todo) => (
      <div key={todo.id} onClick={(e) => onTodoClick(todo.id)}>
        {todo.title}
      </div>
    ));

  return (
    <div>
      <button onClick={(e) => onButtonClick(e)}>Fetch</button>
      {renderList()}
    </div>
  );
};

// const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => ({ todos });

export { App };
// export const App=connect(mapStateToProps,{fetchTodos})(_App)
