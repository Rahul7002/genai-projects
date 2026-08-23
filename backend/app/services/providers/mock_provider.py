from app.services.ai_provider import AIProvider
from app.services.exceptions import AIProviderError
import logging

logger = logging.getLogger(__name__)

class MockProvider(AIProvider):
    
    def __init__(self, should_fail: bool = False):
        self.should_fail = should_fail

    def generate(self, message: str) -> str:
        logger.error(f"OpenAI rate limit / quota error: {self.should_fail}")
        if self.should_fail:
            raise AIProviderError(
                provider="mock",
                message="Simulated mock failure",
                error_code = "429",
                retryable=True,
            )
        return f"Mock reply to: {message}"