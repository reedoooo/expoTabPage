import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

function CreateTask() {
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/todo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          dueDate,
          status,
          difficulty,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
      />
      <Text style={styles.label}>Due Date</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDueDate}
        value={dueDate}
        placeholder="Due Date (YYYY-MM-DD)"
      />
      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        onChangeText={setStatus}
        value={status}
        placeholder="Status"
      />
      <Text style={styles.label}>Difficulty</Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={difficulty}
        onValueChange={setDifficulty}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create Todo Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});

export default CreateTask;
