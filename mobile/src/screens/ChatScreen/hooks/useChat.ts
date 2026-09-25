import { useState } from 'react';

import type { ChatMessage } from '../types';
import { sendChatMessage } from '../../../api/chatApi';
import { Keyboard } from 'react-native';

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (content: string) => {
        if (isSending) {
            return;
        }
        Keyboard.dismiss();
        setError(null);
        setIsSending(true);

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

        try {
            // 1. Add user message + empty assistant message

            setMessages((currentMessages) => [
                ...currentMessages,
                userMessage,
                assistantMessage,
            ]);

            // 2. Call backend API
            const response = await sendChatMessage(content);
            console.log('response',response)

            // 3. Update assistant message with backend response
            setMessages((currentMessages) =>
                currentMessages.map((message) =>
                    message.id === assistantMessageId
                        ? {
                            ...message,
                            content: response.reply,
                            status: 'completed',
                        }
                        : message
                )
            );

        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Something went wrong.';

            setMessages((currentMessages) =>
                currentMessages.map((message) =>
                    message.id === assistantMessageId
                        ? {
                            ...message,
                            status: 'error',
                            content: 'Failed to get a response.',
                        }
                        : message
                )
            );

            setError(errorMessage);
            // handle failure
        } finally {
            setIsSending(false);
        }
    };

    return {
        messages,
        isSending,
        error,
        sendMessage,
    };
}