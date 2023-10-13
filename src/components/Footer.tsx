import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../stores/TodosContext';
import { FilterParams } from '../types/FilterParams';

type Props = {
  filterBy: FilterParams;
  setFilterBy: (v: FilterParams) => void;
};

export const Footer: React.FC<Props> = ({ filterBy, setFilterBy }) => {
  const {
    deleteTodo,
    todos,
    unCompletedTodos,
    completedTodos,
  } = useContext(TodosContext);

  const todosCounter = unCompletedTodos.length;

  const handleAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setFilterBy(FilterParams.All);
  };

  const handleActiveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setFilterBy(FilterParams.Active);
  };

  const handleCompletedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setFilterBy(FilterParams.Completed);
  };

  function handleDeleteCompleted() {
    todos
      .filter(({ completed }) => completed)
      .forEach(({ id }) => deleteTodo(id));
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosCounter} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={
            classNames('filter__link', {
              selected: filterBy === FilterParams.All,
            })
          }
          data-cy="FilterLinkAll"
          onClick={handleAllClick}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            classNames('filter__link', {
              selected: filterBy === FilterParams.Active,
            })
          }
          data-cy="FilterLinkActive"
          onClick={handleActiveClick}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            classNames('filter__link', {
              selected: filterBy === FilterParams.Completed,
            })
          }
          data-cy="FilterLinkCompleted"
          onClick={handleCompletedClick}
        >
          Completed
        </a>
      </nav>

      <button
        disabled={completedTodos.length === 0}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
