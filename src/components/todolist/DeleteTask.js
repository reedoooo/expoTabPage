import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function DeleteTask({ itemId }) {
  const handleDelete = async () => {
    const response = await fetch(`/api/todo/${itemId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
      <Text style={styles.buttonText}>Delete Todo Item</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#ff0000',
    padding: 10,
    marginTop: 20,
  },
});

export default DeleteTask;
