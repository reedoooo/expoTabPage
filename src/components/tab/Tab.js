import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import EditTabModalButton from '../buttons/EditTabModalButton';

function Tab({ allTabs, tab, onOpenModal, onClose }) {
  return (
    <View style={styles.gridItem}>
      <ImageBackground
        source={{ uri: tab.imgUrl }}
        style={styles.backgroundImage}
        imageStyle={styles.image}
        resizeMode="cover" // or 'contain'
      >
        <Text style={styles.title}>{tab.name}</Text>
        <EditTabModalButton
          allTabs={allTabs}
          onOpen={onOpenModal}
          onClose={onClose}
          tab={tab}
          style={[styles.editButton, { position: 'relative', top: 10, right: 30, width: 30, height: 30 }]} // Updated styles
        />
      </ImageBackground>
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
    color: '#000',  // Changed from '#fff' to '#000' for black text
    fontSize: 12,   // Reduced from '16' to '12'
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  title: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  editButton: {
    alignSelf: 'flex-end',
  },
});

export default Tab;
