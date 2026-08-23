from fastapi import APIRouter, Depends
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService
from app.core.dependencies import get_chat_service

router = APIRouter()

@router.post("/chat", response_model = ChatResponse)
def chat_endpoints(request: ChatRequest, chat_service: ChatService = Depends(get_chat_service)) -> ChatResponse:
    return chat_service.generate(request.message)