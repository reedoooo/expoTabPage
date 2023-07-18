import React, { useEffect, useState } from 'react';
import { Button, TextInput, Picker, View, Image } from 'react-native';
import Modal from 'react-native-modal';

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
      <View style={{ backgroundColor: 'white', padding: 22, borderRadius: 16 }}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Picker
          selectedValue={size}
          onValueChange={(itemValue, itemIndex) => setSize(itemValue)}
        >
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Large" value="large" />
        </Picker>
        <Picker
          selectedValue={color}
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
          placeholder="Link URL"
          value={linkUrl}
          onChangeText={setLinkUrl}
        />
        <TextInput
          placeholder="Image URL"
          value={imgUrl}
          onChangeText={setImgUrl}
        />
        <Image
          source={{ uri: imgUrl }}
          style={{ width: 150, height: 150 }}
          resizeMode="cover"
        />
        <Button title="Save Changes" onPress={handleFormSubmit} />
        <Button title="Delete" onPress={handleFormDelete} color="red" />
        <Button title="Cancel" onPress={onClose} color="gray" />
      </View>
    </Modal>
  );
}
