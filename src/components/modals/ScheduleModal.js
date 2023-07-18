import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const ScheduleModal = ({ isOpen, onClose, onSubmit }) => {
  const initialRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, time, place } = event.target.elements;
    onSubmit({
      name: name.value,
      time: time.value,
      place: place.value,
    });
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>Add a new event</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input ref={initialRef} name="name" placeholder="Name" required />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Time</FormLabel>
            <Input name="time" placeholder="Time" required />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Place</FormLabel>
            <Input name="place" placeholder="Place" required />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleModal;
