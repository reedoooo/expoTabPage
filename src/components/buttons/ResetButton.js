// ResetButton
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const buttonStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: 'rgba(255,99,71,0.5)', // Different color to differentiate
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

function ResetButton({ onPress }) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Ionicons name="refresh-circle" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default ResetButton;
