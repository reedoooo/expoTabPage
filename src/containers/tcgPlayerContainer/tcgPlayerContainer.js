import React, { useEffect, useState } from 'react';
import { View, Button, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function TcgPlayerContainer({ task }) {
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${REACT_APP_SERVER}/api/token`,
        );
        setToken(response.data.access_token);
      } catch (error) {
        console.error('Error in token generation:', error);
      } finally {
        setLoading(false);
      }
    };

    getToken();
  }, []);

  const getCategories = async () => {
    if (!token) {
      console.error('Token is not yet generated');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${REACT_APP_SERVER}/api/catalog/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCategories(response.data.results);
    } catch (error) {
      console.error('Error in getting catalog categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'stretch', padding: 20 }}>
      <View>
        <Button title="Get Categories" onPress={getCategories} disabled={!token} />
        {categories && (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.categoryId.toString()}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default TcgPlayerContainer;
