from app.services.exceptions import AIProviderError

class RetryPolicy:
    def __init__(
        self,
        max_attempts: int = 3,
        base_delay: float = 1.0,
        max_delay: float = 10.0,
        backoff_multiplier: float = 2.0,
    ):
        self.max_attempts = max_attempts
        self.base_delay = base_delay
        self.max_delay = max_delay
        self.backoff_multiplier = backoff_multiplier

    def should_retry(self, attempt: int, error: AIProviderError) -> bool:
        if not error.retryable:
            return False
        return attempt < self.max_attempts

    def get_delay(self, attempt: int) -> float:
        delay = self.base_delay * (self.backoff_multiplier ** (attempt - 1))
        return min(delay, self.max_delay)