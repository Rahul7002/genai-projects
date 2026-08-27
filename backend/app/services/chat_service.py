from app.schemas.chat import ChatResponse
from app.services.ai_provider import AIProvider
from app.models.generation import GenerationRequest

class ChatService:
    def __init__(self, provider: AIProvider):
        self.provider = provider

    def generate(self, message: str) -> ChatResponse:
        request = GenerationRequest(message=message)
        reply_text = self.provider.generate(request)
        return ChatResponse(reply = reply_text)

# chat_service = ChatService()