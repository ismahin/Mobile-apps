import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';

const ChatbotScreen = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.129:8000/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setAnswer('No answer available.');
      }
    } catch (error) {
      console.error(error);
      setAnswer('Error processing the question.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ask Your Agriculture Questions</Text>

      <TextInput
        style={styles.input}
        placeholder="Type your question here"
        value={question}
        onChangeText={setQuestion}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        answer && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>Answer: {answer}</Text>
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  answerContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    width: '100%',
  },
  answerText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ChatbotScreen;
