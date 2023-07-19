import React, { useEffect, useState } from 'react';
import { 
  View, TextInput, TouchableOpacity, ActivityIndicator, Text, 
  SafeAreaView, Button, ToastAndroid, StyleSheet, KeyboardAvoidingView 
} from 'react-native';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import Constants from 'expo-constants';

const { REACT_APP_SERVER, REACT_APP_OPENAI_KEY } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function ChatGPT() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [savedResponses, setSavedResponses] = useState([]);

  const handleSearch = async () => {
    if (!debouncedQuery) {
      ToastAndroid.show('Please enter a query.', ToastAndroid.SHORT);
      return;
    }

    setIsLoading(true);

    try {
      const requestBody = {
        model: 'text-davinci-002',
        messages: [
          { role: 'system', content: 'System message content' },
          { role: 'user', content: debouncedQuery },
        ],
        temperature: 0.7,
      };

      const response = await axios.post(
        `${REACT_APP_SERVER}/api/chat/completions`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${REACT_APP_OPENAI_KEY}`,
          },
        },
      );

      if(response.status === 200) {
        setResponse(response.data.choices[0].text);
        setQuery('');  // Clear the query input after a successful search
      }
    } catch (error) {
      console.log(error); // Log the error for debugging
      ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.SHORT);
    }

    setIsLoading(false);
  };

  const handleSaveToResponses = async () => {
    try {
      await axios.post(`${REACT_APP_SERVER}/api/chat`, {
        savedResponses: response,
      });

      ToastAndroid.show('Response saved to responses.', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error); // Log the error for debugging
      ToastAndroid.show('An error occurred. Could not save the responses.', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`${REACT_APP_SERVER}/api/chat`);
        if (res.status === 200) {
          // Validate the data format before setting it
          if (Array.isArray(res.data)) {
            setSavedResponses(res.data);
          } else {
            console.log('Invalid data format received');
          }
        }
      } catch (error) {
        console.log(error); // Log the error for debugging
        if (error.response) {
          ToastAndroid.show('An error occurred. Could not fetch responses.', ToastAndroid.SHORT);
        }
      }
    };

    fetchResponses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
        <Text style={styles.title}>ChatGPT</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your query"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.responseBox}>
            <Text>{response}</Text>
          </View>
        )}
        {!isLoading && response && (
          <Button title="Save to Notes" onPress={handleSaveToResponses} />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  keyboard: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
  },
  responseBox: {
    backgroundColor: '#fff',
    padding: 10,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default ChatGPT;
