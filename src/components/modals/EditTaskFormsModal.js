import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

const EditTaskFormsModal = ({ initialValues, onSubmit, onClose, onDelete }) => {
  const { colors } = useTheme();
  const [name, setName] = useState(initialValues.name || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [status, setStatus] = useState(initialValues.status || '');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const date = new Date(initialValues.dueDate);
    const formattedDueDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setDueDate(formattedDueDate);
  }, [initialValues.dueDate]);

  const handleFormSubmit = () => {
    Keyboard.dismiss();
    onSubmit({ id: initialValues.id, name, status, description, dueDate });
  };

  const handleFormDelete = () => {
    Keyboard.dismiss();
    onDelete({ id: initialValues.id, name, status, description, dueDate });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <View>
        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />

        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
        />

        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          onChangeText={setDueDate}
          value={dueDate}
          placeholder="Due Date"
        />

        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          onChangeText={setStatus}
          value={status}
          placeholder="Status"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title="Save"
            color="green"
            onPress={handleFormSubmit}
          />
          <Button
            title="Delete"
            color="red"
            onPress={handleFormDelete}
          />
          <Button
            title="Cancel"
            color="gray"
            onPress={onClose}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditTaskFormsModal;
