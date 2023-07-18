import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import DeleteNote from '../notes/DeleteNote';

export default function EditNoteButton({
  initialValues = {},
  onSubmit,
  onClose,
  onDelete,
  noteId,
}) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [notes, setNotes] = useState(initialValues.notes || '');

  useEffect(() => {
    setTitle(initialValues.title || '');
    setNotes(initialValues.notes || '');
  }, [initialValues]);

  const handleButtonSubmit = () => {
    onSubmit({
      id: noteId,
      title: title,
      notes: notes,
    });
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Write note here..."
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button title="Save" onPress={handleButtonSubmit} />
        <DeleteNote noteId={noteId} handleNoteDeletion={onDelete} />
      </View>
    </View>
  );
}
