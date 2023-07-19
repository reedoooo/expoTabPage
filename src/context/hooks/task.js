import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_SERVER}/api/mytodo`,
        );
        setTasks(data);
      } catch (error) {
        console.error('Fetch tasks error:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const { data: task } = await axios.post(
        `${REACT_APP_SERVER}/api/mytodo`,
        newTask,
        { headers: { 'Content-Type': 'application/json' } },
      );
      setTasks((prevTasks) => [...prevTasks, task]);
    } catch (error) {
      console.error('Add task error:', error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${REACT_APP_SERVER}/api/todo/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Delete task error:', error.message);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const taskToToggle = tasks.find((task) => task._id === id);
    if (taskToToggle) {
      const updatedTask = { ...taskToToggle, status: !taskToToggle.status };
      try {
        await axios.put(`${REACT_APP_SERVER}/api/todo/${id}`, {
          task: updatedTask,
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? updatedTask : task)),
        );
      } catch (error) {
        console.error('Toggle task completion error:', error.message);
      }
    }
  };

  return { tasks, addTask, deleteTask, toggleTaskCompletion };
};

export default useTasks;
