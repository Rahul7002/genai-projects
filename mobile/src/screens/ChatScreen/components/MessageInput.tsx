import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type MessageInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if(disabled) {
        return;
    }
    const message = text.trim();

    if (!message) {
      return;
    }

    onSend(message);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Ask something..."
        style={styles.input}
        editable={!disabled}
      />

      <Pressable onPress={handleSend} style={styles.button}>
        <Text style={styles.buttonText}>➤</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  button: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#222',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});