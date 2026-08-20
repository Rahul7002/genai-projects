from app.schemas.chat import ChatResponse

class ChatService:
    def __init__(self, provider):
        self.provider = provider

    def generate(self, message: str) -> ChatResponse:
        reply_text = self.provider.generate(message)
        return ChatResponse(reply = reply_text)

# chat_service = ChatService()