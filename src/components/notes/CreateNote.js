import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function CreateNote({
  note,
  setNote,
  setAllNotes,
  setEditing,
  handleSaveNote,
  newNote,
}) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setNotes(note.notes || '');
    } else {
      setTitle('');
      setNotes('');
    }
  }, [note]);

  const handleSave = async (e) => {
    try {
      const response = await fetch(
        `${REACT_APP_SERVER}/api/notes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, notes }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNote(null);
      setEditing(false);
      handleSaveNote(data);

      if (newNote) {
        setAllNotes((prevNotes) => [...prevNotes, data]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textarea}
        placeholder="Write note here..."
        multiline={true}
        value={notes}
        onChangeText={setNotes}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleSave}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  textarea: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 50,
  },
});

export default CreateNote;
