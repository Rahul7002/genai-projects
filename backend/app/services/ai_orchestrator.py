import logging

from app.services.ai_provider import AIProvider
from app.services.exceptions import AIProviderError


logger = logging.getLogger(__name__)


class ProviderOrchestrator(AIProvider):

    def __init__(self, providers: list[AIProvider]):
        self.providers = providers

    def generate(self, message: str) -> str:

        if not self.providers:
            raise AIProviderError(
                provider="orchestrator",
                message="No AI providers configured",
                error_code="no_providers",
                retryable=False,
            )

        last_error = None

        for provider in self.providers:
            try:
                return provider.generate(message)

            except AIProviderError as e:
                logger.warning(
                    "AI provider failed | provider=%s | error_code=%s",
                    e.provider,
                    e.error_code,
                )

                last_error = e

        raise last_error