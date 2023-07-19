import React, { useState } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function NotesContainerButton({ handleButtonClick }) {
	const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    handleButtonClick('NotesContainer');
		setIsVisible(false);

  };

  return (
    isVisible && (
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Icon name="note" size={50} color="#000" />
      </TouchableOpacity>
    )
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  button: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default NotesContainerButton;
