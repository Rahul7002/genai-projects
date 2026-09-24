import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { MessageInput } from './components/MessageInput';
import { useChat } from './hooks/useChat';
import Header from './components/Header';
import { MessageList } from './components/MessageList';

export default function ChatScreen() {

    const {
        messages,
        isSending,
        sendMessage,
      } = useChat();

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerContainer}>
                        {/* Header */}
                        <Header />

                        {/* Center Area / Brand Logo / Messages or Center Logo */}
                        <View style={styles.content}>
                            <MessageList messages={messages} />
                        </View>
                        {/*Bottom Input Bar */}
                        <MessageInput onSend={sendMessage} disabled={isSending} />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    keyboardContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
    
    content: {
        flex: 1,
    },
});