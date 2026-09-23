export type ChatApiResponse = {
    reply: string;
  };
  
  const API_BASE_URL = 'http://192.168.16.119:8000';
  
  export async function sendChatMessage(
    message: string
  ): Promise<ChatApiResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    return response.json();
  }