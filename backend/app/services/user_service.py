import asyncio

from app.config.database import get_supabase_client
from app.utils.exceptions import AppException


async def get_user_by_id(user_id: str) -> dict:
    client = get_supabase_client()
    result = await asyncio.to_thread(
        lambda: client.table("users")
        .select("id,email,display_name,created_at")
        .eq("id", user_id)
        .limit(1)
        .execute()
    )
    if not result.data:
        raise AppException(code=3001, message="用户不存在", status_code=404)
    return result.data[0]
