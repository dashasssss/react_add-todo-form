import { FormEvent, useState } from 'react';

import users from '../../api/users';
import { Todo } from '../../domain/Todo';

type AddTodoFormProps = {
  onSubmit: (todo: Todo) => void;
  todos: Todo[];
};
export const AddTodoForm = ({ onSubmit, todos }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);

  const [ownerId, setOwnerId] = useState<number>(0);
  const [ownerIdError, setOwnerIdError] = useState<string | null>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(null);
    setTitle(event.target.value.trimStart());
  };

  const handUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOwnerIdError(null);
    setOwnerId(+event.target.value);
  };

  const handleResetForm = () => {
    setTitle('');
    setTitleError(null);
    setOwnerId(0);
    setOwnerIdError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(null);
    setOwnerIdError(null);
    let hasError = false;

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (ownerId === 0) {
      setOwnerIdError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      title: normalizedTitle,
      completed: false,
      userId: ownerId,
    };

    onSubmit(newTodo);
    handleResetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter todo title"
          value={title}
          onChange={handleTitleChange}
        />

        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select data-cy="userSelect" value={ownerId} onChange={handUserChange}>
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {ownerIdError && <span className="error">{ownerIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
