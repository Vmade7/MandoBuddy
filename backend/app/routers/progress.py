from fastapi import APIRouter, Depends

from app.models.schemas import ProgressUpdateRequest
from app.services.progress_service import get_progress, upsert_progress
from app.utils.dependencies import get_current_user_id
from app.utils.exceptions import AppException
from app.utils.response import success_response

router = APIRouter(prefix="/progress", tags=["progress"])


@router.get("/{user_id}")
async def get_user_progress(user_id: str, current_user_id: str = Depends(get_current_user_id)):
    if user_id != current_user_id:
        raise AppException(code=4003, message="无权访问其他用户进度", status_code=403)
    data = await get_progress(user_id)
    return success_response(data=data)


@router.post("/{user_id}")
async def update_user_progress(
    user_id: str,
    payload: ProgressUpdateRequest,
    current_user_id: str = Depends(get_current_user_id),
):
    if user_id != current_user_id:
        raise AppException(code=4004, message="无权更新其他用户进度", status_code=403)
    data = await upsert_progress(user_id, payload)
    return success_response(data=data, message="学习进度更新成功")
