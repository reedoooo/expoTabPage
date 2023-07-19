import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Button
} from 'react-native';
import CreateNote from './CreateNote';
import UpdateNote from './UpdateNote';

function NotesAccordion({
  note,
  setNote,
  editing,
  allNotes,
  setAllNotes,
  setEditing,
  handleSaveNote,
  handleUpdateNote,
  isOpen,
  onClose,
  handleResetActiveComponent
}) {
  const handleNewNote = () => {
    setNote({ title: '', notes: '' });
    setEditing(false);
  };

  const handleExistingNote = (noteItem) => {
    setNote(noteItem);
    setEditing(true);
  };

  const handleDeleteNote = (id) => {
    setAllNotes(allNotes.filter((noteItem) => noteItem.id !== id));
  };

  return (
    <Modal visible={isOpen} onRequestClose={onClose} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>My Notes</Text>
          <Button title="Close" onPress={handleResetActiveComponent} backgroundColor="white" color="black" />
        </View>
        <View style={styles.content}>
          <ScrollView style={styles.notesList}>
            <TouchableOpacity style={styles.button} onPress={handleNewNote}>
              <Text style={styles.buttonText}>Add Note</Text>
            </TouchableOpacity>
            {allNotes.map((noteItem) => (
              <TouchableOpacity
                key={noteItem.id || noteItem._id}
                style={styles.button}
                onPress={() => handleExistingNote(noteItem)}
              >
                <Text style={styles.buttonText}>{noteItem.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.noteContent}>
            {editing ? (
              <UpdateNote
                setEditing={setEditing}
                id={note?.id}
                isOpen={!!note}
                note={note}
                allNotes={allNotes}
                selectedNote={note}
                setNote={setNote}
                handleDeleteNote={handleDeleteNote}
                handleUpdateNote={handleUpdateNote}
              />
            ) : (
              <CreateNote
                setEditing={setEditing}
                allNotes={allNotes}
                note={note}
                setNote={setNote}
                handleSaveNote={handleSaveNote}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  header: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: 'white',
  },
  content: {
    flexDirection: 'row',
    marginTop: 10,
  },
  notesList: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'blue',
  },
  noteContent: {
    flex: 2,
    marginLeft: 10,
  },
});

export default NotesAccordion;
