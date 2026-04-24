from supabase import Client, create_client

from app.config.settings import settings


def get_supabase_client() -> Client:
    """创建 Supabase 客户端。"""
    return create_client(settings.supabase_url, settings.supabase_key)
