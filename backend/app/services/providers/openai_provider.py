from app.services.ai_provider import AIProvider
from app.services.exceptions import AIProviderError
import logging
import openai

logger = logging.getLogger(__name__)

class OpenAIProvider(AIProvider):
    def __init__(self, client):
        self.client = client

    def generate(self, message:str) -> str:
        logger.info(
            "Sending request to OpenAI | message_length=%d",
            len(message)
        )
        try:
            response = self.client.responses.create(
                model="gpt-5-mini",
                input=message
            )
            logger.info(f"Received response from OpenAI | output={response.output_text}")
            logger.info("Received response from OpenAI")
            return response.output_text
        
        except openai.RateLimitError as e:
            logger.error(f"OpenAI rate limit / quota error: {e}")
            raise AIProviderError(
                provider = "openai",
                message = "OpenAI quota exceeded",
                error_code = "429",
                retryable = True,
                original_exception = e
            ) from e

        except Exception as e:
            logger.error(f"OpenAI API call failed | error={e}")
            raise AIProviderError(
                provider = "openai",
                message = "Unexpected OpenAI error",
                error_code = "unknown",
                retryable = False,
                original_exception = e
            ) from e