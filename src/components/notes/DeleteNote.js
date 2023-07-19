import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function DeleteNote({ noteId, handleNoteDeletion }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_SERVER}/api/notes/${noteId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the note is successfully deleted from the server, trigger the handleNoteDeletion callback
      handleNoteDeletion(noteId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={handleDelete}
    >
      <MaterialIcons name="delete" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
  },
});

export default DeleteNote;
