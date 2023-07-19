import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Platform.OS === 'android' ? 5 : 0,
  },
  formControl: {
    width: '100%',
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15, // Add rounded corners
    paddingLeft: 10, // Padding for the text
  },
  picker: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15, // Add rounded corners
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonStyle: {
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'teal',
    borderRadius: 30,
    padding: 10,
  },
});

function EditModal({ isOpen, onClose, onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal isVisible={isOpen} animationType="slide" style={styles.modalContent}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add a Tab</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
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
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default EditModal;
