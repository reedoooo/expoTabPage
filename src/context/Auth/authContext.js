import React, { useEffect, useCallback } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = React.createContext();
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

export default function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({ capabilities: [] });
  const [error, setError] = React.useState(null);
  const [token, setToken] = React.useState(undefined);

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    // when setting the cookie:
    console.log('Setting userCookie...');
    cookie.save('userCookie', user);
    console.log('userCookie set to: ', cookie.load('userCookie'));
    setIsLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error || null);
  };

  const validateToken = useCallback(async (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true, token, validUser);

      const options = {
        method: 'GET',
        url: `${REACT_APP_SERVER}/api/users/profile`,
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios(options);
      console.log('Validate token response: ', response.data);
      if (response.status === 200) {
        setUser((prevUser) => ({ ...prevUser, ...response.data }));
      }
    } catch (e) {
      console.error('Token validation error: ', e);
      setLoginState(false, null, {}, e);
    }
  }, []);

  const can = (capability) =>
    user?.login_data?.role_data?.capabilities?.includes(capability);

  const login = async (username, password) => {
    // Create a login_data object to send to server
    const login_data = { username, password };

    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/signin`,
        login_data,
      );
      console.log('Login response: ', response.data);
      validateToken(response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Login error: ', error);
      setLoginState(false, null, {}, error);
    }
  };

  const signup = async (username, password, basic_info, role_data) => {
    const data = {
      login_data: {
        username,
        password,
        role_data, // Add this default value or pass role_data when calling this function
      },
      basic_info,
    };

    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/users/signup`,
        data,
      );
      console.log('Signup response: ', response.data);
      validateToken(response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Signup error: ', error);
      setLoginState(false, null, {}, error);
    }
  };

  const logout = () => {
    cookie.remove('auth');
    setLoginState(false, null, {});
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const tokenCheck = qs.get('token') || cookieToken || null;
    validateToken(tokenCheck);
  }, [validateToken]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, can, login, logout, signup, user, error, token }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
