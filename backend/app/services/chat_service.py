from app.schemas.chat import ChatResponse
from app.services.ai_provider import AIProvider

class ChatService:
    def __init__(self, provider: AIProvider):
        self.provider = provider

    def generate(self, message: str) -> ChatResponse:
        reply_text = self.provider.generate(message)
        return ChatResponse(reply = reply_text)

# chat_service = ChatService()