import React, { useState } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import EditTaskFormsModal from '../modals/EditTaskFormsModal';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function UpdateTask({ id, task, onClose, selectedTask, allTasks }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (updatedTask) => {
    const id = updatedTask.id;
    const task = updatedTask.task;
    const completed = updatedTask.status;
    console.log(task);
    console.log(completed);
    try {
      const response = await fetch(
        `${REACT_APP_SERVER}/api/todo/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...updatedTask }),
        }
      );
      const data = await response.json();
      console.log(data);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (deletedTask) => {
    const id = deletedTask.id;
    try {
      const response = await fetch(
        `${REACT_APP_SERVER}/api/todo/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      console.log(data);
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalOpen}
        onRequestClose={onClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Edit Task</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <EditTaskFormsModal
            initialValues={task}
            onSubmit={handleSubmit}
            onClose={onClose}
            onDelete={handleDelete}
            selectedTask={selectedTask}
            allTasks={allTasks}
          />
          <TextInput style={styles.input} placeholder="Update Task" />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  modalContent: {
    marginTop: 50,
    padding: 20,
  },
  modalHeader: {
    fontSize: 24,
    marginBottom: 15,
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#1a1a1a',
  },
});

export default UpdateTask;
// UpdateTask.js
// import React from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   box: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     marginBottom: 15,
//   },
//   text: {
//     fontSize: 16,
//   },
// });

// function UpdateTask({ task, onClose }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.box}>
//         <Text style={styles.text}>Update Task: {task.name}</Text>
//         <Text style={styles.text}>Description: {task.description}</Text>
//         <Text style={styles.text}>
//           Status: {task.status ? 'completed' : 'incomplete'}
//         </Text>
//         <Button onPress={onClose} title="Close" />
//       </View>
//     </View>
//   );
// }

// export default UpdateTask;
