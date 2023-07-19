import React, { useState } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ToDoListButton({ handleButtonClick }) {
	const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
        if (typeof handleButtonClick === "function") {
            handleButtonClick('ToDoList');
            setIsVisible(false);
        } else {
            console.error('handleButtonClick is not a function');
        }
    };

    return (
        isVisible && (
            <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Icon name="format-list-bulleted" size={50} color="#000" />
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

export default ToDoListButton;
