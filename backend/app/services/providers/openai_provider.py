from app.schemas.chat import ChatResponse

class OpenAIProvider:
    def generate(self, message:str) -> str:
        reply = f"You said: {message}"
        return reply