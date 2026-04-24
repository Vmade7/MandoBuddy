from fastapi import APIRouter, Depends, File, Form, UploadFile

from app.services.pronunciation_service import evaluate_pronunciation
from app.utils.dependencies import get_current_user_id
from app.utils.exceptions import AppException
from app.utils.response import success_response

router = APIRouter(tags=["pronunciation"])


@router.post("/pronunciation")
async def pronunciation_assessment(
    user_id: str = Form(...),
    audio: UploadFile = File(...),
    current_user_id: str = Depends(get_current_user_id),
):
    if user_id != current_user_id:
        raise AppException(code=5002, message="无权提交其他用户音频", status_code=403)
    audio_bytes = await audio.read()
    data = await evaluate_pronunciation(user_id=user_id, audio_bytes=audio_bytes, filename=audio.filename)
    return success_response(data=data, message="发音评测完成")
