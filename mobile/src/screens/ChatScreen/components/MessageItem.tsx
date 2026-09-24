import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { ChatMessage } from '../types';

interface MessageItemProps {
    message: ChatMessage;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const isUser = message.role === 'user';

    if (isUser) {
        return (
            <View style={styles.userContainer}>
                <View style={styles.userBubble}>
                    <Text style={styles.userText}>{message.content}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.assistantContainer}>
            <View style={styles.assistantAvatar}>
                <Ionicons name="sparkles" size={14} color="#ffffff" />
            </View>
            {
                message?.status == 'streaming' ?
                    <View style={styles.lottieWrapper}>
                        <LottieView
                            source={require('../../../../assets/loading.json')}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                    </View>
                    : <View style={styles.assistantContent}>
                        <Text style={styles.assistantText}>{message.content}</Text>
                    </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        width: '100%',
        alignItems: 'flex-end',
        marginVertical: 6,
        paddingHorizontal: 16,
    },
    userBubble: {
        maxWidth: '80%',
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    userText: {
        fontSize: 16,
        lineHeight: 22,
        color: '#0d0d0d',
    },
    assistantContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 8,
        paddingHorizontal: 16,
        gap: 12,
    },
    assistantAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    assistantContent: {
        flex: 1,
    },
    assistantText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#0d0d0d',
    },
    lottieWrapper: {
        width: 50,
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    lottie: {
        width: '100%',
        height: '100%',
    },
});