# app/services/ai_provider.py
from collections.abc import Iterator
from abc import ABC, abstractmethod
from app.models.generation import GenerationRequest, GenerationChunk


class AIProvider(ABC):
    @abstractmethod
    def generate(self, request: GenerationRequest) -> str:
        """
        Generate a text response for the given message.
        Every concrete provider (OpenAI, Gemini, Mock, etc.)
        must implement this exact method signature.
        """
        raise NotImplementedError

    @abstractmethod
    def stream(self,request: GenerationRequest) -> Iterator[GenerationChunk]:
        raise NotImplementedError
