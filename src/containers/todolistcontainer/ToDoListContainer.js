import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ProgressBarAndroid, Button, Modal } from 'react-native';
import axios from 'axios';
import TaskAccordion from '../../components/todolist/RetrieveTask';
import UpdateTask from '../../components/todolist/UpdateTask';

function ToDoList({ task }) {
  const [selectedTask, setSelectedTask] = useState(task);
  const [savedTasks, setSavedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/todo`,
        );
        let savedTasksData = [];
        response.data.forEach((taskData) => {
          if (Array.isArray(taskData.task)) {
            const tasks = taskData.task.map((task) => {
              return {
                name: task.name,
                description: task.description,
                status: task.status,
                dueDate: task.dueDate,
                id: taskData._id,
                statusText: task.status ? 'completed' : 'incomplete',
              };
            });
            savedTasksData = [...savedTasksData, ...tasks];
          }
        });
        setSavedTasks(savedTasksData);

        const completed = savedTasksData.filter((task) => task.status === true);
        const incomplete = savedTasksData.filter(
          (task) => task.status !== true,
        );

        setCompletedTasks(completed);
        setIncompleteTasks(incomplete);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodoLists();
    setSelectedTask(task);
  }, [task]);

  const handleOpenModal = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const progress =
    savedTasks.length > 0
      ? (completedTasks.length / savedTasks.length) * 100
      : 0;

  return (
    <>
      <View>
        <Text>My To-Do List</Text>
        <Text>Progress</Text>
        <ProgressBarAndroid styleAttr="Horizontal" progress={progress / 100} indeterminate={false} />
        <Text>{`${Math.round(progress)}%`}</Text>
      </View>
      
      <FlatList
        data={savedTasks}
        renderItem={({ item }) => (
          <TaskAccordion
            task={item}
            allTasks={savedTasks}
            onClose={handleCloseModal}
            onOpenModal={() => handleOpenModal(item)}
            statusText={item.statusText}
          />
        )}
        keyExtractor={item => item.id}
      />

      {selectedTask && (
        <Modal
          visible={!!selectedTask}
          onRequestClose={handleCloseModal}
        >
          <UpdateTask
            size="xs"
            task={selectedTask}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
}

export default ToDoList;
