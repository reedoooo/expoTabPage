import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function AddTabModalButton({ onOpen }) {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onOpen}
    >
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default AddTabModalButton;
