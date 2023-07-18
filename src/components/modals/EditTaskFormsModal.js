import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';

const EditTaskFormsModal = ({ initialValues, onSubmit, onClose, onDelete }) => {
  const { colors } = useTheme();
  const [name, setName] = useState(initialValues.name || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [status, setStatus] = useState(initialValues.status || '');
  const [dueDate, setDueDate] = useState('');

  let id = initialValues.id;
  let deleteId = initialValues.id;

  useEffect(() => {
    const date = new Date(initialValues.dueDate);
    const formattedDueDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setDueDate(formattedDueDate);
  }, [initialValues.dueDate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, name, status, description, dueDate });
  };

  const handleFormDelete = (e) => {
    e.preventDefault();
    let id = deleteId;
    onDelete({ id, name, status, description, dueDate });
  };

  return (
    <View>
      <View>
        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
      </View>

      <View>
        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
        />
      </View>

      <View>
        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          onChangeText={setDueDate}
          value={dueDate}
          placeholder="Due Date"
        />
      </View>

      <View>
        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          onChangeText={setStatus}
          value={status}
          placeholder="Status"
        />
      </View>

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
  );
};

export default EditTaskFormsModal;
