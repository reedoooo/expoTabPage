import React, { useEffect, useState } from 'react';
import { View, Button, Text, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';

function TcgPlayerContainer({ task }) {
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/token`,
        );
        setToken(response.data.access_token);
      } catch (error) {
        console.error('Error in token generation:', error);
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
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/catalog/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCategories(response.data.results);
    } catch (error) {
      console.error('Error in getting catalog categories:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'stretch', padding: 20 }}>
      <View>
        <Button title="Get Categories" onPress={getCategories} />
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
