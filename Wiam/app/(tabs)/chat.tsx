import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Send } from 'lucide-react-native';
import { getGeminiResponse } from '@/lib/gemini';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (message.trim() === '' || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    if (!hasStartedChat) setHasStartedChat(true);

    try {
      const response = await getGeminiResponse(userMessage.text);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isBot: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEditing = (e: any) => {
    // Prevent default behavior on web
    if (Platform.OS === 'web') {
      e.preventDefault();
    }
    sendMessage();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {!hasStartedChat ? (
        <View style={styles.centeredContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>AI Sustainability Assistant</Text>
            <Text style={styles.welcomeText}>
              Ask me anything about your shopping history, your environmental print, or for sustainable and healthy alternatives.
            </Text>
          </View>
          <View style={styles.centeredInputContainer}>
            <TextInput
              style={[
                styles.centeredInput,
                Platform.OS === 'web' && {
                  outline: 'none',
                }
              ]}
              value={message}
              onChangeText={setMessage}
              placeholder="Ask a question..."
              placeholderTextColor="#666"
              multiline={Platform.OS !== 'web'}
              maxLength={500}
              onSubmitEditing={handleSubmitEditing}
              blurOnSubmit={false}
              returnKeyType="send"
            />
            <Pressable
              onPress={sendMessage}
              style={({ pressed }) => [
                styles.sendButton,
                !message.trim() && styles.sendButtonDisabled,
                pressed && styles.sendButtonPressed,
              ]}
              disabled={!message.trim() || isLoading}>
              <Send
                size={24}
                color={message.trim() ? '#FFFFFF' : '#9CA3AF'}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}>
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
                  <Text style={[
                    styles.messageText,
                    msg.isBot ? styles.botMessageText : styles.userMessageText,
                  ]}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#4ade80" />
              </View>
            )}
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
              placeholder="Type a message..."
              placeholderTextColor="#666"
              multiline={Platform.OS !== 'web'}
              maxLength={500}
              onSubmitEditing={handleSubmitEditing}
              blurOnSubmit={false}
              returnKeyType="send"
            />
            <Pressable
              onPress={sendMessage}
              style={({ pressed }) => [
                styles.sendButton,
                !message.trim() && styles.sendButtonDisabled,
                pressed && styles.sendButtonPressed,
              ]}
              disabled={!message.trim() || isLoading}>
              <Send
                size={24}
                color={message.trim() ? '#FFFFFF' : '#9CA3AF'}
              />
            </Pressable>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeContainer: {
    marginBottom: 40,
    alignItems: 'center',
    maxWidth: 600,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  centeredInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    maxWidth: 600,
    padding: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
  },
  centeredInput: {
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
    fontSize: 16,
    lineHeight: 24,
  },
  botMessageText: {
    color: '#fff',
  },
  userMessageText: {
    color: '#fff',
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
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
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
});