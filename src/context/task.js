import { createContext } from 'react';
import { useState } from 'react';
import Axios from 'axios';

const TasksContext = createContext();

function Provider({ children }) {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title, taskDescription) => {
    debugger;
    const response = await Axios.post('http://localhost:3004/tasks', {
      title,
      taskDescription,
    });
    console.log(response);
    const createdTasks = [
      ...tasks, 
      response.data
    ];
    setTasks(createdTasks);
  };
  const fetchTasks = async () => {
    const response = await Axios.get('http://localhost:3004/tasks');
    debugger;
    setTasks(response.data);
  };
  const deleteTaskById = async (id) => {
    await Axios.delete(`http://localhost:3004/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  };
  const editTaskById = async (id, updatedTitle, updatedTaskDescription) => {
    await Axios.put(`http://localhost:3004/tasks/${id}`, {
      title: updatedTitle,
      taskDescription: updatedTaskDescription,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDescription: updatedTaskDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const sharedValuesAndMethods = {
    tasks,
    createTask,
    fetchTasks,
    editTaskById,
    deleteTaskById,
  };
  return (
    <TasksContext.Provider value={sharedValuesAndMethods}>
      {children}
    </TasksContext.Provider>
  );
}

export { Provider };
export default TasksContext;