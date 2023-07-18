import React, { useEffect, useState } from 'react';
import { 
  View, TextInput, TouchableOpacity, ActivityIndicator, Text, 
  SafeAreaView, Button, ToastAndroid, StyleSheet, KeyboardAvoidingView 
} from 'react-native';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

function ChatGPT() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [savedResponses, setSavedResponses] = useState([]);
  const OPENAI_KEY = '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';

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
        `${process.env.REACT_APP_SERVER}/api/chat/completions`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
        },
      );
      setResponse(response.data.choices[0].text);
    } catch (error) {
      ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.SHORT);
    }

    setIsLoading(false);
  };

  const handleSaveToResponses = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/api/chat`, {
        savedResponses: response,
      });

      ToastAndroid.show('Response saved to responses.', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('An error occurred. Could not save the responses.', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/chat`);
        setSavedResponses(res.data || []); // If response is null, it will default to an empty array
      } catch (error) {
        // Only console error and show a toast if it's an actual error
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
