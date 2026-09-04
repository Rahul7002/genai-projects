export type MessageRole = 'user' | 'assistant';

export type MessageStatus = 'sending' | 'streaming' | 'completed' | 'error';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  status?: MessageStatus;
  createdAt?: string;
};