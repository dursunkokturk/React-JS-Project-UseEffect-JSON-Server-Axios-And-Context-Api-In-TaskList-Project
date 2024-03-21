import { useState } from 'react';
import TaskCreate from './TaskCreate';
import { useContext } from 'react';
import TasksContext from '../context/task';

function TaskShow({ task }) {
  const { deleteTaskById, editTaskById } = useContext(TasksContext);
  const [showEdit, setShowEdit] = useState(false);
  const handleDeleteClick = () => {
    // onDelete(task.id);
    deleteTaskById(task.id);
  };
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };
  const handleSubmit = (id, updatedTitle, updatedTaskDescription) => {
    setShowEdit(false);
    // onUpdate(id, updatedTitle, updatedTaskDesc);

    editTaskById(id, updatedTitle, updatedTaskDescription);
  };

  // console.log(task);
  return (
    <div className="task-show">
      {showEdit ? (
        <TaskCreate task={task} taskformUpdate={true} onUpdate={handleSubmit} />
      ) : (
        <div>
          <h3 className="task-title">Your Task</h3>
          <p>{task.title}</p>
          <h3 className="task-title">To Do</h3>
          <p>{task.taskDescription}</p>
          <div>
            <button className="task-delete" onClick={handleDeleteClick}>
              Delete
            </button>
            <button className="task-edit" onClick={handleEditClick}>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskShow;