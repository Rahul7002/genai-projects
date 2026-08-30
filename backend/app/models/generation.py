from dataclasses import dataclass


@dataclass
class GenerationRequest:
    message: str
    model: str | None = None
    temperature: float | None = None
    max_tokens: int | None = None

@dataclass
class GenerationChunk:
    text: str = ""
    event: str = "content"
    finish_reason: str | None = None
    error_code: str | None = None
    error_message: str | None = None