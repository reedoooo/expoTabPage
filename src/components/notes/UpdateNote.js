import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import EditNoteButton from '../modals/EditNoteButton';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function UpdateNote({
  onClose = () => {}, // Provide a default empty function if onClose is not passed
  isOpen,
  note,
  selectedNote = {},
  id,
  allNotes,
  setNote,
  handleUpdateNote,
  handleDeleteNote,
  setEditing,
}) {
  const handleSubmit = async (note) => {
    if (!note.id) {
      console.log('Note or id is undefined');
      return;
    }

    const updatedData = {
      id: note.id,
      title: note.title,
      notes: note.notes,
    };
    console.log('updatedData', updatedData);
    try {
      const response = await fetch(
        `${REACT_APP_SERVER}/api/notes/${updatedData.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await response.json();

      handleUpdateNote(data); // Update the note in your application state
      setEditing(false);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (name, value) => {
    if (!note) return;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    if (!selectedNote.id) {
      console.log('selectedNote or id is undefined');
      return;
    }

    try {
      const response = await fetch(
        `${REACT_APP_SERVER}/api/notes/${selectedNote.id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data = await response.json();
      handleDeleteNote(selectedNote.id);
      setEditing(false);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <EditNoteButton
        onClose={onClose}
        onDelete={handleDelete}
        initialValues={{ title: note.title, notes: note.notes, id: note.id }}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        note={note}
        noteId={id}
        allNotes={allNotes}
        setNote={setNote}
        handleUpdateNote={handleUpdateNote}
        setEditing={setEditing}
      />
    </View>
  );
}

export default UpdateNote;
