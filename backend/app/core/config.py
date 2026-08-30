from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    GEMINI_API_KEY: str
    OPENAI_MODEL: str = "gpt-5-mini"
    GEMINI_MODEL: str = "gemini-3.5-flash-lite"
    RETRY_MAX_ATTEMPTS: int = 3
    RETRY_BASE_DELAY: float = 1.0
    RETRY_MAX_DELAY: float = 10.0

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()