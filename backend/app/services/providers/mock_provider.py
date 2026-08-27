# app/services/providers/mock_provider.py
from app.services.ai_provider import AIProvider
from app.services.exceptions import AIProviderError
from app.models.generation import GenerationRequest
import logging

logger = logging.getLogger(__name__)


class MockProvider(AIProvider):
    
    def __init__(self, should_fail: bool = False):
        self.should_fail = should_fail

    def generate(self, request: GenerationRequest) -> str:
        if self.should_fail:
            logger.warning("Mock provider simulating a failure")
            raise AIProviderError(
                provider="mock",
                message="Simulated mock failure",
                error_code="429",
                retryable=True,
            )

        logger.info(f"Mock provider generating reply | message_length={len(request.message)}")
        return f"Mock reply to: {request.message}"