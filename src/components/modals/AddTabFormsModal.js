import React from 'react';
import { View, Text, TextInput, Picker, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; // For the icons

function EditModal({ isOpen, onClose, onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal isVisible={isOpen}>
      <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add a Tab</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Close</Text>
        </TouchableOpacity>
        <form onSubmit={handleFormSubmit}>
          <View style={{ marginVertical: 10 }}>
            <Text>Name</Text>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Size</Text>
            <Picker selectedValue="small">
              <Picker.Item label="Small" value="small" />
              <Picker.Item label="Large" value="large" />
            </Picker>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Color</Text>
            <Picker selectedValue="red">
              <Picker.Item label="Red" value="red" />
              <Picker.Item label="Blue" value="blue" />
              <Picker.Item label="Green" value="green" />
              <Picker.Item label="Yellow" value="yellow" />
              <Picker.Item label="Purple" value="purple" />
              <Picker.Item label="White" value="white" />
            </Picker>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Link URL</Text>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Image URL</Text>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <Button
              icon={
                <Ionicons
                  name="checkmark"
                  size={15}
                  color="white"
                />
              }
              title="Add Link"
              onPress={onSubmit}
            />
            <Button
              icon={
                <Ionicons
                  name="close"
                  size={15}
                  color="white"
                />
              }
              title="Cancel"
              onPress={onClose}
            />
          </View>
        </form>
      </View>
    </Modal>
  );
}

export default EditModal;
