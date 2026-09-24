import React, { useState } from 'react';
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
import { ChatHistorySection, CustomDrawer } from '../CustomDrawer/CustomDrawer';

export default function ChatScreen() {

    const {
        messages,
        isSending,
        sendMessage,
    } = useChat();

    const [drawerVisible, setDrawerVisible] = useState(false);

    const chatHistorySections: ChatHistorySection[] = [
        {
            title: 'Today',
            data: [
                { id: '1', title: 'React Native FlatList scrolling' },
                { id: '2', title: 'TypeScript interface guidance' },
            ],
        },
        {
            title: 'Previous 7 Days',
            data: [
                { id: '3', title: 'Weekend workout routine' },
                { id: '4', title: 'Python web scraper script' },
            ],
        },
    ];

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.keyboardContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.innerContainer}>
                            {/* Header */}
                            <Header onMenuPress={() => setDrawerVisible(true)}/>

                            {/* Center Area / Brand Logo / Messages or Center Logo */}
                            <View style={styles.content}>
                                <MessageList messages={messages} />
                            </View>
                            {/*Bottom Input Bar */}
                            <MessageInput onSend={sendMessage} disabled={isSending} />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <CustomDrawer
                    visible={drawerVisible}
                    onClose={() => setDrawerVisible(false)}
                    onSelectChat={(id) => console.log('Selected:', id)}
                    onNewChat={() => console.log('New chat')}
                    chatSections={chatHistorySections}
                    user={{
                        name: 'Rahul Verma',
                        email: 'rahul@gmail.com',
                        plan: 'ChatGPT Plus',
                    }}
                />
            </SafeAreaView>
        </>
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