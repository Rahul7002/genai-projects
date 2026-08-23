from fastapi import Depends
from openai import OpenAI

from app.core.config import settings
from app.services.providers.openai_provider import OpenAIProvider
from app.services.providers.mock_provider import MockProvider
from app.services.chat_service import ChatService
from app.services.ai_provider import AIProvider
from app.services.ai_orchestrator import ProviderOrchestrator

def get_openai_client() -> OpenAI:
    return OpenAI(api_key = settings.OPENAI_API_KEY)

def get_openai_provider(client: OpenAI = Depends(get_openai_client)) -> AIProvider:
    return OpenAIProvider(client)

def get_mock_provider() -> AIProvider:
    return MockProvider(should_fail=False)

def get_provider_orchestrator(
    openai_provider: AIProvider = Depends(get_openai_provider),
    mock_provider: AIProvider = Depends(get_mock_provider),
) -> AIProvider:
    return ProviderOrchestrator([openai_provider, mock_provider])

def get_chat_service(provider: AIProvider = Depends(get_provider_orchestrator)) -> ChatService:
    return ChatService(provider)