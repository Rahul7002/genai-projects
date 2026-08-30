import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MessageInput } from './components/MessageInput';
import { MessageList } from './components/MessageList';
import type { ChatMessage } from './types';

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = async (content: string) => {
    const timestamp = Date.now();
  
    const userMessage: ChatMessage = {
      id: `${timestamp}-user`,
      role: 'user',
      content,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };
  
    const assistantMessageId = `${timestamp}-assistant`;
  
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      status: 'streaming',
      createdAt: new Date().toISOString(),
    };
  
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);
  
    const chunks = [
      'GenAI',
      ' is',
      ' a',
      ' technology',
      ' that',
      ' enables',
      ' AI',
      ' models',
      ' to',
      ' generate',
      ' new',
      ' content.',
    ];
  
    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                content: message.content + chunk,
              }
            : message
        )
      );
    }
  
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === assistantMessageId
          ? {
              ...message,
              status: 'completed',
            }
          : message
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GenAI Chat</Text>

      <MessageList messages={messages} />

      <MessageInput onSend={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    padding: 16,
  },
});