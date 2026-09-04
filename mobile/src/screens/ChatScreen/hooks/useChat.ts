import { useState } from 'react';

import type { ChatMessage } from '../types';

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (content: string) => {
        if (isStreaming) {
            return;
        }

        setError(null);
        setIsStreaming(true);

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
            //1. create messages

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
            //2. stream chunks

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


            //3. mark assistant as completed

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

            setIsStreaming(false);

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
                        }
                        : message
                )
            );

            setError(errorMessage);
            // handle failure
        } finally {
            setIsStreaming(false);
        }
    };

    return {
        messages,
        isStreaming,
        error,
        sendMessage,
    };
}