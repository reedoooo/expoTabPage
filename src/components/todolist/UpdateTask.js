import React, { useState } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

function UpdateTask({ id, task, onClose, isOpen, selectedTask, allTasks }) {
  const modalBgColor = useColorModeValue('white', 'gray.700');
  const headerColor = useColorModeValue('gray.700', 'gray.50');

  const handleSubmit = async (updatedTask) => {
    const id = updatedTask.id;
    const task = updatedTask.task;
    const completed = updatedTask.status;
    console.log(task);
    console.log(completed);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/todo/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...updatedTask }),
        }
      );
      window.location.reload();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (deletedTask) => {
    const id = deletedTask.id;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/todo/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
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
          />{' '}
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
