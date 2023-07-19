import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
            <Home
              {...propsNav}
              savedTabsData={props.savedTabsData}
              savedNotesData={props.savedNotesData}
            />
          )}
          options={{
            headerStyle: {
              backgroundColor: '#00008b', // deep blue color
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
