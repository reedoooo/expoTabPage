// CameraModalButton component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function CameraModalButton({ onOpen }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onOpen}>
      <Text style={styles.text}>Open Camera</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
  },
});

export default CameraModalButton;
