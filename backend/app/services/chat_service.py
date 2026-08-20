from app.schemas.chat import ChatResponse

class ChatService:
    def generate(self, message: str) -> ChatResponse:
        reply_text = "Hi Rahul, I'm your assistant"
        return ChatResponse(reply = reply_text)

chat_service = ChatService()