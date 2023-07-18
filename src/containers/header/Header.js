import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import AddTabModalButton from '../../components/buttons/AddTabModalButton';
import OpenSettingsButton from '../../components/buttons/OpenSettingsButton';

// Update the prop names here
function Header({ addTabModalDisclosure, settingsModalDisclosure }) {
  return (
    <View style={styles.container}>
      {/* Use the onOpen function from addTabModalDisclosure */}
      <AddTabModalButton onOpen={addTabModalDisclosure.onOpen} style={styles.button} />
      {/* Use the onOpen function from settingsModalDisclosure */}
      <OpenSettingsButton onOpen={settingsModalDisclosure.onOpen} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  button: {
    marginRight: 10,
  },
});

export default Header;
