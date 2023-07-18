import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Main from './src/containers/Main';

function App() {
  const [savedTabsData, setSavedTabsData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  // useEffect hook to load tab data when the component mounts
  useEffect(() => {
    const loadTabData = async () => {
      try {
        // Define request options for fetch call
        const requestOptions = {
          method: 'GET',
        };

        // Make a fetch call to get tab data from the server
        const serverResponse = await fetch(
          `${process.env.REACT_APP_SERVER}/api/tab`,
          requestOptions,
        );
        // Parse server response to json
        const serverData = await serverResponse.json();

        // Update state with the fetched data
        setSavedTabsData(serverData);
      } catch (error) {
        // If an error occurs, log it
        console.error('Error fetching tab data:', error);
      }
    };

    // Call the function to load the tab data
    loadTabData();
  }, []); // Empty array means this effect runs once on component mount and not on subsequent re-renders

  // useEffect hook to check if both data are loaded
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
