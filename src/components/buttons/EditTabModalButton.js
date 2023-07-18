import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Modal } from 'react-native-paper';

function EditTabModalButton({
  allTabs,
  selectedTab,
  onClose,
  tab,
  isOpen,
  onOpen,
}) {
  const buttonSize = useBreakpointValue({ base: '5em', md: 'sm' });

  const handleSubmit = async (updatedTab) => {
    const id = updatedTab.id;
    console.log(id);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/tab/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...updatedTab }),
        },
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
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View
    >
      <TouchableOpacity onPress={onOpen}>
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalHeader>Edit Tab</ModalHeader>
        <ModalContent>
          <EditTabFormsModal
            initialValues={tab}
            onSubmit={handleSubmit}
            onClose={onClose}
            onDelete={handleDelete}
            selectedTab={selectedTab}
            allTabs={allTabs}
          />
        </ModalContent>
      </Modal>
    </View>
  );
}

export default EditTabModalButton;
