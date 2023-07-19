import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, View, Image, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

const CustomButton = ({ onPress, color, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, { backgroundColor: color }]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function EditTabFormsModal({
  selectedTab,
  onSubmit,
  onClose,
  onDelete,
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

  const handleFormSubmit = () => {
    onSubmit({ id: selectedTab.id, name, size, color, linkUrl, imgUrl });
  };

  const handleFormDelete = () => {
    onDelete({ id: selectedTab.id, name, size, color, linkUrl, imgUrl });
  };

  return (
    <Modal isVisible={true} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Picker
          selectedValue={size}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSize(itemValue)}
        >
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Large" value="large" />
        </Picker>
        <Picker
          selectedValue={color}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
        >
          <Picker.Item label="Red" value="red" />
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Green" value="green" />
          <Picker.Item label="Yellow" value="yellow" />
          <Picker.Item label="Purple" value="purple" />
          <Picker.Item label="White" value="white" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Link URL"
          value={linkUrl}
          onChangeText={setLinkUrl}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={imgUrl}
          onChangeText={setImgUrl}
        />
        <Image
          source={{ uri: imgUrl }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
        <CustomButton color="#fca311" title="Save Changes" onPress={handleFormSubmit} />
        <CustomButton color="#d90429" title="Delete" onPress={handleFormDelete} />
        <CustomButton color="#14213d" title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white', 
    padding: 22, 
    borderRadius: 16, 
    alignItems: 'center'
  },
  input: {
    width: '100%', 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginTop: 10, 
    borderRadius: 5, 
    paddingLeft: 10
  },
  picker: {
    width: '100%', 
    marginTop: 10
  },
  imagePreview: {
    width: 150, 
    height: 150, 
    marginTop: 20
  },
  button: {
    width: '100%', 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold'
  }
});
