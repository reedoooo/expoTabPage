import React from 'react';
import { View, TextInput, Button, Picker } from 'react-native';
import { useTheme } from '@react-navigation/native';

function OpenSettingsModal({ isOpen, onClose, onSubmit }) {
  const { colors } = useTheme();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <View>
      <View>
        <TextInput
          style={{ color: colors.text, borderColor: colors.border }}
          placeholder="Name"
        />
      </View>
      <View>
        <Picker selectedValue={null} onValueChange={(itemValue) => setColor(itemValue)}>
          <Picker.Item label="Black" value="black.500" />
          <Picker.Item label="White" value="white.500" />
        </Picker>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Add Link"
          color="blue"
          onPress={handleFormSubmit}
        />
        <Button
          title="Cancel"
          onPress={onClose}
        />
      </View>
    </View>
  );
}

export default OpenSettingsModal;
