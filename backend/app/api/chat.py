from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter()
chat_service = ChatService()

@router.post("/chat", response_model = ChatResponse)
def chat_endpoints(request: ChatRequest) -> ChatResponse:
    return chat_service.generate(request.message)