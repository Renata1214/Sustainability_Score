import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'lucide-react-native';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFullChat, setIsFullChat] = useState(false);

  const loraxResponses = [
    "Unless someone like you cares a whole awful lot, nothing is going to get better. It's not.",
    "I speak for the trees, for the trees have no tongues. And I'm asking you, sir, at the top of my lungs!",
    "Every small action counts! Plant a tree, reduce waste, and spread the word about environmental conservation!",
    "Remember, the environment is not just about trees - it's about maintaining balance in our ecosystem.",
    "Let's work together to make our world a greener, cleaner place for future generations!",
  ];

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessages = [
      ...messages,
      { id: messages.length + 1, text: message, isBot: false },
    ];

    setMessages(newMessages);
    setMessage('');

    if (!isFullChat) {
      setIsFullChat(true);
      setTimeout(() => {
        setMessages([
          ...newMessages,
          { 
            id: newMessages.length + 1, 
            text: "Hello! I am the Lorax, and I speak for the trees! How can I help you today?", 
            isBot: true 
          },
        ]);
      }, 500);
    } else {
      setTimeout(() => {
        const randomResponse = loraxResponses[Math.floor(Math.random() * loraxResponses.length)];
        setMessages([
          ...newMessages,
          { id: newMessages.length + 1, text: randomResponse, isBot: true },
        ]);
      }, 1000);
    }
  };

  if (!isFullChat) {
    return (
      <View style={styles.initialContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome to Eco Chat</Text>
            <Text style={styles.welcomeSubtitle}>Chat with the Lorax about environmental sustainability</Text>
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={[
                styles.initialInput,
                Platform.OS === 'web' && {
                  outline: 'none',
                }
              ]}
              value={message}
              onChangeText={setMessage}
              placeholder="Ask the Lorax anything about sustainability..."
              placeholderTextColor="#666"
              multiline
            />
            <Pressable 
              onPress={sendMessage}
              style={({ pressed }) => [
                styles.sendButton,
                pressed && styles.sendButtonPressed
              ]}>
              <Send size={24} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              { justifyContent: msg.isBot ? 'flex-start' : 'flex-end' },
            ]}>
            <View
              style={[
                styles.message,
                msg.isBot ? styles.botMessage : styles.userMessage,
              ]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            Platform.OS === 'web' && {
              outline: 'none',
            }
          ]}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
        />
        <Pressable 
          onPress={sendMessage}
          style={({ pressed }) => [
            styles.sendButton,
            pressed && styles.sendButtonPressed
          ]}>
          <Send size={24} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  initialContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 24,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  initialInput: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    padding: 15,
    paddingTop: 15,
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    maxHeight: 120,
    minHeight: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 15,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  message: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
  },
  botMessage: {
    backgroundColor: '#2a2a2a',
    borderBottomLeftRadius: 5,
  },
  userMessage: {
    backgroundColor: '#4ade80',
    borderBottomRightRadius: 5,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#2a2a2a',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    padding: 15,
    paddingTop: 15,
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    maxHeight: 120,
    minHeight: 50,
    maxWidth: 770,
  },
  sendButton: {
    backgroundColor: '#4ade80',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonPressed: {
    backgroundColor: '#3bba6a',
  },
});