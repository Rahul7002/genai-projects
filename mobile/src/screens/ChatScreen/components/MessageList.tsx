import { FlatList, ListRenderItem, Text, View } from 'react-native';

import type { ChatMessage } from '../types';

type MessageListProps = {
    messages: ChatMessage[];
};

export function MessageList({ messages }: MessageListProps) {

    const renderItem: ListRenderItem<ChatMessage> = ({ item }) => {
        return (
            <View style={{ alignSelf: item.role == "assistant" ? 'flex-end' : 'flex-start'}}>
                <Text>role: {item.role}</Text>
                <Text>message: {item.content}</Text>
            </View>
        )
    }

    return (
        <View style={{ width: '100%', height: '50%' }}>
            <FlatList
                data={messages}
                keyExtractor={(message) => message.id}
                renderItem={renderItem}
            />
        </View>
    );
}