import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const CustomButton = ({ onPress, color, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, { backgroundColor: color }]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function EditTabFormsModal({
  isOpen,
  onClose,
  onSubmit,
  formValues,
  setFormValues,
}) {
  const [name, setName] = useState(selectedTab.name);
  const [size, setSize] = useState(selectedTab.size);
  const [color, setColor] = useState(selectedTab.color);
  const [linkUrl, setLinkUrl] = useState(selectedTab.linkUrl);
  const [imgUrl, setImgUrl] = useState(selectedTab.imgUrl);

  useEffect(() => {
    setName(selectedTab.name);
    setSize(selectedTab.size);
    setColor(selectedTab.color);
    setLinkUrl(selectedTab.linkUrl);
    setImgUrl(selectedTab.imgUrl);
  }, [selectedTab]);

  // const handleFormSubmit = () => {
  //   onSubmit({ id: selectedTab.id, name, size, color, linkUrl, imgUrl });
  // };
  const handleFormSubmit = () => {
    onSubmit(formValues);
  };
  // function to handle changes in the form fields
  const handleInputChange = (name, value) => {
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };
  // const handleFormDelete = () => {
  //   onDelete({ id: selectedTab.id, name, size, color, linkUrl, imgUrl });
  // };

  return (
    <Modal isVisible={isOpen} animationType="slide" style={styles.modalContent}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalView}>
          {/* Other elements here... */}
          <View style={{ marginVertical: 10 }}>
            <Text>Name</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              value={formValues.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Size</Text>
            <Picker
              selectedValue={formValues.size}
              onValueChange={(value) => handleInputChange('size', value)}
            >
              <Picker.Item label="Small" value="small" />
              <Picker.Item label="Large" value="large" />
            </Picker>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Color</Text>
            <Picker
              selectedValue={formValues.color}
              onValueChange={(value) => handleInputChange('color', value)}
            >
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
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              value={formValues.linkUrl}
              onChangeText={(value) => handleInputChange('linkUrl', value)}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Image URL</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              value={formValues.imgUrl}
              onChangeText={(value) => handleInputChange('imgUrl', value)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}
          >
            <Button
              icon={<Ionicons name="checkmark" size={15} color="white" />}
              title="Add Link"
              onPress={handleFormSubmit}
            />
            <Button
              icon={<Ionicons name="close" size={15} color="white" />}
              title="Cancel"
              onPress={onClose}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 16,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  picker: {
    width: '100%',
    marginTop: 10,
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
