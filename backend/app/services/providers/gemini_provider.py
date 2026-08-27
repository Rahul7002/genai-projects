# app/services/providers/gemini_provider.py
import logging
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted, Unauthenticated, GoogleAPIError

from app.services.ai_provider import AIProvider
from app.services.exceptions import AIProviderError
from app.models.generation import GenerationRequest

logger = logging.getLogger(__name__)


class GeminiProvider(AIProvider):
    def __init__(self, client):
        self.client = client  # a configured genai.GenerativeModel instance

    def generate(self, request: GenerationRequest) -> str:
        logger.info(f"Sending request to Gemini | message_length={len(request.message)}")
        try:
            response = self.client.generate_content(request.message)
            logger.info(f"Received response from Gemini | output_length={len(response.text)}")
            return response.text

        except ResourceExhausted as e:
            logger.error(f"Gemini quota/rate limit error: {e}")
            raise AIProviderError(
                provider="gemini",
                message="Gemini quota exceeded",
                error_code="429",
                retryable=True,
            ) from e

        except Unauthenticated as e:
            logger.error(f"Gemini authentication error: {e}")
            raise AIProviderError(
                provider="gemini",
                message="Gemini authentication failed",
                error_code="401",
                retryable=True,
            ) from e

        except GoogleAPIError as e:
            logger.error(f"Unexpected Gemini error: {e}")
            raise AIProviderError(
                provider="gemini",
                message="Unexpected Gemini error",
                error_code="unknown",
                retryable=True,
            ) from e