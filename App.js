import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native'; // Import Alert for error message pop-up
import { StatusBar } from 'expo-status-bar';
import Main from './src/containers/Main';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function App() {
  const [savedTabsData, setSavedTabsData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadTabData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
        };
        const serverResponse = await fetch(
          `${REACT_APP_SERVER}/api/tab`,
          requestOptions
        );
        console.log('serverResponse', serverResponse);
        if (!serverResponse.ok) {
          const errorMessage = `HTTP error! status: ${serverResponse.status}`;
          console.error(errorMessage);
          Alert.alert("Error", errorMessage);
          return;
        }
        const serverData = await serverResponse.json();
        console.log('serverData', serverData);
        setSavedTabsData(serverData);
      } catch (error) {
        console.error('Error fetching tab data:', error);
        Alert.alert("Error", error.message);
      }
    };
    console.log('savedTabsData', savedTabsData)

    loadTabData();
  }, []);

  useEffect(() => {
    if (savedTabsData) {
      setDataLoaded(true);
    }
  }, [savedTabsData]);

  return (
    <View style={styles.container}>
      <Main savedTabsData={savedTabsData} dataLoaded={dataLoaded} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

export default App;
