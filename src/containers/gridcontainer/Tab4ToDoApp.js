import React from 'react';
import { View, TouchableWithoutFeedback, ImageBackground, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import AddTaskFormsModal from '../../components/modals/AddTaskFormsModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Tab4ToDoApp({ allTabs }) {
  const theme = useTheme();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpperButtonClick = (event) => {
    onOpen();
  };

  return (
    <TouchableWithoutFeedback onPress={handleUpperButtonClick}>
      <ImageBackground 
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/3235/3235042.png'}}
        style={styles.container}
      >
        <Button 
          icon={() => <MaterialCommunityIcons name="pencil-outline" size={24} color={theme.colors.primary} />}
          mode="contained" 
          onPress={onOpen} 
          style={styles.editButton}
        />
        <AddTaskFormsModal isOpen={isOpen} onClose={onClose} link={allTabs} />

        <View style={styles.titleSection}>
          <Text style={styles.title}>{'todo app'}</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    borderRadius: 15,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  titleSection: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Tab4ToDoApp;
