from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=64)
    display_name: str = Field(min_length=1, max_length=50)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=64)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str
    email: EmailStr
    display_name: str
    created_at: datetime | None = None


class ProgressUpdateRequest(BaseModel):
    level: int = Field(ge=1, le=10)
    lesson_completed: int = Field(ge=0)
    xp: int = Field(ge=0)


class ProgressResponse(BaseModel):
    user_id: str
    level: int
    lesson_completed: int
    xp: int
    updated_at: datetime | None = None


class PronunciationResponse(BaseModel):
    user_id: str
    pitch_score: float
    clarity_score: float
    duration_score: float
    total_score: float
    feedback: list[str]
    raw_metrics: dict[str, Any]
