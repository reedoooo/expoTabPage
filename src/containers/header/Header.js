// Header component
import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import AddTabModalButton from '../../components/buttons/AddTabModalButton';
import OpenSettingsButton from '../../components/buttons/OpenSettingsButton';
import ResetButton from '../../components/buttons/ResetButton';
import CameraModalButton from '../../components/camera/CameraModalButton';

function Header({ addTabModalDisclosure, settingsModalDisclosure, handleReset, cameraModalDisclosure }) {
  return (
    <View style={styles.container}>
      <OpenSettingsButton onOpen={settingsModalDisclosure.onOpen} style={styles.button} />
      <AddTabModalButton onOpen={addTabModalDisclosure.onOpen} style={styles.button} />
      <ResetButton handleReset={handleReset} style={styles.button} />
      <CameraModalButton onOpen={cameraModalDisclosure.onOpen} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 100 : 80, // height increased
    paddingTop: Platform.OS === 'ios' ? 30 : 10, // paddingTop increased for better centering
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 0,
    padding: 20,
    backgroundColor: '#1c1c1e',
    borderBottomWidth: 1,
    borderBottomColor: '#4a4a4a',
  },
  button: {
    marginHorizontal: 10,
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f00', // use any color you want
  },
  resetIcon: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default Header;
