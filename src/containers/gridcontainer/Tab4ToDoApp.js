import React, { useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import AddTaskFormsModal from '../../components/modals/AddTaskFormsModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Tab4ToDoApp({ allTabs }) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const handleUpperButtonClick = (event) => {
    setIsOpen(true);
  };

  return (
    <View style={styles.gridItem}>
      <TouchableWithoutFeedback onPress={handleUpperButtonClick}>
        <ImageBackground
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3235/3235042.png',
          }}
          style={styles.backgroundImage}
          imageStyle={styles.image}
          resizeMode="cover"
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>{'todo app'}</Text>
          </View>
          <Button
            icon={() => (
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color={theme.colors.primary}
              />
            )}
            mode="contained"
            onPress={handleUpperButtonClick}
            style={[
              styles.editButton,
              {
                position: 'relative',
                top: 10,
                right: 40,
                width: 30,
                height: 30,
              },
            ]} // Updated styles

            // style={[styles.editButton, { position: 'absolute', bottom: 10, left: 10, width: 30, height: 30 }]} // Updated styles
          />

          <AddTaskFormsModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            link={allTabs}
            // style={[styles.editButton, { position: 'relative', top: 10, right: 40, width: 30, height: 30 }]} // Updated styles
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    borderRadius: 10,
  },
  title: {
    color: '#000', // Changed from 'white' to '#000' for black text
    fontSize: 12, // Reduced from '16' to '12'
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  editButton: {
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Tab4ToDoApp;
