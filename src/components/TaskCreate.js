import { useState } from 'react';
import { useContext } from 'react';
import TasksContext from '../context/task';

function TaskCreate({ task, taskformUpdate, onUpdate }) {
  const { editTaskById, createTask } = useContext(TasksContext);
  const [title, setTitle] = useState(task ? task.title : '');
  const [taskDescription, setTaskDescription] = useState(task ? task.taskDescription : '');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleTaskChange = (event) => {
    setTaskDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskformUpdate) {
      editTaskById(task.id, title, taskDescription);
    } else {
      createTask(title, taskDescription);
    }
    setTitle('');
    setTaskDescription('');
  };

  return (
    <div>
      {' '}
      {taskformUpdate ? (
        <div className="task-update">
          <h3>Please Task Edit!</h3>
          <form className="task-form">
            <label className="task-label">Title Edit</label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="task-input"
            />
            <label className="task-label">Task Edit!</label>
            <textarea
              value={taskDescription}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />
            <button
              className="task-button update-button"
              onClick={handleSubmit}
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <div className="task-create">
          <h3>Please Task Add!</h3>
          <form className="task-form">
            <label className="task-label">Title</label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="task-input"
            />
            <label className="task-label">Task Enter!</label>
            <textarea
              value={taskDescription}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />
            <button className="task-button" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskCreate;