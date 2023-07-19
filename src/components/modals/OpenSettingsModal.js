import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Add a semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20, // Increase padding for better structure
    marginHorizontal: 10, // Add some horizontal margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Platform.OS === 'android' ? 5 : 0,
  },
  input: {
    borderBottomWidth: 1, // Add a bottom border
    marginBottom: 15, // Add some bottom margin to separate the elements
  },
  picker: {
    marginBottom: 15, // Add some bottom margin to separate the elements
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function OpenSettingsModal({ visible, onClose, onSubmit }) {
  const { colors } = useTheme();
  const [color, setColor] = useState('black.500');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContent}>
          <View style={styles.modalView}>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]} // Apply the style
              placeholder="Name"
            />
            <Picker
              style={styles.picker} // Apply the style
              selectedValue={color}
              onValueChange={(itemValue) => setColor(itemValue)}
            >
              <Picker.Item label="Black" value="black.500" />
              <Picker.Item label="White" value="white.500" />
            </Picker>
            <View style={styles.buttons}> // Apply the style
              <Button
                title="Add Link"
                color={colors.primary} // Use the primary color from the theme
                onPress={handleFormSubmit}
              />
              <Button
                title="Cancel"
                color={colors.border} // Use the border color from the theme
                onPress={onClose}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default OpenSettingsModal;
