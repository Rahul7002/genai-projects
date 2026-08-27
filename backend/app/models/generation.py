from dataclasses import dataclass


@dataclass
class GenerationRequest:
    message: str
    model: str | None = None
    temperature: float | None = None
    max_tokens: int | None = None