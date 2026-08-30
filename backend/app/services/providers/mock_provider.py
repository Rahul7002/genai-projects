# app/services/providers/mock_provider.py
from app.services.ai_provider import AIProvider
from app.services.exceptions import AIProviderError
from app.models.generation import GenerationRequest, GenerationChunk
import logging
from collections.abc import Iterator

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

    def stream(self, request: GenerationRequest) -> Iterator[GenerationChunk]:
        if self.should_fail:
            logger.warning("Mock provider simulating a streaming failure")
            yield GenerationChunk(
                event="error",
                error_code="429",
                error_message="Simulated mock streaming failure",
            )
            return

        logger.info(f"Mock provider streaming reply | message_length={len(request.message)}")

        reply_text = f"Mock reply to: {request.message}"
        words = reply_text.split(" ")

        for word in words:
            yield GenerationChunk(text=word + " ")

        yield GenerationChunk(event="completed", finish_reason="stop")