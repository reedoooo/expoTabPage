import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import EditTabModalButton from '../buttons/EditTabModalButton'; // Assuming you have this component in the same directory

function Tab({ allTabs, tab, onOpenModal, onClose }) {
  const { width } = Dimensions.get('window');
  const aspectRatio = width / width; // Modify as per your needs
  
  return (
    <View style={[styles.gridItem, { width, height: width / aspectRatio }]}>
      <ImageBackground
        source={{ uri: tab.imgUrl }}
        style={styles.button}
      >
        <EditTabModalButton
          allTabs={allTabs}
          onOpen={onOpenModal}
          onClose={onClose}
          tab={tab}
        />
        <View style={styles.titleSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{tab.name}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flexGrow: 1,
    flexShrink: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  titleSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleContainer: {
    marginBottom: '10%',
    marginTop: '1%',
    zIndex: 5,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Tab;
