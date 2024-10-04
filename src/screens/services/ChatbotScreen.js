import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';

const ChatbotScreen = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const dummyReplies = [
    "I'm here to help with agriculture-related questions!",
    "You can ask me about crop diseases, soil management, and more.",
    "That sounds interesting! Let me assist you.",
    "Please tell me more about your question.",
    "I'm sorry, I don't have enough information to answer that.",
    "Let's explore this together.",
  ];

  const handleSend = () => {
    if (!question.trim()) return;

    // Add user's question to chat history
    setChatHistory([...chatHistory, { type: 'user', text: question }]);

    // Simulate a bot response with a dummy reply
    const botReply = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];

    setTimeout(() => {
      setChatHistory([...chatHistory, { type: 'user', text: question }, { type: 'bot', text: botReply }]);
      setQuestion(''); // Clear input after sending
    }, 1000); // Simulate delay for bot response
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Chatbot Dhrubo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatHistory.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.type === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question here"
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add space for notification bar on Android
  },
  header: {
    backgroundColor: '#388E3C',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20, // Increase padding for Android devices
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  chatContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#388E3C',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#333333',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#388E3C',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatbotScreen;
