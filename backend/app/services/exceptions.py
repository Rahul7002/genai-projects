class AIProviderError(Exception):
    def __init__(
        self,
        provider: str,
        message: str,
        error_code: str,
        retryable: bool,
        original_exception: Exception | None = None,
    ):
        self.provider = provider
        self.message = message
        self.error_code = error_code
        self.retryable = retryable
        self.original_exception = original_exception

        super().__init__(message)