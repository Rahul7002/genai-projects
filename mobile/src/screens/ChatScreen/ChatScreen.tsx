import { StyleSheet, Text, View } from 'react-native';

import { MessageInput } from './components/MessageInput';
import { MessageList } from './components/MessageList';
import { useChat } from './hooks/useChat';

export default function ChatScreen() {

  const {
    messages,
    isStreaming,
    sendMessage,
  } = useChat();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GenAI Chat</Text>

      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} disabled={isStreaming} />
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