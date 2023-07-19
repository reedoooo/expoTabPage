import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import CreateTask from '../todolist/CreateTask';

export default function ToDoListModal({ isOpen, onClose }) {
  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View style={{ backgroundColor: 'white', padding: 22, borderRadius: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Todo List</Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <CreateTask />
        </View>
      </View>
    </Modal>
  );
}
