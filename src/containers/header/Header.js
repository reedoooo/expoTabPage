// Header component
import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import AddTabModalButton from '../../components/buttons/AddTabModalButton';
import OpenSettingsButton from '../../components/buttons/OpenSettingsButton';
import ResetButton from '../../components/buttons/ResetButton';

function Header({ addTabModalDisclosure, settingsModalDisclosure, handleReset }) {
  return (
    <View style={styles.container}>
      <OpenSettingsButton onOpen={settingsModalDisclosure.onOpen} style={styles.button} />
      <AddTabModalButton onOpen={addTabModalDisclosure.onOpen} style={styles.button} />
      <ResetButton handleReset={handleReset} style={styles.button} />
      {/* <TouchableOpacity style={styles.resetButton} onPress={() => handleReset(null)}>
        <Text style={styles.resetIcon}>X</Text> 
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 70 : 50,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
