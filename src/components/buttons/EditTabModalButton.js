import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Modal, Button, Surface } from 'react-native-paper';
import EditTabFormsModal from '../modals/EditTabFormsModal';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,128,128,0.5)', // teal color with 50% transparency
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 100,
    borderWidth: 2, // width of the border
    borderColor: '#fff', // color of the border
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});


function EditTabModalButton({
  allTabs,
  selectedTab,
  onClose,
  tab,
  isOpen,
  onOpen,
  style, // New prop
}) {
  // const windowWidth = Dimensions.get('window').width;
  // const buttonSize = windowWidth > 768 ? 'sm' : '5em';

  const handleSubmit = async (updatedTab) => {
    const id = updatedTab.id;
    console.log(id);
    try {
      const response = await fetch(
        `${REACT_APP_SERVER}/api/tab/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...updatedTab }),
        }
      );
      window.location.reload();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (deletedTab) => {
    const id = deletedTab.id;
    console.log(id);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/tab/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onOpen} style={[styles.button, style]}>
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={isOpen} onDismiss={onClose}>
        <Surface style={styles.modalContent}>
          <Text style={styles.text}>Edit Tab</Text>
          <EditTabFormsModal
            initialValues={tab}
            onSubmit={handleSubmit}
            onClose={onClose}
            onDelete={handleDelete}
            selectedTab={selectedTab}
            allTabs={allTabs}
          />
          <Button onPress={onClose} style={{marginTop: 10}}>Close</Button>
        </Surface>
      </Modal>
    </View>
  );
}

export default EditTabModalButton;
