from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """全局配置，支持从 .env 读取。"""

    supabase_url: str
    supabase_key: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
