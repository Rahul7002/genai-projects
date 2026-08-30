import logging
import time

from app.services.ai_provider import AIProvider
from app.services.exceptions import AIProviderError
from app.services.retry_policy import RetryPolicy
from app.models.generation import GenerationRequest, GenerationChunk
from collections.abc import Iterator


logger = logging.getLogger(__name__)


class ProviderOrchestrator(AIProvider):

    def __init__(
        self,
        providers: list[AIProvider],
        retry_policy: RetryPolicy
    ):
        self.providers = providers
        self.retry_policy = retry_policy

    def stream(self, request: GenerationRequest) -> Iterator[GenerationChunk]:
        raise NotImplementedError("Streaming not yet implemented for this provider")

    def generate(self, request: GenerationRequest) -> str:

        if not self.providers:
            raise AIProviderError(
                provider="orchestrator",
                message="No AI providers configured",
                error_code="no_providers",
                retryable=False,
            )

        last_error = None

        for provider in self.providers:
            attempt = 1
            while True:
                try:
                    return provider.generate(request)

                except AIProviderError as e:
                    logger.warning(
                        "AI provider failed | provider=%s | error_code=%s",
                        e.provider,
                        e.error_code,
                    )

                    last_error = e

                    if not self.retry_policy.should_retry(attempt, e):
                        break  # give up on THIS provider, move to the next one
                    
                    delay = self.retry_policy.get_delay(attempt)

                    logger.info(
                        "Retrying provider=%s in %.1fs | attempt=%d",
                        e.provider,
                        delay,
                        attempt + 1,
                    )
                    time.sleep(delay)
                    attempt += 1

        raise last_error