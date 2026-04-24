import asyncio
from datetime import datetime, timezone

from app.config.database import get_supabase_client
from app.models.schemas import ProgressUpdateRequest
from app.utils.exceptions import AppException


async def get_progress(user_id: str) -> dict:
    client = get_supabase_client()
    result = await asyncio.to_thread(
        lambda: client.table("progress")
        .select("user_id,level,lesson_completed,xp,updated_at")
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )
    if not result.data:
        raise AppException(code=4001, message="学习进度不存在", status_code=404)
    return result.data[0]


async def upsert_progress(user_id: str, payload: ProgressUpdateRequest) -> dict:
    client = get_supabase_client()
    body = {
        "user_id": user_id,
        "level": payload.level,
        "lesson_completed": payload.lesson_completed,
        "xp": payload.xp,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    result = await asyncio.to_thread(
        lambda: client.table("progress")
        .upsert(body, on_conflict="user_id")
        .execute()
    )
    if not result.data:
        raise AppException(code=4002, message="更新学习进度失败", status_code=500)
    return result.data[0]
