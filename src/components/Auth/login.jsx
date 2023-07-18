import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth/authContext.js';

function Login() {
  let authContext = useContext(AuthContext);
  let navigation = useNavigation();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signupMode, setSignupMode] = React.useState(false);
  const [age, setAge] = useState('');
  const [roleData, setRoleData] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupMode) {
      await authContext.signup(
        username,
        password,
        {
          name,
          age,
        },
        {
          name: roleData, // assuming roleData is a string representing role name
        },
      );
    } else {
      try {
        await authContext.login(username, password);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigation.navigate('Profile');
    }
  }, [authContext.isLoggedIn, navigation]);

  return (
    <View>
      {!authContext.isLoggedIn && (
        <View>
          <TextInput placeholder="Username" onChangeText={setUsername} />
          <TextInput
            secureTextEntry
            placeholder="Password"
            onChangeText={setPassword}
          />
          {signupMode && (
            <>
              <TextInput placeholder="Full Name" onChangeText={setName} />
              <TextInput placeholder="Role Data" onChangeText={setRoleData} />
              <TextInput
                keyboardType="numeric"
                placeholder="Age"
                onChangeText={setAge}
              />
            </>
          )}
          <Button title={signupMode ? 'Sign Up' : 'Login'} onPress={handleSubmit} />
          <Switch value={signupMode} onValueChange={setSignupMode} />
        </View>
      )}
      {authContext.isLoggedIn && (
        <Button title="Log Out" onPress={authContext.logout} />
      )}
    </View>
  );
}

export default Login;
