import { FlatList, Keyboard, ListRenderItem, Platform, StyleSheet, Text, View } from 'react-native';

import type { ChatMessage } from '../types';
import { MessageItem } from './MessageItem';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

type MessageListProps = {
    messages: ChatMessage[];
};

export function MessageList({ messages }: MessageListProps) {

    const flatListRef = useRef<FlatList<ChatMessage>>(null);

    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const scrollToEnd = (animated = true) => {
        flatListRef.current?.scrollToEnd({ animated });
    };

    // Scroll down when keyboard opens/focuses
  useEffect(() => {
    const eventName = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

    const keyboardListener = Keyboard.addListener(eventName, () => {
      if (messages.length > 0) {
        // Small delay to ensure the layout resize finishes before scrolling
        setTimeout(() => {
          scrollToEnd(true);
        }, 100);
      }
    });

    return () => {
      keyboardListener.remove();
    };
  }, [messages.length]);

    if (messages.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.logoCircle}>
                    <Ionicons name="sparkles" size={26} color="#ffffff" />
                </View>
            </View>
        );
    }

    return (
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(message) => message.id}
                renderItem={({ item }) => <MessageItem message={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                onContentSizeChange={() => {
                    scrollToEnd(false)
                  }}
            />
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
      },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start', // Pins initial messages to the very top
        paddingVertical: 16,
        paddingBottom: 24,
    },
})