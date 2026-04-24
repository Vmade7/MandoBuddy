import asyncio
import uuid
from datetime import datetime, timezone

from app.config.database import get_supabase_client
from app.models.schemas import LoginRequest, RegisterRequest
from app.utils.exceptions import AppException
from app.utils.security import create_access_token, hash_password, verify_password


async def register_user(payload: RegisterRequest) -> dict:
    """注册新用户并返回令牌。"""
    client = get_supabase_client()

    existing = await asyncio.to_thread(
        lambda: client.table("users")
        .select("id")
        .eq("email", payload.email)
        .limit(1)
        .execute()
    )
    if existing.data:
        raise AppException(code=2001, message="邮箱已被注册", status_code=409)

    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()

    await asyncio.to_thread(
        lambda: client.table("users")
        .insert(
            {
                "id": user_id,
                "email": payload.email,
                "password_hash": hash_password(payload.password),
                "display_name": payload.display_name,
                "created_at": now,
            }
        )
        .execute()
    )

    # 初始化学习进度，便于前端首次加载。
    await asyncio.to_thread(
        lambda: client.table("progress")
        .insert(
            {
                "user_id": user_id,
                "level": 1,
                "lesson_completed": 0,
                "xp": 0,
                "updated_at": now,
            }
        )
        .execute()
    )

    return {"access_token": create_access_token(user_id), "token_type": "bearer"}


async def login_user(payload: LoginRequest) -> dict:
    """用户登录并签发令牌。"""
    client = get_supabase_client()

    result = await asyncio.to_thread(
        lambda: client.table("users")
        .select("id,email,password_hash")
        .eq("email", payload.email)
        .limit(1)
        .execute()
    )
    if not result.data:
        raise AppException(code=2002, message="账号或密码错误", status_code=401)

    user = result.data[0]
    if not verify_password(payload.password, user["password_hash"]):
        raise AppException(code=2002, message="账号或密码错误", status_code=401)

    return {"access_token": create_access_token(user["id"]), "token_type": "bearer"}
