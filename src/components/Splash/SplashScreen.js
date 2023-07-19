import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>TabPro</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4287f5',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
