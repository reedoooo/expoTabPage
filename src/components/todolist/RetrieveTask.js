import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Modal } from 'react-native';
import UpdateTask from './UpdateTask';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5, // Less padding on the sides
  },
  box: {
    backgroundColor: '#f0f0f0',
    padding: 5, // Reduced padding
    marginBottom: 10, // Reduced margin
    maxWidth: '90%', // Added max width to take up more room
    alignSelf: 'center', // Center the box
    borderRadius: 10, // Rounded corners for aesthetic purposes
  },
  text: {
    fontSize: 14, // Smaller font size
    marginBottom: 10, // Spacing between text elements
  },
});

function TaskAccordion({ onClose, onOpenModal, task, allTasks }) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <View style={styles.container}>
      <Button
        onPress={handleToggle}
        title={show ? `Hide ${task.name}` : `${task.name}`}
      />
      <Modal
        visible={show}
        onRequestClose={() => setShow(false)}
        animationType="slide"
        transparent
      >
        <View style={styles.box}>
          <Text style={styles.text}>Task: {task.name}</Text>
          <Text style={styles.text}>Description: {task.description}</Text>
          <Text style={styles.text}>
            Status: {task.status ? 'completed' : 'incomplete'}
          </Text>
          <Button onPress={onOpenModal} title="Edit" />
          <Button onPress={() => setShow(false)} title="Close" />
          <UpdateTask
            id={task._id}
            task={task}
            allTasks={allTasks}
            onClose={onClose}
          />
        </View>
      </Modal>
    </View>
  );
}

export default TaskAccordion;
