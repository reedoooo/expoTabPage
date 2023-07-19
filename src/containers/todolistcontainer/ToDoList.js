import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import { View, Text, FlatList, Modal, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import TaskAccordion from '../../components/todolist/RetrieveTask';
import UpdateTask from '../../components/todolist/UpdateTask';

// Stylesheet for the container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    padding: 20,
    borderRadius: 15, // Update to 15 for more rounded corners
    backgroundColor: '#f5f5f5', // Light gray background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: Platform.OS === 'android' ? 5 : 0, // add elevation for android only
  },
  modal: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  progress: {
    borderRadius: 15,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
});
// Constants
const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

// Main ToDoList function component
export default function ToDoList({ initialTask }) {
  // State hooks
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const [savedTasks, setSavedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  // useEffect hook to fetch task data
  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const response = await axios.get(`${REACT_APP_SERVER}/api/todo`);

        if (!Array.isArray(response.data)) {
          console.error('Error: response data is not an array');
          return;
        }

        // Process and map the received data
        const savedTasksData = response.data.reduce((tasks, taskData) => {
          if (Array.isArray(taskData.task)) {
            const newTasks = taskData.task.map((task) => ({
              name: task.name ?? 'No name provided',
              description: task.description ?? 'No description provided',
              status: task.status ?? false,
              dueDate: task.dueDate ?? 'No due date provided',
              id: taskData._id ?? `no-id-${Math.random()}`,
              statusText: task.status ? 'completed' : 'incomplete',
            }));
            return [...tasks, ...newTasks];
          }
          return tasks;
        }, []);

        const completed = savedTasksData.filter((task) => task.status);
        const incomplete = savedTasksData.filter((task) => !task.status);

        setSavedTasks(savedTasksData);
        setCompletedTasks(completed);
        setIncompleteTasks(incomplete);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodoLists();
  }, []);

  // Handler functions
  const handleOpenModal = (task) => setSelectedTask(task);
  const handleCloseModal = () => setSelectedTask(null);

  // Progress calculations
  const progress =
    savedTasks.length > 0
      ? (completedTasks.length / savedTasks.length) * 100
      : 0;

  // Render
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text>My To-Do List</Text>
          <Text>Progress</Text>
          <ProgressBar
            progress={progress / 100}
            width={200}
            color={'#3498db'}
            unfilledColor={'#eee'}
            borderWidth={0}
            borderRadius={15} // Add rounded corners to progress bar
            style={styles.progress} // Apply the style
          />
          <Text>{`${Math.round(progress)}%`}</Text>
        </View>
        <FlatList
          data={savedTasks.slice(0, 5)} // Limit tasks to the first 5
          renderItem={({ item }) => (
            <TaskAccordion
              task={item}
              allTasks={savedTasks}
              onClose={handleCloseModal}
              onOpenModal={() => handleOpenModal(item)}
              statusText={item.statusText}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        {selectedTask && (
          <Modal
            visible={!!selectedTask}
            onRequestClose={handleCloseModal}
            style={styles.modal}
          >
            <UpdateTask
              size="xs"
              task={selectedTask}
              onClose={handleCloseModal}
            />
          </Modal>
        )}
      </View>
    </>
  );
}
// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Dimensions, StyleSheet, Modal } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import TaskAccordion from '../../components/todolist/RetrieveTask.js';
// import UpdateTask from '../../components/todolist/UpdateTask.js';

// // Stylesheet for the container
// const styles = StyleSheet.create({
//   button: {
//     width: Dimensions.get('window').width / 2,
//     height: Dimensions.get('window').width / 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
// });

// function ToDoList({ handleButtonClick }) {
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);

//   const handleClick = () => {
//     handleButtonClick('ToDoList');
//     setIsVisible(true);
//   };

//   const closeModal = () => {
//     setIsVisible(false);
//   };

//   const handleOpenModal = (task) => {
// 		// handleButtonClick('ToDoList');
//     setSelectedTask(task);
//   };

//   const handleCloseModal = () => {
//     setSelectedTask(null);
//   };

//   return (
//     <View>
//       <TouchableOpacity style={styles.button} onPress={handleClick}>
//         <Icon name="format-list-bulleted" size={50} color="#000" />
//       </TouchableOpacity>

//       {isVisible && (
//         <Modal
//           visible={isVisible}
//           onRequestClose={closeModal}
//           animationType="slide"
//           transparent
//         >
//           <TaskAccordion
// 						selectedTask={selectedTask}
// 						task={selectedTask}
//             onOpenModal={handleOpenModal}
//             closeModal={closeModal}
//           />
//           {selectedTask && (
//             <UpdateTask
//               task={selectedTask}
//               onClose={handleCloseModal}
//             />
//           )}
//         </Modal>
//       )}
//     </View>
//   );
// }

// export default ToDoList;
