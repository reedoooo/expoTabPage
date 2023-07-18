import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import UpdateTask from './UpdateTask'; // Assuming you have this component in the same directory

function TaskAccordion({ onClose, onOpenModal, task, allTasks }) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <View style={styles.container}>
      <Button
        onPress={handleToggle}
        title={show ? `Hide ${task.name}` : `${task.name}`}
      />
      {show && (
        <View style={styles.box}>
          <Text style={styles.text}>Task: {task.name}</Text>
          <Text style={styles.text}>Created At: {task.createdAt}</Text>
          <Text style={styles.text}>Description: {task.description}</Text>
          <Text style={styles.text}>
            Status: {task.status ? 'completed' : 'incomplete'}
          </Text>
          <Button onPress={onOpenModal} title="Edit" />
          <UpdateTask
            id={task._id}
            task={task}
            allTasks={allTasks}
            onClose={onClose}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  box: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
  },
});

export default TaskAccordion;
