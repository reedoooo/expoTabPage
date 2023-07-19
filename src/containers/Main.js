import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import Home from '../pages/home/Home';
import SplashScreen from '../components/Splash/SplashScreen';

const Stack = createStackNavigator();

const Main = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Display SplashScreen for 3 seconds
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          children={(propsNav) => (
            <LinearGradient
              colors={['#808080', '#A9A9A9']} // gradient colors from dark grey to light grey
              style={{flex: 1}}
            >
              <Home
                {...propsNav}
                savedTabsData={props.savedTabsData}
                savedNotesData={props.savedNotesData}
              />
            </LinearGradient>
          )}
          options={{
            headerStyle: {
              backgroundColor: '#808080', // dark grey color
            },
            headerTintColor: '#fff', // white color
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: props => <LogoTitle {...props} />, // custom title component
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../../assets/icon.png')}
    />
  );
}

export default Main;
