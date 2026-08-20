from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService
from app.services.providers.openai_provider import OpenAIProvider

provider = OpenAIProvider()

router = APIRouter()
chat_service = ChatService(provider)

@router.post("/chat", response_model = ChatResponse)
def chat_endpoints(request: ChatRequest) -> ChatResponse:
    return chat_service.generate(request.message)