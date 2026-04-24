from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.utils.exceptions import AppException
from app.utils.security import decode_access_token

bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> str:
    """鉴权依赖：从 Bearer Token 中解析用户 ID。"""
    if credentials is None:
        raise AppException(code=1001, message="未提供认证令牌", status_code=401)

    try:
        return decode_access_token(credentials.credentials)
    except ValueError as exc:
        raise AppException(code=1002, message=str(exc), status_code=401) from exc
