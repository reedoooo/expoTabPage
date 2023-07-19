// AddTabModalButton
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const buttonStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: 'rgba(0,128,128,0.5)', // teal color with 50% transparency
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 5,
  borderWidth: 2, // width of the border
  borderColor: '#fff', // color of the border
};

function AddTabModalButton({ onOpen }) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onOpen}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default AddTabModalButton;
