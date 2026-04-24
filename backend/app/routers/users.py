from fastapi import APIRouter, Depends

from app.services.user_service import get_user_by_id
from app.utils.dependencies import get_current_user_id
from app.utils.exceptions import AppException
from app.utils.response import success_response

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}")
async def get_user(user_id: str, current_user_id: str = Depends(get_current_user_id)):
    if user_id != current_user_id:
        raise AppException(code=3002, message="无权访问其他用户信息", status_code=403)
    data = await get_user_by_id(user_id)
    return success_response(data=data)
