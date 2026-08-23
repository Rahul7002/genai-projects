# app/services/ai_provider.py
from abc import ABC, abstractmethod


class AIProvider(ABC):
    @abstractmethod
    def generate(self, message: str) -> str:
        """
        Generate a text response for the given message.
        Every concrete provider (OpenAI, Gemini, Mock, etc.)
        must implement this exact method signature.
        """
        raise NotImplementedError
